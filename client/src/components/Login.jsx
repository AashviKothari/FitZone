import React, { useState } from "react";
import axios from "axios";
import styles from "./Login.module.css";

const Login = () => {
  const [error, setError] = useState("");
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      const url = "http://localhost:5000/api/users/login";
      const { data: res } = await axios.post(url, data);

      localStorage.setItem("token", res.data);
      window.location = "/products";
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.login}>
      <div className={styles.main_card}>
        <div className={styles.left}></div>
        <div className={styles.right}>
          <form>
            <h2 className={styles.title}>Login</h2>
            <input
              type="email"
              value={data.email}
              onChange={handleChange}
              placeholder="Email"
              name="email"
              className={styles.inputx}
            />
            <input
              type="password"
              value={data.password}
              onChange={handleChange}
              placeholder="Password"
              name="password"
              className={styles.inputx}
            />
            <button onClick={submit} className={styles.buttonx}>Submit</button>{" "}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
