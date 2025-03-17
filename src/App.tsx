import React from "react";
import styled from "styled-components";
import Calculator from "./components/Calculator";
import "./App.css";

const AppContainer = styled.div`
    min-height: 100vh;
    background-color: #0f0f0f;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h1`
    color: #c5e4db;
    text-align: center;
    margin-bottom: 40px;
    font-size: 32px;
    font-weight: 600;

    @media (max-width: 768px) {
        font-size: 24px;
        margin-bottom: 20px;
    }
`;

const Footer = styled.footer`
    margin-top: 40px;
    color: #8a8a8a;
    font-size: 12px;
    text-align: center;
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
        <AppContainer>
            {/* <Title>OBOL Programmatic Incentives Calculator</Title> */}
            <Calculator />
            <Footer>
                ETH prices provided by Uniswap V3
                {/* <Link
                    href="https://www.coingecko.com/en/api"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    CoinGecko API
                </Link> */}
                {/* <div>Last updated: {new Date().toLocaleDateString()}</div> */}
                <div>
                    Created by FOMOSapiens Labs as an Obol Public Good. Learn
                    more{" "}
                    <Link
                        href="https://x.com/FomoSapiensLabs"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        about us
                    </Link>
                    .
                </div>
            </Footer>
        </AppContainer>
    );
}

export default App;
