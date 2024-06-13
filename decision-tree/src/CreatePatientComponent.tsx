// CreatePatient.tsx

import React, {useState} from 'react';

import "./index.css"
import {createPatient} from "./auth.tsx";

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

const CreatePatient: React.FC = () => {
    const [formData, setFormData] = useState({
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
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            console.log(formData);
            formData["birthDate"] = formatDate(new Date(formData["birthDate"]));
            formData["entryDate"] = formatDate(new Date(formData["entryDate"]));
            await createPatient(formData);
            alert('Patient created successfully!');
            // Optionally, you can redirect to another page or clear the form
        } catch (error) {
            console.error('Error creating patient:', error);
            alert('Error creating patient');
        }
    };
    return (
        <div className="Auth-form-container">
            <form className="Auth-form" onSubmit={handleSubmit}>
                <div className="Auth-form-content">
                    <h3 className="Auth-form-title">New Patient</h3>
                    <div className="form-group mt-3">
                        <label>First Name</label>
                        <input
                            type="text"
                            name="firstName"
                            className="form-control mt-1"
                            placeholder="Enter first name"
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="lastName"
                            className="form-control mt-1"
                            placeholder="Enter last name"
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            className="form-control mt-1"
                            placeholder="Enter city"
                            value={formData.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Birth Date</label>
                        <input
                            type="date"
                            name="birthDate"
                            className="form-control mt-1"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Gender</label>
                        <select
                            name="gender"
                            className="form-control mt-1"
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>
                    </div>
                    <div className="form-group mt-3">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phoneNumber"
                            className="form-control mt-1"
                            placeholder="Enter phone number"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Email</label>
                        <input
                            type="email"
                            name="email"
                            className="form-control mt-1"
                            placeholder="Enter email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group mt-3">
                        <label>Address</label>
                        <input
                            type="text"
                            name="address"
                            className="form-control mt-1"
                            placeholder="Enter address"
                            value={formData.address}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="d-grid gap-2 mt-3">
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    )
        ;
}

export default CreatePatient;
