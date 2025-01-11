import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const Compliance = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        supplier_id: 0,
        metric: '',
        status: '',
        Daterecorded: '',
        result: 0,
    });
    const [aiInsight, setAiInsight] = useState(''); // State to store AI insights
    const [loadingInsight, setLoadingInsight] = useState(false); // State for loading

    const { data: complianceRecords, isLoading } = useQuery('compliance', async () => {
        const response = await fetch('http://localhost:8001/compliance');
        if (!response.ok) throw new Error('Failed to fetch compliance records');
        const data = await response.json();
        console.log("Fetched compliance records:", data); // Log to inspect the fetched data
        return data;
    });

    const createCompliance = useMutation(
        async (newRecord) => {
            const response = await fetch('http://localhost:8001/compliance', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newRecord),
            });
            if (!response.ok) throw new Error('Failed to create compliance record');
            return response.json();
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries('compliance');
                setFormData({ supplier_id: 0, metric: '', status: '', Daterecorded: '', result: 0 });
            },
        }
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        createCompliance.mutate(formData);
    };

    const handleAIAnalysis = async () => {
        console.log('FormData:', formData); // Debug log
        setLoadingInsight(true);
        try {
            const response = await fetch('http://localhost:8001/analyze-compliance/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                metric: formData.metric,
                status: formData.status,
                    supplier_id: formData.supplier_id,
                Daterecorded: formData.Daterecorded,
                result: formData.result,
            }),
            });
            const result = await response.json();
            if (response.ok) {
                setAiInsight(result.insights);
            } else {
                console.error(result.detail || 'Error analyzing compliance data');
            }
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoadingInsight(false);
        }
    };

    if (isLoading) return <div>Loading compliance records...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Add Compliance Record</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Supplier ID:</label>
                        <input
                            type="number"
                            value={formData.supplier_id}
                            onChange={(e) => setFormData({ ...formData, supplier_id: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Metric:</label>
                        <input
                            type="text"
                            value={formData.metric}
                            onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Status:</label>
                        <input
                            type="text"
                            value={formData.status}
                            onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Date Recorded:</label>
                        <input
                            type="date"
                            value={formData.Daterecorded}
                            onChange={(e) => setFormData({ ...formData, Daterecorded: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Result:</label>
                        <input
                            type="number"
                            value={formData.result}
                            onChange={(e) => setFormData({ ...formData, result: Number(e.target.value) })}
                            className="w-full p-2 border rounded"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Record
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">AI Insights</h2>
                <button
                    onClick={handleAIAnalysis}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    disabled={loadingInsight}
                >
                    {loadingInsight ? 'Analyzing...' : 'Get AI Insight'}
                </button>
                {aiInsight && (
                    <div className="mt-4 p-4 bg-gray-100 border rounded">
                        <h3 className="font-bold">AI Insight:</h3>
                        <p>{aiInsight}</p>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Compliance Records</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left">Supplier ID</th>
                                <th className="px-6 py-3 text-left">Metric</th>
                                <th className="px-6 py-3 text-left">Status</th>
                                <th className="px-6 py-3 text-left">Date Recorded</th>
                                <th className="px-6 py-3 text-left">Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {complianceRecords?.map((record) => (
                                <tr key={record.id} className="border-t">
                                    <td className="px-6 py-4">{record.supplier_id}</td>
                                    <td className="px-6 py-4">{record.metric}</td>
                                    <td className="px-6 py-4">{record.status}</td>
                                    <td className="px-6 py-4">{record.Daterecorded}</td>
                                    <td className="px-6 py-4">{record.result}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Compliance;
