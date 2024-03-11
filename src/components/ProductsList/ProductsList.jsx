/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductsList.module.css";
import { getFilteredItems, getProductsItems } from "../../api/api";

function ProductsList({ page, filter }) {
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

  async function getFilteredProducts(filter) {
    setIsLoading(true);
    console.log(5, filter)
    const products = await getFilteredItems(filter);
    if (!products) return;
    setProductsList(products);
    setIsLoading(false);
  }

  useEffect(() => {
    if (!filter) {
      getProducts();
      return;
    }
    getFilteredProducts(filter);
  }, [page, filter]);

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
