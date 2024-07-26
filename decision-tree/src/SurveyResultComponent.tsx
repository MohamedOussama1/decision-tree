import React, { useEffect, useState } from 'react';
import { Rating } from 'react-simple-star-rating'
import { useLocation, useParams } from 'react-router-dom';
import { addFeedBack, addSurveyResult, getPatientById, getSurveyResultByPatientId, getSurveyResultsById } from './auth';
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

    return `${year}-${month}-${day}`;
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
                        id : item.id,
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
   const handleRating = (rate: number) => {
    setRating(rate)
  }

  async function handleSubmit(){
    surveyResult.feedback = feedback;
    surveyResult.rating = rating;
    const response = await addFeedBack(surveyResult.id,
      {
                        patient: surveyResult.patient,
                        date: surveyResult.date,
                        result: surveyResult.result,
                        probabilities: surveyResult.probabilities,
                        messages: surveyResult.messages,
                        feedback : feedback,
                        rating : rating
      }
    )
    console.log(response);
    window.location.href = '/profile/' + id;
  }

  const [feedback, setFeedback] = useState('');
  const [rating, setRating] = useState(0);
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
                    <strong>{"Patient:".padEnd(26, String.fromCharCode(160))}</strong> {patient.firstName + " " + patient.lastName}
                  </p>
                  <p className="card-text">
                    <strong>{"Date:".padEnd(28, String.fromCharCode(160))}</strong> {surveyResult.date}
                  </p>
                  <p className="card-text">
                    <strong>{"PAMP Conv:".padEnd(20, String.fromCharCode(160))}</strong> {surveyResult.probabilities.a + " " + surveyResult.messages.a} 
                  </p>
                  <p className="card-text">
                    <strong>{"PAMP Comp:".padEnd(19, String.fromCharCode(160))}</strong> {surveyResult.probabilities.b + " " + surveyResult.messages.b} 
                  </p>
                  <p className="card-text">
                    <strong>{"PAMPSR:".padEnd(23, String.fromCharCode(160))}</strong> {surveyResult.probabilities.c + " " + surveyResult.messages.c} 
                  </p>
                  <p className="card-text">
                    <strong>{"PAMPSI:".padEnd(24, String.fromCharCode(160))}</strong> {surveyResult.probabilities.d + " " + surveyResult.messages.d} 
                  </p>
              <Rating
        onClick={handleRating}
        fillColor={"#1638a9"}
      />
              <form onSubmit={handleSubmit}>
                <div className="feedback-container">
                  <textarea
                    placeholder="Leave your feedback here..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                </div>
                <button className="btn-submit" type="submit">Submit</button>
              </form>
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
