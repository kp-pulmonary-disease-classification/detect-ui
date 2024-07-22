import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmModal = ({ showModal, handleCloseModal, recommended, patientInfo, selectedImage, setIsLoading}) => {
  const callAPi = async () => {
    handleCloseModal();
    setIsLoading(true)
    try {
      recommended.map(async (diagnosis) => {
        let date = new Date();

        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
        const day = String(date.getDate()).padStart(2, '0');

        const hour = String(date.getHours()).padStart(2, '0');
        const minute = String(date.getMinutes()).padStart(2, '0');
        const second = String(date.getSeconds()).padStart(2, '0');
        const diagRequest = await fetch(
          "https://e-react-node-backend-22ed6864d5f3.herokuapp.com/updateDisease", { 
            headers: {
                "Content-Type": "application/json",
              },
            method: "POST", 
            body: JSON.stringify({ 
              phoneNumber: patientInfo.MobileNumber,
              disease: diagnosis.disease,
              date: `${year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second}`,
              prediction: "1",
              description: "Via Chest-Xray Assistance",
              accuracy: diagnosis.accuracy,
              recordType: "X-Ray_Chest",
              recordId: selectedImage.imageId
            }) }
        );
        const diagResonse = await diagRequest.json();        
      })
      setIsLoading(false)
      alert("Save Completed")
      window.location.href = `https://www.e-hospital.ca/doctor/patientpage?patientId=${patientInfo.id}`;
      } catch (err) {
            console.log(`Submit Dianostic Error: ${err}`)
            alert("Errors: Error Saving Please contact IT")
      }

  }
  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Recommend Diagnosis - Finalize</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div style={{padding: "20px", maxWidth: "400px", margin: "0 auto"}}>
        <h2 style={{textAlign: "center", color: "#333"}}>Patient Information</h2>
        <div style={{margin: "10px 0"}}>
            <label for="patient-id" style={{fontWeight: "bold", color: "#555"}}>Patient ID:</label>
            <span id="patient-id" style={{marginLeft: "10px", color: "#000"}}>{patientInfo.id}</span>
        </div>
        <div style={{margin: "10px 0", width: "100%", display: 'flex', flexDirection: 'row'}}>
          <div style={{flex: 2}}>
            <label for="name" style={{fontWeight: "bold", color: "#555"}}>Name:</label>
            <span id="name" style={{width: 60, marginLeft: "10px", color: "#000"}}>{patientInfo.LName}, {patientInfo.FName + " " + patientInfo.MName}</span>
          </div>
          <div style={{flex: 1}}>
              <label for="gender" style={{fontWeight: "bold", color: "#555"}}>Gender:</label>
            < span id="gender" style={{marginLeft: "10px", color: "#000"}}>{patientInfo.Gender == "Female" ? "F" : "M"}</span>
          </div>
        </div>
        <div style={{margin: "10px 0", width: "100%", display: 'flex', flexDirection: 'row'}}>
          <div style={{flex: 2}}>
            <label for="age" style={{fontWeight: "bold", color: "#555"}}>Age:</label>
            <span id="age" style={{marginLeft: "10px", color: "#000"}}>{patientInfo.Age}</span>
          </div>
          <div style={{flex: 1}}>
            <label for="bloodgroup" style={{fontWeight: "bold", color: "#555"}}>BloodGroup:</label>
            <span id="bloodgroup" style={{marginLeft: "10px", color: "#000"}}>{patientInfo.BloodGroup}</span>
            </div>
        </div>
    </div>
      <ul class="list-group">
      {recommended != [] ? recommended.map((disease) => (
       <li class="list-group-item">{disease.disease}</li>
      )
      ) : <li class="list-group-item">No Disease Selected</li>
      }
      </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cancel
        </Button>
        <Button variant="primary" onClick={callAPi}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;