import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';

const CreateTourForm = ({ user }) => {
  const [tourData, setTourData] = useState({
    title: '',
    description: '',
    pick_up: '',
    meeting_point: '',
    drop_off: '',
    duration: '',
    duration_unit: 'days', // Default to "days"
  });

  const navigate = useNavigate();
  const { id } = useParams();
 

  useEffect(() => {
    const getdetail = async () => {
      const res = await axios.get(`http://localhost:3001/tours/${user.id}/update/${id}`);
      setTourData(res.data[0]);
      console.log(res.data)
    };
    console.log(id)
    if (user === null) {
      navigate('/login');
    }
    if (id) {
      getdetail();
    }
    
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTourData({ ...tourData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      try {
        const res = await axios.post("http://localhost:3001/tours", {
          Uid: user.id,
          ...tourData,
        });
        toast.success(res.data.message);
        navigate('/');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    } else {
      try {
        const res = await axios.put(`http://localhost:3001/tours/${id}`, {
          Uid: user.id,
          ...tourData,
        });
        toast.success(res.data.message);
        navigate('/');
      } catch (error) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <div className="container mt-5">
      {/* Back Button */}
      <div className="mb-4">
        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          &larr; Back
        </button>
        
      </div>
      <div className="card p-4 shadow-sm" style={{ maxWidth: '600px', margin: '0 auto' }}>
        <h2 className="text-center">{id ? "Update Tour" : "Create Tour"}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              value={tourData.title}
              onChange={handleChange}
              placeholder="Enter tour title"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              value={tourData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Enter tour description"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label htmlFor="pick_up" className="form-label">Pick-Up Location</label>
            <input
              type="text"
              className="form-control"
              id="pick_up"
              name="pick_up"
              value={tourData.pick_up}
              onChange={handleChange}
              placeholder="Enter pick-up location"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="meeting_point" className="form-label">Meeting Point</label>
            <input
              type="text"
              className="form-control"
              id="meeting_point"
              name="meeting_point"
              value={tourData.meeting_point}
              onChange={handleChange}
              placeholder="Enter meeting point"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="drop_off" className="form-label">Drop-Off Location</label>
            <input
              type="text"
              className="form-control"
              id="drop_off"
              name="drop_off"
              value={tourData.drop_off}
              onChange={handleChange}
              placeholder="Enter drop-off location"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration" className="form-label">Duration</label>
            <input
              type="number"
              step="0.1"
              className="form-control"
              id="duration"
              name="duration"
              value={tourData.duration}
              onChange={handleChange}
              placeholder="Enter duration"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="duration_unit" className="form-label">Duration Unit</label>
            <select
              className="form-select"
              id="duration_unit"
              name="duration_unit"
              value={tourData.duration_unit}
              onChange={handleChange}
              required
            >
              <option value="hours">Hours</option>
              <option value="days">Days</option>
              <option value="weeks">Weeks</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary w-100">{id ? "Update" : "Create"}</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTourForm;
