import React, {useEffect, useState} from 'react';
import './DataTable.css';
import {getAllPatients} from "./auth.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faList, faSignOut, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';

// Define types for data
interface UserData {
    firstName: string;
    lastName: string;
    entryDate: string;
}

const DataTable: React.FC = () => {
    // Sample data
  /* const initialData: UserData[] = [
    {firstName: 'Saad', lastName: 'Ouahidi', entryDate: '2024-04-26'},
    {firstName: 'Adil', lastName: 'Amellak', entryDate: '2024-04-25'}
    ];
   */

    const initialData: UserData[] = [
        {firstName: 'Saad', lastName: 'Ouahidi', entryDate: '2024-04-26'},
        {firstName: 'Adil', lastName: 'Amellak', entryDate: '2023-07-01'},
        {firstName: 'Adam', lastName: 'Hatim', entryDate: '2022-07-31'},
        {firstName: 'Karim', lastName: 'Bennour', entryDate: '2023-12-25'},
        {firstName: 'Farid', lastName: 'Debbagh', entryDate: '2024-04-25'}
    ]

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await getAllPatients();
                const patients = response.items.map((item: any) => {
                    console.log(item);
                    return {firstName: item.firstName,
                        lastName: item.lastName,
                        entryDate: item.entryDate,
                }
            })
                console.log(patients);
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
            href="/orders"
          >
            <FontAwesomeIcon icon={faList}/>
            <span>Patients</span>
          </a>
        </li>
        <li>
          <a
            className="menu-btn"
            href="/cart"
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
                            <button className='btn-icon btn-user' title='profile'>
                                <FontAwesomeIcon icon={faUser}/>
                            </button>
                            <button className='btn-icon btn-edit' title='modifier'>
                                <FontAwesomeIcon icon={faEdit}/>
                            </button>
                            <button className='btn-icon btn-trash' title='supprimer'>
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
