import {Component} from 'react'
import {AiFillStar} from 'react-icons/ai'
import Footer from '../Footer'
import Counter from '../Counter'
import TastyKitchenContext from '../TastyKitchenContext'
import './index.css'

class FoodItem extends Component {
  state = {
    quantity: 1,
  }

  onDecrementQuantity = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  onIncrementQuantity = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  render() {
    const {quantity} = this.state
    const {foodItem} = this.props
    const {imageUrl, name, id, rating, cost, foodType} = foodItem

    return (
      <TastyKitchenContext.Consumer>
        {value => {
          const {onAddToCart, foodItemList} = value

          const onClickAddFoodItem = () => {
            onAddToCart({...foodItem, quantity})
          }

          let itemAdded

          foodItemList.map(item => {
            if (item.id === id) {
              itemAdded = true
            } else {
              itemAdded = false
            }
            return itemAdded
          })

          return (
            <li className="food-item-container">
              <img src={imageUrl} className="food-item-image" />
              <div className="food-item-details-container">
                <h1 className="food-item-name">{name}</h1>
                <p className="food-item-cost-text">₹ {cost}.00</p>
                <div className="food-item-rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating-text">{rating}</p>
                </div>
                {itemAdded ? (
                  <Counter
                    onDecrementQuantity={this.onDecrementQuantity}
                    onIncrementQuantity={this.onIncrementQuantity}
                  />
                ) : (
                  <button
                    onClick={onClickAddFoodItem}
                    className="add-item-button"
                  >
                    Add
                  </button>
                )}
              </div>
            </li>
          )
        }}
      </TastyKitchenContext.Consumer>
    )
  }
}

export default FoodItem
