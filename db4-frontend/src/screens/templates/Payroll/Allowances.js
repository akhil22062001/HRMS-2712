import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDebounce } from "use-debounce";
import CreateAllowance from "./CreateAllowance";
import "./Allowances.css";
import {
  FaList,
  FaTh,
  FaFilter,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const Allowances = () => {
  const [allowancesData, setAllowancesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("card");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState({
    code: "",
    name: "",
    amount: "",
    oneTime: "No",
    taxable: "No",
    fixed: false,
  });

  const [filterOptions, setFilterOptions] = useState({
    taxable: "",
    fixed: "",
    oneTime: "",
    amount: ""
  });

  const [filtersApplied, setFiltersApplied] = useState(false);

  useEffect(() => {
    if (debouncedSearchTerm === "") {
      setFilteredData(allowancesData);
    } else {
      const filtered = allowancesData.filter((allowance) =>
        allowance.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [debouncedSearchTerm, allowancesData]);

  useEffect(() => {
    const fetchAllowances = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/allowances");
        setAllowancesData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error("Error fetching allowances:", error);
      }
    };
    fetchAllowances();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term === "") {
      setFilteredData(allowancesData);
    } else {
      const filtered = allowancesData.filter((allowance) =>
        allowance.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleEdit = async (id) => {
    const allowanceToEdit = allowancesData.find(allowance => allowance._id === id);
    if (!allowanceToEdit) return;
    setEditFormData(allowanceToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/allowances/${editFormData._id}`,
        editFormData
      );
      setAllowancesData(prev =>
        prev.map(allowance => allowance._id === editFormData._id ? response.data : allowance)
      );
      setFilteredData(prev =>
        prev.map(allowance => allowance._id === editFormData._id ? response.data : allowance)
      );
      setIsEditModalOpen(false);
    } catch (error) {
      console.error("Error updating allowance:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!id || !window.confirm("Are you sure you want to delete this allowance?")) {
      return;
    }
    try {
      await axios.delete(`http://localhost:5000/api/allowances/${id}`);
      const updatedData = allowancesData.filter(allowance => allowance._id !== id);
      setAllowancesData(updatedData);
      setFilteredData(updatedData);
    } catch (error) {
      console.error("Error details:", error.response?.data);
    }
  };

  const toggleFilterVisibility = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilter = () => {
    let filtered = [...allowancesData];

    if (filterOptions.taxable) {
      filtered = filtered.filter(item => item.taxable === filterOptions.taxable);
    }
    if (filterOptions.fixed) {
      filtered = filtered.filter(item =>
        filterOptions.fixed === "Yes" ? item.fixed : !item.fixed
      );
    }
    if (filterOptions.oneTime) {
      filtered = filtered.filter(item => item.oneTime === filterOptions.oneTime);
    }
    if (filterOptions.amount) {
      filtered = filtered.filter(item => {
        switch (filterOptions.amount) {
          case "lessThan1000":
            return item.amount < 1000;
          case "1000to5000":
            return item.amount >= 1000 && item.amount <= 5000;
          case "moreThan5000":
            return item.amount > 5000;
          default:
            return true;
        }
      });
    }

    setFilteredData(filtered);
    setIsFilterVisible(false);
    setFiltersApplied(true);
  };

  const resetFilters = () => {
    setFilterOptions({
      taxable: "",
      fixed: "",
      oneTime: "",
      amount: ""
    });
    setFilteredData(allowancesData);
    setFiltersApplied(false);
    setIsFilterVisible(false);
  };

  return (
    <div className="allowances-container">
      <header className="allowances-header">
        <h2>Allowances</h2>
        <div className="controls">
          <input
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={handleSearch}
            className="allowance-search-input"
          />
          <button 
            className={`view-toggle ${view === "list" ? "active" : ""}`}
            onClick={() => setView("list")}
          >
            <FaList />
          </button>
          <button 
            className={`view-toggle ${view === "card" ? "active" : ""}`}
            onClick={() => setView("card")}
          >
            <FaTh />
          </button>
          <button
            className="filter-btn"
            onClick={() => filtersApplied ? resetFilters() : toggleFilterVisibility()}
          >
            <FaFilter /> {filtersApplied ? "Reset" : "Filter"}
          </button>
          <button 
            className="create-btn" 
            onClick={() => setIsCreateModalOpen(true)}
          >
            <FaPlus /> Create
          </button>
        </div>
      </header>

      {isFilterVisible && (
        <div className="filter-popup">
          <div className="filter-form">
            <div className="filter-row">
              <label>Taxable</label>
              <select 
                name="taxable" 
                value={filterOptions.taxable} 
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="filter-row">
              <label>Fixed/Variable</label>
              <select 
                name="fixed" 
                value={filterOptions.fixed} 
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Yes">Fixed</option>
                <option value="No">Variable</option>
              </select>
            </div>

            <div className="filter-row">
              <label>One Time</label>
              <select 
                name="oneTime" 
                value={filterOptions.oneTime} 
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="filter-row">
              <label>Amount Range</label>
              <select 
                name="amount" 
                value={filterOptions.amount} 
                onChange={handleFilterChange}
              >
                <option value="">All</option>
                <option value="lessThan1000">Less than 1000</option>
                <option value="1000to5000">1000 to 5000</option>
                <option value="moreThan5000">More than 5000</option>
              </select>
            </div>

            <button
              onClick={applyFilter}
              disabled={!Object.values(filterOptions).some(value => value !== "")}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}

      {view === "card" ? (
        <div className="card-view">
          {filteredData.length > 0 ? (
            filteredData.map((allowance) => (
              <div className="allowance-card" key={allowance._id}>
                <div className="card-icon">
                  {allowance.name.charAt(0).toUpperCase()}
                </div>
                <div className="card-content">
                  <h3>{allowance.name}</h3>
                  <p>Amount: {allowance.amount}</p>
                  <p>One Time: {allowance.oneTime}</p>
                  <p>Taxable: {allowance.taxable}</p>
                </div>
                <div className="card-actions">
                  <button
                    className="allowance-card-edit-button"
                    onClick={() => handleEdit(allowance._id)}
                  >
                    <FaEdit size={20} />
                  </button>
                  <button
                    className="allowance-card-delete-button"
                    onClick={() => handleDelete(allowance._id)}
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>No Allowances Found</p>
          )}
        </div>
      ) : (
        <div className="list-view">
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th className="sticky-column">Allowance</th>
                  <th className="scrollable-column">Specific Employees</th>
                  <th className="scrollable-column">Excluded Employees</th>
                  <th className="scrollable-column">Is Taxable</th>
                  <th className="scrollable-column">Is Condition Based</th>
                  <th className="scrollable-column">Condition</th>
                  <th className="scrollable-column">Is Fixed</th>
                  <th className="scrollable-column">Amount</th>
                  <th className="scrollable-column">Based On</th>
                  <th className="scrollable-column">Rate</th>
                  <th className="sticky-column">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((allowance) => (
                  <tr key={allowance._id}>
                    <td className="sticky-column">{allowance.name}</td>
                    <td>-</td>
                    <td>-</td>
                    <td>{allowance.taxable}</td>
                    <td>No</td>
                    <td>-</td>
                    <td>{allowance.fixed ? "Yes" : "No"}</td>
                    <td>{allowance.amount}</td>
                    <td>-</td>
                    <td>-</td>
                    <td className="sticky-column">
                      <button
                        className="all-list-edit-btn"
                        onClick={() => handleEdit(allowance._id)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="all-list-delete-btn"
                        onClick={() => handleDelete(allowance._id)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isCreateModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsCreateModalOpen(false)}>×</button>
            <CreateAllowance
              addAllowance={(newAllowance) => {
                setAllowancesData(prev => [...prev, newAllowance]);
                setFilteredData(prev => [...prev, newAllowance]);
                setIsCreateModalOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {isEditModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-btn" onClick={() => setIsEditModalOpen(false)}>×</button>
            <h3>Edit Allowance</h3>
            <form onSubmit={handleEditSubmit}>
              <div className="group">
                <label>
                  Code:
                  <input
                    type="text"
                    name="code"
                    value={editFormData.code}
                    onChange={(e) => setEditFormData({ ...editFormData, code: e.target.value })}
                  />
                </label>
                <label>
                  Name:
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                  />
                </label>
              </div>

              <div className="group">
                <label>
                  Amount:
                  <input
                    type="number"
                    name="amount"
                    value={editFormData.amount}
                    onChange={(e) => setEditFormData({ ...editFormData, amount: Number(e.target.value) })}
                  />
                </label>
                <label>
                  One Time:
                  <select
                    name="oneTime"
                    value={editFormData.oneTime}
                    onChange={(e) => setEditFormData({ ...editFormData, oneTime: e.target.value })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </label>
              </div>

              <div className="group">
                <label>
                  Taxable:
                  <select
                    name="taxable"
                    value={editFormData.taxable}
                    onChange={(e) => setEditFormData({ ...editFormData, taxable: e.target.value })}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    </select>
                </label>
                <label>
                  Fixed:
                  <input
                    type="checkbox"
                    name="fixed"
                    checked={editFormData.fixed}
                    onChange={(e) => setEditFormData({ ...editFormData, fixed: e.target.checked })}
                  />
                </label>
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={() => setIsEditModalOpen(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Allowances;
