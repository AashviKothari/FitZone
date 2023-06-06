import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductList.module.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    description: '',
    image: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    if (priceFilter === 'low') {
      return product.price < 50;
    }
    if (priceFilter === 'medium') {
      return product.price >= 50 && product.price <= 100;
    }
    if (priceFilter === 'high') {
      return product.price > 100;
    }
    return true; // If no filter selected, show all products
  });

  const handleInputChange = (e) => {
    setNewProduct({
      ...newProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/products', newProduct);
      setProducts([...products, response.data]);
      setNewProduct({
        name: '',
        price: '',
        description: '',
        image: '',
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.filterSection}>
        <h2>Product List</h2>
        {/* Filter component */}
        <div className={styles.filterContainer}>
          <label htmlFor="priceFilter">Price Filter:</label>
          <select
            id="priceFilter"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* Add new product form */}
        <form onSubmit={handleSubmit}>
          <h3>Add New Product</h3>
          <div>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={newProduct.name} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="price">Price:</label>
            <input type="number" id="price" name="price" value={newProduct.price} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <textarea id="description" name="description" value={newProduct.description} onChange={handleInputChange} />
          </div>
          <div>
            <label htmlFor="image">Image URL:</label>
            <input type="text" id="image" name="image" value={newProduct.image} onChange={handleInputChange} />
          </div>
          <button type="submit">Add Product</button>
        </form>
      </div>
      <div className={styles.productList}>
        {/* Product list */}
        {filteredProducts.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <h3>{product.name}</h3>
            <img src={product.image} alt={product.name} />
            <p>Price: ${product.price}</p>
            <p>{product.description}</p>
            {/* Add more product details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
