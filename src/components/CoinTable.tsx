import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface CoinData {
    id: string;
    market_cap_rank: number;
    name: string;
    symbol: string;
    current_price: number;
    market_cap: number;
}

const CoinTable: React.FC = () => {
    const [coinData, setCoinData] = useState<CoinData[]>([]);

    useEffect(() => {
        const fetchCoinData = async () => {
            try {
                const response = await axios.get<CoinData[]>('https://api.coingecko.com/api/v3/coins/markets', {
                    params: {
                        vs_currency: 'usd',
                        order: 'market_cap_desc',
                        per_page: 10,
                        page: 1,
                    },
                });

                setCoinData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchCoinData();
    }, []);

    return (
        <table className="border-collapse border border-slate-400 ...">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">Rank</th>
                    <th scope="col" className="px-6 py-3">Name</th>
                    <th scope="col" className="px-6 py-3">Symbol</th>
                    <th scope="col" className="px-6 py-3">Price (USD)</th>
                    <th scope="col" className="px-6 py-3">Market Cap (USD)</th>
                </tr>
            </thead>
            <tbody className="text-center">
                {coinData.map((coin) => {
                    return (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={coin.id}>
                            <td className="px-6 py-4">{coin.market_cap_rank}</td>
                            <td className="px-6 py-4">{coin.name}</td>
                            <td className="px-6 py-4">{coin.symbol}</td>
                            <td className="px-6 py-4">${coin.current_price}</td>
                            <td className="px-6 py-4">${coin.market_cap}</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default CoinTable;
