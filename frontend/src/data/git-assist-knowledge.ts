/**
 * Git Assist - Comprehensive Git & GitHub Knowledge Base
 * 45+ beginner-friendly, structured concepts and Q&A entries.
 */
export const categories = [
  { id: 'all', name: 'All Concepts', icon: '✦', desc: 'Browse the full Git & GitHub curriculum' },
  { id: 'basics', name: 'Git Basics', icon: '🌱', desc: 'Fundamental concepts, mental models, and setup' },
  { id: 'workflow', name: 'Git Workflow', icon: '💾', desc: 'Working directory, staging, commits, and logs' },
  { id: 'branching', name: 'Branching', icon: '🌿', desc: 'Creating, switching, and isolating feature lines' },
  { id: 'collaboration', name: 'Collaboration', icon: '👥', desc: 'Remotes, origin, push, pull, and team sync' },
  { id: 'merging', name: 'Merging & Conflicts', icon: '💥', desc: 'Integrating work and solving conflicting edits' },
  { id: 'github', name: 'GitHub Platform', icon: '🐙', desc: 'Forks, Pull Requests, Reviews, Issues, and Actions' },
  { id: 'opensource', name: 'Open Source', icon: '🚀', desc: 'Contributing, maintainers, good first issues, etiquette' },
  { id: 'advanced', name: 'Advanced & Safe Git', icon: '⚡', desc: 'Rebase, stash, reset, tags, and best practices' }
];

export const knowledge = [
  // -------------------------------------------------------------
  // BASICS
  // -------------------------------------------------------------
  {
    id: 'what-is-git',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is Git?',
    short: 'Git is a version control system that records changes to your files over time so you can recall specific versions later.',
    explanation: 'Think of Git like a superpower for undoing mistakes and taking snapshots of your project. Instead of saving files as "project_final_v2_really_final.zip", Git records the exact lines you changed, when you changed them, and why. Everything is stored locally on your machine in a hidden folder called .git.',
    whyItMatters: 'Without Git, working on code is risky: one bad edit can break your entire project, and collaborating with others requires constantly emailing files back and forth.',
    example: 'git init\ngit status\ngit log --oneline',
    mistake: 'Thinking Git requires internet access. Git works 100% offline on your laptop. You only need the internet when sharing work with GitHub.',
    command: 'git status',
    tutorialId: 'branch'
  },
  {
    id: 'what-is-github',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is GitHub?',
    short: 'GitHub is a cloud platform that hosts Git repositories online and provides collaboration tools like Pull Requests and Issues.',
    explanation: 'If Git is the camera taking snapshots of your code, GitHub is the photo album in the cloud where you store those snapshots and share them with the world. GitHub adds a visual web interface, code review tools, issue tracking, project boards, and automation.',
    whyItMatters: 'GitHub is the largest home for open-source software in the world. Learning GitHub allows you to collaborate with developers worldwide, showcase your portfolio, and contribute to tools you use daily.',
    example: 'https://github.com/username/repository-name',
    mistake: 'Confusing Git and GitHub as the same thing. Git is the underlying command-line tool; GitHub is the website that hosts Git projects.',
    command: null,
    tutorialId: 'fork'
  },
  {
    id: 'git-vs-github',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is the difference between Git and GitHub?',
    short: 'Git is the local software tool that tracks file changes; GitHub is the web hosting service that stores Git repositories online.',
    explanation: 'Git runs on your computer terminal. It tracks history, branches, and diffs without any account or internet connection. GitHub is a commercial cloud platform owned by Microsoft that hosts remote Git repositories, provides code review interfaces, CI/CD automation, and user profiles.',
    whyItMatters: 'Knowing the difference prevents confusion: when you run "git commit", your changes are only on your computer. When you run "git push", you transmit those commits to GitHub.',
    example: 'Git: local engine (terminal)\nGitHub: online collaboration hub (browser)',
    mistake: 'Assuming that committing code in Git automatically publishes it to GitHub. You must push it!',
    command: 'git push origin main',
    tutorialId: 'push'
  },
  {
    id: 'what-is-repository',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is a repository (repo)?',
    short: 'A repository is the project folder containing all your files along with their complete historical change log.',
    explanation: 'A Git repository (often called a "repo") is simply a directory on your computer that has Git tracking enabled. It contains your project code, documentation, assets, and a hidden `.git` directory where Git stores all snapshots, branches, and commit logs.',
    whyItMatters: 'Everything in Git happens inside a repository. A repository gives you an exact timeline of how your software evolved from the first line of code.',
    example: 'my-project/\n├── .git/            <-- Git tracking database\n├── index.html\n├── styles.css\n└── README.md',
    mistake: 'Nesting a repository inside another repository by mistake. Keep each project in its own separate root directory.',
    command: 'git init',
    tutorialId: 'branch'
  },
  {
    id: 'working-directory',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is the working directory?',
    short: 'The working directory is your actual folder with the current files you see and edit in your code editor.',
    explanation: 'Git organizes changes into three trees: the Working Directory, the Staging Area, and the Commit History. The working directory is simply your sandbox—the real files sitting on your hard drive where you type code, save changes, or delete files.',
    whyItMatters: 'Changes you make in your working directory are not tracked in Git history until you stage them (`git add`) and commit them (`git commit`).',
    example: 'Edit index.html in VS Code -> change lives in Working Directory (Unstaged).',
    mistake: 'Assuming saved files in your editor are saved in Git. Saving to disk only updates the working directory.',
    command: 'git status',
    tutorialId: 'commit'
  },
  {
    id: 'staging-area',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is the staging area (index)?',
    short: 'The staging area is a preparation zone where you preview and group changes before committing them.',
    explanation: 'Think of committing like taking a group photo. The staging area is where you line up only the people who should be in this particular photo. You might have modified 5 files, but you only want to commit 2 of them together in a focused checkpoint. You stage those 2 files using `git add`.',
    whyItMatters: 'The staging area gives you fine-grained control over your commits. You can create clean, logical commits rather than dumping all changes into one giant mess.',
    example: 'git add login.html   # stages only login.html\ngit commit -m "Update login form validation"',
    mistake: 'Blindly typing `git add .` without checking `git status` first, accidentally staging sensitive files like `.env` or temporary files.',
    command: 'git add <file>',
    tutorialId: 'commit'
  },
  {
    id: 'head',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is HEAD in Git?',
    short: 'HEAD is a pointer that indicates your current location in Git history (usually the tip of your active branch).',
    explanation: 'Think of HEAD as the "You Are Here" pin on a map or the playhead on a cassette tape. When you switch to `main`, HEAD points to `main`. When you create and switch to `feature/login`, HEAD moves to point to `feature/login`. When you commit, the new commit becomes the new HEAD.',
    whyItMatters: 'Understanding HEAD helps you know what branch you are on and what commit your editor files currently represent.',
    example: 'HEAD -> feature/login-validation (Commit 61e0faa)',
    mistake: 'Entering a "detached HEAD" state by checking out a commit hash directly instead of a branch. If this happens, simply checkout your branch (`git checkout main`).',
    command: 'git status',
    tutorialId: 'branch'
  },
  {
    id: 'gitignore',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is a .gitignore file?',
    short: 'A text file that tells Git which files or folders should never be tracked or uploaded to GitHub.',
    explanation: 'Not every file in a project belongs in Git. You should never commit passwords, secret API keys, build artifacts (`dist/`, `build/`), or giant dependency directories (`node_modules/`, `venv/`). A `.gitignore` file contains simple patterns listing things Git should ignore completely.',
    whyItMatters: 'Keeps your repository lightweight, prevents security leaks (like committing secret API keys), and prevents cluttering team diffs with local operating system files (`.DS_Store`, `Thumbs.db`).',
    example: '# .gitignore example\nnode_modules/\n.env\n*.log\n.DS_Store',
    mistake: 'Committing a file FIRST and then adding it to `.gitignore`. Git will keep tracking it! You must untrack it first with `git rm --cached <file>`.',
    command: 'git rm --cached <file>',
    tutorialId: 'commit'
  },
  {
    id: 'readme',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is a README file?',
    short: 'A markdown document that serves as the welcome guide and manual for your project on GitHub.',
    explanation: 'When someone visits your repository on GitHub, GitHub automatically renders the `README.md` file on the project homepage. A good README explains what the project does, how to install and run it, screenshots or demos, and how others can contribute.',
    whyItMatters: 'A project without a README is like a book with no cover. Maintainers, recruiters, and collaborators rely on the README to understand and run your code.',
    example: '# Project Name\nA friendly description of what this project accomplishes.\n\n## Getting Started\n`npm install`',
    mistake: 'Leaving the default empty README or writing instructions only you understand without explaining how a stranger can run the project.',
    command: null,
    tutorialId: 'first'
  },
  {
    id: 'git-init',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What is git init?',
    short: 'The command that initializes a brand-new Git repository inside your current directory.',
    explanation: 'Running `git init` creates the hidden `.git` folder in your project directory. This turns a normal folder into a version-controlled repository ready to track files, branches, and commits.',
    whyItMatters: 'It is the very first command you run when starting a new project on your computer from scratch.',
    example: 'mkdir my-awesome-app\ncd my-awesome-app\ngit init',
    mistake: 'Running `git init` in your computer’s Desktop, Downloads, or Home folder. Always navigate into a dedicated project subfolder first!',
    command: 'git init',
    tutorialId: 'branch'
  },
  {
    id: 'git-status',
    category: 'basics',
    categoryName: 'Git Basics',
    title: 'What does git status show?',
    short: 'A command that shows the current state of your working directory and staging area.',
    explanation: '`git status` is your dashboard. It tells you: What branch are you on? Are you ahead or behind the remote? Which files have been modified? Which files are staged to be committed (green)? Which files are untracked or unstaged (red)?',
    whyItMatters: 'Experienced developers run `git status` constantly. It prevents accidental commits and ensures you always know your repository state before pushing or branching.',
    example: '$ git status\nOn branch feature/login-validation\nChanges to be committed:\n  modified:   login.html',
    mistake: 'Running commands blind without checking `git status` before and after.',
    command: 'git status',
    tutorialId: 'push'
  },

  // -------------------------------------------------------------
  // WORKFLOW
  // -------------------------------------------------------------
  {
    id: 'commit',
    category: 'workflow',
    categoryName: 'Git Workflow',
    title: 'What is a commit?',
    short: 'A permanent snapshot of staged changes saved with a timestamp, author info, and explanatory message.',
    explanation: 'A commit is like a saved game checkpoint. In Git, commits are linked together in a chain, creating an immutable history. Each commit has a unique alphanumeric identifier called a SHA hash (e.g. `61e0faa`). If something breaks tomorrow, you can inspect or jump back to any previous commit.',
    whyItMatters: 'Commits are the fundamental atomic units of Git history. They document the progress, decisions, and evolution of a software project.',
    example: 'git commit -m "Fix navbar mobile layout overlap"',
    mistake: 'Making giant commits that bundle 2 weeks of unrelated work. Aim for small, focused commits that do one thing well.',
    command: 'git commit -m "message"',
    tutorialId: 'commit'
  },
  {
    id: 'commit-message',
    category: 'workflow',
    categoryName: 'Git Workflow',
    title: 'What makes a good commit message?',
    short: 'A clear, concise summary written in the imperative mood explaining WHAT changed and WHY.',
    explanation: 'A good commit message begins with a short subject line (under 50 characters) using an imperative verb: "Add login validation" rather than "Added" or "Adding". If needed, leave a blank line and provide a detailed explanation of why the change was necessary.',
    whyItMatters: 'When tracking down a bug 6 months later, good commit messages tell teammates (and your future self) why a decision was made.',
    example: 'Good: "Add login validation to reject empty inputs"\nBad: "fixed bug", "stuff", "updates"',
    mistake: 'Using vague messages like "changes" or "wip" that convey zero helpful context.',
    command: 'git commit -m "Title"',
    tutorialId: 'commit'
  },
  {
    id: 'staging-concept',
    category: 'workflow',
    categoryName: 'Git Workflow',
    title: 'What is staging and why do we do it?',
    short: 'Staging is the deliberate act of selecting which specific modifications should go into your next commit.',
    explanation: 'Unlike simple autosave tools, Git separates modifying files from recording them. Staging acts as your curation table. You can inspect your diffs, stage only the files relevant to the feature, and leave experimental edits out.',
    whyItMatters: 'Ensures that each commit in your project history represents a cohesive, working unit of changes.',
    example: 'git add login.html\ngit add style.css\ngit commit -m "Style login form"',
    mistake: 'Forgetting to run `git add` before `git commit`, which results in "no changes added to commit".',
    command: 'git add <file>',
    tutorialId: 'commit'
  },
  {
    id: 'git-add',
    category: 'workflow',
    categoryName: 'Git Workflow',
    title: 'What is git add?',
    short: 'The command that moves changes from your working directory into the staging area.',
    explanation: '`git add` tells Git: "I want these specific file changes to be included in the next commit snapshot." You can add single files (`git add app.js`), multiple files, or all files in the current folder (`git add .`).',
    whyItMatters: 'It is the bridge between editing code and saving it into Git history.',
    example: 'git add src/components/Header.jsx',
    mistake: 'Adding files with sensitive passwords or compiled binaries. Use `.gitignore` to prevent this.',
    command: 'git add <path>',
    tutorialId: 'commit'
  },
  {
    id: 'git-commit',
    category: 'workflow',
    categoryName: 'Git Workflow',
    title: 'What is git commit?',
    short: 'The command that takes staged changes and writes them as a permanent snapshot in the local Git repository.',
    explanation: 'When you execute `git commit -m "message"`, Git captures the exact state of all currently staged files, records your name, email, the current timestamp, generates a unique SHA hash, and advances HEAD to point to this new commit.',
    whyItMatters: 'It creates the permanent checkpoints that form your repository history.',
    example: 'git commit -m "Implement user logout modal"',
    mistake: 'Omitting the `-m` flag in terminal, which opens a command-line text editor like Vim that beginners often get stuck in (type `:q!` and Enter to exit Vim).',
    command: 'git commit -m "..."',
    tutorialId: 'commit'
  },
  {
    id: 'git-log',
    category: 'workflow',
    categoryName: 'Git Workflow',
    title: 'What does git log show?',
    short: 'A command that lists the history of commits in the current branch in reverse chronological order.',
    explanation: '`git log` prints the commit chain: each commit’s unique SHA hash, author, date, and commit message. You can customize the view with flags like `--oneline` for a compact summary or `--graph` to visualize branching.',
    whyItMatters: 'Allows you to review previous changes, find commit hashes to inspect or revert, and see who made specific updates.',
    example: 'git log --oneline --graph --decorate',
    mistake: 'Getting trapped when `git log` uses a pager. Press the `q` key on your keyboard to exit back to your terminal prompt.',
    command: 'git log --oneline',
    tutorialId: 'commit'
  },

  // -------------------------------------------------------------
  // BRANCHING
  // -------------------------------------------------------------
  {
    id: 'branch',
    category: 'branching',
    categoryName: 'Branching',
    title: 'What is a branch in Git?',
    short: 'A lightweight movable pointer to a commit, representing an independent line of development.',
    explanation: 'In Git, branches are virtually cost-free and instantaneous. Unlike other tools that duplicate the entire project folder, a Git branch is simply a tiny pointer file containing a commit hash. When you make commits on a branch, the pointer moves forward automatically.',
    whyItMatters: 'Branches let you build features, fix bugs, or experiment freely without breaking the production code on the `main` branch.',
    example: 'main ─────●─────●─────●\n                 \\\n                  ●─────● (feature/login)',
    mistake: 'Committing new unfinished features directly to `main`. Always branch first!',
    command: 'git branch <name>',
    tutorialId: 'branch'
  },
  {
    id: 'why-branches',
    category: 'branching',
    categoryName: 'Branching',
    title: 'Why do we use branches?',
    short: 'To isolate work in progress, enable simultaneous team collaboration, and protect production code.',
    explanation: 'Imagine 10 developers editing the same project at once. If everyone committed directly to `main`, the application would constantly be broken. Branches allow Developer A to work on login, Developer B on checkout, and Developer C on styling without interfering with each other.',
    whyItMatters: 'Branches enable code review, pull requests, automated testing (CI), and safe experimentation.',
    example: 'feature/dark-mode\nbugfix/header-overflow\nrefactor/api-client',
    mistake: 'Keeping a branch alive for months without syncing with main. Frequent merging prevents nightmare conflicts.',
    command: 'git switch -c <name>',
    tutorialId: 'branch'
  },
  {
    id: 'main-vs-master',
    category: 'branching',
    categoryName: 'Branching',
    title: 'What is the default branch (main vs master)?',
    short: 'The primary base branch of a repository where completed, tested features land.',
    explanation: 'When a repository is initialized, Git creates an initial default branch. In the past, Git defaulted to naming this `master`. The industry and GitHub transitioned in 2020 to `main` as the modern inclusive standard. Both represent the primary baseline branch.',
    whyItMatters: 'Production deployments and pull requests typically target `main`.',
    example: 'origin/main is the remote copy of the main branch.',
    mistake: 'Trying to push to `master` when the repository uses `main`, resulting in "error: src refspec master does not match any".',
    command: 'git branch -M main',
    tutorialId: 'branch'
  },

  // -------------------------------------------------------------
  // COLLABORATION
  // -------------------------------------------------------------
  {
    id: 'remote',
    category: 'collaboration',
    categoryName: 'Collaboration',
    title: 'What is a remote repository?',
    short: 'A version of your repository hosted on the internet or network, such as on GitHub.',
    explanation: 'Your local repository lives on your computer. A remote repository is a copy hosted on a shared server like GitHub. Collaborators push their work to the remote and pull updates from it to stay synchronized.',
    whyItMatters: 'Remotes act as the central hub for team collaboration and provide off-site backup for your source code.',
    example: 'git remote -v\norigin  https://github.com/user/project.git (fetch)\norigin  https://github.com/user/project.git (push)',
    mistake: 'Thinking a remote is a live server running your website. A remote is just the Git repository data.',
    command: 'git remote -v',
    tutorialId: 'push'
  },
  {
    id: 'origin',
    category: 'collaboration',
    categoryName: 'Collaboration',
    title: 'What is origin in Git?',
    short: 'The default alias name Git gives to the remote repository you cloned from or connected to.',
    explanation: '`origin` is not a special command—it is simply a convenient nickname! When you clone a repository from GitHub, Git automatically sets up the remote URL and names it `origin` so you do not have to type the full URL (`https://github.com/...`) every time you push or pull.',
    whyItMatters: 'Whenever you see `origin/main` or type `git push origin feature`, `origin` points to your GitHub remote server.',
    example: 'git push origin main\n# Meaning: push my "main" branch to the remote nicknamed "origin"',
    mistake: 'Believing `origin` is a mandatory Git keyword. You could technically name it `github` or `upstream`, but `origin` is the universal convention.',
    command: 'git remote -v',
    tutorialId: 'push'
  },
  {
    id: 'git-clone',
    category: 'collaboration',
    categoryName: 'Collaboration',
    title: 'What is git clone?',
    short: 'The command that downloads an existing remote repository from GitHub to your local computer.',
    explanation: '`git clone <url>` creates a new folder on your computer, downloads every file, every branch, and the complete commit history from the remote repository, and automatically configures `origin` pointing back to GitHub.',
    whyItMatters: 'It is the primary way developers download projects from GitHub to work on them locally.',
    example: 'git clone https://github.com/OpenLearn/demo-project.git',
    mistake: 'Cloning a project that you do not own and trying to push directly to it. If you do not have write permissions, you should fork first!',
    command: 'git clone <url>',
    tutorialId: 'fork'
  },
  {
    id: 'git-push',
    category: 'collaboration',
    categoryName: 'Collaboration',
    title: 'What is git push?',
    short: 'The command that uploads your local commits to a remote repository on GitHub.',
    explanation: 'After you commit changes locally, they only exist on your machine. `git push <remote> <branch>` uploads your new commits and branch pointers to GitHub so your teammates can see them and pull requests can be reviewed.',
    whyItMatters: 'Without pushing, your code remains trapped on your local laptop.',
    example: 'git push origin feature/login-validation',
    mistake: 'Pushing code with broken tests or secrets like API keys. Always review `git status` and test before pushing.',
    command: 'git push origin <branch>',
    tutorialId: 'push'
  },
  {
    id: 'git-pull',
    category: 'collaboration',
    categoryName: 'Collaboration',
    title: 'What is git pull?',
    short: 'The command that downloads new commits from a remote branch and immediately merges them into your current local branch.',
    explanation: 'When collaborators push new code to GitHub, your local copy falls behind. Running `git pull` downloads the new commits and integrates them into the branch you currently have checked out.',
    whyItMatters: 'Keeps your local workspace synchronized with the team’s latest progress.',
    example: 'git pull origin main',
    mistake: 'Running `git pull` when you have uncommitted, messy changes in your working directory. Commit or stash your changes first!',
    command: 'git pull origin <branch>',
    tutorialId: 'pull'
  },
  {
    id: 'git-fetch',
    category: 'collaboration',
    categoryName: 'Collaboration',
    title: 'What is git fetch?',
    short: 'The command that downloads new remote data and commits without modifying your local working files.',
    explanation: '`git fetch` is safe and non-destructive. It downloads all new commits and branches from the remote, updates your remote-tracking pointers (`origin/main`), but does NOT change your active files or trigger merges.',
    whyItMatters: 'Allows you to inspect what teammates pushed before deciding to merge their changes.',
    example: 'git fetch origin\ngit log HEAD..origin/main',
    mistake: 'Expecting `git fetch` to update your working directory. Remember: fetch only downloads; pull downloads AND merges.',
    command: 'git fetch origin',
    tutorialId: 'pull'
  },
  {
    id: 'git-pull-vs-fetch',
    category: 'collaboration',
    categoryName: 'Collaboration',
    title: 'What is the difference between git pull and git fetch?',
    short: '`git pull` = `git fetch` (download) + `git merge` (integrate). Fetch is safe and passive; pull is active.',
    explanation: 'Use `git fetch` when you want to see what is new on GitHub without risking merge conflicts right now. Use `git pull` when you are ready to bring those remote changes straight into your current working files.',
    whyItMatters: 'Understanding this distinction eliminates the fear of unexpected automatic merge conflicts when syncing.',
    example: 'git fetch origin      # Safe review\ngit merge origin/main  # Manual integration\n# OR\ngit pull origin main   # Combined in one step',
    mistake: 'Pulling blindly without knowing what changes were made upstream.',
    command: 'git fetch origin',
    tutorialId: 'pull'
  },

  // -------------------------------------------------------------
  // MERGING & CONFLICTS
  // -------------------------------------------------------------
  {
    id: 'git-merge',
    category: 'merging',
    categoryName: 'Merging & Conflicts',
    title: 'What is git merge?',
    short: 'The command that integrates changes from one branch into your current active branch.',
    explanation: 'Merging joins two branches together. If you developed a feature on `feature/login` and want it in `main`, you checkout `main` and run `git merge feature/login`. Git finds the common ancestor, compares the changes, and combines them.',
    whyItMatters: 'It is how completed feature work lands in your main application.',
    example: 'git switch main\ngit merge feature/login-validation',
    mistake: 'Merging backwards! Always checkout the branch you want to receive the changes first (e.g. `main`), then merge the feature branch into it.',
    command: 'git merge <branch>',
    tutorialId: 'merge'
  },
  {
    id: 'fast-forward',
    category: 'merging',
    categoryName: 'Merging & Conflicts',
    title: 'What is a fast-forward merge?',
    short: 'A clean merge where Git simply moves the branch pointer forward without creating an extra merge commit.',
    explanation: 'If `main` has had no new commits since you created your feature branch, your branch is simply ahead in a direct linear line. Git does not need to reconcile competing edits—it just moves the `main` pointer forward to match your latest commit.',
    whyItMatters: 'Keeps Git commit history simple and linear when branches do not diverge.',
    example: 'Fast-forward: main -> A -> B -> C (pointer slid to C)',
    mistake: 'Assuming all merges create a new merge commit. Fast-forward merges do not.',
    command: 'git merge <branch>',
    tutorialId: 'merge'
  },
  {
    id: 'git-rebase',
    category: 'merging',
    categoryName: 'Merging & Conflicts',
    title: 'What is git rebase?',
    short: 'An alternative to merging that reapplies your branch commits on top of another base tip for a linear history.',
    explanation: 'Imagine you made commits on a branch, but `main` moved ahead with 3 new commits. Instead of a merge commit joining the branches, `git rebase main` lifts your feature commits, places them neatly on top of the newest `main` commit, and rewrites their parentage.',
    whyItMatters: 'Creates a clean, straight, linear commit history without cluttered "Merge branch..." commits.',
    example: 'git switch feature/login\ngit rebase main',
    mistake: 'The Golden Rule of Rebase: Never rebase commits that have already been pushed to a shared public branch! Only rebase your own private local branches.',
    command: 'git rebase main',
    tutorialId: 'merge'
  },
  {
    id: 'merge-vs-rebase',
    category: 'merging',
    categoryName: 'Merging & Conflicts',
    title: 'What is the difference between Merge and Rebase?',
    short: 'Merge preserves exact historical timeline with a merge commit; Rebase rewrites history for a clean linear line.',
    explanation: 'Merge is non-destructive—it records the exact moment two branches came together. Rebase temporarily unwinds your commits and replays them one-by-one on top of the target branch. Teams often prefer Rebase for local feature branches and Merge for pull requests.',
    whyItMatters: 'Helps your team choose a clean workflow strategy that everyone understands.',
    example: 'Merge: creates diamond graph with merge commit.\nRebase: straight line with updated commit hashes.',
    mistake: 'Panicking during an interactive rebase. You can always cancel cleanly with `git rebase --abort`.',
    command: 'git rebase --abort',
    tutorialId: 'merge'
  },
  {
    id: 'merge-conflict',
    category: 'merging',
    categoryName: 'Merging & Conflicts',
    title: 'What is a merge conflict?',
    short: 'An event when Git cannot automatically combine changes because competing edits occurred on the same lines of a file.',
    explanation: 'If Developer A changes line 4 of `index.html` to say "Hello" and Developer B changes line 4 to say "Welcome", Git cannot guess which version is correct. Git pauses the merge and puts conflict markers directly inside the file for a human to resolve.',
    whyItMatters: 'Conflicts are completely normal in collaborative software development. They are not errors—they are safety mechanisms to protect your code from silent overwrites.',
    example: '<<<<<<< HEAD\nconst title = "Hello";\n=======\nconst title = "Welcome";\n>>>>>>> feature/login-copy',
    mistake: 'Panicking and closing your editor. Conflict markers are plain text! Just delete the markers, keep the code you want, and commit.',
    command: 'git status',
    tutorialId: 'conflict'
  },
  {
    id: 'how-conflicts-happen',
    category: 'merging',
    categoryName: 'Merging & Conflicts',
    title: 'How do merge conflicts happen?',
    short: 'When two commits modify the same lines of the same file differently, or when one commit deletes a file that another commit edited.',
    explanation: 'Git is smart enough to merge changes in different files or even different sections of the same file automatically. But when two branches touch the exact same line, or edit adjacent lines, Git requires human judgment to verify the final syntax.',
    whyItMatters: 'Understanding causes helps you prevent conflicts by communicating with teammates and pulling frequently.',
    example: 'Branch A changed Line 12 -> Commit\nBranch B changed Line 12 -> Commit\nMerging A into B -> Conflict!',
    mistake: 'Leaving a feature branch un-synced for weeks, accumulating dozens of conflicting files.',
    command: null,
    tutorialId: 'conflict'
  },
  {
    id: 'resolve-conflict',
    category: 'merging',
    categoryName: 'Merging & Conflicts',
    title: 'How do you resolve a merge conflict?',
    short: 'Inspect the conflict markers, edit the file to the desired final code, remove the markers, stage, and commit.',
    explanation: 'Step 1: Open the conflicted file. Step 2: Locate `<<<<<<<`, `=======`, and `>>>>>>>`. Step 3: Choose what code should remain (or combine both). Step 4: Delete the markers entirely. Step 5: Save the file, run `git add <file>`, and finish with `git commit`.',
    whyItMatters: 'Resolving conflicts is an essential everyday skill for any practicing software engineer.',
    example: '1. Edit file to:\n   const title = "Welcome";\n2. git add index.js\n3. git commit -m "Resolve title merge conflict"',
    mistake: 'Accidentally leaving a `<<<<<<< HEAD` or `======` marker in your code, which will cause a syntax error in your application.',
    command: 'git add <resolved-file>',
    tutorialId: 'conflict'
  },

  // -------------------------------------------------------------
  // GITHUB PLATFORM
  // -------------------------------------------------------------
  {
    id: 'fork',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is a fork on GitHub?',
    short: 'A personal GitHub copy of someone else’s repository stored under your own account.',
    explanation: 'You cannot push code directly to projects you do not own (like VS Code, React, or open-source libraries). A fork duplicates their repository into your personal account (`your-username/project`). In your fork, you have full write permissions to create branches, make edits, and propose changes via Pull Requests.',
    whyItMatters: 'Forking is the foundation of modern open-source collaboration on GitHub.',
    example: 'Original: facebook/react\nYour Fork: my-username/react',
    mistake: 'Confusing fork with clone. Fork creates a copy on GitHub’s servers; clone copies the repository down to your computer.',
    command: null,
    tutorialId: 'fork'
  },
  {
    id: 'fork-vs-clone',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is the difference between Fork and Clone?',
    short: 'Fork is a GitHub server-side copy into your account; Clone downloads a repository to your local computer.',
    explanation: 'When you want to contribute to an open-source project, you first **Fork** it on GitHub.com so you have your own remote copy. Then you **Clone** your fork to your computer hard drive to write code and test it locally.',
    whyItMatters: 'Understanding this two-step workflow unlocks open source for beginners.',
    example: '1. Click Fork on GitHub (cloud -> cloud)\n2. Run git clone <your-fork-url> (cloud -> laptop)',
    mistake: 'Cloning the original repository directly without forking, and then being unable to push your branch due to 403 permission errors.',
    command: null,
    tutorialId: 'fork'
  },
  {
    id: 'pull-request',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is a Pull Request (PR)?',
    short: 'A formal proposal on GitHub asking repository maintainers to review, discuss, and merge your branch into theirs.',
    explanation: 'A Pull Request literally says: "Hey maintainer, I finished this feature on my branch. Would you please PULL my changes into your main branch?" It provides a dedicated webpage on GitHub showing a side-by-side diff, commit list, automated test results, and a discussion thread.',
    whyItMatters: 'Pull Requests are the standard way all modern engineering teams review and ship code.',
    example: 'PR #42: "Add login validation" (feature/login -> main)',
    mistake: 'Submitting a giant PR that changes 50 files across 10 unrelated features. Smaller, focused PRs get reviewed and merged 10x faster!',
    command: null,
    tutorialId: 'pr-create'
  },
  {
    id: 'code-review',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is a code review?',
    short: 'The process where teammates or maintainers inspect proposed code in a PR to give feedback and verify quality.',
    explanation: 'During a code review, reviewers check your PR’s "Files changed" tab. They leave inline comments on specific lines, suggest improvements, check for security bugs, and eventually select a review decision: Comment, Approve, or Request changes.',
    whyItMatters: 'Code review catches bugs before they reach users, ensures coding consistency, and shares knowledge across the team.',
    example: 'Reviewer comment: "Nice implementation! Could we add an error check here if password is empty?"',
    mistake: 'Taking code review feedback personally. Code review is about making the software great, not judging your worth as a developer.',
    command: null,
    tutorialId: 'review'
  },
  {
    id: 'issue',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is an issue on GitHub?',
    short: 'A tracking ticket on GitHub used to report bugs, request new features, or discuss project improvements.',
    explanation: 'Issues are GitHub’s built-in task tracking system. Anyone in the community can open an issue to describe a bug ("Login button does not respond on mobile") or propose an idea. Issues have labels (like `bug` or `good first issue`), assignees, and comment threads.',
    whyItMatters: 'Issues organize project priorities and serve as the starting point for open-source contributions.',
    example: 'Issue #18: "Improve login form validation to reject empty inputs"',
    mistake: 'Writing vague issue reports like "It doesn’t work". Always provide screenshots, steps to reproduce, and your browser/OS version.',
    command: null,
    tutorialId: 'first'
  },
  {
    id: 'issue-vs-pr',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is an issue vs a pull request?',
    short: 'An Issue describes a problem or idea (no code attached); a Pull Request contains actual code changes solving a problem.',
    explanation: 'An issue is a discussion ticket: "Hey, there is a bug here." A pull request is the solution: "Here is the code commit that fixes that bug." In your PR description, you can write "Fixes #18", and GitHub will automatically close Issue #18 when your PR merges!',
    whyItMatters: 'Contributors should search issues first to see if a problem is already known before writing code.',
    example: 'Issue #18: Problem description\nPR #42: Code solution that says "Closes #18"',
    mistake: 'Opening a PR without checking if an issue already exists or discussing large architectural changes with maintainers first.',
    command: null,
    tutorialId: 'pr-create'
  },
  {
    id: 'github-actions',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is GitHub Actions?',
    short: 'An automation and CI/CD platform built into GitHub that automatically tests, builds, and deploys your code.',
    explanation: 'GitHub Actions runs workflows defined in `.github/workflows/*.yml` files whenever events happen (such as pushing code or opening a PR). It can automatically run your unit tests, check code linting, build docker containers, and deploy your site to the web.',
    whyItMatters: 'Automates testing so maintainers can see green checkmarks on PRs before merging without having to test everything manually.',
    example: 'name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - run: npm test',
    mistake: 'Ignoring red checkmarks on your PR. If automated checks fail, inspect the log details and fix the errors.',
    command: null,
    tutorialId: 'merge'
  },
  {
    id: 'github-organization',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is a GitHub organization?',
    short: 'A shared account on GitHub designed for companies, teams, and open-source communities to manage projects collaboratively.',
    explanation: 'While personal accounts represent individual developers (`github.com/aaqil`), organizations (`github.com/google`, `github.com/facebook`) allow multiple owners, fine-grained team permissions, shared billing, and centralized repositories.',
    whyItMatters: 'Professional software development happens almost exclusively inside GitHub organizations.',
    example: 'Organization: OpenLearn\nRepository: OpenLearn/demo-project',
    mistake: 'Using a personal account with shared passwords for a team project. Always create a free GitHub organization instead.',
    command: null,
    tutorialId: 'first'
  },
  {
    id: 'github-profile',
    category: 'github',
    categoryName: 'GitHub Platform',
    title: 'What is a GitHub profile?',
    short: 'Your public developer portfolio on GitHub displaying your contributions, repositories, and activity graph.',
    explanation: 'Your GitHub profile showcases your public open-source contributions, pinned projects, and the famous green contribution activity graph. You can also create a special repository named after your username with a `README.md` to display a custom portfolio page.',
    whyItMatters: 'Tech recruiters and engineering managers frequently inspect GitHub profiles to evaluate real-world coding and collaboration skills.',
    example: 'https://github.com/your-username',
    mistake: 'Obsessing over "green squares" rather than writing meaningful, high-quality code and clear commit messages.',
    command: null,
    tutorialId: 'first'
  },

  // -------------------------------------------------------------
  // OPEN SOURCE
  // -------------------------------------------------------------
  {
    id: 'open-source',
    category: 'opensource',
    categoryName: 'Open Source',
    title: 'What is open-source software?',
    short: 'Software whose source code is publicly accessible for anyone to view, modify, use, and contribute to.',
    explanation: 'Linux, Python, React, VS Code, and Git itself are all open source. Anyone around the world can inspect the code, fix bugs, translate documentation, or add features. The community collaborates transparently on GitHub.',
    whyItMatters: 'Most of the internet and modern software runs on open-source foundations. Contributing to open source accelerates your learning and builds your career network.',
    example: 'Contributing documentation fixes to open-source libraries.',
    mistake: 'Thinking open source is only for elite programmers. Fixing typos, improving docs, and triaging issues are invaluable contributions!',
    command: null,
    tutorialId: 'first'
  },
  {
    id: 'maintainer',
    category: 'opensource',
    categoryName: 'Open Source',
    title: 'What is an open-source maintainer?',
    short: 'The person or team responsible for reviewing PRs, triaging issues, releasing updates, and stewarding an open-source project.',
    explanation: 'Maintainers write code, but their biggest job is community leadership: reviewing pull requests, answering questions, writing documentation, and ensuring code quality. Many maintainers volunteer their free time.',
    whyItMatters: 'Being respectful, polite, and patient with maintainers makes your open-source experience rewarding and gets your PRs merged quickly.',
    example: 'A maintainer reviews your PR diff, leaves an approving review, and merges your code.',
    mistake: 'Demanding immediate reviews or getting upset if a maintainer is busy. Remember maintainers are human volunteers.',
    command: null,
    tutorialId: 'first'
  },
  {
    id: 'good-first-issue',
    category: 'opensource',
    categoryName: 'Open Source',
    title: 'What is a "good first issue"?',
    short: 'A curated label on GitHub issues created by maintainers specifically for first-time contributors.',
    explanation: 'Maintainers tag issues as `good first issue` or `beginner-friendly` when the problem is well-isolated, clearly documented, and does not require deep architectural knowledge of the entire codebase (e.g. updating validation, adding a test, or improving docs).',
    whyItMatters: 'It is the best stepping stone to make your very first real contribution without feeling overwhelmed.',
    example: 'Issue #18: Improve login validation [good first issue]',
    mistake: 'Claiming an issue in the comments and then disappearing. If you cannot finish, let the maintainer know so others can try!',
    command: null,
    tutorialId: 'first'
  },
  {
    id: 'how-contribution-works',
    category: 'opensource',
    categoryName: 'Open Source',
    title: 'How does open-source contribution work?',
    short: 'Find an issue → Fork repo → Create branch → Edit & test → Commit → Open PR → Discuss feedback → Merge!',
    explanation: '1. Find an issue labeled `good first issue`.\n2. Fork the repository to your account.\n3. Create a feature branch.\n4. Make the changes and write tests.\n5. Commit with a clear message.\n6. Push to your fork and open a Pull Request.\n7. Incorporate reviewer feedback.\n8. Your PR is merged into main!',
    whyItMatters: 'Following this standardized lifecycle makes you an effective contributor on any team.',
    example: 'The Git Assist First Contribution simulation teaches this entire cycle step by step!',
    mistake: 'Skipping the project’s `CONTRIBUTING.md` guidelines before making changes.',
    command: null,
    tutorialId: 'first'
  },

  // -------------------------------------------------------------
  // ADVANCED & SAFE GIT
  // -------------------------------------------------------------
  {
    id: 'git-stash',
    category: 'advanced',
    categoryName: 'Advanced & Safe Git',
    title: 'What is git stash?',
    short: 'A command that temporarily shelves your uncommitted changes so you can work on something else with a clean directory.',
    explanation: 'Imagine you are halfway through coding a feature when an emergency bug appears on `main`. You cannot commit your messy, half-finished code yet, but you must switch branches. `git stash` saves your dirty changes in a safe temporary clipboard and resets your working directory to clean. Later, run `git stash pop` to bring them right back!',
    whyItMatters: 'Prevents losing work in progress when you need to switch contexts quickly.',
    example: 'git stash\ngit switch main\n# do emergency fix\ngit switch feature\ngit stash pop',
    mistake: 'Forgetting that you have stashed changes. Run `git stash list` to inspect your stashes.',
    command: 'git stash',
    tutorialId: 'branch'
  },
  {
    id: 'git-tag',
    category: 'advanced',
    categoryName: 'Advanced & Safe Git',
    title: 'What is a tag and release in Git?',
    short: 'A permanent label marking a specific important commit in history, typically for software version releases (v1.0.0).',
    explanation: 'Unlike branches which constantly move forward with new commits, a tag is a permanent bookmark that stays pinned to a specific commit forever. GitHub turns Git tags into formal Releases with downloadable zip archives and release notes.',
    whyItMatters: 'Allows users and package managers (`npm`, `pip`) to install exact, stable versions of your software.',
    example: 'git tag -a v1.0.0 -m "First production release"\ngit push origin v1.0.0',
    mistake: 'Forgetting that `git push` does NOT push tags by default! You must run `git push origin --tags` or push the specific tag.',
    command: 'git tag -a v1.0.0',
    tutorialId: 'merge'
  },
  {
    id: 'reset-vs-revert',
    category: 'advanced',
    categoryName: 'Advanced & Safe Git',
    title: 'What is the difference between git reset and git revert?',
    short: 'Reset rewrites history by moving the branch pointer backwards; Revert creates a safe new commit that undoes changes.',
    explanation: '`git reset` is like an eraser: it erases commits from the branch history. It is dangerous on shared public branches. `git revert` is like an apology: it creates a brand-new commit that applies the exact opposite changes, safely undoing the mistake without altering historical records.',
    whyItMatters: 'Revert is 100% safe on public branches shared with teammates.',
    example: 'git revert 61e0faa   # Creates new commit undoing 61e0faa',
    mistake: 'Using `git reset --hard` on branches you already pushed to GitHub, which destroys team history.',
    command: 'git revert <hash>',
    tutorialId: 'commit'
  }
];
