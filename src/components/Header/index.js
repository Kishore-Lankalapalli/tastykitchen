import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'

import {GiHamburgerMenu} from 'react-icons/gi'
import {AiFillCloseCircle} from 'react-icons/ai'

import './index.css'

class Header extends Component {
  state = {
    isClicked: false,
  }

  onOpenMenu = () => {
    this.setState({isClicked: true})
  }

  onClosePopup = () => {
    this.setState({isClicked: false})
  }

  onClickLogout = () => {
    const {history} = this.props

    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {isClicked} = this.state
    return (
      <>
        <nav className="nav-container">
          <Link to="/">
            <div className="logo-images-container">
              <img
                src="https://res.cloudinary.com/di8upujpz/image/upload/v1671098178/Frame_274_rxlv7r.png"
                className="tasty-kitchen-logo-image"
              />
              <img
                src="https://res.cloudinary.com/di8upujpz/image/upload/v1671098189/Features_rk4kl3.png"
                className="tasty-kitchens-text-image"
              />
            </div>
          </Link>
          <Popup
            trigger={
              <button onClick={this.onOpenMenu} className="nav-items-button">
                <GiHamburgerMenu className="hamburger-menu-icon" />
              </button>
            }
          >
            {onClosePopup => (
              <div className="nav-item-popup-container">
                <div className="nav-item-container">
                  <ul className="nav-items-container">
                    <li className="nav-item">Home</li>
                    <Link to="/cart">
                      <li className="nav-item">Cart</li>
                    </Link>
                  </ul>
                  <button className="logout-button">Logout</button>
                </div>
                <button onClick={() => onClosePopup()} className="close-button">
                  <AiFillCloseCircle className="close-circle" />
                </button>
              </div>
            )}
          </Popup>

          <div className="navbar-container">
            <ul className="nav-item-lists-container">
              <li className="navbar-item">Home</li>
              <Link to="/cart">
                <li className="navbar-item">Cart</li>
              </Link>
            </ul>

            <button
              onClick={this.onClickLogout}
              className="header-logout-button"
            >
              Logout
            </button>
          </div>
        </nav>
      </>
    )
  }
}

export default withRouter(Header)
