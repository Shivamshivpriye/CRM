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
    feedback:"",
    paymentstatus:"",
    comment:"",

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
      const res = await fetch(`http://localhost:8000/api3/process4/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDetails),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success(`Updated [${userDetails.name}] process4`);
        setUserDetails({
          name: "",
          company: "",
          address: "",
          email: "",
          phone: "",
          feedback:"",
          paymentstatus:"",
          comment:"",
      

        });
        navigate("/process4");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while updating the process4.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api3/process4/${id}`, {
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
          feedback:result.feedback,
          paymentstatus:result.paymentstatus,
          comment:result.comment,

        });
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching process4 details.");
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
          <h2>Feedback</h2>

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
              <label htmlFor="feedbackInput" className="form-label mt-4">
                Feedback 
              </label>
              <input
                type="text"
                className="form-control"
                id="feedbackInput"
                name="feedback"
                value={userDetails.feedback}
                onChange={handleInputChange}
                placeholder="WalkStreet 05, California"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="paymentstatusInput" className="form-label mt-4">
                Payment status
              </label>
              <select
                className="form-control"
                id="paymentstatusInput"
                name="paymentstatus"
                value={userDetails.paymentstatus}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="hold">hold</option>
                <option value="balance">Balance</option>
                <option value="discount">Discount</option>
                <option value="done">Done</option>
               
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="commentInput" className="form-label mt-4">
                Any Comment 
              </label>
              <input
                type="text"
                className="form-control"
                id="commentInput"
                name="comment"
                value={userDetails.comment}
                onChange={handleInputChange}
                placeholder="WalkStreet 05, California"
                required
              />
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
