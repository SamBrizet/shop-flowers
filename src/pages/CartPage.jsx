import { Link } from 'react-router-dom'
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
        <h1>Tu carrito esta vacio.</h1>
        <p>Explora el catalogo para agregar arreglos, plantas o gift sets.</p>
        <Link className="btn btn--primary" to="/catalogo">
          Ir al catalogo
        </Link>
      </section>
    )
  }

  return (
    <div className="checkout-layout">
      <section className="panel-stack">
        <div className="section-intro">
          <p className="section-intro__eyebrow">Carrito</p>
          <h1>Gestiona tu pedido floral</h1>
        </div>

        {cartItemsDetailed.map((item) => (
          <CartItemRow key={item.product.id} item={item} onRemove={removeFromCart} onUpdate={updateQuantity} />
        ))}

        <button type="button" className="text-button" onClick={clearCart}>
          Vaciar carrito
        </button>
      </section>

      <aside className="summary-card">
        <h2>Resumen</h2>
        <div>
          <span>Subtotal</span>
          <strong>{formatCurrency(cartSubtotal)}</strong>
        </div>
        <div>
          <span>Ahorro</span>
          <strong>{formatCurrency(cartSavings)}</strong>
        </div>
        <div>
          <span>Total</span>
          <strong>{formatCurrency(cartTotal)}</strong>
        </div>
        <Link className="btn btn--primary" to="/checkout">
          Continuar al checkout
        </Link>
      </aside>
    </div>
  )
}