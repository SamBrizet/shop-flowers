import { FiHeart, FiShoppingBag } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useShop } from '../context/useShop.js'
import { formatCurrency } from '../utils/format.js'

export default function CollectionProductCard({ product }) {
  const { addToCart, toggleWishlist, wishlistSet } = useShop()
  const isFavorite = wishlistSet.has(product.id)

  return (
    <article className="collection-product">
      <button
        type="button"
        className={`icon-button product-card__wishlist${isFavorite ? ' is-active' : ''}`}
        onClick={() => toggleWishlist(product.id)}
        aria-pressed={isFavorite}
        aria-label={isFavorite ? `Quitar ${product.nombre} de favoritos` : `Guardar ${product.nombre} en favoritos`}
      >
        <FiHeart />
      </button>
      <Link className="collection-product__image" to={`/producto/${product.id}`}>
        <img src={product.imagen} alt={product.nombre} loading="lazy" />
      </Link>
      <div className="collection-product__info">
        <Link className="collection-product__name" to={`/producto/${product.id}`}>
          {product.nombre}
        </Link>
        <strong className="collection-product__price">{formatCurrency(product.precio)}</strong>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => addToCart(product.id)}
          aria-label={`Agregar ${product.nombre} al carrito`}
        >
          <FiShoppingBag aria-hidden="true" /> Agregar
        </button>
      </div>
    </article>
  )
}
