'use client'

import React, {useState, useRef} from "react";
import Header from "@/app/components/layout/Header";
import * as Styled from "./Generate.styles";
import Question from "@/app/components/generate/Question";

// Define the interface for the question
interface Question {
  questionTitle: string;
    question1: string;
    question2: string;
    question3: string;
    question4: string;
    question5: string;
    correctAnswer: string;
  }

const Generate: React.FC = () => {
  // states for this component
  const [stepNumber, setStepNumber] = useState<number>(0); // This tracks the steps we are at (TODO: think if we need this or not)
  const [pastedText, setPastedText] = useState<string>(''); // pastedText is the text that the user pastes into the text area
  const [questionDescription, setQuestionDescription] = useState<string>(''); // questionDescription is the description of the questions that the user wants to generate
  const [uploadedFile, setUploadedFile] = useState<File | null>(null); // file uploaded by the user
  const [problems, setProblems] = useState<Question[] | null>([]); // This is the list of problems that are generated

  // This is the reference to the file input element
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // handle the file selection + changes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // Check if the file exists
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  }

  // Sends a POST request to route /problems/generate with the text and question description and TODO file as well
  const handleGenerate = async(event: React.FormEvent) => {
    // event.preventDefault() is used to prevent the default behavior of the form (which can cause refreshes for example)
    event.preventDefault();

    // Upload the state to change the screen
    setStepNumber(1);

    // Refactor body to include formdata. This will be the body of the POST request
    const generateBody = new FormData();

    // Append the pastedText to the body
    generateBody.append('pastedText', pastedText);
    generateBody.append('questionDescription', questionDescription);

    // Add the file to the body if it exists
    if (uploadedFile) {
      generateBody.append('uploadedFile', uploadedFile);
    }

    // This is the fetch request that is being sent to the Flask API
    try {
      const response = await fetch('/api/dashboard/generate', {
        // This is a POST request
          method: "POST",
          // Remove this header. turns out FormData will automatically set the right header. Normally this header is necessary to tell the Flask API that the data is in JSON format
          // headers: {
          //     "Content-Type": "application/json"
          // },

          // Here are the values that are being sent to the Flask API
          body: generateBody
      });
      // Add step if response is not okay
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // This is the response from the Flask API that is sent over to us
        const data = await response.json();
        // This is the message that is sent from the Flask API
        alert(data.pastedText);
        alert(data.questionDescription);
        alert(data.fileConfirmReceipt);
        alert(data.tempMessage)
        // This is the JSON string that is generated from the Flask API
        //alert();
        console.log(data.generatedJSONString);

        // Set the list to be the string
        // TODO: Need to add in unhappy path
        const questionsList = JSON.parse(data.generatedJSONString);
        console.log(questionsList);
        setProblems(questionsList);
        setStepNumber(2);
        
      } catch (error) {
      // Put an error here if it doesn't work
        alert("There was an error: " + error); // First for debugging purposes
      }
  };

  // Step One: include the component with the input fields to show
  const stepOne = (
    <>
    <Header />
    <Styled.Container>
      <Styled.InputSelector>
        {/* Implement slider here */}
      </Styled.InputSelector>
      
      <Styled.InstructionText>
        Fill out at least one of the fields below. We&apos;ll do the rest.
      </Styled.InstructionText>

      <Styled.label>Paste text</Styled.label>
        <Styled.TextArea
          placeholder="Feel free to paste your raw notes here"
          value={pastedText}
          onChange={(e) => setPastedText(e.target.value)}
        />

        <Styled.label>Describe the questions to generate</Styled.label>

        <Styled.TextArea
          placeholder="Type up a description of questions to generate"
          value={questionDescription}
          onChange={(e) => setQuestionDescription(e.target.value)}
        />      
        <Styled.label>File from computer</Styled.label>

          <p>Supported file types: pdf, jpg</p>
          
          <Styled.FileUpload type='file'
            accept='.pdf,.jpg,.jpeg,.png'
            onChange={handleFileChange}
            ref={fileInputRef}>
          </Styled.FileUpload>
          <Styled.Button onClick={() => fileInputRef.current?.click()}>{uploadedFile ? uploadedFile.name : 'Upload file'}</Styled.Button>

      <Styled.ButtonWrapper>
        <Styled.Button>
          Adjust settings
        </Styled.Button>
        <Styled.Button onClick={handleGenerate}>Generate</Styled.Button>
      </Styled.ButtonWrapper>
      {/* {problems && problems.map((problem, index) => (
      <div key={index}>
        <h1>{problem.questionTitle}</h1>
        <p>{problem.question1}</p>
        <p>{problem.question2}</p>
        <p>{problem.question3}</p>
        <p>{problem.question4}</p>
        <p>{problem.question5}</p>
        <p>{problem.correctAnswer}</p>
      </div>
      ))} */}
    </Styled.Container>
    </>
  );

  const stepTwo = (
    <>
    <Header />
    <Styled.Container>
      <Styled.CardWrapper>
        <Styled.twoTitle>
          Cooking...
          <Styled.twoImage src="/images/cooking-kirby.gif"></Styled.twoImage>
        </Styled.twoTitle>
      </Styled.CardWrapper>
    </Styled.Container>
    </>
  );

  const stepThree = (
    <>
    <Header />
    <Styled.threeTitle>
      Here are the questions we generated for you!
    </Styled.threeTitle>
    {problems && problems.map((problem, index) => (
      // TODO: Issue 19, needs to be refactored to a separate component
      <Question key={index} title={problem.questionTitle} q1={problem.question1} q2={problem.question2} q3={problem.question3} q4={problem.question4} q5={problem.question5} correct={problem.correctAnswer} />
      // <div key={index}>
      //   <h1>{problem.questionTitle}</h1>
      //   <p>{problem.question1}</p>
      //   <p>{problem.question2}</p>
      //   <p>{problem.question3}</p>
      //   <p>{problem.question4}</p>
      //   <p>{problem.question5}</p>
      //   <p>{problem.correctAnswer}</p>
      // </div>
      ))}
    </>
  )

  return (
    <>
      {stepNumber === 0 && stepOne}
      {stepNumber === 1 && stepTwo}
      {stepNumber === 2 && stepThree}
    </>
  );
};

export default Generate;