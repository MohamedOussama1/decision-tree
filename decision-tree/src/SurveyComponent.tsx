import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json, themeJson } from "./json.tsx";
import { useParams } from "react-router-dom";


function SurveyComponent() {
    const { id } = useParams();
    const survey = new Model(json);
    survey.applyTheme(themeJson);
    survey.onComplete.add((sender, options) => {
        console.log(JSON.stringify(sender.data, null, 3));
        window.location.href = "http://localhost:5173/survey-result/" + id;
    });
    return (<Survey model={survey}/>);
}

export default SurveyComponent;