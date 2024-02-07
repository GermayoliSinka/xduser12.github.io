import { useState, useEffect } from 'react';
import axios from 'axios';

const ProductTableComponent = () => {
  // states
  const [products, setProducts] = useState([]);

  // load products
  const loadProducts = () => {
    axios
      .get('https://example-data.draftbit.com/products?_limit=10')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => console.log(error));
  };

  // effects
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Description</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={index}>
            <td>{product.name}</td>
            <td>{product.description}</td>
            <td>{product.sale_price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default ProductTableComponent;
