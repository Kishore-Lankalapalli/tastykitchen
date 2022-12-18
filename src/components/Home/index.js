import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {BsFilterLeft} from 'react-icons/bs'

import Header from '../Header'
import PopularRestaurantItem from '../PopularRestaurantItem'
import Pagenation from '../Pagenation'
import Footer from '../Footer'
import './index.css'

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

class Home extends Component {
  state = {
    carouselImagesList: [],
    restaurantsList: [],
    offset: 1,
    ratingCategory: 'Lowest',
  }

  componentDidMount() {
    this.getCarouselImages()
    this.getRestaurantsList()
  }

  getRestaurantsList = async () => {
    const token = Cookies.get('jwt_token')

    let {offset} = this.state
    const {ratingCategory} = this.state

    offset = (offset - 1) * 9
    const limit = 9
    const restaurantsApiUrl = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}&sort_by_rating=${ratingCategory}`

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(restaurantsApiUrl, options)

    if (response.ok) {
      const data = await response.json()

      const restaurantsList = data.restaurants.map(item => ({
        costForTwo: item.cost_for_two,
        cuisine: item.cuisine,
        groupByTime: item.group_by_time,
        hasOnlineDelivery: item.has_online_delivery,
        hasTableBooking: item.has_table_booking,
        id: item.id,
        imageUrl: item.image_url,
        isDeliveringNow: item.is_delivering_now,
        location: item.location,
        menuType: item.menu_type,
        name: item.name,
        opensAt: item.opens_at,
        userRating: {
          rating: item.user_rating.rating,
          ratingText: item.user_rating.rating_text,
          ratingColor: item.user_rating.rating_color,
          totalReviews: item.user_rating.total_reviews,
        },
      }))

      this.setState({restaurantsList})
    }
  }

  getCarouselImages = async () => {
    const jwtToken = Cookies.get('jwt_token')

    const carouseApiUrl = 'https://apis.ccbp.in/restaurants-list/offers'

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(carouseApiUrl, options)

    const data = await response.json()

    const carouselImages = data.offers.map(item => ({
      imageUrl: item.image_url,
    }))

    this.setState({carouselImagesList: carouselImages})
  }

  onIncrementNextPage = () => {
    const {offset} = this.state
    if (offset > 4 || offset === 4) {
      this.setState({offset: 4})
    } else {
      this.setState(
        prevState => ({offset: prevState.offset + 1}),
        this.getRestaurantsList,
      )
    }
  }

  onDecrementPreviousPage = () => {
    const {offset} = this.state
    if (offset <= 0 || offset === 1) {
      this.setState({offset: 1}, this.getRestaurantsList)
    } else {
      this.setState(
        prevState => ({offset: prevState.offset - 1}),
        this.getRestaurantsList,
      )
    }
  }

  onChangeRating = event => {
    this.setState({ratingCategory: event.target.value}, this.getRestaurantsList)
  }

  render() {
    const {
      carouselImagesList,
      restaurantsList,
      ratingCategory,
      offset,
    } = this.state

    const settings = {
      autoplay: true,
    }
    return (
      <>
        <Header />
        <div className="home-route-container">
          <div className="home-container">
            <div className="carousel-container">
              <Slider {...settings}>
                {carouselImagesList.map(image => (
                  <img className="offer-image" src={image.imageUrl} />
                ))}
              </Slider>
            </div>
            <div className="restaurants-display-container">
              <div>
                <h1 className="popular-restaurants-heading">
                  Popular Restaurants
                </h1>
                <p className="restaurants-quotation-text">
                  Select your favourite restaurant by special dish amke your day
                  happy...
                </p>
              </div>
              <div className="filteration-container">
                <BsFilterLeft className="filter-icon" />
                <select
                  onChange={this.onChangeRating}
                  value={ratingCategory}
                  className="filters-select-element"
                >
                  {sortByOptions.map(item => (
                    <option key={item.id} className="filter-options">
                      {item.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <ul className="popular-restaurants-lists-container">
              {restaurantsList.map(item => (
                <PopularRestaurantItem key={item.id} restaurant={item} />
              ))}
            </ul>
          </div>
          <Pagenation
            onIncrementNextPage={this.onIncrementNextPage}
            onDecrementPreviousPage={this.onDecrementPreviousPage}
            offset={offset}
          />
          <Footer />
        </div>
      </>
    )
  }
}

export default Home
