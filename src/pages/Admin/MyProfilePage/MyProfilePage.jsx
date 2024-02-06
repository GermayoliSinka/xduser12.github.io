import { useEffect, useState } from 'react';
import { api } from '../../../config/site.config.js';

export default function MyProfilePage() {
  const [products, setProducts] = useState([]);
  const loadProducts = () => {
    api
      .get('products')
      .then((response) => {
        setProducts(response.data.products);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    loadProducts();
  }, []);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2>My Profile Page</h2>
          <ul>
            {products.map((product, index) => (
              <li key={index}>{product.product_name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
