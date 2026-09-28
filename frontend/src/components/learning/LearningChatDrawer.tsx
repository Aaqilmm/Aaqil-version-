import { useEffect, useRef } from 'react'
import type { ChatMessage } from './types'

interface LearningChatDrawerProps {
  open: boolean
  onClose: () => void
  messages: ChatMessage[]
  sending: boolean
  draft: string
  setDraft: (val: string) => void
  onSend: (text?: string) => void
}

export function LearningChatDrawer({
  open,
  onClose,
  messages,
  sending,
  draft,
  setDraft,
  onSend,
}: LearningChatDrawerProps) {
  const chatEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (open) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, open, sending])

  if (!open) return null

  return (
    <div className="chat-overlay" onClick={onClose}>
      <aside
        className="chat-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Ask Assist chatbot"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="chat-head">
          <img src="/assist-mini.png" alt="Assist learning companion" />
          <div>
            <b>Ask Assist</b>
            <small>
              <i /> Ready to help with Git
            </small>
          </div>
          <button type="button" onClick={onClose} aria-label="Close chat">
            ×
          </button>
        </header>
        <div className="chat-body">
          {messages.map((m, i) => (
            <div className={`chat-message ${m.role}`} key={i}>
              <span>{m.role === 'assist' ? '🐾' : 'You'}</span>
              <p>{m.text}</p>
            </div>
          ))}
          {sending && (
            <div className="chat-message assist">
              <span>🐾</span>
              <p>Assist is thinking…</p>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>
        <div className="chat-suggestions">
          {[
            'What is origin?',
            'What is a pull request?',
            'Why use branches?',
          ].map((q) => (
            <button key={q} type="button" onClick={() => onSend(q)}>
              {q}
            </button>
          ))}
        </div>
        <form
          className="chat-compose"
          onSubmit={(e) => {
            e.preventDefault()
            onSend()
          }}
        >
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Ask about Git or GitHub…"
            aria-label="Message to Assist"
          />
          <button type="submit" disabled={!draft.trim() || sending}>
            ➤
          </button>
        </form>
        <div className="chat-foot">
          Answers are for learning. Git Assist does not connect to GitHub
          accounts.
        </div>
      </aside>
    </div>
  )
}

export default LearningChatDrawer
