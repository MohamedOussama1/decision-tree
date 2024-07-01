import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import "survey-core/defaultV2.min.css";
import "./index.css";
import { json, themeJson } from "./json.tsx";
import { useParams } from "react-router-dom";
import calculateResult from "./resultService.tsx";
import { addSurveyResult } from "./auth.tsx";

type MyObject = { a: number, b: number, c: number, d: number };
function getMaxKey(obj: MyObject): keyof MyObject {
  let maxKey: keyof MyObject = 'a';
  let maxValue = obj[maxKey];

  (Object.keys(obj) as (keyof MyObject)[]).forEach((key) => {
      if (obj[key] > maxValue) {
          maxValue = obj[key];
          maxKey = key;
      }
  });

  return maxKey;
}
function transformNegativeValuesToZero(obj: MyObject): MyObject {
    const result: MyObject = { ...obj };

    (Object.keys(result) as (keyof MyObject)[]).forEach((key) => {
        if (result[key] < 0) {
            result[key] = 0;
        }
    });

    return result;
}

function SurveyComponent() {
    const { id } = useParams();
    const resultValues = {a : 'PAMP Conv', b : 'PAMP Comp', c : 'PAMPSR', d : 'PAMPSI'}
    const survey = new Model(json);
    survey.applyTheme(themeJson);
    survey.onComplete.add((sender, options) => {
        let probabilities = calculateResult(sender.data).probabilities; 
        probabilities = transformNegativeValuesToZero(probabilities);
        const messages = calculateResult(sender.data).messages;
        const surveyData = {
            probabilities,
            messages,
            patient : id,
            date : new Date(),
        }
        if (id) {
            const result = getMaxKey(surveyData.probabilities);
            console.log(result)
            const surveyResult = {
                patient: id,
                date: surveyData.date,
                result: resultValues[result],
                probabilities: surveyData.probabilities,
                messages: surveyData.messages
            }
            addSurveyResult(surveyResult);
        }
        window.location.href = '/survey-result/' + id;
    });
    return (<Survey model={survey}/>);
}

export default SurveyComponent;