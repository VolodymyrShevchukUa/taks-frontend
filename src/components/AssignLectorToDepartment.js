// AssignLectorToDepartment.js
import React, { useState } from 'react';

const AssignLectorToDepartment = ({ lectors, departments, onAssign }) => {
  const [selectedLector, setSelectedLector] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleLectorChange = (e) => {
    setSelectedLector(e.target.value);
  };

  const handleDepartmentChange = (e) => {
    setSelectedDepartment(e.target.value);
  };

  const handleAssign = () => {
    onAssign({ lectorId: selectedLector, departmentId: selectedDepartment });
    // Optionally, you can reset the selected values after assignment
    setSelectedLector('');
    setSelectedDepartment('');
  };

  return (
      <div>
        <label>
          Select Lector:
          <select value={selectedLector} onChange={handleLectorChange}>
            <option value="">Select Lector</option>
            {lectors.map((lector) => (
                <option key={lector.id} value={lector.id}>
                  {lector.name}
                </option>
            ))}
          </select>
        </label>
        <label>
          Select Department:
          <select value={selectedDepartment} onChange={handleDepartmentChange}>
            <option value="">Select Department</option>
            {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
            ))}
          </select>
        </label>
        <button onClick={handleAssign} disabled={!selectedLector || !selectedDepartment}>
          Assign Lector to Department
        </button>
      </div>
  );
};

export default AssignLectorToDepartment;
