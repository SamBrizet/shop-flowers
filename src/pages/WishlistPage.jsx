import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { useShop } from '../context/useShop.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function WishlistPage() {
  const { products, wishlist } = useShop()
  const items = products.filter((product) => wishlist.includes(product.id))

  useDocumentMeta({
    title: 'Wishlist | Shop Flowers',
    description: 'Tus flores, arreglos y regalos guardados para comprar despues.',
  })

  return (
    <div className="page-stack page-stack--tight">
      <section className="content-section content-section--flush">
        <div className="section-intro">
          <p className="section-intro__eyebrow">Wishlist</p>
          <h1>Tus favoritos guardados</h1>
          <p>Ideal para comparar disenos antes de finalizar la compra.</p>
        </div>

        {items.length === 0 ? (
          <article className="empty-state">
            <h3>Aun no guardaste productos.</h3>
            <p>Marca tus favoritos desde el catalogo o el detalle de producto.</p>
            <Link className="btn btn--primary" to="/catalogo">
              Ir al catalogo
            </Link>
          </article>
        ) : (
          <div className="product-grid">
            {items.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}