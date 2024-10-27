import './css/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
      <Router>
        <div className="App">
          <div className="App-layout">
            <nav className="App-nav">
              <Link to="/hello-world">Hello World</Link>
            </nav>
            <main className="App-main">
              <Routes>
                <Route path="/hello-world" element={<h1>Hello World!</h1>} />
              </Routes>
            </main>
          </div>
        </div>
      </Router>
  );
}

export default App;
