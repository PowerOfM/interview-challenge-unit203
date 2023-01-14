import { useState } from "react";
import CartLineItem from "./components/CartLineItem";
import CartFees from "./components/CartFees";
import './App.scss'
import { useEffect } from "react";
import LoadingWrapper from "./components/LoadingWrapper";
import CartActionBar from "./components/CartActionBar";

//Styling variables (see assets/colors.scss)
// const BLUE = ""; //"rgb(23, 33, 98)";
// const LIGHT_GREY = "#6e7484";
// const BLACK = "#000000";

const API_URL = 'http://localhost:8180'
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
  const shipping = subtotal ? FLAT_SHIPPING : 0
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
    let url = `${API_URL}/cart?postalCode=${postalCode}`
    // If we already have items, tell the server to respect the cart
    if (lineItems.length) {
      url += '&lineItemIds=' + lineItems.map(li => li.id).join(',')
    }
    fetch(url)
      .then(res => res.json())
      .then(cart => {
        setLineItems(cart)
        setFetchState({ loading: false })
      })
      .catch(err => {
        setFetchState({ loading: false, error: err })
      })
    // The lineItems dep is not required
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [postalCode])

  // Remove a line item by its id
  // const removeLineItem = (lineItemId) => {
  //   setLineItems(prev => prev.filter(x => x.id !== lineItemId))
  // }
  // Remove a line item by index
  const removeLineItemByIndex = (index) => {
    setLineItems(prev => prev.filter((x, i) => i !== index))
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

  return (
    <div className="app">
      <LoadingWrapper fetchState={fetchState}>
        <h1>Your Cart</h1>
        <CartActionBar
          postalCode={postalCode}
          onAddClick={addLineItem}
          onPostalCodeChange={setPostalCode}
        />
        {lineItems.map((item, i) => (
          <CartLineItem
            key={i}
            item={item}
            onRemoveClick={() => removeLineItemByIndex(i)}
          />
        ))}
        <CartFees fees={calculateFees(lineItems)} />
      </LoadingWrapper>
    </div>
  )
}