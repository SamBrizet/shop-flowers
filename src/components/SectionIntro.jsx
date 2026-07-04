import { motion } from 'framer-motion'

export default function SectionIntro({ eyebrow, title, copy, align = 'left' }) {
  return (
    <motion.div
      className={`section-intro section-intro--${align}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.5 }}
    >
      {eyebrow ? <p className="section-intro__eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </motion.div>
  )
}