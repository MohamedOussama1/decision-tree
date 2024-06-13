import PocketBase from 'pocketbase';

export const pb = new PocketBase('http://127.0.0.1:8090');

export var currentUser = pb.authStore.model;


pb.authStore.onChange((auth) =>{
    console.log('authStore changed', auth);
    currentUser = pb.authStore.model;
})


export async function createUser(username : string, email : string, password : string) {
    const data = {
        "username": username,
        "email": email,
        "emailVisibility": true,
        "password": password,
        "passwordConfirm": password,
        "name": username
    }

    return await pb.collection('users').create(data);
}

// (optional) send an email verification request

export async function authenticateUser(email : string, password : string) {
    return await pb.collection('users').authWithPassword(
        email,
        password
    );
}

// after the above you can also access the auth data from the authStore

// "logout" the last authenticated account
pb.authStore.clear();

export async function getAllPatients(){
    return await pb.collection('patient').getList(1, 50, {
        filter: '',
    });
}

export async function createPatient(patientData : any) {
    return await pb.collection('patient').create(patientData);
}
