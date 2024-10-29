import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import routes from './routes/routes';
import { Suspense } from 'react';

function App() {
    return (
        <Router>
            <div className="App">
                <div className="App-layout">
                    <nav className="App-nav">
                        <Link to="/dbd/">Dead By Daylight</Link>
                    </nav>
                    <main className="App-main">
                        <Suspense fallback={<div>Loading...</div>}>
                            <Routes>
                                {routes.map((route, index) => (
                                    <Route key={index} path={route.path} element={route.element} />
                                ))}
                            </Routes>
                        </Suspense>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;
