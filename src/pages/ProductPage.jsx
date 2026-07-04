import { useMemo, useState } from 'react'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { Link, useParams } from 'react-router-dom'
import Loader from '../components/Loader.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { useShop } from '../context/useShop.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { formatCurrency } from '../utils/format.js'

export default function ProductPage() {
  const { productId } = useParams()
  const { addToCart, products, productsLoading, toggleWishlist, wishlistSet } = useShop()
  const [quantity, setQuantity] = useState(1)
  const product = products.find((item) => item.id === productId)

  useDocumentMeta({
    title: product ? `${product.nombre} | Shop Flowers` : 'Producto | Shop Flowers',
    description: product?.descripcion ?? 'Detalle de producto floral, galeria y compra local.',
  })

  const relatedProducts = useMemo(() => {
    if (!product) return []
    return products.filter((item) => item.categoria === product.categoria && item.id !== product.id).slice(0, 4)
  }, [product, products])

  if (productsLoading) {
    return <Loader screen label="Cargando detalle del producto" />
  }

  if (!product) {
    return (
      <section className="empty-state empty-state--page">
        <h1>Ese arreglo ya no esta disponible.</h1>
        <p>Explora otras colecciones del catalogo premium.</p>
        <Link className="btn btn--primary" to="/catalogo">
          Ir al catalogo
        </Link>
      </section>
    )
  }

  const gallery = [
    product.imagen,
    'https://images.unsplash.com/photo-1468327768560-75b778cbb551?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1494336934272-f0c305aa0d51?auto=format&fit=crop&w=1200&q=80',
  ]

  return (
    <div className="page-stack page-stack--tight">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Inicio</Link>
        <span>/</span>
        <Link to="/catalogo">Catalogo</Link>
        <span>/</span>
        <span>{product.nombre}</span>
      </nav>

      <section className="detail-layout">
        <div className="detail-gallery">
          {gallery.map((image, index) => (
            <img key={`${image}-${index}`} src={image} alt={`${product.nombre} vista ${index + 1}`} />
          ))}
        </div>

        <div className="detail-panel">
          <span className="pill">{product.categoria}</span>
          <h1>{product.nombre}</h1>
          <p>{product.descripcion}</p>
          <div className="price-stack price-stack--detail">
            <strong>{formatCurrency(product.precio)}</strong>
            <span>{formatCurrency(product.precioAnterior)}</span>
          </div>
          <ul className="detail-list">
            <li>Rating: {product.rating} / 5</li>
            <li>Stock: {product.stock} unidades</li>
            <li>Colores: {product.colores.join(', ')}</li>
            <li>Tamano: {product.tamano}</li>
          </ul>

          <div className="detail-actions">
            <label>
              <span>Cantidad</span>
              <input
                type="number"
                min="1"
                max="12"
                value={quantity}
                onChange={(event) => setQuantity(Number(event.target.value) || 1)}
              />
            </label>

            <button type="button" className="btn btn--primary" onClick={() => addToCart(product.id, quantity)}>
              <FiShoppingBag /> Agregar al carrito
            </button>
            <button type="button" className="btn btn--secondary" onClick={() => toggleWishlist(product.id)}>
              <FiHeart /> {wishlistSet.has(product.id) ? 'Quitar de wishlist' : 'Guardar en wishlist'}
            </button>
          </div>
        </div>
      </section>

      <section className="content-section content-section--flush">
        <div className="section-intro">
          <p className="section-intro__eyebrow">Relacionados</p>
          <h2>Mas ideas dentro de la misma coleccion</h2>
        </div>
        <div className="product-grid">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  )
}