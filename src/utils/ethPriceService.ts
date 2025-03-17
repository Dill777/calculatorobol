import axios from "axios";
import { ethers } from "ethers";

const UNISWAP_V3_FACTORY = "0x1F98431c8aD98523631AE4a59f267346ea31F984";
const FACTORY_ABI = [
    "function getPool(address tokenA, address tokenB, uint24 fee) external view returns (address pool)",
];

const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
const USDC_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";

const FEE = 3000; // 0.3% fee tier - most liquid pool on Ethereum Mainnet

const POOL_ABI = [
    "function slot0() external view returns (uint160 sqrtPriceX96, int24 tick, uint16 observationIndex, uint16 observationCardinality, uint16 observationCardinalityNext, uint8 feeProtocol, bool unlocked)",
    "function token0() external view returns (address)",
    "function token1() external view returns (address)",
    "function liquidity() external view returns (uint128)",
];

const FALLBACK_ETH_PRICE = 3000;

/**
 * Calculate price from sqrtPriceX96
 * @param sqrtPriceX96 - sqrtPriceX96 value from slot0
 * @returns price in USD
 */
const calculatePriceFromSqrtPriceX96 = (sqrtPriceX96: bigint): number => {
    const sqrtPrice = Number(sqrtPriceX96) / 2 ** 96;
    const price = sqrtPrice * sqrtPrice * (10 ** 6 / 10 ** 18);
    return price;
};

/**
 * Get ETH price from the main UniSwap V3 pool
 * @returns Promise<number> - ETH price in USD
 */
export const fetchEthPrice = async (): Promise<number> => {
    try {
        const rpcUrl = process.env.REACT_APP_ETH_RPC_URL;
        if (!rpcUrl) {
            throw new Error("RPC URL not configured");
        }

        const provider = new ethers.JsonRpcProvider(rpcUrl);

        // Dynamically get the main pool address through the factory
        const factory = new ethers.Contract(
            UNISWAP_V3_FACTORY,
            FACTORY_ABI,
            provider
        );
        const poolAddress = await factory.getPool(
            WETH_ADDRESS,
            USDC_ADDRESS,
            FEE
        );
        if (!poolAddress || poolAddress === ethers.ZeroAddress) {
            throw new Error("Pool address not found");
        }

        // Create pool contract instance with the obtained address
        const pool = new ethers.Contract(poolAddress, POOL_ABI, provider);
        const [slot0Data, token0Address] = await Promise.all([
            pool.slot0(),
            pool.token0(),
        ]);

        const isEthToken0 =
            token0Address.toLowerCase() === WETH_ADDRESS.toLowerCase();

        const sqrtPriceX96 = slot0Data[0];
        const price = calculatePriceFromSqrtPriceX96(sqrtPriceX96);
        return isEthToken0 ? price : Number((1 / price).toFixed(0));
    } catch (error) {
        console.error("Error fetching ETH price from UniSwap:", error);

        // Fallback to CoinGecko
        try {
            const response = await axios.get(
                "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd",
                {
                    headers: { Accept: "application/json" },
                    timeout: 5000,
                }
            );
            if (response.data?.ethereum?.usd) {
                return response.data.ethereum.usd;
            }
        } catch (coingeckoError) {
            console.error("CoinGecko fallback also failed:", coingeckoError);
        }

        return FALLBACK_ETH_PRICE;
    }
};

/**
 * Format currency values
 * @param value - value to format
 * @returns formatted string
 */
export const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value);
};
