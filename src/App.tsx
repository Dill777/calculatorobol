import React from "react";
import styled from "styled-components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Calculator from "./components/Calculator";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsOfUse from "./components/TermsOfUse";
import Footer from "./components/Footer";
import "./App.css";

const AppContainer = styled.div`
    min-height: 100vh;
    background-color: #0f0f0f;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Content = styled.main`
    flex: 1;
    width: 100%;
    max-width: 1200px;
`;

const AppFooter = styled.footer`
    margin-top: 40px;
    color: #8a8a8a;
    font-size: 12px;
    text-align: center;
    width: 100%;
    max-width: 1200px;
`;

const Link = styled.a`
    color: #4ce5b6;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

function App() {
    return (
        <Router>
            <AppContainer>
                <Content>
                    <Routes>
                        <Route path="/" element={<Calculator />} />
                        <Route
                            path="/privacy-policy"
                            element={<PrivacyPolicy />}
                        />
                        <Route path="/terms-of-use" element={<TermsOfUse />} />
                    </Routes>
                </Content>

                <AppFooter>
                    <div>ETH prices provided by Uniswap V3</div>
                    <div>
                        Created by FOMOSapiens Labs as an Obol Public Good.
                        Learn more{" "}
                        <Link
                            href="https://x.com/FomoSapiensLabs"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            about us
                        </Link>
                        .
                    </div>
                </AppFooter>

                <Footer />
            </AppContainer>
        </Router>
    );
}

export default App;
