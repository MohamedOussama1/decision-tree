import React, {useEffect, useState} from 'react';
import './DataTable.css';
import {deletePatient, getAllPatients} from "./auth.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faSignOut, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

// Define types for data
interface UserData {
    id : string;
    firstName: string;
    lastName: string;
    entryDate: string;
}

const DataTable: React.FC = () => {
    const initialData: UserData[] = [
        {id : "aa", firstName: 'Saad', lastName: 'Ouahidi', entryDate: '2024-04-26'},
        {id : "aaa", firstName: 'Adil', lastName: 'Amellak', entryDate: '2023-07-01'},
    ]

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await getAllPatients();
                const patients = response.items.map((item: any) => {
                    return {id : item.id,
                        firstName: item.firstName,
                        lastName: item.lastName,
                        entryDate: item.entryDate,
                }
            })
                setData(patients);
            } catch (error) {
                console.error('Error fetching patients:', error);
            }
        }
        fetchPatients().then(() => console.log("useEffect"));
    }, []);

    // State to hold the data
    const [data, setData] = useState<UserData[]>(initialData);

    function handleCreatePatient() {
        window.location.href = '/createPatient';
    }

  async function handleProfileCLick(id : string){
    console.log(id);
    window.location.href = "http://localhost:5173/profile/" + id;
  }

  function handleUpdateClick(id : string){
    window.location.href = '/updatePatient/' + id;
  }

  async function handleDeleteClick(id : string, index : number){
    const response = await deletePatient(id);
    if (response)
      setData(data => data.filter((_,i) => i != index))
  }

    return (<div className='back'>
        <div className='top-container'>
        <div className="top-bar">
            <div className="title">Liste des patients</div>
            <div id="menu-top-right">
      <ul>
        <li>
          <a
            className="menu-btn"
            href="/personal-info/{{user.id}}"
          >
            <FontAwesomeIcon icon={faUser}/>
            <span>Profile</span>
          </a>
        </li>
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
            href="/logout"
          >
            <FontAwesomeIcon icon={faSignOut}/>
            <span>Logout</span>
          </a>
        </li>
      </ul>
    </div>
        </div>
</div>
        <div className="container">
            <div className="button-container">
                <button className="new-patient-button" onClick={handleCreatePatient}>+ Nouveau patient</button>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Prénom</th>
                    <th>Date d'entrée</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.lastName}</td>
                        <td>{item.firstName}</td>
                        <td>{item.entryDate}</td>
                        <td>
                            <button className='btn-icon btn-user' title='profile' onClick={() => handleProfileCLick(item.id)}>
                                <FontAwesomeIcon icon={faUser}/>
                            </button>
                            <button className='btn-icon btn-edit' title='modifier' onClick={() => handleUpdateClick(item.id)}>
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <button className='btn-icon btn-trash' title='supprimer' onClick={() => handleDeleteClick(item.id, index)}>
                                <FontAwesomeIcon icon={faTrash}/>
                            </button>

                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    </div>);
}

export default DataTable;
