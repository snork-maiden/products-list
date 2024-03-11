import { useEffect, useMemo, useState } from "react";
import styles from "./Prices.module.css";
import { getProductsPrices } from "../../../api/api";
import Loader from "../../Loader/Loader";

function Prices({ onChange }) {
  let [output, setOutput] = useState(null);
  let [prices, setPrices] = useState(null);

  useEffect(() => {
    getPrices();
  }, []);

  async function getPrices() {
    try {
      let pricesData = await getProductsPrices();
      pricesData.sort((a, b) => a - b);
      setPrices(pricesData);
    } catch (error) {
      console.error("Failed to fetch filter data:", error);
    }
  }

  let minPrice = useMemo(() => (prices ? prices[0] : null), [prices]);
  let maxPrice = useMemo(() => (prices ? prices.at(-1) : null), [prices]);

  function calculatePrice(e) {
    const number = +e.target.value;

    if (prices.includes(number)) {
      setOutput(number);
      return;
    }

    const result = binarySearchClosest(prices, number, 0, prices.length - 1);
    setOutput(result);

    function binarySearchClosest(arr, x, start, end) {
      if (end - start <= 1) {
        if (arr[end] === arr.at(-1)) return arr[end - 1];
        if (arr[start] === arr[0]) return arr[start + 1];

        if (start === end) {
          return arr[start];
        }
        return Math.abs(x - end) < Math.abs(x - start) ? arr[end] : arr[start];
      }

      let mid = Math.floor((start + end) / 2);

      if (arr[mid] > x) {
        return binarySearchClosest(arr, x, start, mid - 1);
      }

      return binarySearchClosest(arr, x, mid + 1, end);
    }
  }

  return (
    <>
      {!prices && <Loader />}
      {prices && (
        <>
          <div className={styles.wrapper}>
            <span className={styles.price}>{minPrice}</span>
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              className={styles.slider}
              onChange={calculatePrice}
              onMouseUp={() => onChange(output)}
            />
            <span className={styles.price}>{maxPrice}</span>
          </div>
          {output && <div className={styles.output}>{output}</div>}
        </>
      )}
    </>
  );
}

export default Prices;
