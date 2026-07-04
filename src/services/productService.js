const SIMULATED_DELAY = 520

function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

export async function getProducts() {
  await wait(SIMULATED_DELAY)
  const { default: products } = await import('../data/products.json')
  return products
}