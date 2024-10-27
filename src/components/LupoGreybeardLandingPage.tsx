import React from 'react';
import {Link} from 'react-router-dom';
import '../css/CryptoratLandingPage.css';

const LupoGreybeardLandingPage: React.FC = () => {
    return (
        <div className="component-container">
            <div className="introductions">
                <p>Welcome to my neighborhood! Just a bit of warning, all web-sites not in production are in various states.
                   Some I will come back to and some will be left behind. If it stops rendering any page I will remove it from here.
                   Additionally, while I have "designed" these pages, I am afraid my sister and mother got the art talent.
                   I am open to any feedback.
                </p>
                <p>So who am I? An Old Fart Gamer(OFG).</p>
            </div>
            {/* Navigation Links */}
            <nav className="navigation">
                <div className="internal-link">
                    <Link to="/random/">Dead by Daylight - Random Build Generator</Link>
                    <p>A tool for generating random survivors and builds to play the hit asymmetrical game Dead By
                        Daylight. It is a typescript and fully reactive front end with a python/django or Java backend
                        (I switch back and forth as I try new technologies with each) with all the
                        data stored in a postgres database.
                        I am also working on a mobile app, check out my github to see how that is coming along. Once
                        it's a deployed mobile app I will update and add a link here.
                    </p>
                    <a href="https://github.com/CryptoRAT"
                       target="_blank"
                       rel="noopener noreferrer">
                        <i className="fab fa-github"></i> Github</a>
                </div>
                {/* Contact me links*/}
                <div className="mailto-link">
                    <a href="mailto:luke@cryptorat.com">Contact me</a>
                </div>
</nav>

</div>
)
    ;
};

export default LupoGreybeardLandingPage;
