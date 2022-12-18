import TastyKitchenContext from '../TastyKitchenContext'
import NoOrdersItem from '../NoOrdersItem'
import CartItem from '../CartItem'
import './index.css'

const Cart = () => (
  <TastyKitchenContext.Consumer>
    {value => {
      const {counterValue, foodItemList} = value

      return (
        <div>
          {foodItemList.length === 0 ? (
            <NoOrdersItem />
          ) : (
            <ul className="ordered-items-cart-container">
              {foodItemList.map(item => (
                <CartItem key={item.id} item={item} />
              ))}
            </ul>
          )}
        </div>
      )
    }}
  </TastyKitchenContext.Consumer>
)

export default Cart
