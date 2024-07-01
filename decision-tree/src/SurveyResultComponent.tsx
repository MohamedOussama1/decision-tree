import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { addSurveyResult, getPatientById, getSurveyResultByPatientId, getSurveyResultsById } from './auth';
import Patient from './Patient';
import Result from './SurveyResult';
import './SurveyResult.css'
import './DataTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';

function formatDate(date : Date) {
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
                    const response = await getSurveyResultByPatientId(id);
                    const item = response.items[0];
                    const surveyResult = {
                        patient: item.patient,
                        date: item.date,
                        result: item.result,
                        probabilities: item.probabilities,
                        messages: item.messages
                    };
                    setSurveyResult(surveyResult);
                }
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        }
        updateFormData().then(() => console.log("useEffect"));
    }, []);

  async function handleProfileCLick(id? : string){
    if (id)
    window.location.href = "http://localhost:5173/profile/" + id;
  }


    const [surveyResult, setSurveyResult] = useState<Result>({
      patient: id,
      date: formatDate(new Date()),
      result: '',
      probabilities: { a: 0, b: 0, c: 0, d: 0 },
      messages : {a : '', b : '', c : '', d : ''}
      }
    );

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
        <div className='top-container'>
          <div className="top-bar">
            <div className="title">Résultats du recueil</div>
            <div id="menu-top-right">
              <ul>
                <li>
                  <a
                    className="menu-btn"
                    href="/patients"
                  >
                    <FontAwesomeIcon icon={faList} />
                    <span>Patients</span>
                  </a>
                </li>
                <li>
                  <a
                    className="menu-btn"
                    href="/logout"
                  >
                    <FontAwesomeIcon icon={faSignOut} />
                    <span>Logout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
            <div>
              <div className="card m-3">
                <div className="card-header cbody text-white">
                  <h5>Résultats</h5>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    <strong>Patient:</strong> {patient.firstName + " " + patient.lastName}
                  </p>
                  <p className="card-text">
                    <strong>Date:</strong> {surveyResult.date}
                  </p>
                  <p className="card-text">
                    <strong>PAMP Conv:</strong> {surveyResult.probabilities.a + " " + surveyResult.messages.a} 
                  </p>
                  <p className="card-text">
                    <strong>PAMP Comp:</strong> {surveyResult.probabilities.b + " " + surveyResult.messages.b} 
                  </p>
                  <p className="card-text">
                    <strong>PAMPSR:</strong> {surveyResult.probabilities.c + " " + surveyResult.messages.c} 
                  </p>
                  <p className="card-text">
                    <strong>PAMPSI:</strong> {surveyResult.probabilities.d + " " + surveyResult.messages.d} 
                  </p>
                    <button className='btn-icon btn-profile' title='profile' onClick={() => handleProfileCLick(patient.id)}>
                      <FontAwesomeIcon icon={faUser} />
                    </button>
                </div>
              </div>
            </div>
          </div>
 )
}

export default SurveyResult;