import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';

const Suppliers = () => {
    const queryClient = useQueryClient();
    const [formData, setFormData] = useState({
        name: '',
        country: '',
        contract_terms: {
            payment_method: '',
            terms: ''
        },
        last_audit: ''
    });
    const [supplierId, setSupplierId] = useState('');
    const [supplierDetails, setSupplierDetails] = useState(null);

    const { data: suppliers, isLoading } = useQuery('suppliers', async () => {
        const response = await fetch('http://localhost:8001/suppliers');
        return response.json();
    });

    const createSupplier = useMutation(
        async (newSupplier) => {
            const response = await fetch('http://localhost:8001/suppliers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newSupplier)
            });
            return response.json();
        },
        {
            onSuccess: async () => {
                await queryClient.invalidateQueries('suppliers');
                setFormData({
                    name: '',
                    country: '',
                    contract_terms: {
                        payment_method: '',
                        terms: ''
                    },
                    last_audit: ''
                });
            }
        }
    );

    const getSupplierById = async (id) => {
        try {
            const response = await fetch(`http://localhost:8001/suppliers/${id}`);
            if (!response.ok) throw new Error('Supplier not found');
            const data = await response.json();
            setSupplierDetails(data);
        } catch (error) {
            setSupplierDetails(null);
            console.error('Error fetching supplier:', error);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createSupplier.mutate(formData);
    };

    const handleFetchSupplier = (e) => {
        e.preventDefault();
        getSupplierById(supplierId);
    };

    if (isLoading) return <div>Loading suppliers...</div>;

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Add New Supplier</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block mb-2">Name:</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Country:</label>
                        <input
                            type="text"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Payment Method:</label>
                        <input
                            type="text"
                            value={formData.contract_terms.payment_method}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contract_terms: {
                                        ...formData.contract_terms,
                                        payment_method: e.target.value
                                    }
                                })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Terms:</label>
                        <input
                            type="text"
                            value={formData.contract_terms.terms}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    contract_terms: {
                                        ...formData.contract_terms,
                                        terms: e.target.value
                                    }
                                })
                            }
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <div>
                        <label className="block mb-2">Last Audit:</label>
                        <input
                            type="date"
                            value={formData.last_audit}
                            onChange={(e) => setFormData({ ...formData, last_audit: e.target.value })}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        Add Supplier
                    </button>
                </form>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Suppliers List</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full">
                        <thead>
                            <tr className="bg-gray-50">
                                <th className="px-6 py-3 text-left">Name</th>
                                <th className="px-6 py-3 text-left">Country</th>
                                <th className="px-6 py-3 text-left">Contract Terms</th>
                                <th className="px-6 py-3 text-left">Last Audit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {suppliers?.map((supplier) => (
                                <tr key={supplier.id} className="border-t">
                                    <td className="px-6 py-4">{supplier.name}</td>
                                    <td className="px-6 py-4">{supplier.country}</td>
                                    <td className="px-6 py-4">
                                        {/* Render contract_terms dynamically */}
                                        {supplier.contract_terms && typeof supplier.contract_terms === 'object'
                                            ? `Method: ${supplier.contract_terms.payment_method}, Terms: ${supplier.contract_terms.terms}`
                                            : supplier.contract_terms}
                                    </td>
                                    <td className="px-6 py-4">{supplier.last_audit}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-bold mb-4">Get Supplier by ID</h2>
                <form onSubmit={handleFetchSupplier} className="space-y-4">
                    <div>
                        <label className="block mb-2">Supplier ID:</label>
                        <input
                            type="text"
                            value={supplierId}
                            onChange={(e) => setSupplierId(e.target.value)}
                            className="w-full p-2 border rounded"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Fetch Supplier
                    </button>
                </form>

                {supplierDetails && (
                    <div className="mt-6">
                        <h3 className="text-lg font-bold">Supplier Details</h3>
                        <p><strong>Name:</strong> {supplierDetails.name}</p>
                        <p><strong>Country:</strong> {supplierDetails.country}</p>
                        <p><strong>Contract Terms:</strong>
                            {supplierDetails.contract_terms && typeof supplierDetails.contract_terms === 'object'
                                ? `Method: ${supplierDetails.contract_terms.payment_method}, Terms: ${supplierDetails.contract_terms.terms}`
                                : supplierDetails.contract_terms}
                        </p>
                        <p><strong>Last Audit:</strong> {supplierDetails.last_audit}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Suppliers;
