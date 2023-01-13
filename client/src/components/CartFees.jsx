import { formatPrice } from '../utils'
import './CartFees.scss'

export default function CartFees({
  fees
}) {
  console.log('fees', fees)
  const { subtotal, taxes, shipping } = fees
  return (
    <div className='fees'>
      <div className='row'>
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      <div className='row'>
        <span>Taxes (estimated)</span>
        <span>{formatPrice(taxes)}</span>
      </div>
      <div className='row'>
        <span>Shipping</span>
        <span>{formatPrice(shipping)}</span>
      </div>
      <div className='row bold'>
        <span>Total</span>
        <span>{formatPrice(subtotal + taxes + shipping)}</span>
      </div>
    </div>
  )
}