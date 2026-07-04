import { FiSearch } from 'react-icons/fi'

const sortOptions = [
  { value: 'popularidad', label: 'Popularidad' },
  { value: 'precio-asc', label: 'Precio ascendente' },
  { value: 'precio-desc', label: 'Precio descendente' },
  { value: 'rating', label: 'Mejor valorados' },
]

export default function CatalogToolbar({ categories, filters, maxLimit, onChange, onReset }) {
  return (
    <section className="toolbar">
      <label className="search-field" htmlFor="catalog-search">
        <FiSearch aria-hidden="true" />
        <input
          id="catalog-search"
          type="search"
          placeholder="Buscar por nombre, categoria o detalle"
          value={filters.search}
          onChange={(event) => onChange('search', event.target.value)}
        />
      </label>

      <label>
        <span>Categoria</span>
        <select value={filters.category} onChange={(event) => onChange('category', event.target.value)}>
          <option value="all">Todas</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Orden</span>
        <select value={filters.sortBy} onChange={(event) => onChange('sortBy', event.target.value)}>
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label>
        <span>Precio maximo: {filters.maxPrice}</span>
        <input
          type="range"
          min="35"
          max={maxLimit}
          value={filters.maxPrice}
          onChange={(event) => onChange('maxPrice', Number(event.target.value))}
        />
      </label>

      <button type="button" className="btn btn--secondary" onClick={onReset}>
        Limpiar filtros
      </button>
    </section>
  )
}