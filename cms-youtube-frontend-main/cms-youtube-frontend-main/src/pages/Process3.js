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
  const [process3, setProcess3] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProcess3, setFilteredProcess3] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api2/myprocess3`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setProcess3(result.process3);
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

  const deleteProcess3= async (id) => {
    if (window.confirm("Are you sure you want to delete this Process3?")) {
      try {
        const res = await fetch(`http://localhost:8000/api2/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        console.log("Delete Contact Response:", result); // Add this log statement
  
        if (!result.error) {
          setProcess3(result.myProcess3);
          toast.success("Deleted process3");
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
    const newSearchUser = process3.filter((process3) =>
      process3.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProcess3(newSearchUser);
  };

  const clearSearch = () => {
    setSearchInput("");
    setFilteredProcess3([]);
  };

  return (
    <>
      <div>
        <h1>Work status</h1>
        <button className="btn btn-danger my-2" onClick={() => window.location.reload()}>
          Reload Process3
        </button>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Process3..." />
        ) : (
          <>
            {process3.length === 0 ? (
              <h3>No Process3 created yet</h3>
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
                  Your Total Process3: <strong>{process3.length}</strong>
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Company</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredProcess3.length ? setFilteredProcess3 : process3).map((process3) => (
                      <tr
                        key={process3._id}
                        onClick={() => {
                          setModalData(process3);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{process3.name}</th>
                        <td>{process3.company}</td>
                        <td>{process3.address}</td>
                        <td>{process3.email}</td>
                        <td>{process3.phone}</td>
                        <td>{process3.status}</td>
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
            <strong>Designer Name</strong>: {modalData.designername}
          </p>
          <p>
            <strong>Designer phone no 1</strong>: {modalData.designermbno}
          </p>
          <p>
            <strong>Designer email</strong>: {modalData.designeremail}
          </p>
          <p>
            <strong>Designer phone no 2</strong>: {modalData.designermbno2}
          </p>
          <p>
            <strong>Amount</strong>: {modalData.amount}
          </p>
          <p>
            <strong>Status</strong>: {modalData.status}
          </p>
         
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit3/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteProcess3(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <Link className="btn btn-info" to={`/edit14/${modalData._id}`}>
            Process4
          </Link>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Process2;
