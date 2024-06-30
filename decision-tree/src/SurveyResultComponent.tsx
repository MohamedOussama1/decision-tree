import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPatientById } from './auth';

function formatDate(date : any) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}Z`;
}

const SurveyResult : React.FC = () => {
    const { id } = useParams();
    useEffect(() => {
        async function updateFormData() {
            try {
                // update form data
                if (id) {
                    const patient : Patient = await getPatientById(id);
                    setPatient(patient);
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        }
        updateFormData().then(() => console.log("useEffect"));
    }, []);


    const [patient, setPatient] = useState<Patient>({
        firstName: '',
        lastName: '',
        city: '',
        birthDate: formatDate(new Date()),
        gender: 'male',
        phoneNumber: '',
        email: '',
        address: '',
        entryDate: formatDate(new Date()),
    });
    return (
        <div>
    <div className="card m-3">
      <div className="card-header">
        <h5>Survey Result</h5>
      </div>
      <div className="card-body">
        <h5 className="card-title">Patient: {patient.firstName + " " + patient.lastName}</h5>
        <p className="card-text">
          <strong>Survey Date:</strong> {formatDate(new Date())}
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