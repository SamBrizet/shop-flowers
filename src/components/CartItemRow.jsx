import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format.js'

export default function CartItemRow({ item, onRemove, onUpdate }) {
  return (
    <article className="cart-item">
      <img src={item.product.imagen} alt={item.product.nombre} />

      <div className="cart-item__content">
        <div className="cart-item__details">
          <span className="pill">{item.product.categoria}</span>
          <Link to={`/producto/${item.product.id}`}>
            <h3>{item.product.nombre}</h3>
          </Link>
          <span className="cart-item__unit-price">{formatCurrency(item.product.precio)} por arreglo</span>
        </div>

        <div className="cart-item__footer">
          <div className="quantity-control" aria-label={`Cantidad de ${item.product.nombre}`}>
            <button type="button" onClick={() => onUpdate(item.product.id, item.quantity - 1)} aria-label={`Quitar una unidad de ${item.product.nombre}`}>
              <FiMinus />
            </button>
            <span aria-live="polite">{item.quantity}</span>
            <button type="button" onClick={() => onUpdate(item.product.id, item.quantity + 1)} aria-label={`Agregar una unidad de ${item.product.nombre}`}>
              <FiPlus />
            </button>
          </div>

          <strong className="cart-item__line-total">{formatCurrency(item.lineTotal)}</strong>
          <button type="button" className="cart-item__remove" onClick={() => onRemove(item.product.id)} aria-label={`Eliminar ${item.product.nombre}`}>
            <FiTrash2 />
            <span>Quitar</span>
          </button>
        </div>
      </div>
    </article>
  )
}