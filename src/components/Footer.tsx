import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const FooterContainer = styled.footer`
    max-width: 1200px;
    margin: 0 auto 20px;
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
`;

const FooterLink = styled(Link)`
    color: #8a8a8a;
    text-decoration: none;
    font-size: 14px;
    transition: color 0.2s;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

    &:hover {
        color: #4ce5b6;
    }
`;

const Footer: React.FC = () => {
    return (
        <FooterContainer>
            <FooterLink to="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink to="/terms-of-use">Terms of Use</FooterLink>
        </FooterContainer>
    );
};

export default Footer;
