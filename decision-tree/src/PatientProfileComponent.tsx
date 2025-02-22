import React, {useEffect, useState} from 'react';
import './DataTable.css';
import {deletePatient, deleteSurveyResult, getPatientById, getSurveyResultsById} from "./auth.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faSignOut, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Patient from './Patient.tsx';

// Define types for data
interface SurveyResult {
    id : string;
    date : string;
    result : string;
    rating : string;
}

const DataTable: React.FC = () => {
    const {id} = useParams();
    useEffect(() => {
        async function fetchPatientProfile() {
            try {
                if (id){
                const patient = await getPatientById(id);
                setPatient(patient);
                const response = await getSurveyResultsById(id);
                const surveyResults = response.items.map((item: any) => {
                    return {
                        id : item.id,
                        date : item.date,
                        result: item.result,
                        rating: item.rating,
                }
            })
                setData(surveyResults);
                }
            }catch (error) {
                console.error('Error fetching patients:', error);
            }
        }
        fetchPatientProfile().then(() => console.log("useEffect"));
    }, []);

    // State to hold the data
    const [patient, setPatient] = useState<Patient>();

    const [data, setData] = useState<SurveyResult[]>([]);

  async function handleCreateSurvey(){
    window.location.href = "http://localhost:5173/survey/" + id;
  }

  async function handleDeleteClick(id : string, index : number){
    const response = await deleteSurveyResult(id);
    if (response)
      setData(data => data.filter((_,i) => i != index))
  }

  function handleUpdateClick(id? : string){
    if (id)
        window.location.href = '/updatePatient/' + id;
  }

  async function handleDeletePatientClick(id? : string){
    if (id){
        const response = await deletePatient(id);
        if (response)
            window.location.href = "http://localhost:5173/patients";
    }
  }

    return (<div className='back'>
        <div className='top-container'>
        <div className="top-bar">
            <div className="title">Profile du patient</div>
            <div id="menu-top-right">
      <ul>
        <li>
          <a
            className="menu-btn"
            href="/patients"
          >
            <FontAwesomeIcon icon={faList}/>
            <span>Patients</span>
          </a>
        </li>
        <li>
          <a
            className="menu-btn"
            href="/login"
          >
            <FontAwesomeIcon icon={faSignOut}/>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
        </div>
</div>
        <div>
            <div>
                <div>
                    <div className="card m-3">
                        <div className="card-header cbody text-white">
                            <h5>Patient</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">
                                <strong>Nom:</strong> {patient?.lastName}
                            </p>
                            <p className="card-text">
                                <strong>Prénom:</strong> {patient?.firstName}
                            </p>
                            <p className="card-text">
                                <strong>Date de naissance:</strong> {patient?.birthDate}
                            </p>
                            <p className="card-text">
                                <strong>Genre:</strong> {patient?.gender}
                            </p>
                            <p className="card-text">
                                <strong>Email:</strong> {patient?.email}
                            </p>
                            <p className="card-text">
                                <strong>Téléphone:</strong> {patient?.phoneNumber}
                            </p>
                            <p className="card-text">
                                <strong>Ville:</strong> {patient?.city}
                            </p>
                            <p className="card-text">
                                <strong>Addresse:</strong> {patient?.address}
                            </p>
                    <button className='btn-icon btn-edit' title='modifier' onClick={() => handleUpdateClick(patient?.id)}>
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button className='btn-icon btn-trash' title='supprimer' onClick={() => handleDeletePatientClick(patient?.id)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="button-container">
                    <button className="new-patient-button" onClick={handleCreateSurvey}>+ Nouveau Recueil</button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Résultat</th>
                            <th>Rating</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.date}</td>
                                <td>{item.result}</td>
                                <td>{item.rating}</td>
                                <td>
                                    <button className='btn-icon btn-trash' title='supprimer' onClick={() => handleDeleteClick(item.id, index)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </div>);
}

export default DataTable;
