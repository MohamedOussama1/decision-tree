import React from 'react'


const SurveyResult : React.FC = () => {
    return (
        <div>
    <div className="card m-3">
      <div className="card-header">
        <h5>Survey Result</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title">Patient: Saad Ouardi</h5>
        <p className="card-text">
          <strong>Survey Date:</strong> 20/12/2023
        </p>
        <p className="card-text">
          <strong>Result:</strong> PAMPSI
        </p>
        <p className="card-text">
          <strong>Observation:</strong> Situation financière très basse
        </p>
      </div>
    </div>
        </div>
    )
}

export default SurveyResult;