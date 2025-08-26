import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Make sure to use the correct URL for your backend on Render
    // On Render, this would be your backend service URL
  fetch('https://demo-fullstack-deploy-980f.onrender.com/api/message')// In production, this would be your Render backend URL
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Error fetching message:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Full-Stack Deployment Demo</h1>
      <p>Message from the backend server:</p>
      <p style={{ fontWeight: 'bold', color: 'blue' }}>{message ? message : 'Loading...'}</p>
      <p>This frontend is deployed on Netlify.</p>
    </div>
  );
}

export default App;
