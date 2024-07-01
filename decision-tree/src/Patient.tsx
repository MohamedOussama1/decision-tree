export default interface Patient {
    id? : string;
    firstName: string;
    lastName: string;
    city: string;
    birthDate: string;
    gender: 'male' | 'female';
    phoneNumber: string;
    email: string;
    address: string;
    entryDate: string;
}