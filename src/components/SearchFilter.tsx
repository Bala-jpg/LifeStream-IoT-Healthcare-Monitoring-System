import React, { useState } from 'react';

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilterChange: (filter: string) => void;
  patientCount: number;
  filteredCount: number;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({
  onSearch,
  onFilterChange,
  patientCount,
  filteredCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onFilterChange(e.target.value);
  };

  return (
    <div className="search-filter-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Search patients by name..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="filter-box">
        <label htmlFor="status-filter">Filter by Status:</label>
        <select
          id="status-filter"
          onChange={handleFilterChange}
          className="filter-select"
        >
          <option value="all">All Patients</option>
          <option value="critical">🚨 Critical</option>
          <option value="warning">⚠️ Warning</option>
          <option value="normal">✓ Normal</option>
        </select>
      </div>

      <div className="patient-count">
        <span className="count-text">
          Showing {filteredCount} of {patientCount} patients
        </span>
      </div>
    </div>
  );
};
