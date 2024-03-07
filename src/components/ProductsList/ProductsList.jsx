/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import ProductItem from '../ProductItem/ProductItem'
import './ProductsList.module.css'
import { getProductsItems } from '../../api/api';

function ProductsList({page}) {
  let [productsList, setProductsList] = useState([])

  useEffect(() => {
    getProducts()
  }, []); 

async function getProducts() {
  const products = await getProductsItems(page)
  console.log(products)
  setProductsList(products)
}

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
