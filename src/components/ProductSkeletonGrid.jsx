export default function ProductSkeletonGrid({ count = 4 }) {
  return (
    <div className="product-grid" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <article key={`skeleton-${index}`} className="product-card product-card--skeleton">
          <div className="skeleton skeleton--image"></div>
          <div className="product-card__body">
            <div className="skeleton skeleton--line skeleton--short"></div>
            <div className="skeleton skeleton--line"></div>
            <div className="skeleton skeleton--line skeleton--medium"></div>
            <div className="skeleton skeleton--button"></div>
          </div>
        </article>
      ))}
    </div>
  )
}