import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import ImageModal from './Components/ImageModal';
import ResultTable from './Components/ResultTable';
import axios from 'axios';
import Landing from './Components/Landing';

const App = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiResult, setApiResult] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleApiSubmit = async () => {
    try {
      const response = await axios.post('/your-api-endpoint', { file: selectedImage });
      setApiResult(response.data);
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting API request', error);
      handleCloseModal();
    }
  };

  return (
      <Landing />
  );
};

export default App;
