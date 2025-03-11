# OBOL Programmatic Incentives Calculator

A React-based calculator for estimating OBOL token incentives based on ETH staking amounts.

## Features

-   Calculate OBOL incentives based on ETH stake
-   Real-time ETH price fetching from CoinGecko API
-   Visual representation of incentives with a responsive chart
-   APY boost calculation

## Prerequisites

-   Node.js (v14.0.0 or higher)
-   npm (v6.0.0 or higher)

## Installation

1. Clone this repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

## Running the Application

To start the development server:

```bash
npm start
```

The application will open in your default browser at [http://localhost:3000](http://localhost:3000).

## Usage

-   The calculator displays the OBOL token incentives based on ETH staked
-   Enter your ETH stake in the "Your stake" field
-   The "Your earn" field will show the calculated OBOL tokens per year
-   The OBOL price can be adjusted (default is $1.00)
-   ETH price is fetched automatically from CoinGecko
-   The right section displays a chart showing the relationship between total participation and incentives per ETH

## Building for Production

To create a production build:

```bash
npm run build
```

The build files will be created in the `build` directory.

## Technologies

-   React
-   TypeScript
-   Chart.js
-   Styled Components
-   Axios (for API requests)

## License

MIT
