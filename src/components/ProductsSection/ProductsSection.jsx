import { useState } from "react";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import ProductsList from "../ProductsList/ProductsList";
import styles from "./ProductsSection.module.css";

function ProductsSection() {
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState(null);

  function onFilterChange(filter) {
    setPage(1);
    setFilter(filter);
  }

  return (
    <section className={styles.products}>
      <Filters onFilterChange={(filter) => onFilterChange(filter)} />
      <ProductsList page={page} filter={filter} />
      {!filter && <Pagination page={page} onChange={(page) => setPage(page)} />}
    </section>
  );
}

export default ProductsSection;
