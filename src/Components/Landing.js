import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import ImageModal from "./ImageModal";
import ResultTable from "./ResultTable";
import ImageZoom from "react-image-zooom";
import { FaExchangeAlt, FaImages } from "react-icons/fa";
import { BounceLoader } from "react-spinners";


const Landing = () => {
  const patientId = 132
  const [patientInfo, setPatientInfo] = useState(null)
  const [patientXRay, setPatientXray] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [toSubmitApiFile, setToSubmitApiFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [apiResult, setApiResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [predictionArea, setPredictionArea] = useState(null);
  const [isBackendAccessible, setIsBackendAccessible] = useState(true);
  const [isHeatMapShown, setIsHeatMapShown] = useState(false);


  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  useEffect(() => {
    const callAPi = async () => {
        setIsLoading(true)
        try {
        const patientInfoRequest = await fetch(
          "https://e-react-node-backend-22ed6864d5f3.herokuapp.com/searchPatientById", { 
            headers: {
                "Content-Type": "application/json",
              },
            method: "POST", 
            body: JSON.stringify({ patientId: patientId }) }
        );
        const patientInfoOutput = await patientInfoRequest.json();
        setPatientInfo(patientInfoOutput);

        const imageRequest = await fetch(
            "https://e-react-node-backend-22ed6864d5f3.herokuapp.com/imageRetrieveByPatientId", { 
              headers: {
                  "Content-Type": "application/json",
                },
              method: "POST", 
              body: JSON.stringify({ patientId: patientId, recordType: "X-Ray_Chest" }) }
          );
          const imageOutput = await imageRequest.json();
          setPatientXray(imageOutput.success);
        } catch (err) {
            setIsBackendAccessible(false)
            console.log(err)
        }
        setIsLoading(false)
      };
      callAPi();
  }, [])
  useEffect(() => {
    if (toSubmitApiFile) {
      const callAPi = async () => {
        setIsLoading(true)
        const formData = new FormData();
        formData.append("file", toSubmitApiFile);
        const response = await fetch(
          "https://lung-disease-lucas-6a2ddcfd938e.herokuapp.com/predict",
          { method: "POST", body: formData }
        );
        const output = await response.json();
        setPredictionArea(`data:image/png;base64,${output.heatmap}`)
        setIsHeatMapShown(true)
        setApiResult(output);
        setIsLoading(false)
      };
      callAPi();
    }
  }, [toSubmitApiFile]);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleApiSubmit = async () => {
    try {
      const req = new XMLHttpRequest();
      req.open("GET", selectedImage.imageUrl, true);
      req.responseType = "blob";
      setApiResult(null)
      req.onload = (event) => {
        const blob = req.response;
        setToSubmitApiFile(blob);
        console.log(blob);
      };
      req.send();
    } catch (error) {
      console.error("Error submitting API request", error);
      
    }
    handleCloseModal();
  };
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h3 style={{paddingTop: 20, marginBottom: 30 }}>
        Pulmonary Disease Diagnosis Assistance System
      </h3>
      <div
        style={{
          width: "100%",
          height: '100%',
          flexDirection: "row",
          flex: 1,
          display: "flex",
        }}
      >
        <div
          style={{
            margin: 10,
            borderRadius: 16,
            flex: 1,
            paddingTop: 10,
          }}
          class="bg-primary"
        >
          <div style={{ display: "flex", flexDirection: "row", padding: 10}}>
            <h3 class="text-light">Select Patient X-Ray Image</h3>
            {selectedImage ? (
              <Button
                style={{
                  marginLeft: "auto",
                  marginRight: 45,
                  width: "10%",
                  height: "20%",
                }}
                onClick={handleShowModal}
              >
                <FaExchangeAlt />
              </Button>
            ) : (
              <></>
            )}
          </div>
          <div style={{ display: "flex", height: "94%", width: '100%', alignItems: "center" ,backgroundColor: "rgb(245,245,245)",}}>
            {
            // isBackendAccessible ? (
            //   <div style={{marginLeft: "auto", marginRight: "auto"}}>Backend is not accessible</div>
            // ) : 
            !selectedImage ? (
                <Button
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                  onClick={handleShowModal}
                >
                  Select X-Ray Image
                </Button>
              )
            :
            (
              <div
                style={{ marginLeft: "auto", marginRight: "auto", width: 600 }}
              >
                <div
                  style={{ marginLeft: "auto", marginRight: "auto", flex: 1 }}
                >
                    {
                        isHeatMapShown ? 
                        <>                 <Button
                        style={{
                          marginLeft: "auto",
                          marginRight: 45,
                          width: 150,
                          marginBottm: 20,
                          height: 34
                        }}
                        onClick={() => setIsHeatMapShown(!isHeatMapShown)}
                      >
                        Switch to Orignal
                      </Button>
                      <div style={{marginTop: 10}}>
                      <ImageZoom src={predictionArea} alt={predictionArea} />
                      </div></>
                      
                         : 
                         <>                 <Button
                        style={{
                            marginLeft: "auto",
                            marginRight: 45,
                            width: 190,
                            marginBottm: 20,
                            height: 34
                        }}
                        onClick={() => setIsHeatMapShown(!isHeatMapShown)}
                      >
                        Switch to Focus
                      </Button>
                      <div style={{marginTop: 10}}>
                        <ImageZoom src={selectedImage.imageUrl} alt={selectedImage} />
                        </div>
                        </>
                    }
                </div>
              </div>
            )}
          </div>
        </div>
        {apiResult == null ? (
          <></>
        ) : (
          <div style={{ flex: 1 }}>
            <div
              style={{
                display: "flex",
                height: "92%",
                margin: 10,
                backgroundColor: "rgb(245,245,245)",
                borderRadius: 16,
                alignItems: "center",
              }}
              class="bg-primary"
            >
              <ResultTable apiResult={apiResult.predictions} patientInfo={patientInfo} selectedImage={selectedImage} setIsLoading={setIsLoading}/>
            </div>
          </div>
        )}
      </div>

      <ImageModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        handleImageClick={handleImageClick}
        handleApiSubmit={handleApiSubmit}
        images={patientXRay}
        selectedImage={selectedImage}
      />
      <div style={{position: 'absolute', top: '25%', }}>
      <BounceLoader color="#36d7b7" loading={isLoading}/>
      </div>
    </div>
  );
};

export default Landing;
