import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";
import AuthContext from "../context/AuthContext";
import ToastContext from "../context/ToastContext";

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { user } = useContext(AuthContext);
  const { toast } = useContext(ToastContext);

  const [userDetails, setUserDetails] = useState({
    name: "",
    address: "",
    company: "",
    email: "",
    phone: "",
    designername: "",
    designermbno: "",
    designeremail: "",
    designermbno2: "",
    amount: "",
    status:"",

  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await fetch(`http://localhost:8000/api2/process3/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDetails),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success(`Updated [${userDetails.name}] process3`);
        setUserDetails({
          name: "",
          company: "",
          address: "",
          email: "",
          phone: "",
          designername: "",
          designermbno: "",
          designeremail: "",
          designermbno2: "",
          amount: "",
          status:"",

        });
        navigate("/process3");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while updating the process3.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api2/process3/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        setUserDetails({
          name: result.name,
          email: result.email,
          company: result.company,
          address: result.address,
          phone: result.phone,
          designername: result.designername,
          designermbno: result.designermbno,
          designeremail: result.designeremail,
          designermbno2: result.designermbno2,
          amount: result.amount,
          status:result.status,

        });
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching process3 details.");
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Spinner splash="Loading Contact..." />
      ) : (
        <>
          <h2>Edit your billing details</h2>

          <form onSubmit={handleSubmit}>
            {error && <div className="error">{error}</div>}
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
                type="number"
                className="form-control"
                id="phoneInput"
                name="phone"
                value={userDetails.phone}
                onChange={handleInputChange}
                placeholder="+977 987654321"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="designernameInput" className="form-label mt-4">
                Designer Name
              </label>
              <input
                type="text"
                className="form-control"
                id="designernameInput"
                name="designername"
                value={userDetails.designername}
                onChange={handleInputChange}
                placeholder="John Doe"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="designermbnoInput" className="form-label mt-4">
                Designer phone no 1
              </label>
              <input
                type="number"
                className="form-control"
                id="designermbnoInput"
                name="designermbno"
                value={userDetails.designermbno}
                onChange={handleInputChange}
                placeholder="+977 987654321"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="designeremailInput" className="form-label mt-4">
                Designer email
              </label>
              <input
                type="email"
                className="form-control"
                id="designeremailInput"
                name="designeremail"
                value={userDetails.designeremail}
                onChange={handleInputChange}
                placeholder="johndoe@example.com"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="designermbno2Input" className="form-label mt-4">
              Designer phone no 2
              </label>
              <input
                type="number"
                className="form-control"
                id="designermbno2Input"
                name="designermbno2"
                value={userDetails.designermbno2}
                onChange={handleInputChange}
                placeholder="+977 987654321"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="amountInput" className="form-label mt-4">
                Amount
              </label>
              <input
                type="text"
                className="form-control"
                id="amountInput"
                name="amount"
                value={userDetails.amount}
                onChange={handleInputChange}
                placeholder="500"
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="statusInput" className="form-label mt-4">
                Status
              </label>
              <select
                className="form-control"
                id="statusInput"
                name="status"
                value={userDetails.forwardedToDesigner}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="work">work</option>
                <option value="completed">completed</option>
                <option value="redo">redo</option>
                <option value="ongoing">ongoing</option>
              </select>
            </div>
            <input
              type="submit"
              value="Save Changes"
              className="btn btn-info my-2"
            />
          </form>
        </>
      )}
    </>
  );
};

export default EditContact;
