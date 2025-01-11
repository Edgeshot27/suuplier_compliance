import React, { useEffect, useState } from 'react';
import { getSupplierDetails } from '../api/suppliers';

const SupplierDetails = ({ supplierId }) => {
  const [supplier, setSupplier] = useState(null);

  useEffect(() => {
    getSupplierDetails(supplierId).then((data) => setSupplier(data));
  }, [supplierId]);

  if (!supplier) return <p>Loading...</p>;

  return (
    <div>
      <h2>{supplier.name}</h2>
      <p>{supplier.details}</p>
    </div>
  );
};

export default SupplierDetails;
