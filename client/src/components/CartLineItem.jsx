import Swatch from "./Swatch";
import './CartLineItem.scss'
import { formatPrice } from "../utils";

export default function CartLineItem({ item, onRemoveClick }) {
  return (
    <div className="cartLineItem">
      <img src={item.image} alt={item.title} />
      <div className="content">

        <div className='heading'>
          <div className='title'>{item.title}</div>
          <div className='price'>{formatPrice(item.price)}</div>
        </div>

        <div className='options'>
          <Swatch title={item.swatchTitle} color={item.swatchColor} />
        </div>

        <div className='delivery'>
          Estimated Delivery Date: {item.estimatedDeliveryDate}
        </div>

        <div className='actions'>
          <button className="link" onClick={() => onRemoveClick(item.id)}>
            Remove
          </button>
        </div>
      </div>
    </div>
  )
}