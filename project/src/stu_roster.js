import React, { useState } from 'react';

const ExpandableTable = () => {
  // State to hold rows of data
  const [rows, setRows] = useState([
    { id: 1, firstName: '', lastName: '', age: '' }, // Initial row
  ]);

  const addRow = () => {
    setRows([
      ...rows,
      { id: rows.length + 1, firstName: '', lastName: '', age: '' }, // New row with default empty values
    ]);
  };

  const handleInputChange = (id, field, value) => {
    setRows(
      rows.map(row => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Expandable Table</h2>
      <table className="min-w-full bg-white border border-gray-300 rounded-md">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">#</th>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Age</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={row.id}>
              <td className="py-2 px-4 border-b text-center">{index + 1}</td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={row.firstName}
                  onChange={e => handleInputChange(row.id, 'firstName', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  value={row.lastName}
                  onChange={e => handleInputChange(row.id, 'lastName', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="number"
                  value={row.age}
                  onChange={e => handleInputChange(row.id, 'age', e.target.value)}
                  className="w-full p-1 border border-gray-300 rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={addRow}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Add Row
      </button>
    </div>
  );
};

export default ExpandableTable;
