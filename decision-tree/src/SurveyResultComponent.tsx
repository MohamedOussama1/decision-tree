import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getPatientById } from './auth';
import Patient from './Patient';
import Result from './SurveyResult';
import './SurveyResult.css'
import './DataTable.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faSignOut, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

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


    const [SurveyResult, setSurveyResult] = useState<Result>({
      patientId: id,
      date: formatDate(new Date()),
      observation: 'observation',
      result: 'A',
      probabilities: { 'A': 1, 'B': 0, 'C': 0, 'D': 0 },
      data : ''
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
                    href="/personal-info/{{user.id}}"
                  >
                    <FontAwesomeIcon icon={faUser} />
                    <span>Profile</span>
                  </a>
                </li>
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
                    <strong>Date:</strong> {SurveyResult.date}
                  </p>
                  <p className="card-text">
                    <strong>Résultat:</strong> {SurveyResult.result}
                  </p>
                  <p className="card-text">
                    <strong>Observation:</strong> {SurveyResult.observation}
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