import React, { useState } from "react";
import axios from "axios";

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
      window.location = "/";
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
    <div>
      <h2>Login</h2>
      <form>
        <input
          type="email"
          value={data.email}
          onChange={handleChange}
          placeholder="Email"
          name="email"
        />
        <input
          type="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          name="password"
        />
        <button onClick={submit}>Submit</button>{" "}
      </form>
    </div>
  );
};

export default Login;
