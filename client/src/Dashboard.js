import React, { useState } from "react"
import MyEnquiry from "./MyEnquiry"
import NewEnquiryForm from "./NewEnquiryForm"

const Dashboard = (props) => {
  const [showForm, setShowForm] = useState(false)
  const [enquiries, setEnquiries] = useState([])

  const toggleForm = () => {
    setShowForm(!showForm)
  };

  const handleFormSubmit = (formData) => {
    setEnquiries([...enquiries, formData])
    setShowForm(false)
  };

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <button
          onClick={toggleForm}
          style={{ marginRight: "10px", backgroundColor: "blue", color: "white" }}
        >
          New Enquiry
        </button>
        <button
          onClick={() => setShowForm(false)}
          style={{ marginRight: "10px", backgroundColor: "blue", color: "white" }}
        >
          My Enquiry
        </button>
        <button
          style={{ marginRight: "10px", backgroundColor: "blue", color: "white" }}
        >
          Shortlisted Enquiry
        </button>
      </div>
      {showForm && <NewEnquiryForm showForm={true} onSubmit={handleFormSubmit} />}
      {!showForm && <MyEnquiry enquiries={enquiries} />}
    </div>
  );
};

export default Dashboard
