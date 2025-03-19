import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PageContainer = styled.div`
    max-width: 800px;
    margin: 40px auto;
    padding: 0 20px;
    color: #f5f5f5;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const Title = styled.h1`
    color: #c5e4db;
    font-size: 32px;
    margin-bottom: 20px;
`;

const Subtitle = styled.h2`
    color: #c5e4db;
    font-size: 24px;
    margin: 30px 0 10px;
`;

const Paragraph = styled.p`
    margin-bottom: 15px;
    line-height: 1.6;
`;

const List = styled.ul`
    margin-bottom: 20px;
    padding-left: 20px;
`;

const ListItem = styled.li`
    margin-bottom: 10px;
    line-height: 1.6;
`;

const StyledLink = styled.a`
    color: #4ce5b6;
    text-decoration: none;
    &:hover {
        text-decoration: underline;
    }
`;

const BackLink = styled(Link)`
    display: inline-block;
    margin-top: 30px;
    padding: 8px 15px;
    background: rgba(76, 229, 182, 0.1);
    color: #4ce5b6;
    border: 1px solid rgba(76, 229, 182, 0.4);
    border-radius: 4px;
    text-decoration: none;
    transition: all 0.2s;
    &:hover {
        background: rgba(76, 229, 182, 0.2);
    }
`;

const PrivacyPolicy: React.FC = () => {
    return (
        <PageContainer>
            <Title>Privacy Policy</Title>
            <Paragraph>
                <strong>Effective Date:</strong> 17.03.2025
            </Paragraph>

            <Paragraph>
                Thank you for visiting our website. Your privacy is important to
                us. This Privacy Policy outlines the types of information we
                collect and how we use it.
            </Paragraph>

            <Subtitle>Information We Collect</Subtitle>
            <Paragraph>
                We do not collect personal data from users. However, we use
                Google Analytics to gather anonymous data about website visits.
                This may include:
            </Paragraph>
            <List>
                <ListItem>IP address (anonymized where applicable)</ListItem>
                <ListItem>Browser type and settings</ListItem>
                <ListItem>Pages visited and time spent on the site</ListItem>
                <ListItem>Referral sources</ListItem>
                <ListItem>General location (country/city level)</ListItem>
            </List>

            <Subtitle>How We Use Your Information</Subtitle>
            <Paragraph>
                The data collected via Google Analytics is used solely for the
                purpose of analyzing website traffic and improving user
                experience. We do not sell, share, or transfer this information
                to third parties.
            </Paragraph>

            <Subtitle>Cookies</Subtitle>
            <Paragraph>
                Google Analytics may place cookies on your browser to collect
                data. You can manage or disable cookies through your browser
                settings. To opt out of Google Analytics tracking, use the
                official Google opt-out tool:{" "}
                <StyledLink
                    href="https://tools.google.com/dlpage/gaoptout"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Google Analytics Opt-Out
                </StyledLink>
                .
            </Paragraph>

            <Subtitle>Third-Party Services</Subtitle>
            <Paragraph>
                Google Analytics operates under its own privacy policy, which
                you can review here:{" "}
                <StyledLink
                    href="https://policies.google.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Google Privacy Policy
                </StyledLink>
                .
            </Paragraph>

            <Subtitle>Changes to This Policy</Subtitle>
            <Paragraph>
                We may update this Privacy Policy from time to time. Any changes
                will be posted on this page.
            </Paragraph>

            <BackLink to="/">← Back to Calculator</BackLink>
        </PageContainer>
    );
};

export default PrivacyPolicy;
