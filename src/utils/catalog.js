function normalize(value) {
  return value.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '')
}

export function filterProducts(products, filters) {
  const { category, maxPrice, search } = filters
  const normalizedSearch = normalize(search.trim())

  return products.filter((product) => {
    const haystack = normalize(`${product.nombre} ${product.categoria} ${product.descripcion}`)
    const matchesCategory =
      category === 'all' || product.categoria === category
    const matchesPrice = product.precio <= maxPrice

    if (!normalizedSearch) {
      return matchesCategory && matchesPrice
    }

    return matchesCategory && matchesPrice && haystack.includes(normalizedSearch)
  })
}

export function sortProducts(products, sortBy) {
  const cloned = [...products]

  switch (sortBy) {
    case 'precio-asc':
      return cloned.sort((left, right) => left.precio - right.precio)
    case 'precio-desc':
      return cloned.sort((left, right) => right.precio - left.precio)
    case 'rating':
      return cloned.sort((left, right) => right.rating - left.rating)
    case 'popularidad':
    default:
      return cloned.sort((left, right) => right.popularidad - left.popularidad)
  }
}