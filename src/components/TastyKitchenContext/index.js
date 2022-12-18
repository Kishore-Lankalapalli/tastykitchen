import React from 'react'

const TastyKitchenContext = React.createContext({
  counterValue: 1,
  onAddFoodItem: () => {},
  onReduceFoodItem: () => {},

  onAddToCart: () => {},
})

export default TastyKitchenContext
