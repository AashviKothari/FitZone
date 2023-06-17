import React from 'react'
import Draggable from 'react-draggable';
import Slider from 'react-slider';
import styles from './ProductList.module.css'
import axios from 'axios'
import Navbar from './Navbar.jsx'
import { useEffect, useState } from 'react';
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [priceFilter, setPriceFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

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
    if (categoryFilter !== '') {
      return product.category && product.category.toLowerCase().includes(categoryFilter.toLowerCase());
    }
    return true; // If no filters selected, show all products
  });
  const handleSliderChange = (value) => {
    // Handle slider value change
    // You can update the state or perform any other logic based on the slider value
  };
  
  return (
    <div className={styles.container}>
    <Navbar/>
    <div className={styles.contain_divide}>
    <div className={styles.left}>
      <div className={styles.left_card}>
        <div className={styles.Pro_Cat}>
          <div className={styles.pr_ca_heading}>
            <h2>Product Category</h2>
          </div>

          <div className={styles.checkbox_group}>
                <label>
                  <input type="checkbox" value="Option 1" /> Option 1
                </label>
                <label>
                  <input type="checkbox" value="Option 2" /> Option 2
                </label>
                <label>
                  <input type="checkbox" value="Option 3" /> Option 3
                </label>
                <label>
                  <input type="checkbox" value="Option 4" /> Option 4
                </label>
              </div>

        </div>

        <div className={styles.Fil_Price}>
        <div className={styles.filter_head}>
          <h2>Filter By Price</h2>
        </div>
        
        </div>
      </div>
    </div>
    <div className={styles.right}>
      <div className={styles.right_card}>
        <div className={styles.pro_container}>
          
        <div className={styles.productList}>
            {/* Product list */}
            {filteredProducts.map((product) => (
              <div key={product._id} className={styles.productCard}>
                <div className={styles.imageContainer}>
                  <img src={product.image} alt={product.name} />
                </div>
                <h3>{product.name}</h3>
                <div className={styles.detailsContainer}>
                  <p>Price: ${product.price}</p>
                  <p>{product.description}</p>
                </div>
                <div className={styles.buttonContainer}>
                  {/* <button>-</button> */}
                  <button className={styles.addToCartButton}>Add to Cart</button>
                  {/* <button>+</button> */}
                </div>
              </div>
            ))}
          </div>
  
        </div>
      </div>    
    </div>
    </div>
    </div>
  )
}

export default ProductList
