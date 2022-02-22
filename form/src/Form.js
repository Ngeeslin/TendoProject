import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Form.css";

export default function Form(props) {
  const [patient, setPatient] = useState();
  const [doctor, setDoctor] = useState();
  const [diagnosis, setDiagnosis] = useState();
  const [surveyPage, setSurveyPage] = useState(0);
  const [surveyResults, setSurveyResults] = useState({});
  const [input, setInput] = useState();
  const [textInput, setTextInput] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    if(props.data){
      setPatient(props.data.entry[0]); //a better way would be to search through for resourceType
      setDoctor(props.data.entry[1]);
      setDiagnosis(props.data.entry[3]);
      setSurveyPage(1);
    }
  }, [props])

  const setRating = () => {
    if(input){
      setSurveyResults({rating: input});
      setInput(null);
      setSurveyPage(2);
      setError(false);
    }
    else {
      setError(true);
    }
  }

  const setExplination = () => {
    if(input && textInput){
      let newSurveyResults = surveyResults;
      newSurveyResults.explination = {helpful: input, explination: textInput};
      setSurveyResults(newSurveyResults);
      setInput(null);
      setTextInput(null);
      setSurveyPage(3);
      setError(false);
    }
    else {
      setError(true);
    }
  }

  const setFeeling = () => {
    if(textInput) {
      let newSurveyResults = surveyResults;
      newSurveyResults.feeling = textInput;
      setSurveyResults(newSurveyResults);
      setTextInput(null);
      setSurveyPage(4);
      let surveyResultsAndId = surveyResults
      surveyResults.id = props.data.id;
      axios.put("survey", surveyResults);
      setError(false);
    }
    else {
      setError(true);
    }
  }

  function errorMessage() {
    if(error){
      return <p class="warning">Please fill out all fields before submitting.</p>
    }
  }

  function doctorRatingReaction(){
    const rating = surveyResults.rating;
    if(rating <= 3) {
      return "Oh no! We are sorry that you would not recommend Dr." + doctor.resource.name[0].family;
    } else if(rating <=6){
      return "Well thats pretty good, but hopefully we can find you someone better next time."
    } else {
      return "Thats great that you liked Dr." + doctor.resource.name[0].family + "!";
    }
  }

  function getDiagnosisExplinationReaction(){
    if(surveyResults.explination.helpful === 'Yes') {
      return "your doctor explained how to manage the diagnosis well, ";
    }
    return "your doctor did not explain how to manage the diagnosis well, ";
  }

  function getSurveyPage() {
    switch(surveyPage) {
      case(1):
        return(
        <div>
          <p>Hi {patient.resource.name[0].given[0]}, on a scale of 1-10, would you recommend Dr.{doctor.resource.name[0].family} to a friend or family member? 1 = Would not recommend, 10 = Would strongly recommend</p>
          <input type="number" id="rating" name="rating" min="1" max="10" onInput={(e) => setInput(e.target.value)}></input>
          <input type="submit" onClick={setRating}></input>
          {errorMessage()}
        </div>
        );
      case(2):
          return(
          <div>
            <p>Thank you. You were diagnosed with {diagnosis.resource.code.coding[0].name}. Did Dr.{doctor.resource.name[0].family} explain how to manage this diagnosis in a way you could understand?</p>
            <input type="radio" name="yes_no" onClick={() => setInput('Yes')}/><span>Yes</span>
            <input type="radio" name="yes_no" onClick={() => setInput('No')}/><span>No</span>
            <div>Please Explain:</div>
            <input type="text" onInput={(e) => setTextInput(e.target.value)}/>
            <input type="submit" onClick={setExplination}></input>
            {errorMessage()}
          </div>
          )
      case(3):
            return(
              <div>
                <p>We appreciate the feedback, one last question: how do you feel about being diagnosed with {diagnosis.resource.code.coding[0].name}?</p>
                <input type="text" value={input} onInput={(e) => setTextInput(e.target.value)}/>
                <input type="submit" onClick={setFeeling}></input>
                {errorMessage()}
              </div>
            )
      case(4):
            return (
              <div>
                <p>Thanks again! Here's what we heard:</p>
                <p>You gave your doctor a {surveyResults.rating} out of 10. {doctorRatingReaction()}</p>
                <p>You also said that {getDiagnosisExplinationReaction()} saying {surveyResults.explination.explination}</p>
                <p>Finally, you said: "{surveyResults.feeling}" about your feelings on the diagnosis.</p>
              </div>
            )
      default:
        return "Loading...";
    }
  }
  return(
    <p>
      {getSurveyPage()}
    </p>
  )
}