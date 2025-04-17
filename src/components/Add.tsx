'use client'

import { useCart } from '../context/CartContext'
import { useState } from 'react'
import useLocalStorage from '@/hooks/useLocalStorage'
import useCartLocalStorage from '@/hooks/useCartLocalStorage'

const colorClasses: { [key: string]: string } = {
  red: 'bg-red-500',
  blue: 'bg-blue-500',
}
type CartItem = {
  id: number
  name: string
  price: number
  image: string
  description: string
  quantity: number
  selectedColor?: string
  selectedSize?: string
}

const Add = () => {
  const [quantity, setQuantity] = useState(1)
  const [selectedColor, setSelectedColor] = useState('red')
  const [selectedSize, setSelectedSize] = useState('small')
  const localCart = useCartLocalStorage('cart')

  const data = useLocalStorage('products', '/products.json')
  const { addToCart } = useCart()

  if (!data) return <div>Loading...</div>

  const product = data[0]

  const handleQuantity = (type: 'i' | 'd') => {
    if (type === 'd' && quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
    if (type === 'i' && quantity < product.stock) {
      setQuantity((prev) => prev + 1)
    }
    if (product.stock <= 0) return
  }

  const handleAddToCart = () => {
    // console.log('Adding product to cart:', {
    //   id: product.id,
    //   name: product.name,
    //   price: product.discountPrice,
    //   image: product.image1 || '/default-image.jpg',
    //   description: product.description,
    //   quantity,
    //   selectedColor,
    //   selectedSize,
    // })

    addToCart({
      id: product.id,
      name: product.name,
      price: product.discountPrice,
      image: product.image1 || '/default-image.jpg',
      description: product.description,
      quantity,
      selectedColor,
      selectedSize,
    })
  }

  return (
    <div className="flex flex-col gap-4">
      {/* COLOR SELECTION */}
      <div className="flex flex-col gap-6">
        <h4 className="font-medium">Choose a Color</h4>
        <ul className="flex items-center gap-3">
          {['red', 'blue'].map((color) => (
            <li
              key={color}
              className={`w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-pointer relative ${
                colorClasses[color]
              } ${selectedColor === color ? 'ring-4 ring-main' : ''}`}
              onClick={() => {
                setSelectedColor(color) // Set the selected color
              }}
            />
          ))}
          <li className="w-8 h-8 rounded-full ring-1 ring-gray-300 cursor-not-allowed relative">
            <div className="absolute w-10 h-[2px] bg-red-400 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
          </li>
        </ul>

        <h4 className="font-medium">Choose a Size</h4>
        <ul className="flex items-center gap-3">
          {['Small', 'Medium'].map((size) => (
            <li
              key={size}
              onClick={() => {
                setSelectedSize(size) // Set the selected size
              }}
              className={`ring-1 rounded-md py-1 px-4 text-sm cursor-pointer ${
                selectedSize === size
                  ? 'bg-main text-white ring-main'
                  : 'ring-main text-main'
              }`}
            >
              {size}
            </li>
          ))}
          <li className="ring-1 ring-pink-200 text-white bg-pink-200 rounded-md py-1 px-4 text-sm cursor-not-allowed">
            Large
          </li>
        </ul>
      </div>
      {/* QUANTITY AND ADD TO CART */}
      <h4 className="font-medium">Choose a Quantity</h4>
      <div className="flex justify-between">
        <div className="flex items-center gap-4">
          <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              disabled={quantity === 1}
              onClick={() => handleQuantity('d')}
            >
              -
            </button>
            {quantity}
            <button
              className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
              disabled={quantity === product.stock}
              onClick={() => handleQuantity('i')}
            >
              +
            </button>
          </div>
          <div className="text-xs">
            Only <span className="text-orange-500">4 items</span> left!
            <br /> {"Don't"} miss it
          </div>
        </div>
        <button
          className="cursor-pointer w-36 text-sm rounded-3xl ring-1 ring-main text-main py-2 px-4 hover:bg-main hover:text-white disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-0 disabled:text-white disabled:ring-none"
          onClick={handleAddToCart}
        >
          {localCart.some((cartItem: CartItem) => cartItem.id === product.id)
            ? 'Update Cart'
            : 'Add to Cart'}
        </button>
      </div>
    </div>
  )
}
export default Add
