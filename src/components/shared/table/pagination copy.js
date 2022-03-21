import React, { useState, useEffect } from 'react'

const Pagination = ({ length, setRange }) => {
  let [data, setData] = useState(dataInit)
  let { page, pages, display, min, max } = data

  useEffect(() => {
    pages = Math.ceil(length / display)
    paginate()
    setData({ ...data, pages })
  }, [length, display, page])

  const paginate = () => {
    max = page * display
    min = max - display
    data = { ...data, page, min, max }
    if (page > pages) {
      data.page = pages
    }
    setData(data)
    setRange(data)
  }

  const turnPages = (e) => {
    if (e.keyCode === 39) {
      nextPage()
    }

    if (e.keyCode === 37) {
      previousPage()
    }
  }

  const nextPage = () => {
    page++
    if (page > pages) page = 1
    setData({ ...data, page })
  }
  const previousPage = () => {
    page--
    if (page < 1) page = pages
    setData({ ...data, page })
  }

/*  */

  return (
    <div tabIndex={0} className="pagination py-2" onKeyDown={turnPages}>
      <button className="btn btn-dark" onClick={() => previousPage()}>
        Back
      </button>
      <div className="d-flex flex-1 h-100 justify-content-end">
        {Array(pages)
          .fill(1)
          .map((page, idx) => (
            <div
              key={idx}
              className={`badge-${data.page - 1 === idx ? 'warning' : 'dark'} 
              px-3 rounded column justify-content-center 
              align-items-center mr-3 touchable`}
              onClick={() => setData({ ...data, page: idx + 1 })}
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
  page: 1,
  pages: 1,
  display: 30,
  min: 1,
  max: 1,
}
export default Pagination
