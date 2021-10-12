import React, { useState, useEffect } from "react";
import "../styles.css";
import API from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProduct = () => {
    getProducts().then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
        console.log(error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);
  return (
    <Base title="Home Page" description="Welcome To The Tshirt Store">
      <div className="row text-center">
        <div className="col-12">
          <h1 className="text-white mb-4">All of tshirts</h1>
        </div>
        {products.map((product, index) => (
          <div className="col-4" key={index}>
            <Card product={product} />
          </div>
        ))}
      </div>
    </Base>
  );
};
export default Home;
