import Description from "./components/Description";

function App() {
  return (
    <>
      <div className="app">
        <div className="overlay">
          <div className="container">
            <div className="section section__inputs">
              <input type="text" name="city" placeholder="Enter City" />
              <button>f</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>London, GB</h3>
                <img src="dsa" alt="weatherIcon" />
                <h3>Cloudy</h3>
              </div>
              <div className="temperature">
                <h1>34 C</h1>
              </div>
            </div>
            <Description />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
