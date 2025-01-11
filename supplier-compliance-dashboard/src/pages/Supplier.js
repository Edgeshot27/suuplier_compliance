import React from 'react';
import { useParams } from 'react-router-dom';
import SupplierDetails from '../components/SupplierDetails';

const Supplier = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Supplier Details</h1>
      <SupplierDetails supplierId={id} />
    </div>
  );
};

export default Supplier;
