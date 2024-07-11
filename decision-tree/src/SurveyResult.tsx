export default interface Result {
    id? : string;
    patient : string | undefined;
    date : string;
    probabilities : {a : number, b : number, c : number, d : number}
    messages : {a : string, b : string, c : string, d : string}
    result : string;
    feedback? : string;
    rating? : number;
}