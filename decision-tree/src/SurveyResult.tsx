export default interface Result {
    patientId : string | undefined;
    date : string;
    probabilities : {'A' : number, 'B' : number, 'C' : number, 'D' : number}
    result : 'A' | 'B' | 'C' | 'D';
    observation : string;
    data : string;
}