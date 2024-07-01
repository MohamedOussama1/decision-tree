import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json, themeJson } from "./json.tsx";
import { useParams } from "react-router-dom";
import calculateResult from "./resultService.tsx";
import { addSurveyResult } from "./auth.tsx";


function SurveyComponent() {
    const { id } = useParams();
    const survey = new Model(json);
    survey.applyTheme(themeJson);
    survey.onComplete.add((sender, options) => {
        const temp = {implication: 'Item 1', hmd: 'Item 1', hat: 'Item 1', pathologies: false, dsupport: 'Item 4',aic : "Item 1", antagoniste: "Item 1",atm: "Item 1", ccrc: "Item 1"
        ,dim
        : 
        "Item 1"
        ,disolee
        : 
        "Item 1"
        ,dyo
        : 
        "Item 1"
        ,eprothetique
        : 
        "Item 1"
        ,etatparodontal
        : 
        "Item 2"
        ,ka
        : 
        "Item 1"
        ,maldia
        : 
        "Item 1"
        ,malveolaire
        : 
        "Item 2"
        ,mradiculaire
        : 
        "Item 1"
        ,osteomuqueuses
        : 
        "Item 2"
        ,ouvbuccale
        : 
        "Item 1"
        ,pocclusion
        : 
        "Item 1"
        ,qosseuse
        : 
        "Item 1"
        ,sgc
        : 
        "Item 1"
        ,speriphzneutre
        : 
        "Item 2"
        ,vosseux
        : 
        "Item 1"
        ,zdr
        : 
        "Item 1"
        ,zretrait
        : 
        "Item 1"}
        const {result, observation} = calculateResult(temp); 
        const surveyData = {
            date : new Date(),
            result : result,
            observation : observation,
            data : JSON.stringify(sender.data),
            patient : id
        };
        console.log(surveyData);
        addSurveyResult(surveyData);
        //window.location.href = "http://localhost:5173/survey-result/" + id;
    });
    return (<Survey model={survey}/>);
}

export default SurveyComponent;