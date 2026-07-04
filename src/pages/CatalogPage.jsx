import { useDeferredValue, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CatalogToolbar from '../components/CatalogToolbar.jsx'
import Loader from '../components/Loader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductSkeletonGrid from '../components/ProductSkeletonGrid.jsx'
import SectionIntro from '../components/SectionIntro.jsx'
import { useShop } from '../context/useShop.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { filterProducts, sortProducts } from '../utils/catalog.js'

export default function CatalogPage() {
  const { products, productsError, productsLoading } = useShop()
  const [searchParams, setSearchParams] = useSearchParams()
  const maxPrice = useMemo(() => Math.max(...products.map((product) => product.precio), 150), [products])
  const [filters, setFilters] = useState({
    category: searchParams.get('categoria') ?? 'all',
    maxPrice,
    search: searchParams.get('buscar') ?? '',
    sortBy: 'popularidad',
  })
  const deferredSearch = useDeferredValue(filters.search)
  const normalizedMaxPrice = Math.min(filters.maxPrice, maxPrice)

  const categories = useMemo(() => [...new Set(products.map((product) => product.categoria))], [products])

  useDocumentMeta({
    title: 'Catalogo | Shop Flowers',
    description: 'Explora flores, arreglos premium, filtros por categoria y favoritos persistentes.',
  })

  const visibleProducts = useMemo(() => {
    const filtered = filterProducts(products, {
      ...filters,
      maxPrice: normalizedMaxPrice,
      search: deferredSearch,
    })
    return sortProducts(filtered, filters.sortBy)
  }, [deferredSearch, filters, normalizedMaxPrice, products])

  const handleFilterChange = (key, value) => {
    const nextFilters = { ...filters, [key]: value }
    setFilters(nextFilters)

    const nextParams = new URLSearchParams()
    if (nextFilters.category !== 'all') nextParams.set('categoria', nextFilters.category)
    if (nextFilters.search) nextParams.set('buscar', nextFilters.search)
    setSearchParams(nextParams, { replace: true })
  }

  const resetFilters = () => {
    setFilters({ category: 'all', maxPrice, search: '', sortBy: 'popularidad' })
    setSearchParams({}, { replace: true })
  }

  return (
    <div className="page-stack page-stack--tight">
      <section className="catalog-hero">
        <SectionIntro
          eyebrow="Catalogo"
          title="Un grid premium con busqueda y filtros en tiempo real"
          copy="Busca por nombre, categoria, precio y ordena por popularidad, valoracion o precio."
        />
        <CatalogToolbar
          categories={categories}
          filters={{ ...filters, maxPrice: normalizedMaxPrice }}
          maxLimit={maxPrice}
          onChange={handleFilterChange}
          onReset={resetFilters}
        />
      </section>

      {productsLoading ? (
        <>
          <Loader label="Montando catalogo floral" />
          <section className="content-section content-section--flush">
            <ProductSkeletonGrid count={8} />
          </section>
        </>
      ) : null}
      {productsError ? <p className="status-card status-card--error">{productsError}</p> : null}

      {!productsLoading && !productsError ? (
        <section className="content-section content-section--flush">
          <div className="results-bar">
            <strong>{visibleProducts.length} resultados</strong>
            <span>{filters.category === 'all' ? 'Todas las categorias' : filters.category}</span>
          </div>

          <div className="product-grid">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {visibleProducts.length === 0 ? (
            <article className="empty-state">
              <h3>No encontramos flores con esos criterios.</h3>
              <p>Prueba con otra categoria, sube el rango de precio o limpia la busqueda.</p>
            </article>
          ) : null}
        </section>
      ) : null}
    </div>
  )
}