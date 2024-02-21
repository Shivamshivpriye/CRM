import React, { useContext, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import Spinner from "../components/Spinner";
import ToastContext from "../context/ToastContext";

const Process2 = () => {
  const { toast } = useContext(ToastContext);

  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({});
  const [process2, setProcess2] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProcess2, setFilteredProcess2] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api1/myprocess2`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setProcess2(result.process2);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const deleteProcess2= async (id) => {
    if (window.confirm("Are you sure you want to delete this Process2?")) {
      try {
        const res = await fetch(`http://localhost:8000/api1/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        console.log("Delete Contact Response:", result); // Add this log statement
  
        if (!result.error) {
          setProcess2(result.myProcess2);
          toast.success("Deleted process2");
          setShowModal(false);
        } else {
          toast.error(result.error);
        }
      } catch (err) {
        console.error("Error deleting contact:", err);
        toast.error("An error occurred while deleting the contact.");
      }
    }
  };
  

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const newSearchUser = process2.filter((process2) =>
      process2.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProcess2(newSearchUser);
  };

  const clearSearch = () => {
    setSearchInput("");
    setFilteredProcess2([]);
  };

  return (
    <>
      <div>
        <h1>Your Process 2</h1>
        <button className="btn btn-danger my-2" onClick={() => window.location.reload()}>
          Reload Process2
        </button>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Process2..." />
        ) : (
          <>
            {process2.length === 0 ? (
              <h3>No Process2 created yet</h3>
            ) : (
              <>
                <form className="d-flex" onSubmit={handleSearchSubmit}>
                  <input
                    type="text"
                    name="searchInput"
                    id="searchInput"
                    className="form-control my-2"
                    placeholder="Search Process2"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <button type="submit" className="btn btn-info mx-2">
                    Search
                  </button>
                  <button type="button" className="btn btn-secondary" onClick={clearSearch}>
                    Clear Search
                  </button>
                </form>

                <p>
                  Your Total Process2: <strong>{process2.length}</strong>
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Company</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">OrderDate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredProcess2.length ? setFilteredProcess2 : process2).map((process2) => (
                      <tr
                        key={process2._id}
                        onClick={() => {
                          setModalData(process2);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{process2.name}</th>
                        <td>{process2.company}</td>
                        <td>{process2.address}</td>
                        <td>{process2.email}</td>
                        <td>{process2.phone}</td>
                        <td>{process2.orderdate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalData.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <h3>{modalData.name}</h3>
          <p>
            <strong>Company</strong>: {modalData.company}
          </p>
          <p>
            <strong>Address</strong>: {modalData.address}
          </p>
          <p>
            <strong>Email</strong>: {modalData.email}
          </p>
          <p>
            <strong>Phone Number</strong>: {modalData.phone}
          </p>
          <p>
            <strong>Bill</strong>: {modalData.bill}
          </p>
          <p>
            <strong>Forwarded To Designer</strong>: {modalData.forwardedToDesigner}
          </p>
          <p>
            <strong>Order Date</strong>: {modalData.orderdate}
          </p>
          <p>
            <strong>Delivery Date</strong>: {modalData.deliverydate}
          </p>
          <p>
            <strong>Deadline Date</strong>: {modalData.deadlinedate}
          </p>
          <p>
            <strong>Invoice No</strong>: {modalData.invoiceno}
          </p>
          <p>
            <strong>Quotation</strong>: {modalData.quotation}
          </p>
          <p>
            <strong>Advance</strong>: {modalData.advance}
          </p>
          <p>
            <strong>Balance</strong>: {modalData.balance}
          </p>
         
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit2/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteProcess2(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <Link className="btn btn-info" to={`/edit13/${modalData._id}`}>
            Process3
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Process2;
