import '@css/App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import routes from './routes/routes.tsx';

function App() {
  return (
      <Router>
        <div className="App">
          <div className="App-layout">
            <nav className="App-nav">
              <Link to="/dbd/">Dead By Daylight</Link>
            </nav>
            <main className="App-main">
                <Routes>
                    {routes.map((route, index) => (
                        <Route key={index} path={route.path} element={route.element} />
                    ))}
                </Routes>
            </main>
          </div>
        </div>
      </Router>
  );
}

export default App;
