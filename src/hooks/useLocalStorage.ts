import { useEffect, useState, useCallback  } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  discountPrice: number;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  description: string;
  stock: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  Details: string;
}


const useLocalStorage = (key: string, fetchUrl: string) => {
  const [data, setData] = useState<Product[] | null>(null);

  // Memoize the fetchAndStoreData function to avoid unnecessary re-creations
  const fetchAndStoreData = useCallback(async () => {
    try {
      const res = await fetch(fetchUrl);
      const textData = await res.text();
      console.log('Raw response:', textData);

      if (!res.ok) {
        throw new Error(`Error fetching data: ${res.statusText}`);
      }

      const parsedData = JSON.parse(textData);
      console.log('Parsed data:', parsedData);

      const newVersion = parsedData.version || 'v1'; // fallback version
      const storedVersion = localStorage.getItem(`${key}_version`);

      if (newVersion !== storedVersion) {
        console.log('Version changed or not found. Updating local storage.');

        const products = parsedData.products || parsedData;

        // Validate product prices using the Product type
        products.forEach((item: Product) => {
          if (isNaN(item.price)) {
            console.warn(`Invalid price for product ${item.name}:`, item.price);
            item.price = 0;
          }
        });

        // Save to local storage
        localStorage.setItem(key, JSON.stringify(products));
        localStorage.setItem(`${key}_version`, newVersion);
        setData(products);
      } else {
        // Version is the same, load from local storage
        const storedData = localStorage.getItem(key);
        if (storedData) {
          setData(JSON.parse(storedData));
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [fetchUrl, key]); // Add dependencies for fetchAndStoreData

  // Use the memoized version of fetchAndStoreData
  useEffect(() => {
    fetchAndStoreData();
  }, [fetchAndStoreData]); // Add fetchAndStoreData as a dependency

  return data;
};

export default useLocalStorage;