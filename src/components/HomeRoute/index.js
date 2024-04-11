import {Component} from 'react'
import './index.css'

import Header from '../Header'

class HomeRoute extends Component {
  render() {
    return (
      <>
        <Header />
        <div className="home-bg-container">
          <h1 className="heading">Your Flexibility, Our Excellence</h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="digital-card"
          />
        </div>
      </>
    )
  }
}

export default HomeRoute
