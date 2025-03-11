import axios from "axios";

// Mock data in case API fails
const FALLBACK_ETH_PRICE = 3000;

/**
 * Fetch ETH price from different sources with fallbacks
 * @returns Promise<number> - ETH price in USD
 */
export const fetchEthPrice = async (): Promise<number> => {
    try {
        // Try primary source
        try {
            // Using CoinGecko API
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
                {
                    headers: {
                        Accept: "application/json",
                    },
                    timeout: 5000, // 5 second timeout
                }
            );

            if (
                response.data &&
                response.data.ethereum &&
                response.data.ethereum.usd
            ) {
                return response.data.ethereum.usd;
            }
        } catch (error) {
            console.warn(
                "Primary ETH price source failed, trying alternative..."
            );
        }

        // Try alternative source if primary fails
        try {
            // Try with a public CORS proxy
            const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
            const targetUrl =
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd";

            const response = await axios.get(`${corsProxyUrl}${targetUrl}`, {
                headers: {
                    Origin: window.location.origin,
                    "X-Requested-With": "XMLHttpRequest",
                },
                timeout: 5000, // 5 second timeout
            });

            if (
                response.data &&
                response.data.ethereum &&
                response.data.ethereum.usd
            ) {
                return response.data.ethereum.usd;
            }
        } catch (error) {
            console.warn(
                "Alternative ETH price source failed, using fallback value..."
            );
        }

        // If all API calls fail, try to use a hardcoded recent price
        return FALLBACK_ETH_PRICE;
    } catch (error) {
        console.error("Error fetching ETH price:", error);
        return FALLBACK_ETH_PRICE;
    }
};

/**
 * Format currency values
 * @param value - The value to format
 * @param currency - The currency symbol
 * @returns Formatted string
 */
export const formatCurrency = (
    value: number,
    currency: string = "$"
): string => {
    return `${currency}${value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })}`;
};
