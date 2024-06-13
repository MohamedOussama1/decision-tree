class Patient {
    patientId?: string;
    firstName: string;
    lastName: string;
    city: string;
    birthDate: Date;
    gender: 'male' | 'female';
    phoneNumber: string;
    address: string;
    email: string;
    entryDate: Date;
    medicalHistory?: string[];

    constructor(firstName: string, lastName: string, city: string, birthDate: Date, gender: "male" | "female", phoneNumber: string, address: string, email: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.city = city;
        this.birthDate = birthDate;
        this.gender = gender;
        this.phoneNumber = phoneNumber;
        this.address = address;
        this.email = email;
        this.entryDate = new Date();
    }
}