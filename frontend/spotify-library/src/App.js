import logo from './spotify_logo.gif';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p> SPOTIFY PLAYLIST MAKER </p> 
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Marshall and Avery make cool shit, stay tuned. 
        </p>
        <button>Authenticate</button> 
      </header>
    </div>
  );
}

export default App;
