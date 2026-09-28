import type { CoachConfig, Tutorial } from './types'

interface LearningSimulatorProps {
  username: string
  tutorial: Tutorial
  step: number
  coach: CoachConfig
  branch: string
  branchMenu: boolean
  branchName: string
  lessonComplete: boolean
  setBranch: (branch: string) => void
  setBranchMenu: (open: boolean | ((prev: boolean) => boolean)) => void
  setBranchName: (name: string) => void
  onCompleteStep: (createdBranch?: string) => void
  onPrevStep: () => void
}

export function LearningSimulator({
  username,
  tutorial,
  step,
  coach,
  branch,
  branchMenu,
  branchName,
  lessonComplete,
  setBranch,
  setBranchMenu,
  setBranchName,
  onCompleteStep,
  onPrevStep,
}: LearningSimulatorProps) {
  return (
    <>
      <div className="sim-frame">
        <div className="sim-top">
          <div className="window-dots">
            <i />
            <i />
            <i />
          </div>
          <span>github.com / {username || 'your-username'} / learning-repo</span>
          <span className="sim-label">PRACTICE MODE</span>
        </div>
        <div className="repo-heading">
          <div>
            <span className="repo-icon">⌂</span>
            <b>
              {username || 'your-username'} <em>/</em> learning-repo
            </b>
            <span className="public-tag">Public</span>
          </div>
          <div className="repo-stats">
            <span>⑂ Fork 0</span>
            <span>☆ Star 0</span>
          </div>
        </div>
        <div className="repo-tabs">
          <button type="button" className="active">⌘ Code</button>
          <button type="button">◉ Issues</button>
          <button type="button">⑂ Pull requests</button>
          <button type="button">▷ Actions</button>
        </div>
        <div className="sim-body">
          <div className="sim-toolbar">
            <div className="branch-area">
              <button
                type="button"
                className="branch-button"
                onClick={() => {
                  const opening = !branchMenu
                  setBranchMenu(opening)
                  if (opening && coach.target === 'branchBtn') {
                    onCompleteStep()
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
                      const value = e.target.value
                      setBranchName(value)
                      if (
                        coach.target === 'branchSearch' &&
                        value.trim() === 'feature/login-validation'
                      ) {
                        onCompleteStep()
                      }
                    }}
                  />
                  {[branch, 'main', 'feature/login-validation']
                    .filter((v, i, a) => a.indexOf(v) === i)
                    .map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => {
                          setBranch(b)
                          setBranchMenu(false)
                        }}
                      >
                        ⑂ {b}
                      </button>
                    ))}
                  {branchName && (
                    <button
                      type="button"
                      className="create-branch"
                      onClick={() => {
                        const newBranch = branchName.trim()
                        setBranch(newBranch)
                        setBranchName('')
                        setBranchMenu(false)
                        if (coach.target === 'createBranchLink') {
                          onCompleteStep(newBranch)
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
              {(username || 'U')[0].toUpperCase()}
            </span>
            <b>
              {username || 'you'} <span>made a change</span>
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
      {!lessonComplete && (
        <div className="step-footer">
          <span>
            Step {step + 1} of {tutorial.steps.length}
          </span>
          <div className="mini-steps">
            {tutorial.steps.map((_, i: number) => (
              <i key={i} className={i <= step ? 'active' : ''} />
            ))}
          </div>
          <button
            type="button"
            onClick={onPrevStep}
            disabled={!step}
          >
            ← Back
          </button>
        </div>
      )}
    </>
  )
}

export default LearningSimulator
