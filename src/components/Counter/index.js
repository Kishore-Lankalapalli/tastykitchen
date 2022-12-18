import TastyKitchenContext from '../TastyKitchenContext'
import './index.css'

const Counter = props => {
  const {onIncrementQuantity, onDecrementQuantity} = props
  return (
    <TastyKitchenContext.Consumer>
      {value => {
        const {onAddFoodItem, onReduceFoodItem, counterValue} = value

        const onClickAddItem = () => {
          onIncrementQuantity()
        }

        const onClickReduceItem = () => {
          onDecrementQuantity()
        }

        return (
          <div className="counter-container">
            <button
              className="subsract_button"
              onClick={onClickAddItem}
              type="button"
            >
              -
            </button>
            <div>
              <p className="counter-value-text">{counterValue}</p>
            </div>
            <button
              className="subsract_button"
              onClick={onClickReduceItem}
              type="button"
            >
              +
            </button>
          </div>
        )
      }}
    </TastyKitchenContext.Consumer>
  )
}

export default Counter
