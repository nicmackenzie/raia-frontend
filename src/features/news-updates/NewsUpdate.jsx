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
        console.log(data)
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
    fetch(`http://localhost:3000/news_and_updates/${id}/edit`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Editing news update:', data);
        // You can navigate to an edit form or modal with the news update data
      })
      .catch((error) => {
        console.error('Error fetching news update for editing:', error);
      });
  }

  function handleDelete(id) {
    // Implement the delete functionality here
    if (window.confirm('Are you sure you want to delete this news update?')) {
      fetch(`http://localhost:3000/news_and_updates/${id}`, {
        method: 'DELETE',
      })
        .then(() => {
          console.log(`News update with ID ${id} has been deleted.`);
          // You may want to update the state or refresh the news update list
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
    let newObject = {...formData, county_id: 1, user_id: 1, published_date: '2023-10-14'}
    fetch('http://localhost:3000/news_and_updates', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newObject),
    })
    .then((response) => response.json() )
    .then((data) => {
        // console.log(data)
        let updatedNews = [...newsUpdates, data]
        setNewsUpdates(updatedNews)
    })
    .catch((error) => {
        console.error('Error Posting news update:', error);
    });
  };

  return (
    <div>
      <h1>News and Updates</h1>
      <ul>
        {newsUpdates.map((newsUpdate) => (
          <li key={newsUpdate.id}>
            {newsUpdate.title}
            <button onClick={() => handleShow(newsUpdate.id)}>Show</button>
            <button onClick={() => handleEdit(newsUpdate.id)}>Edit</button>
            <button onClick={() => handleDelete(newsUpdate.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Create or Update News Update</h2>
        <form onSubmit={handleSubmit} className="max-w-md">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
              Title:
            </label>
            <input
              className="border rounded w-full py-2 px-3"
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              id="title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="content">
              Content:
            </label>
            <textarea
              className="border rounded w-full py-2 px-3 h-40"
              name="content"
              value={formData.content}
              onChange={handleChange}
              id="content"
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
