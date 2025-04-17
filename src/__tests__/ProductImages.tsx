import { render, screen, fireEvent } from '@testing-library/react'
import ProductImages from '@/components/ProductImages'
import mockProduct from '@/__mocks__/mockProduct'

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} />
  },
}))

describe('ProductImages', () => {
  beforeEach(() => {
    localStorage.setItem('products', JSON.stringify(mockProduct))
    localStorage.setItem('products_version', 'v2')

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        text: () =>
          Promise.resolve(
            JSON.stringify({ products: mockProduct, version: 'v2' })
          ),
      })
    ) as jest.Mock
  })

  afterEach(() => {
    localStorage.clear()
    jest.restoreAllMocks()
  })

  test('should display product images and allow thumbnail selection', async () => {
    render(<ProductImages />)

    const mainImage = await screen.findByRole('img', {
      name: /Product Image 1/i,
    })
    expect(mainImage).toHaveAttribute('src', mockProduct[0].image1)

    const thumbnails = screen.getAllByRole('img', { name: /Thumbnail/i })
    expect(thumbnails.length).toBeGreaterThan(0)

    fireEvent.click(thumbnails[1]) // click on second thumbnail
    const updatedImage = screen.getByRole('img', {
      name: /Product Image 2/i,
    })
    expect(updatedImage).toHaveAttribute('src', mockProduct[0].image2)
  })

  test('should display "Loading..." when there is no product data in localStorage', () => {
    localStorage.removeItem('products')
    localStorage.removeItem('products_version')

    render(<ProductImages />)

    expect(screen.getByText(/Loading.../i)).toBeInTheDocument()
  })
})
