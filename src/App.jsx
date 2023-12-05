function App() {
  return (
    <>
      <section className="app">
        <div className="overlay">
          <div className="container">
            <div className="section section__inputs">
              <input type="text" name="city" placeholder="Enter City" />
              <button>f</button>
            </div>

            <div className="section section__ temperature">
              <div className="icon">
                <h3>London, GB</h3>
                <img src="dsa" alt="weatherIcon" />
                <h3>Cloudy</h3>
              </div>
              <div className="temperature">
                <h1>34 C</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default App;
