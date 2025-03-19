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

const List = styled.ol`
    margin-bottom: 20px;
    padding-left: 20px;
`;

const ListItem = styled.li`
    margin-bottom: 20px;
    line-height: 1.6;
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

const TermsOfUse: React.FC = () => {
    return (
        <PageContainer>
            <Title>Terms of Use</Title>
            <Paragraph>
                <strong>Effective Date:</strong> 17.03.2025
            </Paragraph>

            <List>
                <ListItem>
                    <Subtitle>Acceptance of Terms</Subtitle>
                    <Paragraph>
                        By accessing and using this website, you agree to be
                        bound by these Terms of Use. If you do not agree, please
                        do not use the site.
                    </Paragraph>
                </ListItem>

                <ListItem>
                    <Subtitle>No Warranty & Disclaimer</Subtitle>
                    <Paragraph>
                        This website provides a profitability calculator "as is"
                        without any guarantees of accuracy, reliability, or
                        completeness. The calculations are for informational
                        purposes only and should not be considered financial
                        advice.
                    </Paragraph>
                    <Paragraph>
                        We are not responsible for any losses or damages
                        resulting from the use of this website.
                    </Paragraph>
                </ListItem>

                <ListItem>
                    <Subtitle>Intellectual Property</Subtitle>
                    <Paragraph>
                        All content on this website, including text, graphics,
                        and calculations, is the property of the site owner.
                        Unauthorized reproduction or distribution is prohibited.
                    </Paragraph>
                </ListItem>

                <ListItem>
                    <Subtitle>Modifications to Terms</Subtitle>
                    <Paragraph>
                        We reserve the right to modify these Terms at any time.
                        Continued use of the website after changes constitutes
                        acceptance of the updated Terms.
                    </Paragraph>
                </ListItem>
            </List>

            <BackLink to="/">← Back to Calculator</BackLink>
        </PageContainer>
    );
};

export default TermsOfUse;
