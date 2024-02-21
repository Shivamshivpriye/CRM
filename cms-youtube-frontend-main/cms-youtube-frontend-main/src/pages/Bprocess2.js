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
    bill: "",
    forwardedToDesigner: "",
    orderdate: "",
    deliverydate: "",
    deadlinedate: "",
    invoiceno: "",
    quotation: "",
    advance: "",
    balance: "",

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
      const res = await fetch(`http://localhost:8000/api1/process2/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(userDetails),
      });
      const result = await res.json();
      if (!result.error) {
        toast.success(`Updated [${userDetails.name}] process2`);
        setUserDetails({
          name: "",
          company: "",
          address: "",
          email: "",
          phone: "",
          bill: "",
          forwardedToDesigner: "",
          orderdate: "",
          deliverydate: "",
          deadlinedate: "",
          invoiceno: "",
          quotation: "",
          advance: "",
          balance: "",

        });
        navigate("/process2");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("An error occurred while updating the process2.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`http://localhost:8000/api1/process2/${id}`, {
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
          bill: result.bill,
          forwardedToDesigner: result.forwardedToDesigner,
          orderdate: result.orderdate,
          deliverydate: result.deliverydate,
          deadlinedate: result.deadlinedate,
          invoiceno: result.invoiceno,
          quotation: result.quotation,
          advance: result.advance,
          balance: result.balance,

        });
        setLoading(false);
      } catch (err) {
        setError("An error occurred while fetching process2 details.");
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
              <label htmlFor="billInput" className="form-label mt-4">
                Bill
              </label>
              <input
                type="text"
                className="form-control"
                id="billInput"
                name="bill"
                value={userDetails.bill}
                onChange={handleInputChange}
                placeholder="HUXWHBU1382"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="forwardedToDesignerInput" className="form-label mt-4">
                Forwarded to Designer
              </label>
              <select
                className="form-control"
                id="forwardedToDesignerInput"
                name="forwardedToDesigner"
                value={userDetails.forwardedToDesigner}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="orderdateInput" className="form-label mt-4">
                Order date
              </label>
              <input
                type="text"
                className="form-control"
                id="orderdateInput"
                name="orderdate"
                value={userDetails.orderdate}
                onChange={handleInputChange}
                placeholder="03042001"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="deliverydateInput" className="form-label mt-4">
                Delivery date
              </label>
              <input
                type="text"
                className="form-control"
                id="deliverydateInput"
                name="deliverydate"
                value={userDetails.deliverydate}
                onChange={handleInputChange}
                placeholder="03042001"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="deadlinedateInput" className="form-label mt-4">
                Deadline date
              </label>
              <input
                type="text"
                className="form-control"
                id="deadlinedateInput"
                name="deadlinedate"
                value={userDetails.deadlinedate}
                onChange={handleInputChange}
                placeholder="03042001"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="invoicenoInput" className="form-label mt-4">
                Invoice no
              </label>
              <input
                type="text"
                className="form-control"
                id="invoicenoInput"
                name="invoiceno"
                value={userDetails.invoiceno}
                onChange={handleInputChange}
                placeholder="HUXWHBU1382"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="quotationInput" className="form-label mt-4">
                Quotation
              </label>
              <input
                type="text"
                className="form-control"
                id="quotationInput"
                name="quotation"
                value={userDetails.quotation}
                onChange={handleInputChange}
                placeholder="HUXWHBU1382"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="advanceInput" className="form-label mt-4">
                Advance
              </label>
              <input
                type="text"
                className="form-control"
                id="advanceInput"
                name="advance"
                value={userDetails.advance}
                onChange={handleInputChange}
                placeholder="633"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="balanceInput" className="form-label mt-4">
                Balance
              </label>
              <input
                type="text"
                className="form-control"
                id="balanceInput"
                name="balance"
                value={userDetails.balance}
                onChange={handleInputChange}
                placeholder="733"
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
