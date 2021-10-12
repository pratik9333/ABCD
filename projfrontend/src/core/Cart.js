import React, { useState, useEffect } from "react";
import "../styles.css";
import API from "../backend";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/cartHelper";

import { Paymentb } from "./paymentb";

const Cart = () => {
  const [products, setProducts] = useState([]);

  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This Section is to load products</h2>
        {products
          ? products.map((product, index) => (
              <Card
                key={index}
                product={product}
                removeFromCart={true}
                addtoCart={false}
                setReload={setReload}
                reload={reload}
              />
            ))
          : "No Products Found"}
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready To Checkout">
      <div className="row text-center">
        <div className="col-6">{loadAllProducts(products)}</div>
        <div className="col-6">
          <Paymentb products={products} setReload={setReload} />
        </div>
      </div>
    </Base>
  );
};
export default Cart;
