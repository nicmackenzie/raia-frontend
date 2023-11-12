import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [newResource, setNewResource] = useState({ title: '', description: '', image: '' });
  const [updatedResource, setUpdatedResource] = useState({ title: '', description: '', image: '' });
  const [editingResource, setEditingResource] = useState(null);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await axios.get('http://localhost:3000/resources');
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const createResource = async () => {
    try {
      await axios.post('http://localhost:3000/resources', newResource);
      setNewResource({ title: '', description: '', image: '' });
      fetchResources();
    } catch (error) {
      console.error('Error creating resource:', error);
    }
  };

  const updateResource = async (id) => {
    try {
      await axios.put(`http://localhost:3000/resources/${id}`, updatedResource);
      setEditingResource(null);
      fetchResources();
    } catch (error) {
      console.error('Error updating resource:', error);
    }
  };

  const deleteResource = async (id) => {
    if (window.confirm('Are you sure you want to delete this resource?')) {
      try {
        await axios.delete(`http://localhost:3000/resources/${id}`);
        fetchResources();
      } catch (error) {
        console.error('Error deleting resource:', error);
        alert("Unauthorized!")
      }
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Resource Management</h1>
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Create New Resource</h2>
        <div className="flex">
          <input
            type="text"
            placeholder="Title"
            className="p-2 mr-2 w-1/3"
            value={newResource.title}
            onChange={(e) => setNewResource({ ...newResource, title: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            className="p-2 mr-2 w-1/3"
            value={newResource.description}
            onChange={(e) => setNewResource({ ...newResource, description: e.target.value })}
          />
          <input
            type="text"
            placeholder="Link URL"
            className="p-2 mr-2 w-1/3"
            value={newResource.image}
            onChange={(e) => setNewResource({ ...newResource, image: e.target.value })}
          />
          <button className="bg-blue-500 text-white p-2 rounded" onClick={createResource}>
            Create
          </button>
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold">Resource List</h2>
        <ul>
          {resources.map((resource) => (
            <li key={resource.id} className="my-2">
              {editingResource === resource.id ? (
                  <div className="flex">
                  <input
                    type="text"
                    className="p-2 mr-2 w-1/3"
                    value={updatedResource.title}
                    onChange={(e) => setUpdatedResource({ ...updatedResource, title: e.target.value })}
                  />
                  <input
                    type="text"
                    className="p-2 mr-2 w-1/3"
                    value={updatedResource.description}
                    onChange={(e) => setUpdatedResource({ ...updatedResource, description: e.target.value })}
                  />
                  <input
                    type="text"
                    className="p-2 mr-2 w-1/3"
                    value={updatedResource.image}
                    onChange={(e) => setUpdatedResource({ ...updatedResource, image: e.target.value })}
                  />
                  <button
                    className="bg-green-500 text-white p-2 rounded"
                    onClick={() => updateResource(resource.id)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => setEditingResource(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <div className="flex">
                  <span className="w-1/3">{resource.title}</span>
                  <span className="w-1/3">{resource.description}</span>
                  <span className="w-1/3">{resource.image}</span>
                  <button
                    className="bg-yellow-500 text-white p-2 rounded"
                    onClick={() => setEditingResource(resource.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => deleteResource(resource.id)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Resource;
