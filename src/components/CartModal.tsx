'use client'

import Image from 'next/image'
import { useCart } from '../context/CartContext'
import useCartLocalStorage from '@/hooks/useCartLocalStorage'

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

const textColorMap: Record<string, string> = {
  red: 'text-red-500',
  blue: 'text-blue-500',
  green: 'text-green-500',
  black: 'text-black',
  white: 'text-white',
}

const CartModal = () => {
  const localCart = useCartLocalStorage('cart')
  const { clearCart } = useCart()

  if (!localCart) return <div>Loading...</div>

  // Calculate subtotal
  const subtotal = localCart.reduce((acc: number, item: CartItem) => {
    return acc + item.price * (item.quantity || 1) // Using the CartItem type
  }, 0)

  return (
    <div className="w-[90vw] sm:w-[28rem] absolute top-12 left-1/2 -translate-x-[98%] sm:left-auto sm:right-4 sm:translate-x-0 p-4 sm:p-6 rounded-md shadow-xl bg-white flex flex-col gap-6 z-20 max-h-[80vh] overflow-y-auto border-2 border-gray-300">
      {localCart.length === 0 ? (
        <div className="">Cart is Empty</div>
      ) : (
        <>
          <h2 className="text-xl">Shopping Cart</h2>
          {/* LIST */}
          <div className="flex flex-col gap-8">
            {/* ITEM */}
            {localCart.map((item: CartItem) => (
              <div key={item.id} className="flex gap-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  <div>
                    <div className="flex items-center justify-between gap-8">
                      <h3 className="font-semibold">{item.name}</h3>

                      <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
                        ${item.price}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 mt-2">
                      {item.selectedColor && (
                        <span>
                          Color:{' '}
                          <span
                            className={`${textColorMap[item.selectedColor]}`}
                          >
                            {item.selectedColor}
                          </span>{' '}
                        </span>
                      )}
                      {item.selectedSize && (
                        <span className="ml-2 px-2 py-1 rounded-full bg-main text-white text-xs font-medium">
                          Size: {item.selectedSize}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mt-2">
                      {item.description}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Qty. {item.quantity}</span>
                    <button
                      onClick={() => {
                        clearCart()
                      }}
                      className="text-blue-500 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* BOTTOM */}
          <div className="">
            <div className="flex items-center justify-between font-semibold">
              <span className="">Subtotal</span>
              <span className="">${subtotal.toFixed(2)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-2 mb-4">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 cursor-not-allowed ring-gray-300">
                View Cart
              </button>
              <button className="rounded-md py-3 px-4 bg-black text-white cursor-not-allowed disabled:opacity-75 ">
                Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default CartModal
