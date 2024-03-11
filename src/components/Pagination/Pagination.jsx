/* eslint-disable react/prop-types */

import styles from "./Pagination.module.css";

function Pagination({ page, onChange }) {
  return (
    <div className={styles.wrapper}>
      <button
        type="button"
        className={styles.paginate}
        onClick={() => onChange(page - 1)}
        disabled={page < 2}
      >
        Назад
      </button>
      <span className={styles.page}>{page}</span>
      <button
        type="button"
        className={styles.paginate}
        onClick={() => onChange(page + 1)}
      >
        Вперед
      </button>
    </div>
  );
}

export default Pagination;
