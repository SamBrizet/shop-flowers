import { useContext } from 'react'
import { ShopContext } from './shopContextObject.js'

export function useShop() {
  const context = useContext(ShopContext)

  if (!context) {
    throw new Error('useShop debe usarse dentro de ShopProvider')
  }

  return context
}