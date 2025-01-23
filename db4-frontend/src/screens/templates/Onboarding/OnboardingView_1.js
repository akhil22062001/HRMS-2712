import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OnboardingView.css";

function OnboardingView() {
  const [candidates, setCandidates] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [stageFilter, setStageFilter] = useState("All");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCandidate, setNewCandidate] = useState({
    name: "",
    email: "",
    jobPosition: "",
    mobile: "",
    joiningDate: "",
    stage: "Test",
    portalStatus: "Active",
    taskStatus: "Pending",
  });

  // Add these validation functions at the top of your component
  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phone);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePosition = (position) => {
    const positionRegex = /^[a-zA-Z\s]+$/;
    return positionRegex.test(position);
  };

  // Add state for validation errors
  const [validationErrors, setValidationErrors] = useState({
    phone: "",
    email: "",
    position: "",
  });

  const uniqueStages = ["All", "Test", "Interview", "Offer"];

  useEffect(() => {
    fetchCandidates();
  }, [stageFilter]);

  const fetchCandidates = async () => {
    try {
      const url =
        stageFilter === "All"
          ? "http://localhost:5000/api/onboarding"
          : `http://localhost:5000/api/onboarding/filter?stage=${stageFilter}`;
      const response = await axios.get(url);
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  // Update the handleInputChange function
  const handleInputChange = (e, field) => {
    const value = e.target.value;

    switch (field) {
      case "mobile":
        if (value === "" || /^\d+$/.test(value)) {
          setNewCandidate({ ...newCandidate, mobile: value });
          setValidationErrors({
            ...validationErrors,
            phone: validatePhone(value)
              ? ""
              : "Please enter a valid 10-digit phone number",
          });
        }
        break;

      case "email":
        setNewCandidate({ ...newCandidate, email: value });
        setValidationErrors({
          ...validationErrors,
          email: validateEmail(value)
            ? ""
            : "Please enter a valid email address",
        });
        break;

      case "jobPosition":
        if (value === "" || /^[a-zA-Z\s]+$/.test(value)) {
          setNewCandidate({ ...newCandidate, jobPosition: value });
          setValidationErrors({
            ...validationErrors,
            position: validatePosition(value)
              ? ""
              : "Position should contain only letters",
          });
        }
        break;

      default:
        setNewCandidate({ ...newCandidate, [field]: value });
    }
  };

  // Update the form submission handler
  const handleCreateCandidate = async (e) => {
    e.preventDefault();

    const errors = {
      phone: validatePhone(newCandidate.mobile) ? "" : "Invalid phone number",
      email: validateEmail(newCandidate.email) ? "" : "Invalid email",
      position: validatePosition(newCandidate.jobPosition)
        ? ""
        : "Invalid position",
    };

    setValidationErrors(errors);

    if (Object.values(errors).some((error) => error !== "")) {
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/onboarding",
        newCandidate
      );
      setCandidates([...candidates, response.data]);
      setNewCandidate({
        name: "",
        email: "",
        jobPosition: "",
        mobile: "",
        joiningDate: "",
        stage: "Test",
        portalStatus: "Active",
        taskStatus: "Pending",
      });
      setValidationErrors({
        phone: "",
        email: "",
        position: "",
      });
      setShowCreateForm(false);
    } catch (error) {
      console.error("Error creating candidate:", error);
    }
  };

  const handleDeleteCandidate = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/onboarding/${id}`);
      setCandidates(candidates.filter((candidate) => candidate._id !== id));
    } catch (error) {
      console.error("Error deleting candidate:", error);
    }
  };

  const sendMailToCandidate = async (candidate) => {
    try {
      await axios.post("http://localhost:5000/api/onboarding/send-email", {
        email: candidate.email,
        name: candidate.name,
        jobPosition: candidate.jobPosition,
        joiningDate: candidate.joiningDate,
      });
      alert("Onboarding email sent successfully!");
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Failed to send email. Please try again.");
    }
  };

  const filteredCandidates = candidates.filter((candidate) =>
    candidate.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="onboarding-container">
      <div className="onboarding-header">
        <h1>Onboarding Dashboard</h1>
        <div className="header-actions">
          <input
            type="text"
            placeholder="Search candidates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
            className="stage-select"
          >
            {uniqueStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
          <button
            className="add-candidate-btn"
            onClick={() => setShowCreateForm(true)}
          >
            Add New Candidate
          </button>
        </div>
      </div>

      {showCreateForm && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Add New Candidate</h2>
            <form onSubmit={handleCreateCandidate} className="candidate-form">
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newCandidate.name}
                  onChange={(e) => handleInputChange(e, "name")}
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={newCandidate.email}
                  onChange={(e) => handleInputChange(e, "email")}
                  required
                />
                {validationErrors.email && (
                  <span className="error-message">
                    {validationErrors.email}
                  </span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Job Position"
                  value={newCandidate.jobPosition}
                  onChange={(e) => handleInputChange(e, "jobPosition")}
                  required
                />
                {validationErrors.position && (
                  <span className="error-message">
                    {validationErrors.position}
                  </span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="tel"
                  placeholder="Mobile Number"
                  value={newCandidate.mobile}
                  onChange={(e) => handleInputChange(e, "mobile")}
                  required
                />
                {validationErrors.phone && (
                  <span className="error-message">
                    {validationErrors.phone}
                  </span>
                )}
              </div>
              <div className="form-group">
                <input
                  type="date"
                  value={newCandidate.joiningDate}
                  onChange={(e) => handleInputChange(e, "joiningDate")}
                  required
                />
              </div>
              <div className="form-group">
                <select
                  value={newCandidate.stage}
                  onChange={(e) => handleInputChange(e, "stage")}
                  required
                  className="stage-input"
                >
                  <option value="" disabled>
                    Select Stage
                  </option>
                  <option value="Test">Test</option>
                  <option value="Interview">Interview</option>
                  <option value="Offer">Offer</option>
                </select>
              </div>
              <div className="form-actions">
                <button type="submit" className="submit-btn">
                  Add Candidate
                </button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="candidates-table-container">
        <table className="candidates-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Position</th>
              <th>Mobile</th>
              <th>Joining Date</th>
              <th>Stage</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCandidates.map((candidate) => (
              <tr key={candidate._id}>
                <td>{candidate.name}</td>
                <td>{candidate.email}</td>
                <td>{candidate.jobPosition}</td>
                <td>{candidate.mobile}</td>
                <td>{new Date(candidate.joiningDate).toLocaleDateString()}</td>
                <td>
                  <span
                    className={`stage-badge ${candidate.stage.toLowerCase()}`}
                  >
                    {candidate.stage}
                  </span>
                </td>
                <td className="action-cell">
                  <div className="action-buttons-wrapper">
                    <button
                      onClick={() => sendMailToCandidate(candidate)}
                      className="action-btn mail-btn"
                    >
                      <i className="fas fa-envelope" size={18}></i>
                    </button>
                    <button
                      onClick={() => handleDeleteCandidate(candidate._id)}
                      className="action-btn onboarding-delete-btn"
                    >
                      <i className="fas fa-trash " size={18}></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OnboardingView;
