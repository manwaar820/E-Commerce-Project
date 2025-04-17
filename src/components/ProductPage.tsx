'use client'
import Add from '@/components/Add'
import { useState } from 'react'
import ProductImages from '@/components/ProductImages'
import useLocalStorage from '@/hooks/useLocalStorage'

const ProductPage = () => {
  const data = useLocalStorage('products', '/products.json')
  const [expanded, setExpanded] = useState<{ [key: number]: boolean }>({})

  if (!data) return <div>Loading...</div>

  const product = data[0]

  const texts = product ? [product.Details].filter(Boolean) : []

  const toggleExpand = (index: number) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }))
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 relative flex flex-col lg:flex-row gap-16">
      {/* IMG */}
      <div className="w-full lg:w-1/2 lg:sticky top-20 h-max">
        <ProductImages />
      </div>
      {/* TEXTS */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-4xl font-medium">{product.name}</h1>
        <p className="text-gray-500">{product.description}</p>
        <div className="flex items-center gap-4">
          <h3 className="text-xl text-gray-500 line-through">
            ${product.price}
          </h3>
          <h2 className="font-medium text-2xl">
            ${(product.price * 0.9).toFixed(2)}
          </h2>
        </div>
        <div className="h-[2px] bg-gray-100" />
        <Add />
        <div className="h-[2px] bg-gray-100" />

        {/* Loop through texts and make each expandable */}

        {texts.map((text: string, i: number) => (
          <div key={i} className="text-sm">
            <h4
              className="font-medium mb-4 text-main text-2xl 
            "
            >
              About {product.name} {/* Update to use product.name here */}
            </h4>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam
              voluptas et, veniam animi provident dolor cumque exercitationem
              autem quod incidunt, quia eius ab quibusdam quasi explicabo modi
              commodi reiciendis voluptate.{' '}
            </p>
            {expanded[i] && (
              <p className="transition-all duration-300 ease-in-out">{text}</p>
            )}
            <span
              className="font-medium mb-4 cursor-pointer text-main"
              onClick={() => toggleExpand(i)}
            >
              {expanded[i] ? 'Close' : 'Read More...'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
export default ProductPage
