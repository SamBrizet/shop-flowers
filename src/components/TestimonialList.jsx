import { motion } from 'framer-motion'
import { testimonials } from '../data/content.js'

export default function TestimonialList() {
  return (
    <div className="testimonial-grid">
      {testimonials.map((testimonial, index) => (
        <motion.article
          key={testimonial.name}
          className="testimonial-card"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.22 }}
          transition={{ duration: 0.45, delay: index * 0.08 }}
        >
          <p>"{testimonial.quote}"</p>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.role}</span>
        </motion.article>
      ))}
    </div>
  )
}