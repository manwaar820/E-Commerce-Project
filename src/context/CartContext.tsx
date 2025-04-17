'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'

type Product = {
  id: number
  name: string
  price: number
  image: string
  description: string
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

type CartContextType = {
  cart: Product[]
  addToCart: (product: Product) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([])

  // Fetch cart from localStorage when the provider is mounted
  useEffect(() => {
    const storedCart = localStorage.getItem('cart')
    if (storedCart) {
      setCart(JSON.parse(storedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (cart.length > 0) {
      // console.log('Saving cart to localStorage:', cart)
      localStorage.setItem('cart', JSON.stringify(cart))
    }
  }, [cart])

  // Add to cart function
  const addToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id)
      if (exists) {
        return prev.map((p) =>
          p.id === product.id
            ? {
                ...p,
                quantity: product.quantity,
                selectedColor: product.selectedColor,
                selectedSize: product.selectedSize,
              }
            : p
        )
      }
      return [
        ...prev,
        {
          ...product,
          quantity: product.quantity,
          selectedColor: product.selectedColor,
          selectedSize: product.selectedSize,
        },
      ]
    })
    console.log('Current Cart', product)
    // Store the updated cart in localStorage
    localStorage.setItem('cart', JSON.stringify(cart))
  }

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id))
  }

  const clearCart = () => {
    setCart([])
    localStorage.removeItem('cart') // Clear from localStorage as well
    console.log('Cart removed')
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
