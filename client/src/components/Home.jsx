import React from "react";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.home}>
      <div className={styles.left}>
        <div className={styles.head}>
          <h1 className={styles.title}>
            Welcome to <span>ShoperSpot</span>
          </h1>
        </div>
        <p className={styles.line}>All Your Favourites in one place!</p>
      </div>

      <div className={styles.right}>
        <div className={styles.getStart}>
           <a href="/login"><p>Get Started!</p></a> 
        </div>
      </div>
    </div>
  );
};

export default Home;
