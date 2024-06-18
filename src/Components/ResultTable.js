import React, {useState, useRef} from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { Button } from "react-bootstrap";
import ConfirmModal from './ConfirmModal';

const ResultTable = ({ apiResult }) => {
  const maxLimit = {
    'Atelectasis':0.208167,
    'Effusion':0.217179,
    'Infiltration':0.229513,
    'Mass': 0.121631,
    'Nodule':0.122202,
    'Pneumothorax':0.096119,
    'Bacterial Pneumonia':1,
    'Viral Pneumonia':1,
    'Covid 19 Pneumonia':1,
    'Tuberculosis':0.167872,
  }
  const minLimit = {
    'Atelectasis':0.011248,	
    'Effusion':0.004896,	
    'Infiltration':0.027108,	
    'Mass':0.005163,	
    'Nodule':0.011129,	
    'Pneumothorax':0.004800,	
    'Bacterial Pneumonia':0,	
    'Viral Pneumonia':0,	
    'Covid 19 Pneumonia':0,	
    'Tuberculosis':0.002096,
  }
  const tableRef = useRef(null);
  const [recommendDisease, setrecommendDisease] = useState([]);
  const handleRowClick = (key) => {
    setrecommendDisease((prevrecommendDisease) =>
      prevrecommendDisease.includes(key)
        ? prevrecommendDisease.filter((k) => k !== key)
        : [...prevrecommendDisease, key]
    );
    console.log(recommendDisease)
  };
  const [showModal, setShowModal] = useState(false);
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  return (
    <div style={{height: '100%', width: '100%', paddingTop: 10,}}>
      <div class="text-light" style={{padding: 10}}>
      <h3>Patient Pulmonary Diagnostic Exam Result</h3>
      </div>
      <div style={{backgroundColor: "rgb(245,245,245)", height: '100%', paddingTop: 16}}>
      <table class="sortable" style={{width: '90%', marginLeft: 'auto', marginRight: 'auto'}} ref={tableRef}>
        <tbody>
        <tr>
            <th class="bg-primary" style={{borderTopLeftRadius: 24}}>Disease</th>
            <th class="bg-primary" >Scale</th>
            <th class="bg-primary">Flag</th>
            <th class="bg-primary" style={{borderTopRightRadius: 24}}>Selected</th>
          </tr>
          {Object.entries(apiResult).map(([disease, scale]) => (
            <tr key={disease} onClick={() => handleRowClick(disease)}>
              <td style={(((scale - minLimit[disease])/Math.max(scale, maxLimit[disease])) * 100).toFixed(2) > 85 ? {fontWeight: 'bold', backgroundColor: 'orange'} : {}}>{disease}</td>
              <td style={(((scale - minLimit[disease])/Math.max(scale, maxLimit[disease])) * 100).toFixed(2) > 85 ? {fontWeight: 'bold', backgroundColor: 'orange'} : {}}>{(((scale - minLimit[disease])/Math.max(scale, maxLimit[disease])) * 100).toFixed(2)}</td>
              <td style={(((scale - minLimit[disease])/Math.max(scale, maxLimit[disease])) * 100).toFixed(2) > 85 ? {fontWeight: 'bold', backgroundColor: 'orange'} : {}}>{(((scale - minLimit[disease])/Math.max(scale, maxLimit[disease])) * 100).toFixed(2) > 85 ? "Potential Positive": "Potential Negative"}</td>
              <td style={recommendDisease.includes(disease) ? {fontWeight: 'bold', backgroundColor: 'orange'} : {}}>{recommendDisease.includes(disease) ? "Selected": ""}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginLeft: 'auto', marginRight: 'auto', width: 100, marginTop: 20}}>End of Result</div>
      <div style={{paddingTop: 10, paddingLeft: 36, paddingRight: 36, display: 'flex', flexDirection: 'row'}}>
      <DownloadTableExcel
                    filename="PDCIAS"
                    sheet="sheet1"
                    currentTableRef={tableRef.current}
                    style={{flex: 1}}
                >

                   <Button style={{marginRight: 20}}> Export excel </Button>

                </DownloadTableExcel>
                <Button style={{flex: 1, backgroundColor: 'green'}} onClick={handleShowModal}> Confirm Recommendations </Button>   
                </div>
                <ConfirmModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        recommended={recommendDisease}
      />
      </div>
    </div>
  );
};

export default ResultTable;