import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { useShop } from '../context/useShop.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'
import { formatCurrency, formatDate } from '../utils/format.js'

export default function ProfilePage() {
  const { orders, products, profile, wishlist } = useShop()
  const favoriteProducts = products.filter((product) => wishlist.includes(product.id)).slice(0, 3)

  useDocumentMeta({
    title: 'Perfil | Shop Flowers',
    description: 'Historial de pedidos, datos del cliente y favoritos guardados en local.',
  })

  return (
    <div className="page-stack page-stack--tight">
      <section className="profile-layout">
        <article className="profile-card">
          <p className="section-intro__eyebrow">Perfil</p>
          <h1>{profile.name}</h1>
          <ul className="detail-list">
            <li>{profile.email}</li>
            <li>{profile.phone}</li>
            <li>{profile.address}</li>
          </ul>
        </article>

        <article className="profile-card">
          <p className="section-intro__eyebrow">Historial</p>
          <h2>{orders.length} pedidos registrados</h2>
          {orders.length === 0 ? (
            <p>Aun no has completado compras en esta simulacion.</p>
          ) : (
            <div className="order-list">
              {orders.slice(0, 3).map((order) => (
                <div key={order.id} className="order-card">
                  <strong>{order.id}</strong>
                  <span>{formatDate(order.createdAt)}</span>
                  <span>{formatCurrency(order.total)}</span>
                </div>
              ))}
            </div>
          )}
        </article>
      </section>

      <section className="content-section content-section--flush">
        <div className="section-intro">
          <p className="section-intro__eyebrow">Favoritos</p>
          <h2>Productos guardados recientemente</h2>
        </div>

        {favoriteProducts.length === 0 ? (
          <article className="empty-state">
            <p>Tu lista esta vacia. Guarda opciones desde el catalogo.</p>
            <Link className="btn btn--primary" to="/catalogo">
              Ver catalogo
            </Link>
          </article>
        ) : (
          <div className="product-grid">
            {favoriteProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}