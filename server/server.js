const express = require('express')
const cors = require('cors')
const { DEFAULT_CART } = require('./constants')
const computeDeliveryDate = require('./computeDeliveryDate')

const port = 8180
const app = express()

app.use(cors(true))

app.get('/cart', (req, res) => {
  let cart = DEFAULT_CART
  if (req.query.postalCode) {
    const postalCode = req.query.postalCode
    cart = cart.map(item => ({
      ...item,
      estimatedDeliveryDate: computeDeliveryDate(item, postalCode)
    }))
  }
  res.send(cart)
})

app.get('/random-item', (req, res) => {
  const randIndex = Math.floor(Math.random() * DEFAULT_CART.length)
  let item = DEFAULT_CART[randIndex]

  if (req.query.postalCode) {
    const postalCode = req.query.postalCode
    item = {
      ...item,
      estimatedDeliveryDate: computeDeliveryDate(item, postalCode)
    }
  }
  res.send(item)
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})