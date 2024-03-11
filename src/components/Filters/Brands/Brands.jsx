import { useEffect, useState } from "react";
import "./Brands.module.css";
import { getBrands } from "../../../api/api";

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
      {brands && (
        <>
          <h3 className="title">Бренды</h3>

          <ul className="brands">
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
        </>
      )}
    </>
  );
}

export default Brands;
