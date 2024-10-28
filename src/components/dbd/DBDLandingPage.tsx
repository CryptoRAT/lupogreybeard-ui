import React from 'react';
import {Link} from 'react-router-dom';
import '@css/LandingPage.css';

const DBDLandingPage: React.FC = () => {
    return (
        <div className="component-container">
            <div className="introductions">
                <p>Wait, you love Dead by Daylight too?</p>
            </div>
            {/* Navigation Links */}
            <nav className="navigation">
                <div className="internal-link">
                    <Link to="/dbd/random/build">Random Build Generator</Link>
                    <p>
                        Don't know what build you want? Want to experiment with different perks? This is the place for you.
                    </p>
                </div>
            </nav>

        </div>
    )
        ;
};

export default DBDLandingPage;
