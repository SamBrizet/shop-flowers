import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { ShopContext } from './shopContextObject.js'
import { getProducts } from '../services/productService.js'

const STORAGE_KEYS = {
  cart: 'shop-flowers-cart',
  wishlist: 'shop-flowers-wishlist',
  orders: 'shop-flowers-orders',
  profile: 'shop-flowers-profile',
  theme: 'shop-flowers-theme',
}

const defaultProfile = {
  name: 'Samanta Bloom',
  email: 'samanta@shopflowers.dev',
  phone: '+51 922 013 597',
  address: 'Miraflores, Lima, Peru',
}

function readStorage(key, fallback) {
  try {
    const rawValue = window.localStorage.getItem(key)
    return rawValue ? JSON.parse(rawValue) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value))
}

export function ShopProvider({ children }) {
  const [products, setProducts] = useState([])
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsError, setProductsError] = useState('')
  const [cart, setCart] = useState(() => readStorage(STORAGE_KEYS.cart, []))
  const [wishlist, setWishlist] = useState(() => readStorage(STORAGE_KEYS.wishlist, []))
  const [orders, setOrders] = useState(() => readStorage(STORAGE_KEYS.orders, []))
  const [profile, setProfile] = useState(() => readStorage(STORAGE_KEYS.profile, defaultProfile))
  const [theme, setTheme] = useState(() => readStorage(STORAGE_KEYS.theme, 'light'))
  const [toast, setToast] = useState({ open: false, message: '' })
  const toastTimer = useRef(null)

  const showToast = useCallback((message) => {
    setToast({ open: true, message })
    window.clearTimeout(toastTimer.current)
    toastTimer.current = window.setTimeout(() => {
      setToast({ open: false, message: '' })
    }, 2600)
  }, [])

  const loadProducts = useCallback(async () => {
    setProductsLoading(true)
    setProductsError('')

    try {
      const items = await getProducts()
      setProducts(items)
    } catch {
      setProductsError('No pudimos cargar el catalogo floral. Intenta nuevamente.')
    } finally {
      setProductsLoading(false)
    }
  }, [])

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadProducts()
    }, 0)

    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(toastTimer.current)
    }
  }, [loadProducts])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.cart, cart)
  }, [cart])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.wishlist, wishlist)
  }, [wishlist])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.orders, orders)
  }, [orders])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.profile, profile)
  }, [profile])

  useEffect(() => {
    writeStorage(STORAGE_KEYS.theme, theme)
    document.documentElement.dataset.theme = theme
  }, [theme])

  const wishlistSet = useMemo(() => new Set(wishlist), [wishlist])

  const cartItemsDetailed = useMemo(
    () =>
      cart
        .map((entry) => {
          const product = products.find((item) => item.id === entry.productId)

          if (!product) {
            return null
          }

          return {
            ...entry,
            product,
            lineTotal: product.precio * entry.quantity,
          }
        })
        .filter(Boolean),
    [cart, products],
  )

  const cartCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart],
  )

  const cartSubtotal = useMemo(
    () => cartItemsDetailed.reduce((total, item) => total + item.lineTotal, 0),
    [cartItemsDetailed],
  )

  const cartSavings = useMemo(
    () =>
      cartItemsDetailed.reduce(
        (total, item) => total + (item.product.precioAnterior - item.product.precio) * item.quantity,
        0,
      ),
    [cartItemsDetailed],
  )

  const cartTotal = useMemo(() => cartSubtotal, [cartSubtotal])

  const featuredProducts = useMemo(
    () =>
      [...products]
        .sort((left, right) => right.popularidad - left.popularidad || right.rating - left.rating)
        .slice(0, 8),
    [products],
  )

  const addToCart = useCallback(
    (productId, quantity = 1) => {
      setCart((current) => {
        const existingItem = current.find((item) => item.productId === productId)

        if (existingItem) {
          return current.map((item) =>
            item.productId === productId
              ? { ...item, quantity: Math.min(item.quantity + quantity, 12) }
              : item,
          )
        }

        return [...current, { productId, quantity }]
      })

      showToast('Producto agregado al carrito')
    },
    [showToast],
  )

  const updateQuantity = useCallback((productId, quantity) => {
    setCart((current) =>
      current
        .map((item) =>
          item.productId === productId ? { ...item, quantity: Math.min(Math.max(quantity, 1), 12) } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeFromCart = useCallback(
    (productId) => {
      setCart((current) => current.filter((item) => item.productId !== productId))
      showToast('Producto eliminado del carrito')
    },
    [showToast],
  )

  const clearCart = useCallback(() => {
    setCart([])
    showToast('Carrito vaciado')
  }, [showToast])

  const toggleWishlist = useCallback(
    (productId) => {
      setWishlist((current) => {
        const exists = current.includes(productId)

        if (exists) {
          showToast('Producto eliminado de favoritos')
          return current.filter((item) => item !== productId)
        }

        showToast('Producto guardado en favoritos')
        return [...current, productId]
      })
    },
    [showToast],
  )

  const updateProfile = useCallback((payload) => {
    setProfile((current) => ({ ...current, ...payload }))
  }, [])

  const placeOrder = useCallback(
    (checkoutData) => {
      const createdOrder = {
        id: `SF-${Date.now()}`,
        createdAt: new Date().toISOString(),
        total: cartTotal,
        items: cartItemsDetailed.map((item) => ({
          productId: item.productId,
          quantity: item.quantity,
          total: item.lineTotal,
          name: item.product.nombre,
          image: item.product.imagen,
        })),
        customer: checkoutData,
      }

      setOrders((current) => [createdOrder, ...current])
      updateProfile({
        name: checkoutData.name,
        email: checkoutData.email,
        phone: checkoutData.phone,
        address: checkoutData.address,
      })
      setCart([])
      showToast('Compra registrada con exito')

      return createdOrder
    },
    [cartItemsDetailed, cartTotal, showToast, updateProfile],
  )

  const toggleTheme = useCallback(() => {
    setTheme((current) => (current === 'light' ? 'dark' : 'light'))
  }, [])

  const value = useMemo(
    () => ({
      addToCart,
      cart,
      cartCount,
      cartItemsDetailed,
      cartSavings,
      cartSubtotal,
      cartTotal,
      clearCart,
      featuredProducts,
      loadProducts,
      orders,
      placeOrder,
      products,
      productsError,
      productsLoading,
      profile,
      removeFromCart,
      showToast,
      theme,
      toast,
      toggleTheme,
      toggleWishlist,
      updateProfile,
      updateQuantity,
      wishlist,
      wishlistSet,
    }),
    [
      addToCart,
      cart,
      cartCount,
      cartItemsDetailed,
      cartSavings,
      cartSubtotal,
      cartTotal,
      clearCart,
      featuredProducts,
      loadProducts,
      orders,
      placeOrder,
      products,
      productsError,
      productsLoading,
      profile,
      removeFromCart,
      showToast,
      theme,
      toast,
      toggleTheme,
      toggleWishlist,
      updateProfile,
      updateQuantity,
      wishlist,
      wishlistSet,
    ],
  )

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>
}
