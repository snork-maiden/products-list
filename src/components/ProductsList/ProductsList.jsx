import { useCallback, useEffect, useState } from "react";
import ProductItem from "../ProductItem/ProductItem";
import styles from "./ProductsList.module.css";
import { getFilteredItems, getProductsItems } from "../../api/api";
import Loader from "../Loader/Loader";

function ProductsList({ page, filter }) {
  let [productsList, setProductsList] = useState(null);
  let [isLoading, setIsLoading] = useState(true);

  const getProducts = useCallback(async () => {
    setIsLoading(true);
    const products = await getProductsItems(page);
    if (!products) return;
    setProductsList(products);
    setIsLoading(false);
  }, [page]);

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  async function getFilteredProducts(filter) {
    setIsLoading(true);
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
  }, [page, filter, getProducts]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && productsList && productsList.length > 0 && (
        <ul className={styles.products}>
          {productsList.map((product) => (
            <li className={styles.card} key={product.id}>
              <ProductItem product={product} />
            </li>
          ))}
        </ul>
      )}
      {!isLoading && !productsList.length && (
        <p className="notFound">Ничего не нашлось :(</p>
      )}
    </>
  );
}

export default ProductsList;
