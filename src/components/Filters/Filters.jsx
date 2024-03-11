import "./Filters.module.css";
import Brands from "../Brands/Brands";
import Prices from "../Prices/Prices";

function Filters({ onFilterChange }) {
  function handleSubmit(e) {
    e.preventDefault();
    const searchText = e.target.elements.search.value;
    onFilterChange({ product: searchText });
  }

  return (
    <div className="filters">
      Поиск по (табы или селекты) Бренд, название, цена
      <form method="post" onSubmit={handleSubmit}>
        <input type="search" name="search" id="search" />
        <button type="submit">Поиск</button>
      </form>
      <Prices onChange={(value) => onFilterChange({ prices: value })} />
      <Brands onChange={(value) => onFilterChange({ brands: value })} />
    </div>
  );
}

export default Filters;
