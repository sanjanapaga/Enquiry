import React, { useState } from 'react'
import axios from 'axios'

const NewEnquiryForm = ({ showForm, onSubmit }) => {
  const [formData, setFormData] = useState({
    requirement: '',
    category: '',
    subCategory: [],
    briefRequirement: '',
    file: null,
    date: '',
    contactNumber: ''
  });
  const [error, setError] = useState('')
  const [selectedUsers, setSelectedUsers] = useState([])
  const [showPopup, setShowPopup] = useState(false)

  const subCategoryOptions = ["Subcategory 1", "Subcategory 2", "Subcategory 3"]

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubCategoryChange = (e) => {
    const { value } = e.target
    const isChecked = e.target.checked
    if (isChecked && !formData.subCategory.includes(value)) {
      setFormData({
        ...formData,
        subCategory: [...formData.subCategory, value]
      })
    } else {
      setFormData({
        ...formData,
        subCategory: formData.subCategory.filter((sub) => sub !== value)
      })
    }
  }

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      file: e.target.files[0]
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (!formData.contactNumber || formData.subCategory.length === 0) {
        throw new Error('Required fields are missing')
      }
  
      const subCategoryString = formData.subCategory.join(', ')
  

      const formDataWithSubCategory = {
        ...formData,
        subCategory: subCategoryString
      };
  
      const response = await axios.post('http://localhost:3000/api/enquiries', formDataWithSubCategory);
      console.log(response.data)
      onSubmit(formData)
  
      setFormData({
        requirement: '',
        category: '',
        subCategory: [],
        briefRequirement: '',
        file: null,
        date: '',
        contactNumber: ''
      });
      setError('');
    } catch (error) {
      console.error('Error submitting form:', error)
      setError(error.message)
    }
  }
  

  const handleGetData = () => {
    const data = ['User 1', 'User 2', 'User 3', 'User 4', 'User 5']
    setSelectedUsers(data)
    setShowPopup(true)
  }

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target
    if (checked) {
      setSelectedUsers([...selectedUsers, value])
    } else {
      setSelectedUsers(selectedUsers.filter(user => user !== value))
    }
  }

  if (!showForm) return null

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="border p-4">
        {error && <div className="text-danger">{error}</div>}
        <div className="mb-3">
          <label htmlFor="requirement" className="form-label">Requirement:</label>
          <input type="text" className="form-control" id="requirement" name="requirement" value={formData.requirement} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">Category:</label>
          <select className="form-select" id="category" name="category" value={formData.category} onChange={handleInputChange}>
            <option value="">Select category</option>
            <option value="Option 1">Option 1</option>
            <option value="Option 2">Option 2</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Subcategory:</label>
          {subCategoryOptions.map((subCategory, index) => (
            <div key={index} className="form-check">
              <input
                type="checkbox"
                className="form-check-input"
                id={`subCategory-${index}`}
                name="subCategory"
                value={subCategory}
                onChange={handleSubCategoryChange}
                checked={formData.subCategory.includes(subCategory)}
              />
              <label className="form-check-label" htmlFor={`subCategory-${index}`}>{subCategory}</label>
            </div>
          ))}
        </div>
        <div className="mb-3">
          <label htmlFor="briefRequirement" className="form-label">Brief Requirement:</label>
          <textarea className="form-control" id="briefRequirement" name="briefRequirement" value={formData.briefRequirement} onChange={handleInputChange} rows="4" />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleGetData}>Get Data</button>
        {showPopup && (
          <div className="popup">
            <div className="popup-content">
              <h2>Users</h2>
              {selectedUsers.map((name, index) => (
                <div key={index}>
                  <input type="checkbox" id={`checkbox-${index}`} value={name} onChange={handleCheckboxChange} checked={selectedUsers.includes(name)} />
                  <label htmlFor={`checkbox-${index}`}>{name}</label>
                </div>
              ))}
              <button className="btn btn-primary" onClick={() => setShowPopup(false)}>Submit</button>
            </div>
          </div>
        )}
        {selectedUsers.length > 0 && (
          <div>
            <h3>Selected Supliers</h3>
            {selectedUsers.map((user, index) => (
              <div key={index}>{user}</div>
            ))}
          </div>
        )}
        <div className="mb-3">
          <label htmlFor="file" className="form-label">Upload File:</label>
          <input type="file" className="form-control" id="file" name="file" onChange={handleFileChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date:</label>
          <input type="date" className="form-control" id="date" name="date" value={formData.date} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
          <input type="text" className="form-control" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleInputChange} />
        </div>
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </div>
  )
}

export default NewEnquiryForm

