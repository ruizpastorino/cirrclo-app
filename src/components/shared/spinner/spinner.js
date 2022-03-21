import React from 'react'
import "./styles.css"

const Spinner = ({ title }) => {
  return (
    <div className="spinner-area center-all">
      <i className="fa-solid fa-arrows-rotate display-4 spin" />
    </div>
  )
}

export default Spinner
