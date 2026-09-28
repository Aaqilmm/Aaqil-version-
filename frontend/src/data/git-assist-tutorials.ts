/**
 * Git Assist - Tutorial Specifications (10 Workflows)
 * Comprehensive, beginner-friendly interactive curriculum.
 */
export const tutorials = [
  {
    id: 'branch',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4v16M6 8h7a4 4 0 0 1 4 4v1M6 16h7a4 4 0 0 0 4-4V9"/><circle cx="6" cy="4" r="2"/><circle cx="6" cy="20" r="2"/><circle cx="17" cy="7" r="2"/></svg>',
    name: 'Create a branch',
    desc: 'Make a safe workspace',
    title: 'Create a branch',
    descText: 'Learn what a branch is and create one using the GitHub repository interface.',
    badge: 'Beginner',
    time: '~3 min',
    steps: [
      ['Open branch selector', 'Click the branch dropdown currently showing main'],
      ['Type the branch name', 'Enter feature/login-validation in the branch search field'],
      ['Create the branch', 'Click the enabled Create branch action to switch to it']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Open the branch selector',
        text: 'A branch is an isolated timeline for your changes. We will create one so the main branch stays clean and untouched.',
        do: 'Click the button labeled "main" above the file directory.',
        why: 'Branches allow multiple people to work on different features at the same time without interfering with each other.',
        target: 'branchBtn',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Type the exact branch name',
        text: 'Branch names should describe the work being done. Use lowercase and hyphens or slashes for organization.',
        do: 'In "Find or create a branch...", type exactly: feature/login-validation',
        why: 'A descriptive branch name helps teammates instantly understand what code is being developed.',
        target: 'branchSearch',
        pose: 'focused'
      },
      {
        step: 3,
        title: 'Create the branch',
        text: 'GitHub enables the "Create branch" action once a valid new name is entered.',
        do: 'Click "Create branch: feature/login-validation" in the dropdown.',
        why: 'The new branch starts with an exact copy of main, but can now receive its own independent commits.',
        target: 'createBranchLink',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Branch created successfully!',
      text: 'A branch gives you a safe, isolated line of work so your changes can be developed and tested without risking the main branch.',
      learned: ['What a branch represents', 'How to name feature branches', 'Creating branches on GitHub'],
      relatedQuestionIds: ['branch', 'why-branches', 'main-vs-master']
    }
  },
  {
    id: 'commit',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7"/><path d="M3 12h4m10 0h4"/></svg>',
    name: 'Commit changes',
    desc: 'Save a version of your work',
    title: 'Commit changes',
    descText: 'Open a file, edit it, and save that change into Git history through GitHub.',
    badge: 'Beginner',
    time: '~4 min',
    steps: [
      ['Open the file', 'Find and click login.html in the file list'],
      ['Open the editor', 'Click the Edit pencil icon to open GitHub browser editor'],
      ['Use the example code', 'Apply the required field validation snippet'],
      ['Commit changes', 'Add a message and record the commit checkpoint']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Open the file first',
        text: 'In GitHub, you view the repository files before choosing one to edit. We will update the login form.',
        do: 'Click "login.html" in the file list.',
        why: 'Navigating to the file page gives you access to the file history, blame view, and editor.',
        target: 'login.html',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Open the editor',
        text: 'You are now viewing the file contents. GitHub includes an in-browser code editor for quick changes.',
        do: 'Click the pencil "Edit" button in the file toolbar.',
        why: 'The editor allows you to modify the file directly and commit the changes from your browser.',
        target: 'editBtn',
        pose: 'focused'
      },
      {
        step: 3,
        title: 'Use the provided code',
        text: 'You do not need coding experience for this tutorial. We provide the exact validation snippet for you.',
        do: 'Click "Use example code" to add required validation to both inputs.',
        why: 'In a real project you would write code here. The tutorial simulates the edit step.',
        target: 'useExample',
        pose: 'focused'
      },
      {
        step: 4,
        title: 'Commit your change',
        text: 'A commit is a permanent checkpoint in Git with a message explaining what changed and why.',
        do: 'Confirm the commit message "Add login validation" and click "Commit changes".',
        why: 'Commits build the timeline of a project. Good commit messages make it easy to understand project history.',
        target: 'commitBtn',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'First commit recorded!',
      text: 'A commit records a snapshot of your files at a specific moment in time. It preserves history and enables collaboration.',
      learned: ['Opening and editing files in GitHub', 'Writing clear commit messages', 'Creating a Git commit snapshot'],
      relatedQuestionIds: ['commit', 'commit-message', 'git-add-vs-commit']
    }
  },
  {
    id: 'push',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 19V5M7 10l5-5 5 5"/><path d="M5 19h14"/></svg>',
    name: 'Push changes',
    desc: 'Send local work to GitHub',
    title: 'Push changes',
    descText: 'See the difference between a local commit and the remote branch, then use the terminal to push it.',
    badge: 'Intermediate',
    time: '~4 min',
    steps: [
      ['Enter push command', 'Type git push origin feature/login-validation into the terminal'],
      ['Run the command', 'Execute the push command to publish your branch']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Enter the exact push command',
        text: 'Your commit currently exists only on your computer. To share it with teammates or open a PR, you must push it to GitHub.',
        do: 'Type exactly in the terminal: git push origin feature/login-validation',
        why: 'Push uploads your local branch and commits to the remote repository (origin) hosted on GitHub.',
        target: 'termCmd',
        pose: 'focused'
      },
      {
        step: 2,
        title: 'Run the command',
        text: 'The command is ready. Running it will initiate the upload over Git protocol to GitHub.',
        do: 'Click "Run" (or press Enter).',
        why: 'Once pushed, the branch and commit will immediately appear on the GitHub repository page.',
        target: 'runCmd',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Branch pushed to GitHub!',
      text: 'Pushing transmits your local Git commits to the remote GitHub server, making your work visible to collaborators.',
      learned: ['Local repository vs Remote repository', 'Understanding origin', 'Using git push'],
      relatedQuestionIds: ['git-push', 'origin', 'remote']
    }
  },
  {
    id: 'pull',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M7 14l5 5 5-5"/><path d="M5 5h14"/></svg>',
    name: 'Pull changes',
    desc: 'Bring remote work down',
    title: 'Pull changes',
    descText: 'Watch a teammate update the remote branch, then pull the new commit into your local repository.',
    badge: 'Intermediate',
    time: '~4 min',
    steps: [
      ['Notice remote is ahead', 'Observe that a teammate published commit 71bb3c2 on GitHub'],
      ['Enter pull command', 'Type git pull origin main in the local terminal'],
      ['Synchronize work', 'Run git pull to download and integrate the commit']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Notice the remote update',
        text: 'A teammate pushed a commit to GitHub while you were working. Your local repository is now 1 commit behind.',
        do: 'Open the remote activity and inspect commit 71bb3c2.',
        why: 'Pulling regularly prevents merge conflicts and ensures you are always building on top of the latest team code.',
        target: 'noticeRemote',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Enter the pull command',
        text: 'The remote branch is ahead. Prepare to bring those changes into your local main branch.',
        do: 'Type exactly: git pull origin main',
        why: 'Pulling regularly prevents merge conflicts and ensures you are always building on top of the latest team code.',
        target: 'termCmd',
        pose: 'focused'
      },
      {
        step: 3,
        title: 'Run the command',
        text: 'Git will download the remote commits (fetch) and automatically integrate them into your local branch (merge).',
        do: 'Click "Run" to pull the new changes.',
        why: 'git pull combines git fetch with git merge in a single convenient operation.',
        target: 'runCmd',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Local repository synchronized!',
      text: 'Pull fetches the latest changes from the remote repository and merges them into your active local branch.',
      learned: ['Detecting when remote is ahead', 'How git pull works', 'Keeping local branches up to date'],
      relatedQuestionIds: ['git-pull', 'git-fetch', 'git-pull-vs-fetch']
    }
  },
  {
    id: 'fork',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="5" r="2"/><circle cx="18" cy="19" r="2"/><circle cx="18" cy="5" r="2"/><path d="M8 5h6a4 4 0 0 1 4 4v8M8 5v2a4 4 0 0 0 4 4h2"/></svg>',
    name: 'Fork a repository',
    desc: 'Create your own copy',
    title: 'Fork a repository',
    descText: 'Use the real GitHub-style Fork flow so you understand when and why contributors fork projects.',
    badge: 'Collaboration',
    time: '~4 min',
    steps: [
      ['Open Contribute menu', 'Click the Contribute dropdown on the repository header'],
      ['Choose Fork', 'Select Fork from the contribution options'],
      ['Configure destination', 'Review fork settings and click Create fork']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Open Contribute',
        text: 'This repository belongs to OpenLearn. Because you are not a maintainer, you do not have write access to push directly.',
        do: 'Click "⌘ Contribute ▾" in the repository summary bar.',
        why: 'The Contribute menu groups common ways to participate in repositories you do not own.',
        target: 'contributeBtn',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Choose Fork',
        text: 'A fork creates an independent, complete copy of the repository in your personal GitHub account.',
        do: 'Click "Fork" in the menu.',
        why: 'In your fork, you have full admin permissions to push branches, edit files, and prepare pull requests.',
        target: 'forkAction',
        pose: 'explaining'
      },
      {
        step: 3,
        title: 'Create the fork',
        text: 'GitHub shows you the destination account and repository name before creating the fork.',
        do: 'Click the green "Create fork" button.',
        why: 'GitHub will copy all commits, branches, and code to your account, while remembering the upstream original repository.',
        target: 'createForkBtn',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Repository forked!',
      text: 'A fork is your personal copy of another user’s repository. You can experiment and make changes safely without affecting the original project.',
      learned: ['When to fork vs clone directly', 'Creating a fork on GitHub', 'The relationship between upstream and fork'],
      relatedQuestionIds: ['fork', 'fork-vs-clone', 'open-source']
    }
  },
  {
    id: 'pr-create',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v12M7 10l5 5 5-5"/><path d="M5 19h14"/></svg>',
    name: 'Create a pull request',
    desc: 'Propose your branch to main',
    title: 'Create a pull request',
    descText: 'Compare changes between two branches and submit a formal proposal for maintainers to review.',
    badge: 'Collaboration',
    time: '~4 min',
    steps: [
      ['Open Compare & pull request', 'Click the Compare & pull request banner'],
      ['Review branch comparison', 'Verify base: main and compare: feature/login-validation'],
      ['Submit the PR', 'Add title and description, then click Create pull request']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Open Compare & pull request',
        text: 'Your branch feature/login-validation has new commits that main does not have. GitHub suggests opening a pull request.',
        do: 'Click "Compare & pull request" in the green alert banner.',
        why: 'A pull request asks maintainers to review and pull your branch into their target branch.',
        target: 'compareBtn',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Review the comparison and diff',
        text: 'Notice base: main ← compare: feature/login-validation. Always verify that you are proposing to merge into the correct base branch.',
        do: 'Review the Title and Description fields.',
        why: 'Good pull request descriptions explain what changed, why the change was made, and link to related issues.',
        target: 'prTitle',
        pose: 'focused'
      },
      {
        step: 3,
        title: 'Create the pull request',
        text: 'Everything is filled out. Creating the PR publishes the proposal for maintainers and automated checks to review.',
        do: 'Click "Create pull request".',
        why: 'Once opened, the PR creates a dedicated space for discussion, code diffs, automated tests, and approvals.',
        target: 'createPrBtn',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Pull request opened!',
      text: 'You successfully opened a pull request. Maintainers can now inspect your diff, run CI checks, leave feedback, and merge your code.',
      learned: ['Base branch vs Compare branch', 'Writing helpful PR descriptions', 'Submitting proposals on GitHub'],
      relatedQuestionIds: ['pull-request', 'code-review', 'issue-vs-pr']
    }
  },
  {
    id: 'review',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v10H9l-4 4z"/><path d="m9 10 2 2 4-4"/></svg>',
    name: 'Review a pull request',
    desc: 'Comment, approve, request changes',
    title: 'Review a pull request',
    descText: 'Review a simulated PR using GitHub’s Files changed tab and review controls.',
    badge: 'Collaboration',
    time: '~5 min',
    steps: [
      ['Open Pull requests', 'Click the Pull requests tab in the repository header'],
      ['Open the sample PR', 'Select PR #42: Add login validation'],
      ['Open Files changed', 'Navigate to the Files changed tab to see code diffs'],
      ['Choose Approve', 'Select the Approve review decision'],
      ['Submit review', 'Submit your decision back to the PR author']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Open Pull requests',
        text: 'Code reviews are conducted in the Pull requests tab of the repository.',
        do: 'Click the "Pull requests" tab in the repository navigation.',
        why: 'The PR tab lists all active proposals submitted by team members and contributors.',
        target: 'prTab',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Open the sample PR',
        text: 'You will see open pull requests with their author, title, and labels.',
        do: 'Click "Add login validation #42" to open the review.',
        why: 'Opening the PR allows you to read the proposal description, see CI checks, and review the code.',
        target: 'openSamplePR',
        pose: 'explaining'
      },
      {
        step: 3,
        title: 'Inspect Files changed',
        text: 'Good reviewers always read the actual diff rather than assuming the description is complete.',
        do: 'Click the "Files changed" tab above the discussion.',
        why: 'The diff displays additions in green and deletions in red so you can spot bugs or security issues.',
        target: 'filesChanged',
        pose: 'focused'
      },
      {
        step: 4,
        title: 'Choose Approve',
        text: 'GitHub review decisions include: Comment (general feedback), Approve (ready to merge), or Request changes (must fix issues).',
        do: 'In the Review panel, click the "Approve" button.',
        why: 'Approval signals that the code is well-tested, adheres to project standards, and is safe to merge.',
        target: 'approveBtn',
        pose: 'focused'
      },
      {
        step: 5,
        title: 'Submit the review',
        text: 'Your approval is ready. Submitting it makes the review official in the pull request history.',
        do: 'Click "Submit review".',
        why: 'The submitted review satisfies branch protection rules and unblocks the PR for merging.',
        target: 'submitReviewBtn',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Review submitted!',
      text: 'Code reviews build team trust, share knowledge, and ensure software quality before changes reach users.',
      learned: ['Navigating PR tabs', 'Reading code diffs', 'The 3 types of review decisions (Comment, Approve, Request Changes)'],
      relatedQuestionIds: ['code-review', 'pull-request', 'maintainer']
    }
  },
  {
    id: 'merge',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M8 6h3a7 7 0 0 1 7 7v3"/><path d="m14 14 4 4 4-4"/></svg>',
    name: 'Merge a pull request',
    desc: 'Bring approved work into main',
    title: 'Merge a pull request',
    descText: 'Open an approved pull request, verify readiness checks, and merge it into main.',
    badge: 'Collaboration',
    time: '~4 min',
    steps: [
      ['Open Pull requests', 'Click the Pull requests tab in repository navigation'],
      ['Open the approved PR', 'Select PR #42: Add login validation'],
      ['Check merge readiness', 'Verify approval, passing checks, and no conflicts'],
      ['Open merge action', 'Click the green Merge pull request button'],
      ['Confirm merge', 'Confirm the merge commit into the base branch']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Open Pull requests',
        text: 'We are ready to merge the approved work into main.',
        do: 'Click "Pull requests" in the repository navigation.',
        why: 'Merging is performed from within the approved pull request.',
        target: 'prTab',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Open the approved PR',
        text: 'Find the PR that has received an approving review.',
        do: 'Click "Add login validation #42".',
        why: 'Only approved PRs that satisfy repository policies should be merged.',
        target: 'openSamplePR',
        pose: 'explaining'
      },
      {
        step: 3,
        title: 'Check merge readiness',
        text: 'Before merging, inspect the review status box. It must show: Approving review, passing checks, and no merge conflicts.',
        do: 'Read the Review status box and click "Continue".',
        why: 'Verifying status prevents broken builds and untested code from entering the main branch.',
        target: 'continueReadyBtn',
        pose: 'focused'
      },
      {
        step: 4,
        title: 'Open the merge action',
        text: 'All checks are green. The branch is safe to merge into main.',
        do: 'Click "Merge pull request ▾".',
        why: 'GitHub offers merge commits, squash merges, or rebase merges. This opens the confirmation panel.',
        target: 'mergeBtn',
        pose: 'focused'
      },
      {
        step: 5,
        title: 'Confirm merge',
        text: 'This is the final integration action.',
        do: 'Click "Confirm merge".',
        why: 'GitHub applies the branch commits to main, updates the commit graph, and marks the PR as Merged.',
        target: 'mergeBtn',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Pull request merged into main!',
      text: 'Merging unites the feature branch with main. The contribution is now an official part of the project codebase.',
      learned: ['Checking merge readiness', 'Passing branch protection checks', 'Confirming a merge on GitHub'],
      relatedQuestionIds: ['git-merge', 'pull-request', 'fast-forward']
    }
  },
  {
    id: 'conflict',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14v14H5z"/><path d="M8 8l8 8M16 8l-8 8"/></svg>',
    name: 'Resolve a merge conflict',
    desc: 'Fix competing changes',
    title: 'Resolve a merge conflict',
    descText: 'Understand why conflicts happen and resolve a simple line conflict using GitHub conflict editor.',
    badge: 'Advanced',
    time: '~6 min',
    steps: [
      ['Open Pull requests', 'Click Pull requests tab in repository navigation'],
      ['Open conflicted PR', 'Select PR #57: Update login title'],
      ['Open Resolve conflicts', 'Click Resolve conflicts to open the web conflict editor'],
      ['Edit the conflict', 'Delete conflict markers and set the intended line'],
      ['Mark as resolved', 'Confirm that all conflict markers are removed'],
      ['Commit resolution', 'Commit the merge resolution back to the PR branch'],
      ['Merge the PR', 'Complete the final merge']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Open Pull requests',
        text: 'Sometimes two branches change the same lines of code. Git stops and requires a human to decide.',
        do: 'Click "Pull requests" in the repository navigation.',
        why: 'GitHub highlights pull requests that cannot merge automatically due to conflicts.',
        target: 'prTab',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Open the conflicted PR',
        text: 'Notice the yellow "Conflict" status badge on PR #57.',
        do: 'Click "Update login title #57".',
        why: 'Both main and this feature branch modified line 1 with different titles.',
        target: 'openSamplePR',
        pose: 'thinking'
      },
      {
        step: 3,
        title: 'Open Resolve conflicts',
        text: 'GitHub provides a built-in browser conflict editor so you can fix simple conflicts without a terminal.',
        do: 'Click the "Resolve conflicts" button.',
        why: 'The conflict editor shows the conflict markers: <<<<<<<, =======, and >>>>>>>.',
        target: 'resolveBtn',
        pose: 'focused'
      },
      {
        step: 4,
        title: 'Edit the conflict',
        text: 'Delete the conflict markers and keep only the intended final code. For this tutorial, we want the title to be "Welcome".',
        do: 'In the editor, make the final content exactly: const title = "Welcome";',
        why: 'Git cannot guess whether "Hello" or "Welcome" is correct. A developer must make the decision.',
        target: 'resolveText',
        pose: 'focused'
      },
      {
        step: 5,
        title: 'Mark as resolved',
        text: 'The conflict markers have been removed and the final code is clean.',
        do: 'Click "Mark as resolved".',
        why: 'GitHub verifies that all <<<<<<< markers are gone before allowing you to commit the resolution.',
        target: 'markResolvedBtn',
        pose: 'celebrating'
      },
      {
        step: 6,
        title: 'Commit the resolution',
        text: 'Now save the resolved code into the PR branch as a merge commit.',
        do: 'Click "Commit merge".',
        why: 'The resolution is recorded as a commit on the PR branch, eliminating the conflict.',
        target: 'commitMergeBtn',
        pose: 'celebrating'
      },
      {
        step: 7,
        title: 'Merge the pull request',
        text: 'The conflict is resolved! The branch is now clean and mergeable.',
        do: 'Click "Merge pull request ▾", then confirm.',
        why: 'With no conflicts remaining, Git can perform the final merge into main smoothly.',
        target: 'mergeBtn',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Merge conflict resolved!',
      text: 'You learned why merge conflicts happen and how to resolve them by removing conflict markers and choosing the intended code.',
      learned: ['Understanding conflict markers (<<<<<<<, =======, >>>>>>>)', 'How competing edits trigger conflicts', 'Committing conflict resolutions'],
      relatedQuestionIds: ['merge-conflict', 'how-conflicts-happen', 'resolve-conflict']
    }
  },
  {
    id: 'first',
    icon: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
    name: 'First contribution',
    desc: 'Complete the whole journey',
    title: 'Your first open-source contribution',
    descText: 'A guided capstone that combines the entire GitHub workflow from issue to merged pull request.',
    badge: 'Capstone',
    time: '~8 min',
    steps: [
      ['Read the issue', 'Understand requested changes in Issue #18'],
      ['Open Contribute', 'Access fork actions from the original repo'],
      ['Choose Fork', 'Select Fork from the menu'],
      ['Create the fork', 'Create your personal copy of the project'],
      ['Open branch selector', 'Access branch management in your fork'],
      ['Type the branch name', 'Name the feature branch feature/login-validation'],
      ['Create the branch', 'Create the isolated workspace'],
      ['Open the file', 'Navigate to login.html'],
      ['Open the editor', 'Click the Edit pencil icon'],
      ['Use example code', 'Apply the required field validation'],
      ['Commit changes', 'Commit the changes to your branch'],
      ['Compare & pull request', 'Initiate PR back to the upstream repository'],
      ['Create the PR', 'Submit the pull request for maintainer review'],
      ['Open Files changed', 'Inspect your changes as a reviewer'],
      ['Choose Approve', 'Simulate maintainer review approval'],
      ['Submit review', 'Confirm the review approval'],
      ['Open merge action', 'Initiate the integration into main'],
      ['Confirm merge', 'Celebrate your first merged open-source contribution!']
    ],
    coachConfigs: [
      {
        step: 1,
        title: 'Read the issue first',
        text: 'Open source work begins by understanding the problem. Issue #18 asks contributors to reject empty credentials.',
        do: 'Read Issue #18, then click "I understand the issue".',
        why: 'Always read issues and contributor guidelines before touching any code.',
        target: 'issueContinue',
        pose: 'explaining'
      },
      {
        step: 2,
        title: 'Open Contribute',
        text: 'This is another person’s repository, so you will contribute through a fork.',
        do: 'Click "⌘ Contribute ▾" in the repository header.',
        why: 'Forking gives you your own copy where you have full permissions to make changes.',
        target: 'contributeBtn',
        pose: 'explaining'
      },
      {
        step: 3,
        title: 'Choose Fork',
        text: 'Select Fork from the contribute menu.',
        do: 'Click "Fork".',
        why: 'This starts GitHub’s fork setup dialog.',
        target: 'forkAction',
        pose: 'explaining'
      },
      {
        step: 4,
        title: 'Create the fork',
        text: 'Confirm your fork destination in your account.',
        do: 'Click "Create fork".',
        why: 'GitHub creates your repository copy in seconds.',
        target: 'createForkBtn',
        pose: 'focused'
      },
      {
        step: 5,
        title: 'Open the branch selector',
        text: 'Never work directly on main in your fork. Always create a descriptive branch for your contribution.',
        do: 'Click the button labeled "main".',
        why: 'Keeping main clean allows you to synchronize with upstream later without conflicts.',
        target: 'branchBtn',
        pose: 'explaining'
      },
      {
        step: 6,
        title: 'Type the branch name',
        text: 'Name your feature branch according to the issue.',
        do: 'Type exactly: feature/login-validation',
        why: 'Clear branch names help maintainers follow your work.',
        target: 'branchSearch',
        pose: 'focused'
      },
      {
        step: 7,
        title: 'Create the branch',
        text: 'Create and switch to your feature branch.',
        do: 'Click "Create branch: feature/login-validation".',
        why: 'Your changes will now be isolated to this branch.',
        target: 'createBranchLink',
        pose: 'celebrating'
      },
      {
        step: 8,
        title: 'Open the file',
        text: 'Find login.html in the file list.',
        do: 'Click "login.html".',
        why: 'This is the file containing the form we need to improve.',
        target: 'login.html',
        pose: 'explaining'
      },
      {
        step: 9,
        title: 'Open Edit',
        text: 'Open GitHub’s browser code editor.',
        do: 'Click the pencil "Edit" button.',
        why: 'This opens the file for modifications.',
        target: 'editBtn',
        pose: 'focused'
      },
      {
        step: 10,
        title: 'Use the example code',
        text: 'Apply the validation update.',
        do: 'Click "Use example code".',
        why: 'This adds the required attributes specified in Issue #18.',
        target: 'useExample',
        pose: 'focused'
      },
      {
        step: 11,
        title: 'Commit the changes',
        text: 'Save the checkpoint to your branch.',
        do: 'Click "Commit changes".',
        why: 'The commit records your contribution with a clear summary message.',
        target: 'commitBtn',
        pose: 'celebrating'
      },
      {
        step: 12,
        title: 'Compare & pull request',
        text: 'Your branch now contains the fix and is ready to be proposed back to the original project.',
        do: 'Click "Compare & pull request".',
        why: 'This opens a pull request targeting the upstream repository.',
        target: 'compareBtn',
        pose: 'explaining'
      },
      {
        step: 13,
        title: 'Create the pull request',
        text: 'Review the proposal summary and create the PR.',
        do: 'Click "Create pull request".',
        why: 'Maintainers will receive a notification to review your contribution.',
        target: 'createPrBtn',
        pose: 'celebrating'
      },
      {
        step: 14,
        title: 'Open Files changed',
        text: 'Inspect the diff as maintainers do.',
        do: 'Click "Files changed".',
        why: 'Diff inspection ensures no extraneous files or unintentional changes were included.',
        target: 'filesChanged',
        pose: 'focused'
      },
      {
        step: 15,
        title: 'Choose Approve',
        text: 'The maintainer reviews the diff and approves your changes.',
        do: 'Click "Approve".',
        why: 'Approval indicates the code solves the issue cleanly.',
        target: 'approveBtn',
        pose: 'focused'
      },
      {
        step: 16,
        title: 'Submit the review',
        text: 'The review is submitted.',
        do: 'Click "Submit review".',
        why: 'The pull request is now approved and ready for merging.',
        target: 'submitReviewBtn',
        pose: 'celebrating'
      },
      {
        step: 17,
        title: 'Open merge action',
        text: 'The maintainer prepares the merge.',
        do: 'Click "Merge pull request".',
        why: 'This initiates the integration of your branch into the project’s main branch.',
        target: 'mergeBtn',
        pose: 'focused'
      },
      {
        step: 18,
        title: 'Confirm merge',
        text: 'Final step of your open-source journey!',
        do: 'Click "Confirm merge".',
        why: 'Your code is now in main! You are officially an open-source contributor.',
        target: 'mergeBtn',
        pose: 'celebrating'
      }
    ],
    completion: {
      title: 'Congratulations! First contribution complete!',
      text: 'You have mastered the complete open-source workflow: Issue → Fork → Branch → Edit → Commit → PR → Review → Merge. You are ready to contribute to real projects!',
      learned: ['Full open-source contribution cycle', 'Communicating with maintainers', 'Fork-and-branch development model'],
      relatedQuestionIds: ['open-source', 'maintainer', 'good-first-issue']
    }
  }
];
