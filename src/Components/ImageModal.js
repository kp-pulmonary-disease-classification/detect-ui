import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ImageModal = ({ showModal, handleCloseModal, handleImageClick, handleApiSubmit, selectedImage }) => {
  const images = [
    '../Photo/00000001_002.png',
    '../Photo/00026024_009.png',
    '../Photo/00003604_000.png',
    '../Photo/00015043_000.png',
  ];

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Patient X-Ray Images</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="image-gallery">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              onClick={() => handleImageClick(image)}
              style={{
                border: selectedImage === image ? '2px solid blue' : '2px solid transparent',
                cursor: 'pointer',
                margin: '10px',
                width: '100px',
                height: '100px',
              }}
            />
          ))}
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleApiSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageModal;