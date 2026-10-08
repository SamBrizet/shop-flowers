import { Link } from 'react-router-dom'
import { FiArrowRight, FiShoppingBag, FiTrash2 } from 'react-icons/fi'
import CartItemRow from '../components/CartItemRow.jsx'
import { useShop } from '../context/useShop.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { formatCurrency } from '../utils/format.js'

export default function CartPage() {
  const { cartItemsDetailed, cartSavings, cartSubtotal, cartTotal, clearCart, removeFromCart, updateQuantity } =
    useShop()

  useDocumentMeta({
    title: 'Carrito | Shop Flowers',
    description: 'Gestiona cantidades, subtotal y checkout de tu pedido floral.',
  })

  if (cartItemsDetailed.length === 0) {
    return (
      <section className="empty-state empty-state--page">
        <span className="empty-state__icon" aria-hidden="true"><FiShoppingBag /></span>
        <p className="section-intro__eyebrow">Tu selección empieza aquí</p>
        <h1>Tu carrito está esperando flores.</h1>
        <p>Descubre arreglos de temporada y encuentra el detalle indicado.</p>
        <Link className="btn btn--primary" to="/catalogo">
          Explorar arreglos <FiArrowRight aria-hidden="true" />
        </Link>
      </section>
    )
  }

  return (
    <div className="checkout-layout checkout-layout--cart">
      <section className="panel-stack">
        <div className="section-intro">
          <p className="section-intro__eyebrow">Tu selección</p>
          <h1>Flores para llevar</h1>
          <p>{cartCountLabel(cartItemsDetailed.reduce((count, item) => count + item.quantity, 0))} en tu carrito</p>
        </div>

        {cartItemsDetailed.map((item) => (
          <CartItemRow key={item.product.id} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} />
        ))}

        <button type="button" className="cart-clear" onClick={clearCart}>
          <FiTrash2 aria-hidden="true" /> Vaciar selección
        </button>
      </section>

      <aside className="summary-card">
        <p className="section-intro__eyebrow">Resumen del pedido</p>
        <div className="summary-row">
          <span>Subtotal</span>
          <strong>{formatCurrency(cartSubtotal)}</strong>
        </div>
        <div className="summary-row">
          <span>Ahorro</span>
          <strong>{formatCurrency(cartSavings)}</strong>
        </div>
        <div className="summary-row summary-row--delivery">
          <span>Entrega</span>
          <strong>Se coordina al finalizar</strong>
        </div>
        <div className="summary-row summary-row--total">
          <span>Total</span>
          <strong>{formatCurrency(cartTotal)}</strong>
        </div>
        <Link className="btn btn--primary" to="/checkout">
          Continuar al checkout <FiArrowRight aria-hidden="true" />
        </Link>
        <p className="summary-note">Empaque de regalo y tarjeta incluidos en cada pedido.</p>
      </aside>
    </div>
  )
}

function cartCountLabel(count) {
  return `${count} ${count === 1 ? 'arreglo' : 'arreglos'}`
}