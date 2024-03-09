import styles from './ProductItem.module.css';

function ProductItem({product}) {
  return (
    <article className={styles.product}>
      <h2 className={styles.title}>{product.product}</h2>
      {product.brand && 
      <div className={styles.brand}>{product.brand}</div>
      }
      <span className={styles.price}>{product.price} рублей</span>
    </article>
  )
}

export default ProductItem;
