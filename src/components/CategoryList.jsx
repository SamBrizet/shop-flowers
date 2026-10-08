import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { categoryCards } from '../data/content.js'

export default function CategoryList() {
  return (
    <div className="category-grid">
      {categoryCards.map((category, index) => (
        <motion.article
          key={category.name}
          className="category-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: index * 0.06 }}
        >
          <Link className="category-card__link" to={`/catalogo?categoria=${encodeURIComponent(category.category)}`}>
            <img src={category.image} alt={category.name} loading="lazy" />
            <div>
              <h3>{category.name}</h3>
            </div>
          </Link>
        </motion.article>
      ))}
    </div>
  )
}