import React, { useState, useEffect } from 'react'

const Pagination = ({ length, rangeHandler }) => {
  let [data, setData] = useState(dataInit)
  let [page, setPage] = useState(1)
  let { pages, display, min, max } = data

  useEffect(() => {
    if (length > 0) {
      max = page * display
      min = max - display
      pages = Math.ceil(length / display)
    }

    setPage(page > pages ? pages : page)
    rangeHandler({ min, max })
    setData({ ...data, pages, min, max })
  }, [length, display, page])

  const nextPage = () => {
    page++
    if (page > pages) page = 1
    setPage(page)
  }
  const previousPage = () => {
    page--
    if (page < 1) page = pages
    setPage(page)
  }

  return (
    <div tabIndex={0} className="pagination py-2">
      <button className="btn btn-dark" onClick={() => previousPage()}>
        Back
      </button>
      <div className="d-flex flex-1 h-100 justify-content-end">
        {Array(pages)
          .fill(1)
          .map((_, idx) => (
            <div
              key={idx}
              className={`badge-${page - 1 === idx ? 'warning' : 'dark'} 
              px-3 rounded column justify-content-center 
              align-items-center mr-3 touchable`}
              onClick={() => setPage(idx + 1)}
            >
              <p>{idx + 1}</p>
            </div>
          ))}
      </div>
      <button className="btn btn-dark" onClick={() => nextPage()}>
        Next
      </button>
    </div>
  )
}

const dataInit = {
  pages: 1,
  display: 30,
  min: 1,
  max: 1,
}
export default Pagination
