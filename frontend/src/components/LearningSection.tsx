import { useEffect, useMemo, useRef, useState } from 'react'
import { tutorials } from '@/data/git-assist-tutorials'
import { categories, knowledge } from '@/data/git-assist-knowledge'
import LearningTutorialStepAction from '@/components/LearningTutorialStepAction'
import './LearningSection.css'
import { useAuthStore } from '@/lib/auth-store'
import { cn } from '@/lib/utils'

type Pillar = 'learn' | 'knowledge'
type Message = { role: 'user' | 'assist'; text: string }
const keys = { completed: 'git_assist_completed_tutorials', chat: 'git_assist_chat_messages' }
const read = <T,>(key: string, fallback: T): T => { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) as T : fallback } catch { return fallback } }
const save = (key: string, value: unknown) => { try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* storage may be unavailable */ } }

export default function LearningSection() {
  const [pillar, setPillar] = useState<Pillar>("learn");
  const [tutorialId, setTutorialId] = useState<string>("branch"),
    [step, setStep] = useState(0);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [completed, setCompleted] = useState<string[]>(() => read(keys.completed, []));
  const username = useAuthStore((state) => state.user?.username ?? 'you');
  const [search, setSearch] = useState(""),
    [category, setCategory] = useState("all"),
    [modal, setModal] = useState<any>(null);
  const [chatOpen, setChatOpen] = useState(false),
    [messages, setMessages] = useState<Message[]>(() =>
      read(keys.chat, [
        {
          role: "assist",
          text: "Hi! I’m Assist, your Git and GitHub learning companion. What would you like to understand?",
        },
      ]),
    ),
    [draft, setDraft] = useState(""),
    [sending, setSending] = useState(false);
  const [branch, setBranch] = useState("main"),
    [branchMenu, setBranchMenu] = useState(false),
    [branchName, setBranchName] = useState(""),
    [notice, setNotice] = useState("");
  const chatEnd = useRef<HTMLDivElement>(null);
  const tutorial = tutorials.find((t) => t.id === tutorialId) || tutorials[0];
  const coach =
    tutorial.coachConfigs[Math.min(step, tutorial.coachConfigs.length - 1)];
  const filtered = useMemo(
    () =>
      knowledge.filter(
        (item: any) =>
          (category === "all" || item.category === category) &&
          (!search ||
            `${item.title} ${item.short} ${item.explanation} ${item.categoryName}`
              .toLowerCase()
              .includes(search.toLowerCase())),
      ),
    [category, search],
  );
  const done = (id: string) => completed.includes(id);
  useEffect(() => save(keys.completed, completed), [completed]);
  useEffect(() => save(keys.chat, messages), [messages]);
  useEffect(() => {
    chatEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatOpen, sending]);
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setModal(null);
        setChatOpen(false);
      }
      if (
        e.key === "/" &&
        !["INPUT", "TEXTAREA"].includes(
          (document.activeElement as HTMLElement)?.tagName,
        )
      ) {
        e.preventDefault();
        setPillar("knowledge");
        setTimeout(() => document.getElementById("concept-search")?.focus(), 0);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);
  function startTutorial(id: string) {
    setTutorialId(id);
    setStep(0);
    setLessonComplete(false);
    setBranch("main");
    setBranchMenu(false);
    setBranchName("");
    setPillar("learn");
  }
  function completeStep(createdBranch?: string) {
    if (createdBranch) setBranch(createdBranch);
    if (step + 1 < tutorial.steps.length) {
      setStep((value) => value + 1);
      return;
    }
    setCompleted((value) =>
      value.includes(tutorial.id) ? value : [...value, tutorial.id],
    );
    setLessonComplete(true);
  }
  function goToNextTutorial() {
    const currentIndex = tutorials.findIndex((item) => item.id === tutorial.id);
    startTutorial(tutorials[currentIndex + 1]?.id ?? tutorials[0].id);
  }
  function send(text = draft) {
    const q = text.trim();
    if (!q || sending) return;
    const next = [...messages, { role: "user" as const, text: q }];
    setMessages(next);
    setDraft("");
    setSending(true);
    fetch("/api/v1/chatbot/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: q,
        skill_profile: {
          skill_level: "beginner",
          tech_stack: ["Git", "GitHub", "React", "TypeScript"],
          learning_goals: ["Learn Git and GitHub workflows for open-source contribution"],
        },
      }),
    })
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error("offline");
        return data.answer as string;
      })
      .catch(() => {
        const match = knowledge.find((k: any) =>
          `${k.title} ${k.short} ${k.explanation}`.toLowerCase().includes(
            q
              .toLowerCase()
              .split(/\W+/)
              .find((w) => w.length > 3) || "",
          ),
        ) as any;
        return match
          ? `${match.short}\n\n${match.whyItMatters || ""}`
          : "I’m having trouble reaching the AI service right now. Try the Knowledge area for a quick answer, or ask me again in a moment.";
      })
      .then((reply) =>
        setMessages((v) => [...v, { role: "assist", text: reply }]),
      )
      .finally(() => setSending(false));
  }
  return (
    <div className="learning-module app-shell">
      <div className="main-content">
        <div className="mb-5 flex w-fit items-center gap-1 rounded-lg border border-border bg-surface p-1">
          <button
            type="button"
            aria-pressed={pillar === "learn"}
            onClick={() => setPillar("learn")}
            className={cn(
              "rounded-md px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              pillar === "learn"
                ? "bg-accent text-on-accent"
                : "text-muted-foreground hover:bg-background hover:text-foreground",
            )}
          >
            Learn
          </button>
          <button
            type="button"
            aria-pressed={pillar === "knowledge"}
            onClick={() => setPillar("knowledge")}
            className={cn(
              "rounded-md px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
              pillar === "knowledge"
                ? "bg-accent text-on-accent"
                : "text-muted-foreground hover:bg-background hover:text-foreground",
            )}
          >
            Q&amp;A Knowledge
          </button>
        </div>
        <div className="module-heading">
          {pillar === "learn" ? (
            <>
              <div className="eyebrow">LEARN GIT &amp; GITHUB</div>
              <h1>GitHub Processes</h1>
              <p>Practice the essential GitHub workflows in a safe, guided workspace.</p>
            </>
          ) : (
            <>
              <div className="eyebrow">GIT KNOWLEDGE</div>
              <h1>Other Git Concepts</h1>
              <p>Explore the concepts that support the GitHub workflows you just practiced.</p>
            </>
          )}
        </div>
        {pillar === "learn" && (
          <section className="learn-layout">
            <aside className="lesson-rail">
              <div className="rail-title">
                LEARNING PATH <span>10 LESSONS</span>
              </div>
              {tutorials.map((t: any, i: number) => (
                <button
                  key={t.id}
                  onClick={() => startTutorial(t.id)}
                  className={`lesson-link ${t.id === tutorialId ? "current" : ""}`}
                >
                  <span
                    className={`lesson-number ${done(t.id) ? "is-done" : ""}`}
                  >
                    {done(t.id) ? "✓" : String(i + 1).padStart(2, "0")}
                  </span>
                  <span>
                    <b>{t.name}</b>
                    <small>
                      {t.time || "~4 min"} · {t.badge || "Guided practice"}
                    </small>
                  </span>
                  <span className="link-arrow">›</span>
                </button>
              ))}
              <div className="rail-note">
                <span>✦</span>
                <p>
                  Every lesson is a safe simulation. Explore without changing a
                  real repository.
                </p>
              </div>
              <button
                className="other-concepts-button"
                onClick={() => setPillar("knowledge")}
              >
                <span>＋</span>
                Other Git concepts
                <span className="link-arrow">›</span>
              </button>
            </aside>
            <div className="lesson-main">
              <div className="coach-card">
                <div className="coach-avatar">
                  <img
                    src={`/assist-${coach.pose || "explaining"}.png`}
                    alt="Assist learning companion"
                  />
                  <span>● ASSIST</span>
                </div>
                <div className="coach-copy">
                  <div className="eyebrow">
                    LESSON {tutorials.indexOf(tutorial) + 1} · STEP {step + 1}{" "}
                    OF {tutorial.steps.length}
                  </div>
                  <h2>{coach.title}</h2>
                  <p>{coach.text}</p>
                  <div className="do-this">
                    <b>TRY THIS</b>
                    <span>{coach.do}</span>
                  </div>
                  {lessonComplete ? (
                    <div className="lesson-complete">
                      <div className="eyebrow">PROCESS COMPLETE</div>
                      <h2>{tutorial.completion.title}</h2>
                      <p>{tutorial.completion.text}</p>
                      <button
                        className="learning-primary-button"
                        onClick={goToNextTutorial}
                      >
                        {tutorials.indexOf(tutorial) < tutorials.length - 1
                          ? `Go to next process: ${tutorials[tutorials.indexOf(tutorial) + 1].name}`
                          : "Restart from the first process"}
                        <span>→</span>
                      </button>
                    </div>
                  ) : (
                    <div className="coach-bottom">
                      <button
                        className="text-button"
                        onClick={() =>
                          setModal({
                            kind: "why",
                            title: "Why this matters",
                            text: coach.why,
                          })
                        }
                      >
                        ✦ Why this matters
                      </button>
                      <LearningTutorialStepAction
                        key={`${tutorial.id}-${step}`}
                        tutorialId={tutorial.id}
                        step={step}
                        target={coach.target}
                        onComplete={completeStep}
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="sim-frame">
                <div className="sim-top">
                  <div className="window-dots">
                    <i />
                    <i />
                    <i />
                  </div>
                  <span>github.com / your-username / learning-repo</span>
                  <span className="sim-label">PRACTICE MODE</span>
                </div>
                <div className="repo-heading">
                  <div>
                    <span className="repo-icon">⌂</span>
                    <b>
                      your-username <em>/</em> learning-repo
                    </b>
                    <span className="public-tag">Public</span>
                  </div>
                  <div className="repo-stats">
                    <span>⑂ Fork 0</span>
                    <span>☆ Star 0</span>
                  </div>
                </div>
                <div className="repo-tabs">
                  <button className="active">⌘ Code</button>
                  <button>◉ Issues</button>
                  <button>⑂ Pull requests</button>
                  <button>▷ Actions</button>
                </div>
                <div className="sim-body">
                  <div className="sim-toolbar">
                    <div className="branch-area">
                      <button
                        className="branch-button"
                        onClick={() => {
                          const opening = !branchMenu;
                          setBranchMenu(opening);
                          if (opening && coach.target === "branchBtn") {
                            completeStep();
                          }
                        }}
                      >
                        ⑂ {branch} ▾
                      </button>
                      {branchMenu && (
                        <div className="branch-pop">
                          <b>Switch branches</b>
                          <input
                            placeholder="Find or create a branch…"
                            value={branchName}
                            onChange={(e) => {
                              const value = e.target.value;
                              setBranchName(value);
                              if (
                                coach.target === "branchSearch" &&
                                value.trim() === "feature/login-validation"
                              ) {
                                completeStep();
                              }
                            }}
                          />
                          {[branch, "main", "feature/login-validation"]
                            .filter((v, i, a) => a.indexOf(v) === i)
                            .map((b) => (
                              <button
                                key={b}
                                onClick={() => {
                                  setBranch(b);
                                  setBranchMenu(false);
                                }}
                              >
                                ⑂ {b}
                              </button>
                            ))}
                          {branchName && (
                            <button
                              className="create-branch"
                              onClick={() => {
                                  const newBranch = branchName.trim();
                                  setBranch(newBranch);
                                setBranchName("");
                                setBranchMenu(false);
                                  if (coach.target === "createBranchLink") {
                                    completeStep(newBranch);
                                  }
                              }}
                            >
                              ＋ Create branch: {branchName}
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                    <span className="sim-path">
                      learning-repo <span>›</span> Code
                    </span>
                    <span className="sim-green">⌘ Code</span>
                  </div>
                  <div className="commit-strip">
                    <span className="mini-avatar">
                      {(username || "U")[0].toUpperCase()}
                    </span>
                    <b>
                      {username || "you"} <span>made a change</span>
                    </b>
                    <span className="commit-hash">a41f8c2 · 2 days ago</span>
                  </div>
                  <div className="file-row">
                    <span className="file-icon">▤</span>
                    <b>README.md</b>
                    <span>Update project overview</span>
                    <small>2 days ago</small>
                  </div>
                  <div className="file-row">
                    <span className="file-icon">▤</span>
                    <b>index.html</b>
                    <span>Add starter page</span>
                    <small>last week</small>
                  </div>
                  <div className="readme-box">
                    <div className="readme-head">
                      README.md <span>Preview</span> <span>Code</span>
                    </div>
                    <h2>Welcome to learning-repo</h2>
                    <p>A safe place to practice Git and GitHub workflows.</p>
                    <div className="practice-callout">
                      <b>YOUR CURRENT PRACTICE</b>
                      <span>{tutorial.name}</span>
                      <small>{tutorial.steps[step]?.[1]}</small>
                    </div>
                  </div>
                </div>
              </div>
              {!lessonComplete && <div className="step-footer">
                <span>
                  Step {step + 1} of {tutorial.steps.length}
                </span>
                <div className="mini-steps">
                  {tutorial.steps.map((_: any, i: number) => (
                    <i key={i} className={i <= step ? "active" : ""} />
                  ))}
                </div>
                <button
                  onClick={() => setStep(Math.max(0, step - 1))}
                  disabled={!step}
                >
                  ← Back
                </button>
              </div>}
            </div>
          </section>
        )}
        {pillar === "knowledge" && (
          <section className="knowledge-page">
            <button className="back-to-processes" onClick={() => setPillar("learn")}>
              ← Back to GitHub processes
            </button>
            <div className="knowledge-tools">
              <label className="search-field">
                <span>⌕</span>
                <input
                  id="concept-search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search Git concepts, questions, and commands…"
                />
                <kbd>⌘ K</kbd>
              </label>
              <span className="result-count">{filtered.length} concepts</span>
            </div>
            <div className="category-list">
              {categories.map((c: any) => (
                <button
                  key={c.id}
                  className={category === c.id ? "active" : ""}
                  onClick={() => setCategory(c.id)}
                >
                  <span>{c.icon}</span>
                  {c.name}
                </button>
              ))}
            </div>
            {filtered.length ? (
              <div className="concept-grid">
                {filtered.map((k: any) => (
                  <article className="concept-card" key={k.id}>
                    <div className="concept-meta">
                      <span>{k.categoryName}</span>
                    </div>
                    <h3>{k.title}</h3>
                    <p>{k.short}</p>
                    <button className="learn-more" onClick={() => setModal(k)}>
                      Explore concept <span>→</span>
                    </button>
                  </article>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                No concepts found. Try a different search.
              </div>
            )}
          </section>
        )}
      </div>
      {modal && (
        <div className="overlay" onClick={() => setModal(null)}>
          <div className="concept-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal" onClick={() => setModal(null)}>
              ×
            </button>
            <div className="eyebrow">
              {modal.kind === "why"
                ? "A LITTLE MORE CONTEXT"
                : modal.categoryName}
            </div>
            <h2>{modal.title}</h2>
            {modal.kind === "why" ? (
              <p>{modal.text}</p>
            ) : (
              <>
                <section>
                  <h3>Beginner explanation</h3>
                  <p>{modal.explanation}</p>
                </section>
                <section>
                  <h3>Why it matters</h3>
                  <p>{modal.whyItMatters}</p>
                </section>
                {modal.example && (
                  <section>
                    <h3>Practical example</h3>
                    <pre>{modal.example}</pre>
                  </section>
                )}
                {modal.mistake && (
                  <section>
                    <h3>Common mistake to avoid</h3>
                    <p>{modal.mistake}</p>
                  </section>
                )}
              </>
            )}
            <button
              className="secondary-button modal-done"
              onClick={() => setModal(null)}
            >
              Done
            </button>
          </div>
        </div>
      )}
      {chatOpen && (
        <div className="chat-overlay" onClick={() => setChatOpen(false)}>
          <aside className="chat-drawer" onClick={(e) => e.stopPropagation()}>
            <header className="chat-head">
              <img src="/assist-mini.png" alt="Assist learning companion" />
              <div>
                <b>Ask Assist</b>
                <small>
                  <i /> Ready to help with Git
                </small>
              </div>
              <button onClick={() => setChatOpen(false)}>×</button>
            </header>
            <div className="chat-body">
              {messages.map((m, i) => (
                <div className={`chat-message ${m.role}`} key={i}>
                  <span>{m.role === "assist" ? "🐾" : "You"}</span>
                  <p>{m.text}</p>
                </div>
              ))}
              {sending && (
                <div className="chat-message assist">
                  <span>🐾</span>
                  <p>Assist is thinking…</p>
                </div>
              )}
              <div ref={chatEnd} />
            </div>
            <div className="chat-suggestions">
              {[
                "What is origin?",
                "What is a pull request?",
                "Why use branches?",
              ].map((q) => (
                <button key={q} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
            <form
              className="chat-compose"
              onSubmit={(e) => {
                e.preventDefault();
                send();
              }}
            >
              <input
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about Git or GitHub…"
              />
              <button disabled={!draft.trim() || sending}>➤</button>
            </form>
            <div className="chat-foot">
              Answers are for learning. Git Assist does not connect to GitHub
              accounts.
            </div>
          </aside>
        </div>
      )}
      {notice && <div className="toast">✓ {notice}</div>}
    </div>
  );
}
