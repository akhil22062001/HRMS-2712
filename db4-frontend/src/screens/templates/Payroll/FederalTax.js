// import React, { useState } from 'react';

// import { FaMinus, FaPlus, FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';

// import './FederalTax.css';

// const FederalTax = () => {
//     const [showTable, setShowTable] = useState(true);
//     const [searchTerm, setSearchTerm] = useState('');
//     const [showModal, setShowModal] = useState(false);

//     const [entries, setEntries] = useState([
//         { id: 1, taxRate: "15.00%", minIncome: "ETB 2300.00", maxIncome: "ETB 3300.00" },
//         { id: 2, taxRate: "3.00%", minIncome: "ETB 11000.00", maxIncome: "ETB 460000.00" },
//     ]);

//     const [newEntry, setNewEntry] = useState({ taxRate: '', minIncome: '', maxIncome: '' });
//     const [editId, setEditId] = useState(null); // To track the entry being edited



//     const toggleTableVisibility = () => {
//         setShowTable(!showTable);
//     };

//     const handleSearchChange = (event) => {
//         setSearchTerm(event.target.value);
//     };
    
//     const handleCreateButtonClick = () => {
//         setShowModal(true);
//         setEditId(null); // Reset editId when creating a new entry
//         setNewEntry({ taxRate: '', minIncome: '', maxIncome: '' }); // Clear the form


//     };

//     const handleModalClose = () => {
//         setShowModal(false);
//         setNewEntry({ taxRate: '', minIncome: '', maxIncome: '' });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setNewEntry((prev) => ({ ...prev, [name]: value }));
//     };


//     const handleSaveEntry = () => {
//         if (editId !== null) {
//             // Update an existing entry
//             setEntries((prevEntries) =>
//                 prevEntries.map((entry) =>
//                     entry.id === editId ? { ...entry, ...newEntry } : entry
//                 )
//             );
//         } else {
//             // Add a new entry
//             setEntries((prev) => [...prev, { id: Date.now(), ...newEntry }]);
//         }
//         handleModalClose();
//     }

//     const handleEditEntry = (id) => {
//         const entryToEdit = entries.find((entry) => entry.id === id);
//         setNewEntry(entryToEdit); // Populate form with the entry's current data
//         setEditId(id); // Set the ID of the entry being edited
//         setShowModal(true);
//     };

//     const handleDeleteEntry = (id) => {
//         setEntries((prevEntries) => prevEntries.filter((entry) => entry.id !== id));
//     };


//     const filteredEntries = entries.filter((item) =>
//         item.taxRate.toString().includes(searchTerm) ||
//         item.minIncome.toString().includes(searchTerm) ||
//         item.maxIncome.toString().includes(searchTerm)
//     );



//     return (
//         <div className="filing-status">
//             <div className="header">
//                 <h2>Filing Status</h2>
//                 <div className="actions">
//                     <input
//                         type="text"
//                         placeholder="Search"
//                         value={searchTerm}
//                         onChange={handleSearchChange}
//                         className="search-input"
//                     />
//                     <button className="create-button" onClick={handleCreateButtonClick}>
//                         <FaPlusCircle /> Create
//                     </button>
//                 </div>
//             </div>
//             <div style={{ display: "flex", alignItems: "center" }}>
//                 <button onClick={toggleTableVisibility} className="toggle-button" style={{ textAlign: "center" }}>
//                     {showTable ? <FaMinus /> : <FaPlus />}
//                 </button>
//                 <h3>Porez</h3>
//             </div>

//             {showTable && (
//                 <table className="filing-table">
//                     <thead>
//                         <tr>
//                             <th>Tax Rate</th>
//                             <th>Min. Income</th>
//                             <th>Max. Income</th>
//                             <th width="120">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {filteredEntries.map((item) => (
//                             <tr key={item.id}>
//                                 <td>{item.taxRate}</td>
//                                 <td>{item.minIncome}</td>
//                                 <td>{item.maxIncome}</td>
//                                 <td>
//                                     <div className="action-cell">
//                                         <button
//                                             className="action-btn edit-btn"
//                                             onClick={() => handleEditEntry(item.id)}
//                                         >
//                                             <FaEdit />
//                                         </button>
//                                         <button
//                                             className="action-btn delete-btn"
//                                             onClick={() => handleDeleteEntry(item.id)}
//                                         >
//                                             <FaTrash />
//                                         </button>
//                                     </div>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}


//             {/* Modal */}
//             {showModal && (
//                 <div className="modal-overlay">
//                     <div className="modal-content">
//                         <h3>Filing Status</h3>
//                         <h3>{editId ? "Edit Filing Status" : "Add Filing Status"}</h3>
//                         <label>
//                             Filing Status:
//                             <input
//                                 type="text"
//                                 name="taxRate"
//                                 value={newEntry.taxRate}
//                                 onChange={handleInputChange}
//                                 placeholder="Tax Rate"
//                             />
//                         </label>
//                         <label>
//                             Based on:
//                             <input
//                                 type="text"
//                                 name="minIncome"
//                                 value={newEntry.minIncome}
//                                 onChange={handleInputChange}
//                                 placeholder="Min. Income"
//                             />
//                         </label>
//                         <label>
//                             Python Code:
//                             <input
//                                 type="checkbox"
//                                 name="pythonCode"
//                             />
//                         </label>
//                         <label>
//                             Description:
//                             <input
//                                 type="text"
//                                 name="maxIncome"
//                                 value={newEntry.maxIncome}
//                                 onChange={handleInputChange}
//                                 placeholder="Max. Income"
//                             />
//                         </label>
//                         <div style={{ display: "flex" }}>
//                             <button onClick={handleSaveEntry} className="save-button">{editId ? "Update" : "Save"}
//                             </button>
//                             <button onClick={handleModalClose} className="close-button">Close</button>
//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default FederalTax;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaMinus, FaPlus, FaEdit, FaTrash, FaPlusCircle } from 'react-icons/fa';
import './FederalTax.css';

const FederalTax = () => {
    const [showTable, setShowTable] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState({
        taxRate: '',
        minIncome: '',
        maxIncome: '',
        pythonCode: false,
        description: ''
    });
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchTaxEntries();
    }, []);

    const fetchTaxEntries = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/federal-tax');
            setEntries(response.data);
        } catch (error) {
            console.log('Error fetching tax entries:', error);
        }
    };

    const handleSaveEntry = async () => {
        try {
            if (editId) {
                await axios.put(`http://localhost:5000/api/federal-tax/${editId}`, newEntry);
            } else {
                await axios.post('http://localhost:5000/api/federal-tax', newEntry);
            }
            fetchTaxEntries();
            handleModalClose();
        } catch (error) {
            console.log('Error saving tax entry:', error);
        }
    };

    const handleDeleteEntry = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/federal-tax/${id}`);
            fetchTaxEntries();
        } catch (error) {
            console.log('Error deleting tax entry:', error);
        }
    };

    const handleEditEntry = (entry) => {
        setNewEntry({
            taxRate: entry.taxRate,
            minIncome: entry.minIncome,
            maxIncome: entry.maxIncome,
            pythonCode: entry.pythonCode || false,
            description: entry.description || ''
        });
        setEditId(entry._id);
        setShowModal(true);
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewEntry(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const toggleTableVisibility = () => setShowTable(!showTable);

    const handleCreateButtonClick = () => {
        setShowModal(true);
        setEditId(null);
        setNewEntry({
            taxRate: '',
            minIncome: '',
            maxIncome: '',
            pythonCode: false,
            description: ''
        });
    };

    const handleModalClose = () => {
        setShowModal(false);
        setNewEntry({
            taxRate: '',
            minIncome: '',
            maxIncome: '',
            pythonCode: false,
            description: ''
        });
        setEditId(null);
    };

    const filteredEntries = entries.filter((item) =>
        item.taxRate.toString().includes(searchTerm) ||
        item.minIncome.toString().includes(searchTerm) ||
        item.maxIncome.toString().includes(searchTerm)
    );

    return (
        <div className="filing-status">
            <div className="header">
                <h2>Filing Status</h2>
                <div className="actions">
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                    <button className="create-button" onClick={handleCreateButtonClick}>
                        <FaPlusCircle /> Create
                    </button>
                </div>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
                <button onClick={toggleTableVisibility} className="toggle-button">
                    {showTable ? <FaMinus /> : <FaPlus />}
                </button>
                <h3>Federal Tax Rates</h3>
            </div>

            {showTable && (
                <table className="filing-table">
                    <thead>
                        <tr>
                            <th>Tax Rate</th>
                            <th>Min. Income</th>
                            <th>Max. Income</th>
                            <th>Description</th>
                            <th width="120">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredEntries.map((item) => (
                            <tr key={item._id}>
                                <td>{item.taxRate}</td>
                                <td>{item.minIncome}</td>
                                <td>{item.maxIncome}</td>
                                <td>{item.description}</td>
                                <td>
                                    <div className="action-cell">
                                        <button
                                            className="action-btn edit-btn"
                                            onClick={() => handleEditEntry(item)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className="action-btn delete-btn"
                                            onClick={() => handleDeleteEntry(item._id)}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>{editId ? "Edit Tax Rate" : "Add Tax Rate"}</h3>
                        <label>
                            Tax Rate:
                            <input
                                type="text"
                                name="taxRate"
                                value={newEntry.taxRate}
                                onChange={handleInputChange}
                                placeholder="Tax Rate"
                            />
                        </label>
                        <label>
                            Minimum Income:
                            <input
                                type="text"
                                name="minIncome"
                                value={newEntry.minIncome}
                                onChange={handleInputChange}
                                placeholder="Min. Income"
                            />
                        </label>
                        <label>
                            Maximum Income:
                            <input
                                type="text"
                                name="maxIncome"
                                value={newEntry.maxIncome}
                                onChange={handleInputChange}
                                placeholder="Max. Income"
                            />
                        </label>
                        <label>
                            Python Code:
                            <input
                                type="checkbox"
                                name="pythonCode"
                                checked={newEntry.pythonCode}
                                onChange={handleInputChange}
                            />
                        </label>
                        <label>
                            Description:
                            <input
                                type="text"
                                name="description"
                                value={newEntry.description}
                                onChange={handleInputChange}
                                placeholder="Description"
                            />
                        </label>
                        <div className="modal-buttons">
                            <button onClick={handleSaveEntry} className="save-button">
                                {editId ? "Update" : "Save"}
                            </button>
                            <button onClick={handleModalClose} className="close-button">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FederalTax;

