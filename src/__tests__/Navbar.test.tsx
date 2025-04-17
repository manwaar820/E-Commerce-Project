import Navbar from '@/components/Navbar'
import { render, screen } from '@testing-library/react'

describe('Navbar', () => {
  it('renders The navbar', async () => {
    render(<Navbar />)

    // screen.debug()
    const matches = await screen.findAllByText(/anwar/i)
    expect(matches.length).toBeGreaterThan(0)
  })
})
