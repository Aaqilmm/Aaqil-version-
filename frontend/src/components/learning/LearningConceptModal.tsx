import type { ModalState } from './types'

interface LearningConceptModalProps {
  modal: ModalState
  onClose: () => void
}

export function LearningConceptModal({ modal, onClose }: LearningConceptModalProps) {
  if (!modal) return null

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className="concept-modal"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          className="close-modal"
          onClick={onClose}
          aria-label="Close modal"
        >
          ×
        </button>
        <div className="eyebrow">
          {modal.kind === 'why' ? 'A LITTLE MORE CONTEXT' : modal.categoryName}
        </div>
        <h2>{modal.title}</h2>
        {modal.kind === 'why' ? (
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
          type="button"
          className="secondary-button modal-done"
          onClick={onClose}
        >
          Done
        </button>
      </div>
    </div>
  )
}

export default LearningConceptModal
