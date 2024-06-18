import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ showModal, handleCloseModal, recommended}) => {
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Recommend Diagnosis</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <ul class="list-group">
      {recommended != [] ? recommended.map((disease) => (
       <li class="list-group-item">{disease}</li>
      )
      ) : <li class="list-group-item">No Disease Selected</li>
      }
      </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
        <Button variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;