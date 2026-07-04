import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { formatCurrency } from '../utils/format.js'

export default function CartItemRow({ item, onRemove, onUpdate }) {
  return (
    <article className="cart-item">
      <img src={item.product.imagen} alt={item.product.nombre} />

      <div className="cart-item__content">
        <div>
          <span className="pill">{item.product.categoria}</span>
          <Link to={`/producto/${item.product.id}`}>
            <h3>{item.product.nombre}</h3>
          </Link>
          <p>{item.product.descripcion}</p>
        </div>

        <div className="cart-item__footer">
          <div className="quantity-control" aria-label={`Cantidad de ${item.product.nombre}`}>
            <button type="button" onClick={() => onUpdate(item.product.id, item.quantity - 1)}>
              <FiMinus />
            </button>
            <span>{item.quantity}</span>
            <button type="button" onClick={() => onUpdate(item.product.id, item.quantity + 1)}>
              <FiPlus />
            </button>
          </div>

          <strong>{formatCurrency(item.lineTotal)}</strong>
          <button type="button" className="text-button" onClick={() => onRemove(item.product.id)}>
            <FiTrash2 /> Eliminar
          </button>
        </div>
      </div>
    </article>
  )
}