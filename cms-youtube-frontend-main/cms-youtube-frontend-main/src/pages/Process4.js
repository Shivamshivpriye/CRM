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
  const [process4, setProcess4] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProcess4, setFilteredProcess4] = useState([]);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api3/myprocess4`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        if (!result.error) {
          setProcess4(result.process4);
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

  const deleteProcess4= async (id) => {
    if (window.confirm("Are you sure you want to delete this Process4?")) {
      try {
        const res = await fetch(`http://localhost:8000/api3/delete/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        const result = await res.json();
        console.log("Delete Contact Response:", result); // Add this log statement
  
        if (!result.error) {
          setProcess4(result.myProcess4);
          toast.success("Deleted process4");
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
    const newSearchUser = process4.filter((process4) =>
      process4.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredProcess4(newSearchUser);
  };

  const clearSearch = () => {
    setSearchInput("");
    setFilteredProcess4([]);
  };

  return (
    <>
      <div>
        <h1>Feedback</h1>
        <button className="btn btn-danger my-2" onClick={() => window.location.reload()}>
          Reload Process4
        </button>
        <hr className="my-4" />
        {loading ? (
          <Spinner splash="Loading Process4..." />
        ) : (
          <>
            {process4.length === 0 ? (
              <h3>No feedback created yet</h3>
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
                  Your Total Process4: <strong>{process4.length}</strong>
                </p>
                <table className="table table-hover">
                  <thead>
                    <tr className="table-dark">
                      <th scope="col">Name</th>
                      <th scope="col">Company</th>
                      <th scope="col">Address</th>
                      <th scope="col">Email</th>
                      <th scope="col">Phone</th>
                      <th scope="col">Payment status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(filteredProcess4.length ? setFilteredProcess4 : process4).map((process4) => (
                      <tr
                        key={process4._id}
                        onClick={() => {
                          setModalData(process4);
                          setShowModal(true);
                        }}
                      >
                        <th scope="row">{process4.name}</th>
                        <td>{process4.company}</td>
                        <td>{process4.address}</td>
                        <td>{process4.email}</td>
                        <td>{process4.phone}</td>
                        <td>{process4.paymentstatus}</td>
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
            <strong>Feedback</strong>: {modalData.feedback}
          </p>
          <p>
            <strong>Payment status</strong>: {modalData.paymentstatus}
          </p>
          <p>
            <strong>Comment</strong>: {modalData.comment}
          </p>
         
        </Modal.Body>

        <Modal.Footer>
          <Link className="btn btn-info" to={`/edit4/${modalData._id}`}>
            Edit
          </Link>
          <button
            className="btn btn-danger"
            onClick={() => deleteProcess4(modalData._id)}
          >
            Delete
          </button>
          <button
            className="btn btn-warning"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Process2;
