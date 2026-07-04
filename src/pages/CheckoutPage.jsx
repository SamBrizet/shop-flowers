import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { paymentOptions } from '../data/content.js'
import { useShop } from '../context/useShop.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { formatCurrency } from '../utils/format.js'

const initialForm = {
  name: '',
  email: '',
  address: '',
  phone: '',
  paymentMethod: paymentOptions[0],
}

export default function CheckoutPage() {
  const navigate = useNavigate()
  const { cartItemsDetailed, cartTotal, placeOrder, profile } = useShop()
  const [formState, setFormState] = useState({
    ...initialForm,
    name: profile.name,
    email: profile.email,
    address: profile.address,
    phone: profile.phone,
  })

  useDocumentMeta({
    title: 'Checkout | Shop Flowers',
    description: 'Completa tu compra floral con un formulario elegante y resumen de pedido.',
  })

  if (cartItemsDetailed.length === 0) {
    return (
      <section className="empty-state empty-state--page">
        <h1>No hay productos para pagar.</h1>
        <p>Tu checkout se activara en cuanto agregues productos al carrito.</p>
      </section>
    )
  }

  const handleChange = (key, value) => {
    setFormState((current) => ({ ...current, [key]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const order = placeOrder(formState)
    navigate('/compra-exitosa', { state: { orderId: order.id } })
  }

  return (
    <div className="checkout-layout">
      <form className="form-card" onSubmit={handleSubmit}>
        <div className="section-intro">
          <p className="section-intro__eyebrow">Checkout</p>
          <h1>Finaliza tu compra</h1>
        </div>

        <label>
          <span>Nombre</span>
          <input required value={formState.name} onChange={(event) => handleChange('name', event.target.value)} />
        </label>
        <label>
          <span>Correo</span>
          <input
            required
            type="email"
            value={formState.email}
            onChange={(event) => handleChange('email', event.target.value)}
          />
        </label>
        <label>
          <span>Direccion</span>
          <input
            required
            value={formState.address}
            onChange={(event) => handleChange('address', event.target.value)}
          />
        </label>
        <label>
          <span>Telefono</span>
          <input
            required
            value={formState.phone}
            onChange={(event) => handleChange('phone', event.target.value)}
          />
        </label>
        <label>
          <span>Metodo de pago</span>
          <select value={formState.paymentMethod} onChange={(event) => handleChange('paymentMethod', event.target.value)}>
            {paymentOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className="btn btn--primary">
          Confirmar compra
        </button>
      </form>

      <aside className="summary-card">
        <h2>Resumen del pedido</h2>
        {cartItemsDetailed.map((item) => (
          <div key={item.product.id} className="summary-row">
            <span>
              {item.product.nombre} x {item.quantity}
            </span>
            <strong>{formatCurrency(item.lineTotal)}</strong>
          </div>
        ))}
        <div className="summary-row summary-row--total">
          <span>Total</span>
          <strong>{formatCurrency(cartTotal)}</strong>
        </div>
      </aside>
    </div>
  )
}