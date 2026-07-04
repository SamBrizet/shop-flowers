import { Suspense, lazy } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from './components/Loader.jsx'
import ScrollToTop from './components/ScrollToTop.jsx'
import AppShell from './layout/AppShell.jsx'

const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const CatalogPage = lazy(() => import('./pages/CatalogPage.jsx'))
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'))
const CartPage = lazy(() => import('./pages/CartPage.jsx'))
const WishlistPage = lazy(() => import('./pages/WishlistPage.jsx'))
const CheckoutPage = lazy(() => import('./pages/CheckoutPage.jsx'))
const ProfilePage = lazy(() => import('./pages/ProfilePage.jsx'))
const SuccessPage = lazy(() => import('./pages/SuccessPage.jsx'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'))

function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<Loader screen label="Preparando la boutique floral" />}>
        <Routes>
          <Route element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="catalogo" element={<CatalogPage />} />
            <Route path="producto/:productId" element={<ProductPage />} />
            <Route path="carrito" element={<CartPage />} />
            <Route path="favoritos" element={<WishlistPage />} />
            <Route path="checkout" element={<CheckoutPage />} />
            <Route path="perfil" element={<ProfilePage />} />
            <Route path="compra-exitosa" element={<SuccessPage />} />
            <Route path="inicio" element={<Navigate to="/" replace />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  )
}

export default App
