import React from 'react';
import { useQuery } from 'react-query';

const Home = () => {
    const { data, isLoading, error } = useQuery('testConnection', async () => {
        const response = await fetch('http://localhost:8001/test');
        return response.json();
    });

    if (isLoading) return <div>Testing connection...</div>;
    if (error) return <div>Error: {error.message}</div>;

    return (
        <div className="bg-white rounded-lg shadow p-6">
            <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                {data?.message || data?.error}
            </div>
        </div>
    );
};

export default Home;