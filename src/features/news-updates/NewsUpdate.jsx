import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../authentication/use-user';

function NewsUpdate() {
  const [newsUpdates, setNewsUpdates] = useState([]);
  const [formData, setFormData] = useState({ title: '', content: '', image: '' });
  const { userData } = useUser();
  // console.log(userData?.user?.id)

  useEffect(() => {
    fetchNewsUpdate();
  }, []);

  function fetchNewsUpdate() {
    fetch('http://localhost:3000/news_and_updates')
      .then((response) => {
        if (!response.ok) {
          if (response.status === 401) {
            console.log('Unauthorized');
          } else {
            // Handle other errors (e.g., network issues)
            console.error('Error fetching news and updates:', response.status);
          }
          throw new Error('Unauthorized');
        }
        return response.json();
      })
      .then((data) => {
        setNewsUpdates(data);
        // console.log(data);
      })
      .catch((error) => {
        if (error.message !== 'Unauthorized') {
          console.error('Error fetching news and updates:', error);
        }
      });
  }

  // function handleEdit(id) {
  //   console.log("Editing")
  // }

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
      user_id: userData?.user?.id && userData?.user?.id || 2,
      published_date: '2023-10-14',
    };
    fetch('http://localhost:3000/news_and_updates', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newObject),
  })
    .then((response) => {
      if (!response.ok) {
        if (response.status === 401) {
          alert('Unauthorized.');
        } else {
          console.error('Error Posting news update:', response.status);
        }
        throw new Error('Bad response');
      }
      return response.json();
    })
    .then((data) => {
      let updatedNews = [...newsUpdates, data];
      setNewsUpdates(updatedNews);
      setFormData({ title: '', content: '', image: '' });
    })
    .catch((error) => {
      if (error.message !== 'Bad response') {
        console.error('Error Posting news update:', error);
      }
    });
  };

  function truncateContent(content, words) {
    const contentWords = content.split(' ');
    if (contentWords.length > words) {
      const truncatedContent = contentWords.slice(0, words).join(' ');
      return `${truncatedContent} ...`;
    }
    return content;
  };  

  return (
    <div className="container mx-auto p-8">
      <ul className="space-y-4">
        {newsUpdates.map((newsUpdate) => (
          <li key={newsUpdate.id} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-bold mb-2">{newsUpdate.title}</h2>
            <p className="text-gray-500 text-sm mb-2">
               Content: {truncateContent(newsUpdate.content, 10)}
            </p>
            <p className="text-gray-500 text-sm mb-2">County ID: {newsUpdate.county_id}</p>
            {/* <p className="text-gray-500 text-sm mb-2">User ID: {newsUpdate.user_id}</p> */}
            <p className="text-gray-500 text-sm mb-2">
              Published Date: {newsUpdate.published_date}
            </p>
            <div className="flex space-x-2">
              <Link to={`/news-updates/${newsUpdate.id}`} className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                Show
              </Link>
              {/* <button
                onClick={() => handleEdit(newsUpdate.id)}
                className="bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button> */}
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
            <label htmlFor="image" className="block text-gray-700 text-sm font-bold mb-2">
              Image:
            </label>
            <input
              name="image"
              value={formData.image}
              onChange={handleChange}
              id="image"
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
