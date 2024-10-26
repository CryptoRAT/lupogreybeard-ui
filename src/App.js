import React, {Component} from "react";
import "./App.css";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Header from "./components/Header";
import GenerateRandomCharacter from "./components/GenerateRandomCharacter";
import LupoGreybeardLandingPage from "./components/LupoGreybeardLandingPage";


class App extends Component {

    render() {
        return (
            <BrowserRouter>
                    <Header></Header>
                    (
                        <div>
                            <Routes>
                                <Route path="/random/" element={<GenerateRandomCharacter/>}/>
                                <Route path="/" element={<LupoGreybeardLandingPage/>}/>
                            </Routes>
                        </div>
                    )
            </BrowserRouter>

        );
    }


}

export default App;