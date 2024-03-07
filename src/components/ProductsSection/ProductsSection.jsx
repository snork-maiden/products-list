
import { useState } from 'react'
import Filters from '../Filters/Filters'
import Pagination from '../Pagination/Pagination'
import ProductsList from '../ProductsList/ProductsList'
import './ProductsSection.module.css'

function ProductsSection() {
    const [page, setPage] = useState(1)

  return (
    <section>
      <Filters/>
      <ProductsList/>
      <Pagination page={page} onChange={(page) => setPage(page)}/>
    </section>
  )
}

export default ProductsSection
