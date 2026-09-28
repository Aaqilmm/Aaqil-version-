import type { Tutorial } from './types'

interface LearningSidebarProps {
  tutorials: Tutorial[]
  currentTutorialId: string
  isDone: (id: string) => boolean
  onSelectTutorial: (id: string) => void
  onOpenKnowledge: () => void
}

export function LearningSidebar({
  tutorials,
  currentTutorialId,
  isDone,
  onSelectTutorial,
  onOpenKnowledge,
}: LearningSidebarProps) {
  return (
    <aside className="lesson-rail">
      <div className="rail-title">
        LEARNING PATH <span>{tutorials.length} LESSONS</span>
      </div>
      {tutorials.map((t, i) => (
        <button
          key={t.id}
          type="button"
          onClick={() => onSelectTutorial(t.id)}
          className={`lesson-link ${t.id === currentTutorialId ? 'current' : ''}`}
        >
          <span className={`lesson-number ${isDone(t.id) ? 'is-done' : ''}`}>
            {isDone(t.id) ? '✓' : String(i + 1).padStart(2, '0')}
          </span>
          <span>
            <b>{t.name}</b>
            <small>
              {t.time || '~4 min'} · {t.badge || 'Guided practice'}
            </small>
          </span>
          <span className="link-arrow">›</span>
        </button>
      ))}
      <div className="rail-note">
        <span>✦</span>
        <p>
          Every lesson is a safe simulation. Explore without changing a real repository.
        </p>
      </div>
      <button
        type="button"
        className="other-concepts-button"
        onClick={onOpenKnowledge}
      >
        <span>＋</span>
        Other Git concepts
        <span className="link-arrow">›</span>
      </button>
    </aside>
  )
}

export default LearningSidebar
