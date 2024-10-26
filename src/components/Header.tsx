import React from 'react';
import '../css/Header.css';


interface HeaderProps {
    loggedIn: boolean;
}
let Header: React.FC<HeaderProps> = ({ loggedIn }) => {


    return (
        <header>
            <div className="header-banner">
                {/*{loggedIn ? renderLoggedInUserLinks() : renderLoginAndRegisterLinks()}*/}s
            </div>
        </header>
    );
};

export default Header;

