
import ProductItem from '../ProductItem/ProductItem'
import './ProductsList.module.css'

function ProductsList() {
  let productsList = [1]

  return (
    <ul className="products">
      {

      productsList.map((product)=> (
        <ProductItem key={product.id}/>
      ))
      }
    </ul>
  )
}

export default ProductsList
