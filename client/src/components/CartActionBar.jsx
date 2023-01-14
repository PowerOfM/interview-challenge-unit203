import { useState } from "react"
import './CartActionBar.scss'

export default function CartActionBar({ onAddClick, postalCode, onPostalCodeChange }) {
  const [value, setValue] = useState(postalCode)

  const handleFormSubmit = e => {
    e.preventDefault()
    onPostalCodeChange(value)
  }

  return (
    <div className='cartActionBar'>
      <button className="addItem" onClick={onAddClick}>
        Add New Item
      </button>
      <div className='spacer' />

      <form className='postalCode' onSubmit={handleFormSubmit}>
        <div>Get estimated delivery dates:</div>
        <input name='postalCode' placeholder="Postal Code" value={value} onChange={e => setValue(e.target.value)} />
        <button type='submit'>SET</button>
      </form>
    </div>
  )
}