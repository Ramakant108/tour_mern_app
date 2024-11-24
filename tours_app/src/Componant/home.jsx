import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const [tours, setTours] = useState([]);
  const { title } = useParams();
  const navigate = useNavigate();

  const getdetail = async () => {
    const res = await axios.get(`http://localhost:3001/tours/${user.id}/${title}`);
    setTours(res.data);
    console.log(tours)
  };

  useEffect(() => {
    // console.log(user);
    const fetchdata = async () => {
      const data = await axios.get(`http://localhost:3001/tours/${user.id}`);
      setTours(data.data);
    };
    if (title) {
      user && getdetail();
    } else {
      user && fetchdata();
    }
  }, [title]);



  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      await axios.delete(`http://localhost:3001/tours/${id}`);
      const data = await axios.get(`http://localhost:3001/tours/${user.id}`);
      setTours(data.data);
    }
  };



  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-4">
        {title? <button className="btn btn-secondary" onClick={() => navigate('/')}>
          &larr; Back
        </button>:<></>}
       
      </div>
      <h2 className="text-center mb-4">{title ? "Searched Tours" : "All Tours"}</h2>
      {tours.length > 0 ? (
        <div className="row">
          {tours.map((tour) => (
            <div className="col-md-6 mb-4" key={tour.id}>
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">{tour.title}</h5>
                  <p className="card-text">
                    <strong>Description:</strong> {tour.description}
                  </p>
                  <p className="card-text">
                    <strong>Pick-Up:</strong> {tour.pick_up}
                  </p>
                  <p className="card-text">
                    <strong>Meeting Point:</strong> {tour.meeting_point}
                  </p>
                  <p className="card-text">
                    <strong>Drop-Off:</strong> {tour.drop_off}
                  </p>
                  <p className="card-text">
                    <strong>Duration:</strong> {tour.duration} {tour.duration_unit}
                  </p>
                  <div className="d-flex justify-content-end">
                    <Link to={`/update/${tour._id}`}>
                      <button className="btn btn-warning me-2">Update</button>
                    </Link>

                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(tour._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center">
          <p>No tours available. Create one to get started!</p>
        </div>
      )}
    </div>
  );
};

export default Home;
