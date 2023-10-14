import React, { useState, useEffect } from 'react';

function NewsUpdate() {
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNewsUpdate();
  }, []);

  function fetchNewsUpdate() {
    fetch('http://localhost:3000/news_and_updates')
      .then((response) => response.json())
      .then((data) => {
        setNewsUpdates(data);
        console.log(data);
      })
      .catch((error) => {
        console.error('Error fetching news and updates:', error);
      });
  }

  function handleShow(id) {
    fetch(`http://localhost:3000/news_and_updates/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Showing news update:', data);
      })
      .catch((error) => {
        console.error('Error fetching news update:', error);
      });
  }

  function handleEdit(id) {
    fetch(`http://localhost:3000/news_and_updates/${id}`);
    // Add edit logic here
  }

  function handleDelete(id) {
    if (window.confirm('Are you sure you want to delete this news update?')) {
      fetch(`http://localhost:3000/news_and_updates/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          setNewsUpdates((prevNewsUpdates) => prevNewsUpdates.filter((newsUpdate) => newsUpdate.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting news update:', error);
        });
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let newObject = {
      ...formData,
      county_id: 1,
      user_id: 1,
      published_date: '2023-10-14',
    };
    fetch('http://localhost:3000/news_and_updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObject),
    })
      .then((response) => response.json())
      .then((data) => {
        let updatedNews = [...newsUpdates, data];
        setNewsUpdates(updatedNews);
        setFormData({ title: '', content: '' });
      })
      .catch((error) => {
        console.error('Error Posting news update:', error);
      });
  };

  return (
    <div className="container mx-auto p-8">
      <ul className="space-y-4">
        {newsUpdates.map((newsUpdate) => (
          <li key={newsUpdate.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{newsUpdate.title}</h2>
            <p className="text-gray-500 text-sm mb-2">
              Published Date: {newsUpdate.published_date}
            </p>
            <p className="text-gray-500 text-sm mb-2">Content: {newsUpdate.content}</p>
            <p className="text-gray-500 text-sm mb-2">County ID: {newsUpdate.county_id}</p>
            <p className="text-gray-500 text-sm mb-2">User ID: {newsUpdate.user_id}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleShow(newsUpdate.id)}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
              >
                Show
              </button>
              <button
                onClick={() => handleEdit(newsUpdate.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(newsUpdate.id)}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Create News</h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
              Title:
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              id="title"
              className="border rounded w-full py-2 px-3"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">
              Content:
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              id="content"
              className="border rounded w-full py-2 px-3 h-40"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewsUpdate;
