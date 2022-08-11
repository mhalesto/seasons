import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

class App extends React.Component {
  state = { lat: null, errMessage: '' };

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      this.success,
      this.err
    );
  }

  success = position => this.setState({ lat: position.coords.latitude })
  err = err => this.setState({ errMessage: err.message })

  renderContent = () => {
    if (this.state.errMessage && !this.state.lat) {
      return (
        <div>Error Message: {this.state.errMessage}</div>
      );
    }
    if (!this.state.errMessage && this.state.lat) {
      return (
        <SeasonDisplay lat={this.state.lat} />
      );
    }

    return (
      <Spinner message={`Please accept location request`} />
    );
  }

  render() {
    return (
      <div className=''>
        {this.renderContent()}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.querySelector('#root'));




//   const err = err => {
//     navigator.permissions.query({name:'geolocation'}).then(function(result) {
//       if (result.state === 'granted') {
//         console.log('Granted ++++++++++++++++++++');
//       } else if (result.state === 'prompt') {
//         console.log('Prompt ................');
//       } else {
//         console.log(result);
//       }
//     });
//   }