import { useState } from 'react'
import type { TutorialStepActionProps } from './types'

const actionLabels: Record<string, string> = {
  issueContinue: 'I understand the issue',
  contributeBtn: 'Open Contribute',
  forkAction: 'Fork this repository',
  createForkBtn: 'Create fork',
  'login.html': 'Open login.html',
  editBtn: 'Edit login.html',
  useExample: 'Use example code',
  commitBtn: 'Commit changes',
  noticeRemote: 'View commit 71bb3c2',
  compareBtn: 'Compare branches',
  createPrBtn: 'Create pull request',
  prTab: 'Open Pull requests',
  openSamplePR: 'Open the sample pull request',
  filesChanged: 'Open Files changed',
  approveBtn: 'Approve changes',
  submitReviewBtn: 'Submit review',
  continueReadyBtn: 'Confirm checks are ready',
  resolveBtn: 'Resolve conflicts',
  markResolvedBtn: 'Mark as resolved',
  commitMergeBtn: 'Commit merge resolution',
}

function getActionLabel(tutorialId: string, step: number, target: string) {
  if (target === 'runCmd') return tutorialId === 'pull' ? 'Run git pull' : 'Run git push'
  if (target === 'mergeBtn') {
    if (tutorialId === 'conflict') return 'Merge pull request and confirm'
    const openMergeStep = tutorialId === 'merge' ? 3 : 16
    return step === openMergeStep ? 'Open merge options' : 'Confirm merge'
  }
  return actionLabels[target] || 'Complete this action'
}

export function LearningTutorialStepAction({
  tutorialId,
  step,
  target,
  onComplete,
}: TutorialStepActionProps) {
  const [command, setCommand] = useState('')
  const [resolution, setResolution] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  if (target === 'branchBtn' || target === 'branchSearch' || target === 'createBranchLink') {
    return (
      <span className="tutorial-action-note">
        {target === 'branchBtn'
          ? 'Use the branch dropdown in the practice repository.'
          : target === 'branchSearch'
            ? 'Enter the exact branch name in the open dropdown.'
            : 'Create the branch from the open dropdown.'}
      </span>
    )
  }

  if (target === 'termCmd') {
    const expectedCommand =
      tutorialId === 'push'
        ? 'git push origin feature/login-validation'
        : 'git pull origin main'
    return (
      <input
        aria-label="Git command"
        className="tutorial-action-field"
        autoComplete="off"
        placeholder="Type the Git command"
        value={command}
        onChange={(event) => {
          const value = event.target.value
          setCommand(value)
          if (value.trim() === expectedCommand) onComplete()
        }}
      />
    )
  }

  if (target === 'resolveText') {
    const expectedResolution = 'const title = "Welcome";'
    return (
      <textarea
        aria-label="Resolved conflict content"
        className="tutorial-action-field tutorial-action-textarea"
        placeholder='const title = "Welcome";'
        value={resolution}
        onChange={(event) => {
          const value = event.target.value
          setResolution(value)
          if (value.trim() === expectedResolution) onComplete()
        }}
      />
    )
  }

  if (target === 'prTitle') {
    return (
      <div className="tutorial-action-fields">
        <input
          aria-label="Pull request title"
          className="tutorial-action-field"
          placeholder="Add login validation"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          aria-label="Pull request description"
          className="tutorial-action-field"
          placeholder="Summarize the change"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button
          className="primary-button"
          type="button"
          disabled={!title.trim() || !description.trim()}
          onClick={() => onComplete()}
        >
          Confirm PR details <span>→</span>
        </button>
      </div>
    )
  }

  return (
    <button
      className="primary-button tutorial-action-button"
      type="button"
      onClick={() =>
        onComplete(target === 'createBranchLink' ? 'feature/login-validation' : undefined)
      }
    >
      {getActionLabel(tutorialId, step, target)} <span>→</span>
    </button>
  )
}

export default LearningTutorialStepAction
