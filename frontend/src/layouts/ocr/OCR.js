import React, { useState } from 'react';
import axios from 'axios';

function OCR() {
  const [image, setImage] = useState(null);
  const [matches, setMatches] = useState([]);

  const handleImageChange = (event) => {
    setImage(event.target.files[0]);
  };

  const handleOCR = async () => {
    try {
      const formData = new FormData();
      formData.append('image', image);
      const response = await axios.post('http://localhost:4000/ocr', formData);
      setMatches(response.data.matches);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleOCR}>OCR</button>
      {matches.map((match, index) => (
        <div key={index}>{match}</div>
      ))}
      {
        console.log(matches)
      }
    </div>
  );
}

export default OCR;
