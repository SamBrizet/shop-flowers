import { Link, useLocation } from 'react-router-dom'
import { useShop } from '../context/useShop.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { formatCurrency } from '../utils/format.js'

export default function SuccessPage() {
  const location = useLocation()
  const { orders } = useShop()
  const order = orders.find((item) => item.id === location.state?.orderId) ?? orders[0]

  useDocumentMeta({
    title: 'Compra exitosa | Shop Flowers',
    description: 'Pantalla de confirmacion con resumen del pedido completado.',
  })

  return (
    <section className="empty-state empty-state--page success-card">
      <p className="section-intro__eyebrow">Compra exitosa</p>
      <h1>Tu pedido floral ya fue confirmado.</h1>
      <p>Hemos guardado tu historial y la experiencia se mantiene persistente en LocalStorage.</p>
      {order ? (
        <div className="success-summary">
          <strong>{order.id}</strong>
          <span>{order.items.length} productos</span>
          <span>Total: {formatCurrency(order.total)}</span>
        </div>
      ) : null}
      <div className="hero-panel__actions">
        <Link className="btn btn--primary" to="/catalogo">
          Volver al catalogo
        </Link>
        <Link className="btn btn--secondary" to="/perfil">
          Ver perfil
        </Link>
      </div>
    </section>
  )
}