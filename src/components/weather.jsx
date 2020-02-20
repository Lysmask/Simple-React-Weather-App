import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class Weather extends Component {
  state = { 
    input: '',
    city: '',
    temp: '',
    humidity: '',
    wind: ''
  }

  fetchWeather = (event) => {
    event.preventDefault();
    let loc = this.state.input
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=fc663650c3a4c10eb176a66368b05d2a`)
      .then((response) => {
        let city = response.data.name;
        let temp = Math.round((response.data.main.temp - 272.15) * 10) / 10 + '°C'
        let humidity = response.data.main.humidity
        let wind = response.data.wind.speed + ' m/s'
        this.setState({
          city,
          temp,
          humidity,
          wind
        })
      })
  }

  city = () => {
    if (this.state.city) {
      return this.state.city
    } return 'City..'
  }

  handleInput = (event) => {
    this.setState({
      input : event.target.value
    })
  }

  displayWeather() {
    if (this.state.temp && this.state.humidity) {
      return <h3>The weather is {this.state.temp} and the humidity is {this.state.humidity}</h3>
      } 
        return <h3>Please fetch some weather</h3>
  }

  render() { 
    return ( 
      <div className="container">
        <div className="row">
            {/* <h2>Weather Component</h2>
              <button onClick={this.getWeather}>Fetch Weather</button>
                {this.displayWeather()} */}

              <div className="box">
                <div className="city">
                  <h1>{this.state.city ? this.state.city : 'Fetch some data..' }</h1>
                </div>
                <div className="data">
                  <ul className="list">
                    <li>Temp: {this.state.temp} </li>
                    <li>Humid: {this.state.humidity}</li>
                    <li>Wind: {this.state.wind}  </li>
                    <li>Smfin:</li>
                  </ul>
                </div>
                <div className="weatherFetch">
                  <form className="weatherFetchForm">
                    <input onChange={this.handleInput} className="textInput" type="text" placeholder="Enter City.."></input>
                    <input className="submitButton"type="submit" value="Fetch" onClick={this.fetchWeather}></input>
                  </form>
                </div>
              </div>
        </div>
      </div>
      
     );
  }
}
 
export default Weather;