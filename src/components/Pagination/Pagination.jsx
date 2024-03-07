

import './Pagination.module.css'

function Pagination({page, onChange}) {

  return (
    <div className="wrapper">
      <button type="button" className="paginate" onClick={() => onChange(page-1)}> Назад </button>
      {page}
      <button type="button" className="paginate" onClick={() => onChange(page+1)}>Вперед</button>
    </div>
  )
}

export default Pagination
