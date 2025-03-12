import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title as ChartJSTitle,
    Tooltip,
    Legend,
} from "chart.js";
import { fetchEthPrice, formatCurrency } from "../utils/ethPriceService";

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ChartJSTitle,
    Tooltip,
    Legend
);

// Styled components
const CalculatorContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1200px;
    margin: 40px auto;
    width: 100%;
    padding: 0 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
        Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

const TitleContainer = styled.div``;
const ContainerTopRight = styled.div`
    display: flex;
    justify-content: center;
    height: 100%;
    align-content: center;
    flex-wrap: wrap;
`;

const MainTitle = styled.h1`
    color: #c5e4db;
    font-size: 32px;
    text-align: left;
    max-width: 320px;
`;

const ContentContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;

    @media (max-width: 1024px) {
        flex-direction: column;
    }
`;

const LeftContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 48%;
    gap: 20px;

    @media (max-width: 1024px) {
        width: 100%;
    }
`;

const LeftTopSection = styled.div`
    background: rgba(26, 26, 26, 0.5);
    border-radius: 12px;
    padding: 25px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const LeftBottomSection = styled.div`
    background: rgba(26, 26, 26, 0.5);
    border-radius: 12px;
    padding: 25px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const RightSection = styled.div`
    border-radius: 12px;
    width: 48%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (max-width: 1024px) {
        width: 100%;
    }
`;
const RightBottomSection = styled.div`
    background: rgba(26, 26, 26, 0.5);
    padding: 25px 25px 10px;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
`;

const GraphTitle = styled.div`
    color: #ffffff;
    font-size: 16px;
    margin-bottom: 20px;
    text-align: center;
`;

const ChartContainer = styled.div`
    flex-grow: 1;
    height: 270px;
    position: relative;
`;

const InfoRow = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    align-items: center;
`;

const Label = styled.span`
    color: #f5f5f5;
    font-size: 14px;
`;

const Value = styled.span`
    color: #f5f5f5;
    font-size: 14px;
    text-align: right;
`;

const SubValue = styled.span`
    color: #8a8a8a;
    font-size: 12px;
    text-align: right;
    display: block;
`;

const SubValueDollar = styled.span`
    color: rgb(255, 255, 255);
    font-size: 12px;
    text-align: right;
    display: block;
    position: absolute;
    margin-top: 9.5px;
    margin-right: 7px;
`;

const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Input = styled.input`
    background: rgba(26, 26, 26, 0.8);
    color: #f5f5f5;
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 4px;
    padding: 8px 19px;
    text-align: right;
    width: 100px;
    font-size: 14px;

    &:focus {
        outline: none;
        border-color: rgba(255, 255, 255, 0.2);
    }
`;

const CurrencyInput = styled(Input)`
    width: 100px;
`;

const UpdateButton = styled.button`
    background: rgba(76, 229, 182, 0.1);
    color: #4ce5b6;
    border: 1px solid rgba(76, 229, 182, 0.4);
    border-radius: 4px;
    font-size: 12px;
    padding: 4px 8px;
    margin-top: 6px;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: rgba(76, 229, 182, 0.2);
    }
`;

const YAxisLabel = styled.div`
    position: absolute;
    left: -40px;
    top: 50%;
    transform: rotate(-90deg) translateX(50%);
    transform-origin: top left;
    color: #8a8a8a;
    font-size: 12px;
`;

const LoadingStatus = styled.div`
    color: #4ce5b6;
    font-size: 12px;
    margin-top: 5px;
    text-align: right;
`;

const StatusIndicator = styled.span<{ isUpdated: boolean }>`
    display: inline-block;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    margin-right: 5px;
    background-color: ${(props) => (props.isUpdated ? "#4ce5b6" : "#ff6b6b")};
`;

const Calculator: React.FC = () => {
    // Constants
    const OBOL_TOTAL_SUPPLY = 500000000;
    const INCENTIVES_PERCENTAGE = 2.5;
    const OBOL_PER_YEAR = OBOL_TOTAL_SUPPLY * (INCENTIVES_PERCENTAGE / 100);
    const DEFAULT_TOTAL_PARTICIPATION = 100000;

    // State
    const [totalParticipation, setTotalParticipation] = useState<number>(
        DEFAULT_TOTAL_PARTICIPATION
    );
    const [incentivesPerEth, setIncentivesPerEth] = useState<number>(
        OBOL_PER_YEAR / DEFAULT_TOTAL_PARTICIPATION
    );
    const [yourStake, setYourStake] = useState<number>(1);
    const [obolPrice, setObolPrice] = useState<number>(1.0);
    const [ethPrice, setEthPrice] = useState<number>(3000);
    const [yourEarn, setYourEarn] = useState<number>(0);
    const [incentivesDollar, setIncentivesDollar] = useState<number>(0);
    const [apyBoost, setApyBoost] = useState<number>(0);
    const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
    const [isUpdating, setIsUpdating] = useState<boolean>(false);

    // Generate data points for the chart
    const generateParticipationLevels = useCallback(() => {
        const basePoints = [
            100000, 200000, 300000, 400000, 500000, 600000, 700000, 800000,
        ];

        // Add current participation level if it's not already in the list
        if (
            !basePoints.includes(totalParticipation) &&
            totalParticipation > 0
        ) {
            const newPoints = [...basePoints];
            newPoints.push(totalParticipation);
            newPoints.sort((a, b) => a - b);
            return newPoints;
        }

        return basePoints;
    }, [totalParticipation]);

    // Update chart data when participation changes
    const chartLabels = generateParticipationLevels();

    // Fetch crypto prices
    const fetchPrices = useCallback(async () => {
        setIsUpdating(true);
        try {
            const price = await fetchEthPrice();
            setEthPrice(price);
            setLastUpdated(new Date());
        } catch (error) {
            console.error("Error fetching crypto prices:", error);
        } finally {
            setIsUpdating(false);
        }
    }, []);

    // Calculate values according to the formulas
    const calculateValues = useCallback(() => {
        // Incentives per ETH staked = (1/Total participation) * OBOL per year
        const newIncentivesPerEth = (1 / totalParticipation) * OBOL_PER_YEAR;
        setIncentivesPerEth(newIncentivesPerEth);

        // You earn = Your stake * Incentives per ETH staked
        const newYourEarn = yourStake * newIncentivesPerEth;
        setYourEarn(newYourEarn);

        // Incentives = OBOL Price * You earn
        const newIncentivesDollar = obolPrice * newYourEarn;
        setIncentivesDollar(newIncentivesDollar);

        // APY Boost = Incentives / (Your stake * ETH Price)
        const newApyBoost =
            (newIncentivesDollar / (yourStake * ethPrice)) * 100;
        setApyBoost(newApyBoost);
    }, [totalParticipation, yourStake, obolPrice, ethPrice, OBOL_PER_YEAR]);

    // Initial price fetch
    useEffect(() => {
        fetchPrices();

        const intervalId = setInterval(() => {
            fetchPrices();
        }, 10000);

        // Clean up interval on component unmount
        return () => clearInterval(intervalId);
    }, [fetchPrices]);

    // Recalculate when inputs change
    useEffect(() => {
        calculateValues();
    }, [calculateValues]);

    // Format last updated time
    const formatLastUpdated = () => {
        if (!lastUpdated) return "Not updated yet";

        const now = new Date();
        const diffMs = now.getTime() - lastUpdated.getTime();
        const diffMins = Math.floor(diffMs / 60000);

        if (diffMins < 1) return "Just now";
        return `${diffMins} minute${diffMins !== 1 ? "s" : ""} ago`;
    };

    // Handle total participation input change
    const handleTotalParticipationChange = (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        // Remove all non-numeric characters from the input
        const rawValue = e.target.value.replace(/[^0-9]/g, "");
        const value = parseInt(rawValue, 10) || 0;
        setTotalParticipation(value > 0 ? value : 1);
    };

    // Handle your stake input change
    const handleYourStakeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (!isNaN(value) && value >= 0) {
            setYourStake(value);
        }
    };

    // Handle ETH price input change
    const handleEthPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Convert to float
        const value = parseFloat(e.target.value) || 0;
        setEthPrice(value);
    };

    // Handle OBOL price input change
    const handleObolPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Convert to float
        const value = parseFloat(e.target.value) || 0;
        setObolPrice(value);
    };

    // Correct chart data for more linear look
    const chartData = {
        labels: chartLabels,
        datasets: [
            {
                label: "OBOL / ETH / year",
                data: chartLabels.map(
                    (participation: number) => OBOL_PER_YEAR / participation
                ),
                borderColor: "#4ce5b6",
                backgroundColor: "rgba(76, 229, 182, 0.1)",
                tension: 0.4,
                pointRadius: 1,
                borderWidth: 2,
                fill: false, // Don't fill below the line
            },
        ],
    };

    // Chart options with Y-axis max/min settings to match design
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                    drawBorder: false,
                },
                ticks: {
                    color: "#8a8a8a",
                    callback: (value: any, index: number) => {
                        const num = chartLabels[index];
                        return num >= 1000000
                            ? `${(num / 1000000).toFixed(1)}M`
                            : num >= 1000
                            ? `${(num / 1000).toFixed(0)}K`
                            : num;
                    },
                },
                border: {
                    display: false,
                },
            },
            y: {
                grid: {
                    color: "rgba(255, 255, 255, 0.1)",
                    drawBorder: false,
                },
                ticks: {
                    color: "#8a8a8a",
                },
                border: {
                    display: false,
                },
                // Setting min and max values to match design
                min: 0,
                max: 150,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: "rgba(26, 26, 26, 0.9)",
                titleColor: "#ffffff",
                bodyColor: "#ffffff",
                borderColor: "rgba(255, 255, 255, 0.1)",
                borderWidth: 1,
                padding: 10,
                callbacks: {
                    label: (context: any) => {
                        return `${context.parsed.y.toFixed(
                            2
                        )} OBOL per ETH per year`;
                    },
                    title: (context: any) => {
                        const index = context[0].dataIndex;
                        const participation = chartLabels[index];
                        return `Total Participation: ${participation.toLocaleString()} ETH`;
                    },
                },
            },
        },
    };

    return (
        <CalculatorContainer>
            <ContentContainer>
                <LeftContainer>
                    <LeftTopSection>
                        <InfoRow>
                            <Label>Obol Total Supply</Label>
                            <Value>{OBOL_TOTAL_SUPPLY.toLocaleString()}</Value>
                        </InfoRow>
                        <InfoRow>
                            <Label>Obol Incentives</Label>
                            <InputWrapper>
                                <Value>{INCENTIVES_PERCENTAGE}%</Value>
                                <SubValue>of supply per year</SubValue>
                            </InputWrapper>
                        </InfoRow>
                        <InfoRow>
                            <Label></Label>
                            <InputWrapper>
                                <Value>{OBOL_PER_YEAR.toLocaleString()}</Value>
                                <SubValue>OBOL per year</SubValue>
                            </InputWrapper>
                        </InfoRow>
                    </LeftTopSection>

                    <LeftBottomSection>
                        <InfoRow>
                            <Label>Total participation</Label>
                            <InputWrapper>
                                <Input
                                    type="text"
                                    value={totalParticipation.toLocaleString()}
                                    onChange={handleTotalParticipationChange}
                                    min="1"
                                />
                                <SubValue>ETH earning incentives</SubValue>
                            </InputWrapper>
                        </InfoRow>
                        <InfoRow>
                            <Label>Incentives per ETH</Label>
                            <InputWrapper>
                                <Value>{incentivesPerEth.toFixed(0)}</Value>
                                <SubValue>OBOL per ETH</SubValue>
                            </InputWrapper>
                        </InfoRow>
                        <InfoRow>
                            <Label>Your stake</Label>
                            <InputWrapper>
                                <Input
                                    type="text"
                                    value={yourStake}
                                    onChange={handleYourStakeChange}
                                    min="0"
                                    step="0.1"
                                />
                                <SubValue>ETH</SubValue>
                            </InputWrapper>
                        </InfoRow>
                        <InfoRow>
                            <Label>Your earn</Label>
                            <InputWrapper>
                                <Value>{yourEarn.toFixed(0)}</Value>
                                <SubValue>OBOL / year</SubValue>
                            </InputWrapper>
                        </InfoRow>
                        <InfoRow>
                            <Label>OBOL price</Label>
                            <InputWrapper>
                                <Input
                                    type="number"
                                    value={obolPrice}
                                    onChange={handleObolPriceChange}
                                    min="0"
                                    step="0.01"
                                />
                                <SubValueDollar>$</SubValueDollar>
                            </InputWrapper>
                        </InfoRow>
                        <InfoRow>
                            <Label>ETH price</Label>
                            <InputWrapper>
                                <Input
                                    type="number"
                                    value={ethPrice}
                                    onChange={handleEthPriceChange}
                                    min="0"
                                    step="0.01"
                                />
                                <SubValueDollar>$</SubValueDollar>
                                <UpdateButton onClick={fetchPrices}>
                                    Update ETH price
                                </UpdateButton>
                            </InputWrapper>
                        </InfoRow>
                        <InfoRow>
                            <Label>Incentives</Label>
                            <InputWrapper>
                                <Value>${incentivesDollar.toFixed(2)}</Value>
                                <SubValue>/ year</SubValue>
                            </InputWrapper>
                        </InfoRow>
                        <InfoRow>
                            <Label>APY Boost</Label>
                            <Value>{apyBoost.toFixed(2)}%</Value>
                        </InfoRow>
                    </LeftBottomSection>
                </LeftContainer>

                <RightSection>
                    <ContainerTopRight>
                        <TitleContainer>
                            <MainTitle>
                                OBOL Programmatic Incentives Calculator
                            </MainTitle>
                        </TitleContainer>
                    </ContainerTopRight>
                    <RightBottomSection>
                        <GraphTitle>OBOL incentives per ETH staked</GraphTitle>
                        <ChartContainer>
                            <Line data={chartData} options={chartOptions} />
                        </ChartContainer>
                    </RightBottomSection>
                </RightSection>
            </ContentContainer>
        </CalculatorContainer>
    );
};

export default Calculator;
