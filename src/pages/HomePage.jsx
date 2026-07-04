import { Link } from 'react-router-dom'
import CategoryList from '../components/CategoryList.jsx'
import FeatureStrip from '../components/FeatureStrip.jsx'
import Loader from '../components/Loader.jsx'
import NewsletterCard from '../components/NewsletterCard.jsx'
import ProductCard from '../components/ProductCard.jsx'
import ProductSkeletonGrid from '../components/ProductSkeletonGrid.jsx'
import SectionIntro from '../components/SectionIntro.jsx'
import TestimonialList from '../components/TestimonialList.jsx'
import { promotions } from '../data/content.js'
import { useShop } from '../context/useShop.js'
import { useDocumentMeta } from '../hooks/useDocumentMeta.js'

export default function HomePage() {
  const { featuredProducts, productsLoading } = useShop()

  useDocumentMeta({
    title: 'Shop Flowers | Boutique floral contemporanea',
    description:
      'E-commerce floral con colecciones premium, favoritos, carrito persistente y experiencias de compra cuidadas.',
  })

  return (
    <div className="page-stack">
      <section className="hero-panel">
        <div className="hero-panel__copy">
          <p className="section-intro__eyebrow">Boutique floral online</p>
          <h1>Flores con lenguaje editorial, compra simple y entrega con estilo.</h1>
          <p>
            Shop Flowers mezcla una estetica serena con un catalogo curado para bodas, cumpleanos,
            regalos y espacios cotidianos.
          </p>
          <div className="hero-panel__actions">
            <Link className="btn btn--primary" to="/catalogo">
              Ver catalogo
            </Link>
            <Link className="btn btn--secondary" to="/favoritos">
              Revisar wishlist
            </Link>
          </div>
        </div>

        <div className="hero-panel__visual">
          <div className="hero-panel__card hero-panel__card--primary">
            <span>Edicion destacada</span>
            <strong>Bridal Bouquet Lumiere</strong>
            <p>Paleta marfil, textura aireada y acabado premium para ceremonias intimas.</p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=1200&q=80"
            alt="Ramo de novia contemporaneo"
          />
        </div>
      </section>

      <FeatureStrip />

      <section className="content-section">
        <SectionIntro
          eyebrow="Best sellers"
          title="Arreglos destacados para regalo inmediato"
          copy="Una seleccion de composiciones con mejor rating, descuentos activos y visual premium."
        />

        {productsLoading ? (
          <>
            <Loader label="Cargando coleccion destacada" />
            <ProductSkeletonGrid count={4} />
          </>
        ) : (
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      <section className="content-section content-section--soft">
        <SectionIntro
          eyebrow="Categorias"
          title="Descubre colecciones creadas para cada momento"
          copy="Desde ramos cotidianos hasta arreglos de boda y gift sets curados."
        />
        <CategoryList />
      </section>

      <section className="content-section promotions-grid">
        {promotions.map((promotion) => (
          <article key={promotion.title} className="promo-card">
            <span className="pill">Nueva propuesta</span>
            <h3>{promotion.title}</h3>
            <p>{promotion.copy}</p>
          </article>
        ))}
      </section>

      <section className="content-section">
        <SectionIntro
          eyebrow="Opiniones"
          title="Una experiencia que se siente como tienda real"
          copy="Feedback de perfiles que valoran detalle visual, navegacion limpia y compra sin friccion."
          align="center"
        />
        <TestimonialList />
      </section>

      <NewsletterCard />
    </div>
  )
}