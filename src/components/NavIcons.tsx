'use client'

import Image from 'next/image'
import { useState } from 'react'
import CartModal from './CartModal'
import useCartLocalStorage from '@/hooks/useCartLocalStorage'

const NavIcons = () => {
  const cart = useCartLocalStorage('cart')

  const [isCartOpen, setIsCartOpen] = useState(false)
  return (
    <div className="flex items-center gap-4 xl:gap-6 relative">
      <div
        className="relative cursor-pointer"
        onClick={() => setIsCartOpen((prev) => !prev)}
        role="button"
        aria-label="cart"
      >
        <Image src="/cart.png" alt="" width={22} height={22} />
        <div className="absolute -top-4 -right-4 w-6 h-6 bg-main rounded-full text-white text-sm flex items-center justify-center">
          {cart && cart.length > 0 ? cart[0].id : 0}
        </div>
      </div>
      {isCartOpen && <CartModal />}
    </div>
  )
}

export default NavIcons
