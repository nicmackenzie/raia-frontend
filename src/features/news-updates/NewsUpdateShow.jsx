import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function NewsUpdateShow() {
  const [newsUpdate, setNewsUpdate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNewsUpdate(id);
  }, [id]);

  function fetchNewsUpdate(id) {
    fetch(`http://localhost:3000/news_and_updates/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setNewsUpdate(data);
      })
      .catch((error) => {
        console.error('Error fetching news and update:', error);
      });
  }

  const goBack = () => {
    navigate('/news-updates');
  };

  return (
    <div className="container mx-auto p-8">
      {newsUpdate ? (
        <div className="bg-white rounded-lg shadow-md p-4">
          <h2 className="text-2xl font-bold mb-4 text-center">{newsUpdate.title}</h2>
          {newsUpdate.image && (
            <div className="flex justify-center">
              <img src={newsUpdate.image} alt={newsUpdate.title} className="mb-4" />
            </div>
          )}
          <p className="text-lg text-gray-700 mb-4">{newsUpdate.content}</p>
          <p className="text-gray-500 text-sm mb-2">Published Date: {newsUpdate.published_date}</p>
          <p className="text-gray-500 text-sm mb-2">County ID: {newsUpdate.county_id}</p>
          <p className="text-gray-500 text-sm mb-2">User ID: {newsUpdate.user_id}</p>
          <button
            onClick={goBack}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Go Back
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default NewsUpdateShow;
