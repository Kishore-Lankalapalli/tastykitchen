import {Component} from 'react'

import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import SpecificRestaurant from './components/SpecificRestaurant'
import Cart from './components/Cart'
import TastyKitchenContext from './components/TastyKitchenContext'
import './App.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Highest',
    value: 'Highest',
  },
  {
    id: 2,
    displayText: 'Lowest',
    value: 'Lowest',
  },
]

class App extends Component {
  state = {
    counterValue: 1,
    foodItemList: [],
  }

  onAddFoodItem = () => {
    this.setState(prevState => ({counterValue: prevState.counterValue + 1}))
  }

  onReduceFoodItem = () => {
    this.setState(prevState => ({counterValue: prevState.counterValue - 1}))
  }

  onAddToCart = item => {
    const isAdded = true
    const newObj = {...item, isAdded}

    this.setState(prevState => ({
      foodItemList: [...prevState.foodItemList, newObj],
    }))
  }

  render() {
    const {counterValue, isAdded, foodItemList} = this.state
    return (
      <TastyKitchenContext.Provider
        value={{
          counterValue,
          isAdded,
          foodItemList,
          onAddToCart: this.onAddToCart,
          onAddFoodItem: this.onAddFoodItem,
        }}
      >
        <Switch>
          <Route path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Route exact path="/restaurant/:id" component={SpecificRestaurant} />
          <Route exact path="/cart" component={Cart} />
        </Switch>
      </TastyKitchenContext.Provider>
    )
  }
}

export default App
