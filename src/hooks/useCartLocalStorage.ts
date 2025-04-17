import { useEffect, useState } from 'react';

const useCartLocalStorage = (key: string) => {
    const [value, setValue] = useState(() => {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(key)
        return stored ? JSON.parse(stored) : []
      }
      return []
    })
  
    useEffect(() => {
      const handleStorageChange = () => {
        const stored = localStorage.getItem(key)
        setValue(stored ? JSON.parse(stored) : [])
      }
  
      window.addEventListener('storage', handleStorageChange)
      return () => window.removeEventListener('storage', handleStorageChange)
    }, [key])
  
    useEffect(() => {
      const interval = setInterval(() => {
        const stored = localStorage.getItem(key)
        const parsed = stored ? JSON.parse(stored) : []
        setValue(parsed)
      }, 500) // poll every 0.5 sec
  
      return () => clearInterval(interval)
    }, [key])
  
    return value
  }

export default useCartLocalStorage;