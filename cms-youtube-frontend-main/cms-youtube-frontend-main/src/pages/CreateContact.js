import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const CreateContact = () => {
  const { toast } = useContext(ToastContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    company: "",
    email: "",
    phone: "",
    products: "",
    requirement: "",
    status:"",
    query:"",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api0/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDetails),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success(`Created [${userDetails.name}] contact`);
        setUserDetails({
          name: "",
          address: "",
          company: "",
          email: "",
          phone: "",
          products: "",
          requirement: "",
          status:"",
          query:"",
        });
      } else {
        toast.error(result.error);
      }
    } catch (err) {
      toast.error("An error occurred while creating the contact.");
    }
  };

  return (
    <>
      <h2>Create your contact</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyInput" className="form-label mt-4">
          Company
          </label>
          <input
            type="text"
            className="form-control"
            id="companyInput"
            name="company"
            value={userDetails.company}
            onChange={handleInputChange}
            placeholder="Design koktail"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="addressInput" className="form-label mt-4">
            Address 
          </label>
          <input
            type="text"
            className="form-control"
            id="addressInput"
            name="address"
            value={userDetails.address}
            onChange={handleInputChange}
            placeholder="WalkStreet 05, California"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email 
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="johndoe@example.com"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneInput" className="form-label mt-4">
            Phone 
          </label>
          <input
            type="tel"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="+977987654321"
            required
          />
        </div>

        <div className="form-group">
              <label htmlFor="productsInput" className="form-label mt-4">
                Products
              </label>
              <input
                type="text"
                className="form-control"
                id="productsInput"
                name="products"
                value={userDetails.products}
                onChange={handleInputChange}
                placeholder="puppet"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="requirementInput" className="form-label mt-4">
                Requirement
              </label>
              <input
                type="text"
                className="form-control"
                id="requirementInput"
                name="requirement"
                value={userDetails.requirement}
                onChange={handleInputChange}
                placeholder="handicraft"
                required
              />
            </div>

            {/* Dropdown input for status */}
            <div className="form-group">
              <label htmlFor="statusInput" className="form-label mt-4">
                Status
              </label>
              <select
                className="form-control"
                id="statusInput"
                name="status"
                value={userDetails.status}
                onChange={handleInputChange}
                required
              >
                <option value="">Select a status</option>
                <option value="Called">Called</option>
                <option value="Not responding">Not responding</option>
                <option value="Cancelled">Cancelled</option>
                <option value="On hold">On hold</option>
                <option value="Call later">Call later</option>
                <option value="Follow us">Follow us</option>
                <option value="Redial">Redial</option>
              </select>
            </div>

        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Queries
          </label>
          <input
            type="text"
            className="form-control"
            id="queryInput"
            name="query"
            value={userDetails.query}
            onChange={handleInputChange}
            placeholder="John Doe is doing good work"
            
          />
        </div>


        <input
          type="submit"
          value="Add Contact"
          className="btn btn-info my-2"
        />
      </form>
    </>
  );
};

export default CreateContact;
