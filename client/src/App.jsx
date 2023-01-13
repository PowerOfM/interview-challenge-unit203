import { useState } from "react";
import CartLineItem from "./components/CartLineItem";
import CartFees from "./components/CartFees";
import './App.scss'
import { useEffect } from "react";
import LoadingWrapper from "./components/LoadingWrapper";

//Styling variables (see assets/colors.scss)
// const BLUE = ""; //"rgb(23, 33, 98)";
// const LIGHT_GREY = "#6e7484";
// const BLACK = "#000000";

const API_URL = 'http://localhost:8180'
const ESTIMATED_DELIVERY = "Nov 24, 2021";
const TAX_RATE = 0.13
const FLAT_SHIPPING = 15

/**
 * 
 * @param {object[]} lineItems Array of items
 * @returns {{ subtotal: number, taxes: number, shipping: number }} Fees object
 */
function calculateFees(lineItems) {
  const subtotal = lineItems.reduce((acc, val) => acc + val.price, 0)
  const taxes = subtotal * TAX_RATE
  const shipping = FLAT_SHIPPING
  return { subtotal, taxes, shipping }
}

/**
 * Main Page
 */
export default function App() {
  const [fetchState, setFetchState] = useState({ loading: true, error: null })
  const [postalCode, setPostalCode] = useState([])
  const [lineItems, setLineItems] = useState([])

  // Load Cart
  useEffect(() => {
    fetch(`${API_URL}/cart?postalCode=${postalCode}`)
      .then(res => res.json())
      .then(cart => {
        setLineItems(cart)
        setFetchState({ loading: false })
      })
      .catch(err => {
        setFetchState({ loading: false, error: err })
      })
  }, [postalCode])

  // Remove a line item by its id
  const removeLineItem = (lineItemId) => {
    setLineItems(prev => prev.filter(x => x.id == lineItemId))
  }

  // Request new line item from the server
  const addLineItem = async (lineItem) => {
    setFetchState({ loading: true })
    fetch(`${API_URL}/random-item?postalCode=${postalCode}`)
      .then(res => res.json())
      .then(item => {
        setLineItems(prev => ([...prev, item]))
        setFetchState({ loading: false })
      })
      .catch(err => {
        setFetchState({ loading: false, error: err })
      })
  }

  const fees = calculateFees(lineItems)

  return (
    <div className="app">
      <LoadingWrapper fetchState={fetchState}>
        <h1>Your Cart</h1>
        <button className="addItem" onClick={addLineItem}>Add New Item</button>
        {lineItems.map((item, i) => (
          <CartLineItem
            key={i}
            item={item}
            onRemoveClick={removeLineItem}
          />
        ))}
        <CartFees fees={fees} />
      </LoadingWrapper>
    </div>
  )
}