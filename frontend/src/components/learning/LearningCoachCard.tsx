import type { CoachConfig, Tutorial } from './types'
import { LearningTutorialStepAction } from './LearningTutorialStepAction'

interface LearningCoachCardProps {
  tutorial: Tutorial
  tutorialIndex: number
  totalTutorials: number
  nextTutorialName?: string
  step: number
  coach: CoachConfig
  lessonComplete: boolean
  onCompleteStep: (createdBranch?: string) => void
  onNextTutorial: () => void
  onOpenWhyModal: (title: string, text: string) => void
}

export function LearningCoachCard({
  tutorial,
  tutorialIndex,
  totalTutorials,
  nextTutorialName,
  step,
  coach,
  lessonComplete,
  onCompleteStep,
  onNextTutorial,
  onOpenWhyModal,
}: LearningCoachCardProps) {
  return (
    <div className="coach-card">
      <div className="coach-avatar">
        <img
          src={`/assist-${coach.pose || 'explaining'}.png`}
          alt="Assist learning companion"
        />
        <span>● ASSIST</span>
      </div>
      <div className="coach-copy">
        <div className="eyebrow">
          LESSON {tutorialIndex + 1} · STEP {step + 1} OF {tutorial.steps.length}
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
              type="button"
              className="learning-primary-button"
              onClick={onNextTutorial}
            >
              {tutorialIndex < totalTutorials - 1 && nextTutorialName
                ? `Go to next process: ${nextTutorialName}`
                : 'Restart from the first process'}
              <span>→</span>
            </button>
          </div>
        ) : (
          <div className="coach-bottom">
            <button
              type="button"
              className="text-button"
              onClick={() =>
                onOpenWhyModal('Why this matters', coach.why)
              }
            >
              ✦ Why this matters
            </button>
            <LearningTutorialStepAction
              key={`${tutorial.id}-${step}`}
              tutorialId={tutorial.id}
              step={step}
              target={coach.target}
              onComplete={onCompleteStep}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default LearningCoachCard
