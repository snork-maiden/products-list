/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductsList.module.css";
import { getProductsItems } from "../../api/api";

function ProductsList({ page }) {
  let [productsList, setProductsList] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProducts();
  }, []);

  async function getProducts() {
    setIsLoading(true);
    const products = await getProductsItems(page);
    if (!products) return;
    setProductsList(products);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
  }, [page]);

  return (
    <>
      {isLoading && <p>Is Loading</p>}
      {!isLoading && productsList && (
        <ul className={styles.products}>
          {productsList.map((product) => (
            <li className={styles.card} key={product.id}>
              <ProductItem product={product} />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default ProductsList;
