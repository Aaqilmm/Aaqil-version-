import type { KnowledgeCategory, KnowledgeConcept } from './types'

interface KnowledgeExplorerProps {
  search: string
  setSearch: (value: string) => void
  category: string
  setCategory: (cat: string) => void
  categories: KnowledgeCategory[]
  filteredConcepts: KnowledgeConcept[]
  onSelectConcept: (concept: KnowledgeConcept) => void
  onBackToLearn: () => void
}

export function KnowledgeExplorer({
  search,
  setSearch,
  category,
  setCategory,
  categories,
  filteredConcepts,
  onSelectConcept,
  onBackToLearn,
}: KnowledgeExplorerProps) {
  return (
    <section className="knowledge-page">
      <button
        type="button"
        className="back-to-processes"
        onClick={onBackToLearn}
      >
        ← Back to GitHub processes
      </button>
      <div className="knowledge-tools">
        <label className="search-field" htmlFor="concept-search">
          <span>⌕</span>
          <input
            id="concept-search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Git concepts, questions, and commands…"
          />
          <kbd>⌘ K</kbd>
        </label>
        <span className="result-count">{filteredConcepts.length} concepts</span>
      </div>
      <div className="category-list">
        {categories.map((c) => (
          <button
            key={c.id}
            type="button"
            className={category === c.id ? 'active' : ''}
            onClick={() => setCategory(c.id)}
          >
            <span>{c.icon}</span>
            {c.name}
          </button>
        ))}
      </div>
      {filteredConcepts.length ? (
        <div className="concept-grid">
          {filteredConcepts.map((k) => (
            <article className="concept-card" key={k.id}>
              <div className="concept-meta">
                <span>{k.categoryName}</span>
              </div>
              <h3>{k.title}</h3>
              <p>{k.short}</p>
              <button
                type="button"
                className="learn-more"
                onClick={() => onSelectConcept(k)}
              >
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
  )
}

export default KnowledgeExplorer
