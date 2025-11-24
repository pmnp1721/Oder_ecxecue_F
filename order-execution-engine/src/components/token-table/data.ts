export type Token = {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
};

export const mockTokens: Token[] = [
  {
    id: "1",
    name: "Solana",
    symbol: "SOL",
    price: 150.23,
    change24h: 5.78,
    volume24h: 2_500_000_000,
    marketCap: 65_000_000_000,
  },
  {
    id: "2",
    name: "Ethereum",
    symbol: "ETH",
    price: 3800.50,
    change24h: -1.25,
    volume24h: 15_000_000_000,
    marketCap: 450_000_000_000,
  },
  {
    id: "3",
    name: "Bitcoin",
    symbol: "BTC",
    price: 70000.00,
    change24h: 2.10,
    volume24h: 30_000_000_000,
    marketCap: 1_300_000_000_000,
  },
  {
    id: "4",
    name: "Ripple",
    symbol: "XRP",
    price: 0.52,
    change24h: -0.80,
    volume24h: 1_200_000_000,
    marketCap: 28_000_000_000,
  },
  {
    id: "5",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.15,
    change24h: 1.50,
    volume24h: 800_000_000,
    marketCap: 22_000_000_000,
  },
];
