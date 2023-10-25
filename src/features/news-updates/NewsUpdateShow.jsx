import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useUser } from '../authentication/use-user';

function NewsUpdateShow() {
  const { data } = useUser();
  const [newsUpdate, setNewsUpdate] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');

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

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleSubmitComment = (event) => {
    event.preventDefault()

    let newObject = {
      content: comment,
      user_id: data?.user?.id && data?.user?.id || 2,
      news_and_update_id: 22,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    fetch('http://localhost:3000/news_and_update_comments', {
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
      setNewsUpdate((prevUpdate) => ({
        ...prevUpdate,
        news_and_update_comments: [
          ...prevUpdate.news_and_update_comments,
          {
            id: data.id,
            content: data.content,
            user_id: data.user_id,
            news_and_update_id: data.news_and_update_id,
            created_at: data.created_at,
            updated_at: data.updated_at,
          },
        ],
      }));
    })
    .catch((error) => {
      if (error.message !== 'Bad response') {
        console.error('Error Posting news comment:', error);
      }
    });

    setComment('');
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
          <p className="text-lg text-gray-700 mb-4 flex justify-center">{newsUpdate.content}</p>
          <p className="text-gray-500 text-sm mb-2">Published Date: {newsUpdate.published_date}</p>
          <p className="text-gray-500 text-sm mb-2">County ID: {newsUpdate.county_id}</p>
          {/* <p className="text-gray-500 text-sm mb-2">User ID: {newsUpdate.user_id}</p> */}

          <h3 className="text-2xl font-bold mt-8 flex justify-center mb-2"><u>Comments</u></h3>
          <div className="mt-4 flex justify-between mb-4">
            <input
              type="text"
              value={comment}
              onChange={handleCommentChange}
              placeholder="Add a comment..."
              className="w-full border p-2 rounded"
            />
            <button
              onClick={handleSubmitComment}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-sm"
            >
              Add Comment
            </button>
          </div>


          <div className="space-y-4">
            {newsUpdate.news_and_update_comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg">
                <p className="text-lg">{comment.content}</p>
              </div>
            ))}
          </div>


          <button
            onClick={goBack}
            className="bg-blue-500 hover-bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
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
