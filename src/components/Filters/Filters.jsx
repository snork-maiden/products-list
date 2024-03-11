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

  function resetFilter() {
    setOpenedFilter(null);
    onFilterChange(null);
  }

  return (
    <section className={styles.filters}>
      <h2 className={styles.title}>Искать по:</h2>
      <div className={styles.tabs}>
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
      </div>
      {openedFilter && (
        <>
          <div className={styles.filterWrapper}>
            {openedFilter === "search" && (
              <form method="post" onSubmit={handleSubmit} className={styles.form}>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className={styles.search}
                />
                <button type="submit" className={styles.submit}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#8a8559"
                      fillRule="evenodd"
                      d="M22.5 16.9 17 22.5a1 1 0 1 1-1.4-1.4l4-4.1H9a1 1 0 0 1 0-2h10.6l-4.1-4.1a1 1 0 1 1 1.4-1.4l5.6 5.6c.3.3.4.6.3.9 0 .3 0 .6-.3.9ZM16 0a16 16 0 1 0 0 32 16 16 0 0 0 0-32Z"
                    />
                  </svg>
                </button>
              </form>
            )}
            {openedFilter === "price" && (
              <Prices onChange={(value) => onFilterChange({ price: value })} />
            )}
            {openedFilter === "brand" && (
              <Brands onChange={(value) => onFilterChange({ brand: value })} />
            )}
          </div>

          <button type="button" className={styles.reset} onClick={resetFilter}>
            Очистить фильтр
          </button>
        </>
      )}
    </section>
  );
}

export default Filters;
