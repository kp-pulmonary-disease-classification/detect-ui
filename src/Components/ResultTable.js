import React from 'react';
import { Table } from 'react-bootstrap';

const ResultTable = ({ apiResult }) => {
  return (
    <div style={{height: '100%', width: '100%', paddingTop: 10,}}>
      <div class="text-light" style={{padding: 10}}>
      <h3>Patient Pulmonary Diagnostic Exam Result</h3>
      </div>
      <div style={{backgroundColor: "rgb(245,245,245)", height: '100%', paddingTop: 16}}>
      <table class="sortable" style={{width: '100%'}}>
        <thead >
          <tr>
            <th class="bg-primary" style={{borderTopLeftRadius: 24}}>Disease</th>
            <th class="bg-primary" style={{borderTopRightRadius: 24}}>Scale</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(apiResult).map(([disease, scale]) => (
            <tr key={disease}>
              <td style={scale > 0.1 ? {fontWeight: 'bold'} : {}}>{disease}</td>
              <td style={scale > 0.1 ? {fontWeight: 'bold'} : {}}>{scale.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{marginLeft: 'auto', marginRight: 'auto', width: 100, marginTop: 20}}>End of Result</div>
      </div>
    </div>
  );
};

export default ResultTable;