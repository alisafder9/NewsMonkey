import './App.css';
import React, { Component } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar';

export default class App extends Component {
  constructor(props) {
    super(props);

    // Load theme from localStorage, default to 'light' if not set
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.state = {
      theme: savedTheme, // Set initial theme from localStorage
    };
  }

  componentDidMount() {
    // Get user's geolocation and fetch sunrise/sunset times
    this.fetchSunTimes();

    // Set an interval to check and update the theme every minute
    this.intervalId = setInterval(this.fetchSunTimes, 4.32e+7); // 60000 ms = 1 minute
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.intervalId);
  }

  // Get user's location and fetch the sunrise/sunset times
  fetchSunTimes = async () => {
    // Get the user's current position (latitude and longitude)
    navigator.geolocation.getCurrentPosition(async (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // Fetch the sunrise and sunset times using the user's coordinates
      const response = await fetch(`https://api.sunrise-sunset.org/json?lat=${latitude}&lng=${longitude}&formatted=0`);
      const data = await response.json();

      // Get the sunrise and sunset times in local time
      const sunriseTime = new Date(data.results.sunrise);
      const sunsetTime = new Date(data.results.sunset);

      // Check if current time is before or after the sunrise/sunset to determine theme
      this.setThemeBasedOnTime(sunriseTime, sunsetTime);
    });
  }

  setThemeBasedOnTime(sunrise, sunset) {
    const now = new Date(); // Current time in local time

    // Check if now is before sunrise or after sunset
    const isNight = now >= sunset || now <= sunrise;

    console.log("Current Time:", now);
    console.log("Sunrise:", sunrise);
    console.log("Sunset:", sunset);
    console.log("Is it night?", isNight);

    // If it's night time, use dark theme
    if (isNight) {
      console.log("Setting theme to dark");
      this.setState({ theme: 'dark' }, () => {
        this.applyBodyTheme('dark');
      });
    } else {
      console.log("Setting theme to light");
      this.setState({ theme: 'light' }, () => {
        this.applyBodyTheme('light');
      });
    }
  }

  // Toggle the theme manually
  toggleTheme = () => {
    const newTheme = this.state.theme === 'light' ? 'dark' : 'light';
    this.setState({ theme: newTheme }, () => {
      // Save the new theme to localStorage
      localStorage.setItem('theme', newTheme);
      // Apply the new theme to the body
      this.applyBodyTheme(newTheme);
    });
  };

  applyBodyTheme(theme) {
    if (theme === 'light') {
      document.body.style.backgroundColor = 'white'; // Light theme should have a white background
      document.body.style.color = 'black';  // And black text
    } else {
      document.body.style.backgroundColor = 'black'; // Dark theme should have a black background
      document.body.style.color = 'white';  // And white text
    }
  }

  pageSize = 15;
  apiKey = process.env.REACT_APP_NEWS_API_KEY;

  state = {
    progress: 0
  }
  
  setProgress = (progress) => {
    this.setState({ progress: progress });
  }

  render() {
    const { theme } = this.state;

    return (
      <Router>
        <div className={`App ${theme}`}>
          <NavBar theme={theme} toggleTheme={this.toggleTheme} />
          <LoadingBar
            height={3}
            color="#f11946"
            progress={this.state.progress}
          />
          <div className='my-3'><p className='my-3'>hello</p></div>
          <Routes>
            <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey}  key="general" pageSize={this.pageSize} country="us" category="general" theme={theme} />} />
            <Route exact path="/general" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="general" pageSize={this.pageSize} country="us" category="general" theme={theme} />} />
            <Route exact path="/business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="business" pageSize={this.pageSize} country="us" category="business" theme={theme} />} />
            <Route exact path="/entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="entertainment" pageSize={this.pageSize} country="us" category="entertainment" theme={theme} />} />
            <Route exact path="/health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="health" pageSize={this.pageSize} country="us" category="health" theme={theme} />} />
            <Route exact path="/science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="science" pageSize={this.pageSize} country="us" category="science" theme={theme} />} />
            <Route exact path="/sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="sports" pageSize={this.pageSize} country="us" category="sports" theme={theme} />} />
            <Route exact path="/technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key="technology" pageSize={this.pageSize} country="us" category="technology" theme={theme} />} />
          </Routes>
        </div>
      </Router>
    );
  }
}