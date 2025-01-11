import React, { useEffect, useState } from 'react';
import { getSuppliers } from '../api/suppliers';

const SupplierList = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    getSuppliers().then((data) => setSuppliers(data));
  }, []);

  return (
    <ul>
      {suppliers.map((supplier) => (
        <li key={supplier.id}>{supplier.name}</li>
      ))}
    </ul>
  );
};

export default SupplierList;
