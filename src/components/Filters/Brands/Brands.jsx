import { useEffect, useState } from "react";
import styles from "./Brands.module.css";
import { getBrands } from "../../../api/api";
import Loader from "../../Loader/Loader";

function Brands({ onChange }) {
  let [brands, setBrands] = useState(null);

  useEffect(() => {
    getBrandsData();
  }, []);

  async function getBrandsData() {
    try {
      let brandsData = await getBrands();
      setBrands(brandsData);
    } catch (error) {
      console.error("Failed to fetch brands data:", error);
    }
  }
  return (
    <>
          {!brands && <Loader />}

      {brands && (
        <ul className={styles.brands}>
          {brands.map((brand, index) => (
            <li key={index}>
              <input
                type="radio"
                name="brand"
                value={brand}
                id={brand + index}
                onClick={(e) => onChange(e.target.value)}
              />
              <label htmlFor={brand + index}>{brand}</label>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default Brands;
