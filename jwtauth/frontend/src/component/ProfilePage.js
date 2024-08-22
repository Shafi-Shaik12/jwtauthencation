import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';

const ProfilePage = () => {
  const [userdata, setdata] = useState({
    Name: '',
    Age: '',
    Phoneno: ''
  });
  const [profiles, setProfiles] = useState([]);
  const [editMode, setEditMode] = useState(false); 
  const [currentId, setCurrentId] = useState(null); 
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const token = localStorage.getItem('token'); 
        const res = await axios.get('http://localhost:5000/auth/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfiles(res.data);
      } catch (err) {
        console.error('Error fetching profiles:', err.response ? err.response.data : err.message);
      }
    };

    fetchProfiles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setdata((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const phoneRegex = /^[0-9]{10}$/;
    
    if (!phoneRegex.test(userdata.Phoneno)) {
      setError('Phone number must be exactly 10 digits.');
      return; // Stop form submission
    }

    setError(''); // Clear any previous error
    const token = localStorage.getItem('token'); 
    
    try {
      if (editMode) {
        // Update existing profile
        const res = await axios.put(`http://localhost:5000/auth/profile/${currentId}`, userdata, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfiles((prevProfiles) => 
          prevProfiles.map((profile) => 
            profile._id === currentId ? res.data.profile : profile
          )
        );
        setEditMode(false); 
        setCurrentId(null);
      } else {
        // Create new profile
        const res = await axios.post('http://localhost:5000/auth/profile', userdata, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setProfiles([...profiles, res.data.profile]);
      }
      setdata({ Name: '', Age: '', Phoneno: '' }); 
      setShowModal(false); 
      alert('Profile saved successfully');
    } catch (err) {
      console.error('Error saving profile:', err.response ? err.response.data : err.message);
    }
  };

  const handleEdit = (id) => {
    const profileToEdit = profiles.find(profile => profile._id === id);
    setdata({
      Name: profileToEdit.Name,
      Age: profileToEdit.Age,
      Phoneno: profileToEdit.Phoneno
    });
    setEditMode(true);
    setCurrentId(id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem('token');
    
    try {
      await axios.delete(`http://localhost:5000/auth/profile/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
  
      setProfiles((prevProfiles) => 
        prevProfiles.filter((profile) => profile._id !== id)
      );
  
      alert('Profile deleted successfully');
    } catch (err) {
      console.error('Error deleting profile:', err.response ? err.response.data : err.message);
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit}>
        <input className='form-control mb-2'
          type="text"
          name="Name"
          placeholder="Name"
          value={userdata.Name}
          onChange={handleChange}  
        />
        <input
          type="number"
          name="Age"
          className='form-control mb-2'
          placeholder="Age"
          value={userdata.Age}
          onChange={handleChange}
        />
        <input
          type="text"
          name="Phoneno"
          className='form-control mb-2'
          placeholder="Phone Number"
          value={userdata.Phoneno}
          onChange={handleChange}  
        />
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-primary">
          {editMode ? 'Update' : 'Submit'}
        </button>
      </form>
      
      <h2>Profiles</h2>
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {profiles.length > 0 ? (
            profiles.map((item) => (
              <tr key={item._id}>
                <td>{item.Name}</td>
                <td>{item.Age}</td>
                <td>{item.Phoneno}</td>
                <td>
                  <Button variant="warning" onClick={() => handleEdit(item._id)}>Edit</Button>
                  <Button variant="danger" className="ms-2" onClick={() => handleDelete(item._id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">No profiles available</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal for editing */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editMode ? 'Edit Profile' : 'Create Profile'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="Name"
                placeholder="Name"
                value={userdata.Name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                name="Age"
                placeholder="Age"
                value={userdata.Age}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                name="Phoneno"
                placeholder="Phone Number"
                value={userdata.Phoneno}
                onChange={handleChange}
              />
            </Form.Group>
            {error && <div className="alert alert-danger">{error}</div>}
            <Button variant="primary" type="submit">
              {editMode ? 'Update' : 'Submit'}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ProfilePage;
