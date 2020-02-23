import React, { Component } from 'react';
import axios from 'axios';
import '../App.css';

class Weather extends Component {
  state = { 
    input: '',
    data: [],
    notFound: ''
  }

  fetchWeather = (event) => {
    event.preventDefault();
    this.setState({
      data: {}
    })
    if(this.state.input) {
      let loc = this.state.input
      axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${loc}&appid=fc663650c3a4c10eb176a66368b05d2a`)
      .then((response) => {
        let data = {
          'city': response.data.name,
          'temp': Math.round((response.data.main.temp - 272.15) * 10) / 10 + '°C', 
          'humidity': response.data.main.humidity, 
          'wind': response.data.wind.speed + ' m/s'
        }
        this.setState({
          data,
          notFound: ''
        })
      }).catch(() => {
        this.setState({
          notFound: "Couldn't find a location named " + this.state.input
        })
      })
    }
  }

  handleInput = (event) => {
    this.setState({
      input : event.target.value
    })
  }

  render() { 
    return ( 
      <div className="container weatherClass">
        <div className="row">

              <div className="box">
                <div className="city">
                  <h1>{this.state.data.city ? this.state.data.city : 'Search a city..' }</h1>
                </div>
                <div id="data" className="data">
                
                  {this.state.data.temp ?
                  <table>
                    <tbody>
                      <tr>
                        <td>Temp:</td>
                        <td>{this.state.data.temp}</td>
                      </tr><tr>
                        <td>Humidity:</td>
                    <td>{this.state.data.humidity}</td>
                      </tr><tr>
                        <td>Wind:</td>
                    <td>{this.state.data.wind}</td>
                      </tr><tr>
                        <td></td>
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                : this.state.notFound 
                  }
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