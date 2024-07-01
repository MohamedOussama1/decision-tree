
// UpdatePatient.tsx

import React, {useEffect, useState} from 'react';

import "./CreatePatient.css"
import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import {getPatientById, updatePatient} from "./auth.tsx";
import { useParams } from 'react-router-dom';
import Patient from './Patient.tsx';

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

const UpdatePatient: React.FC = () => {
    // get id from url
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setPatient({ ...patient, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (id){
                const response = await updatePatient(id, patient);
                console.log(response)
                alert('Patient updated successfully!');
                window.location.href = "http://localhost:5173/patients"
            }
            // Optionally, you can redirect to another page or clear the form
        } catch (error) {
            console.error('Error creating patient:', error);
            alert('Error creating patient');
        }
    };
    return (
        <div className="create-form-container">
            <form className="create-form" onSubmit={handleSubmit}>
                <div className="create-form-content">
                    <h3 className="create-form-title">Modifier Patient</h3>
                    <div className='row'>
                        <div className="form-group mt-3 col">
                            <label>First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                className="form-control mt-1"
                                value={patient.firstName}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3 col-md">
                            <label>Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                className="form-control mt-1"
                                value={patient.lastName}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group mt-3 col">
                            <label>Birth Date</label>
                            <input
                                type="date"
                                name="birthDate"
                                className="form-control mt-1"
                                value={patient.birthDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3 col">
                            <label>Gender</label>
                            <select
                                name="gender"
                                className="form-control mt-1"
                                value={patient.gender}
                                onChange={handleChange}
                            >
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                            </select>
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group mt-3 col">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                className="form-control mt-1"
                                value={patient.email}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3 col">
                            <label>Phone Number</label>
                            <input
                                type="tel"
                                name="phoneNumber"
                                className="form-control mt-1"
                                value={patient.phoneNumber}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group mt-3 col">
                            <label>City</label>
                            <input
                                type="text"
                                name="city"
                                className="form-control mt-1"
                                value={patient.city}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="form-group mt-3 col">
                            <label>Address</label>
                            <input
                                type="text"
                                name="address"
                                className="form-control mt-1"
                                value={patient.address}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="w-100 mt-3 col">
                            <button type="submit" className="btn btn-primary w-100">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>

            </form >
        </div >
    )
        ;
}

export default UpdatePatient;
