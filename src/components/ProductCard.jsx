import { motion } from 'framer-motion'
import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useShop } from '../context/useShop.js'
import { formatCurrency } from '../utils/format.js'

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlistSet } = useShop()
  const isFavorite = wishlistSet.has(product.id)

  return (
    <motion.article
      className="product-card"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.45 }}
      whileHover={{ y: -6 }}
    >
      <button
        type="button"
        className={`icon-button icon-button--wishlist${isFavorite ? ' is-active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      >
        <FiHeart />
      </button>

      <Link className="product-card__media" to={`/producto/${product.id}`}>
        <img src={product.imagen} alt={product.nombre} loading="lazy" />
        <span className="badge">-{product.descuento}%</span>
      </Link>

      <div className="product-card__body">
        <div className="product-card__meta">
          <span>{product.categoria}</span>
          <span>{product.rating} / 5</span>
        </div>
        <Link to={`/producto/${product.id}`}>
          <h3>{product.nombre}</h3>
        </Link>
        <p>{product.descripcion}</p>
        <div className="price-stack">
          <strong>{formatCurrency(product.precio)}</strong>
          <span>{formatCurrency(product.precioAnterior)}</span>
        </div>
        <button type="button" className="btn btn--primary" onClick={() => addToCart(product.id)}>
          <FiShoppingBag /> Agregar al carrito
        </button>
      </div>
    </motion.article>
  )
}