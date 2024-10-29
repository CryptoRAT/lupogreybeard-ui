import React from 'react';
import {Link} from 'react-router-dom';
import '@components/LandingPage.css';

const LandingPage: React.FC = () => {
    return (
        <div className="component-container">
            <div className="introductions">
                <p>Welcome to the neighborhood! This is a collection of sites I have put together. I guess this is my
                    portfolio...interesting.</p>
            </div>
            {/* Navigation Links */}
            <nav className="navigation">
                <div className="internal-link">
                    <Link to="/dbd/">Dead by Daylight Site</Link>
                    <p>
                        I put my dbd related stuff here. At the link you will find a description of what is located
                        there.
                    </p>
                </div>

                {/* Contact me links*/}
                <div className="mailto-link">
                    <a href="mailto:lupogreybeard@gmail.com">Contact me directly</a>
                </div>
            </nav>

        </div>
    )
        ;
};

export default LandingPage;
