import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ProductList.module.css';

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

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        <div className={`${styles.section} ${styles.section1}`}>
          <div className={styles.head_img}>
            <img src="https://marketplace.canva.com/EAFSUH0EweU/1/0/1600w/canva-black-elegant-personal-linkedin-banner-eEN5zzEf5VA.jpg" alt="Promotional Banner" />
          </div>
        </div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.section} ${styles.section2}`}>Section 2</div>
      </div>
      <div className={styles.column}>
        <div className={`${styles.section} ${styles.section3}`}>
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
  );
};

export default ProductList;
