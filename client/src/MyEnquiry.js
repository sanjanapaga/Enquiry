import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MyEnquiry = (props) => {
  const [enquiries, setEnquiries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/enquiries')
        console.log('Fetched Data:', response.data)

        const formattedData = response.data.map(enquiry => ({
          ...enquiry,
          subCategory: Array.isArray(enquiry.subCategory) ? enquiry.subCategory.join(', ') : enquiry.subCategory
        }))

        setEnquiries(formattedData)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching data:', error)
        setLoading(false)
      }
    };

    fetchData()
  }, []);

  return (
    <div>
      <h2>My Enquiries</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {enquiries.map((enquiry, index) => (
            <li key={index}>
              <div>Category: {enquiry.category}</div>
              <div>Subcategory: {enquiry.subCategory}</div>
              <div>Brief Requirement: {enquiry.briefRequirement}</div>
              <div>Contact Number: {enquiry.contactNumber}</div>
              <div>Date: {new Date(enquiry.date).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default MyEnquiry
