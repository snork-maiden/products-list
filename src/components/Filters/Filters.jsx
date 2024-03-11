import styles from "./Filters.module.css";
import Brands from "./Brands/Brands";
import Prices from "./Prices/Prices";
import { useState } from "react";

function Filters({ onFilterChange }) {
  let [openedFilter, setOpenedFilter] = useState(null);
  function handleSubmit(e) {
    e.preventDefault();
    const searchText = e.target.elements.search.value;
    onFilterChange({ product: searchText });
  }

  function getTabClasses(filterName) {
    return (
      styles.tab + (openedFilter === filterName && " " + styles.tabActive) || ""
    );
  }

  return (
    <section className={styles.filters}>
      <h2 className="title">Искать по:</h2>
      <button
        className={getTabClasses("search")}
        onClick={() => setOpenedFilter("search")}
      >
        названию
      </button>
      <button
        className={getTabClasses("price")}
        onClick={() => setOpenedFilter("price")}
      >
        цене
      </button>
      <button
        className={getTabClasses("brand")}
        onClick={() => setOpenedFilter("brand")}
      >
        бренду
      </button>

      {openedFilter === "search" && (
        <form method="post" onSubmit={handleSubmit}>
          <input type="search" name="search" id="search" />
          <button type="submit">Поиск</button>
        </form>
      )}
      {openedFilter === "price" && (
        <Prices onChange={(value) => onFilterChange({ price: value })} />
      )}
      {openedFilter === "brand" && (
        <Brands onChange={(value) => onFilterChange({ brand: value })} />
      )}
    </section>
  );
}

export default Filters;
