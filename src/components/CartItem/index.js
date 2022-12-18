import './index.css'

const CartItem = props => {
  const {item} = props

  const {imageUrl, name, quantity, cost} = item

  return (
    <li className="cart-item-container">
      <img src={imageUrl} className="cart-item-image" />
      <div>
        <h1 className="item-name">{name}</h1>
        <div className="cart-counter-container">
          <button type="button" className="cart-counter-button">
            -
          </button>
          <p className="quantity-text">{quantity}</p>

          <button type="button" className="cart-counter-button">
            +
          </button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
