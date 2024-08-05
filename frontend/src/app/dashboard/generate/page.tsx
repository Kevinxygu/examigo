'use client'

import React, {useState, useRef} from "react";
import Header from "@/app/components/layout/Header";
import * as Styled from "./Generate.styles";

const Generate: React.FC = () => {
  // This tracks the steps we are at (TODO: think if we need this or not)
  const [stepNumber, setStepNumber] = useState<number>(0);

  // pastedText is the text that the user pastes into the text area
  const [pastedText, setPastedText] = useState<string>('');

  // questionDescription is the description of the questions that the user wants to generate
  const [questionDescription, setQuestionDescription] = useState<string>('');

  // file uploaded by the user
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // This is a reference to the file input element
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  // handle the file selection + changes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setUploadedFile(event.target.files[0]);
    }
  }

  // Sends a POST request to route /problems/generate with the text and question description and TODO file as well
  const handleGenerate = async(event: React.FormEvent) => {
    // event.preventDefault() is used to prevent the default behavior of the form (which can cause refreshes for example)
    event.preventDefault();

    // Refactor body to include formdata. This will be the body of the POST request
    const generateBody = new FormData();

    // Append the pastedText to the body
    generateBody.append('pastedText', pastedText);
    generateBody.append('questionDescription', questionDescription);

    // Add the file to the body if it exists
    if (uploadedFile) {
      generateBody.append('uploadedFile', uploadedFile);
    }

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
        
      } catch (error) {
      // Put an error here if it doesn't work
        alert("There was an error: " + error); // First for debugging purposes
      }
  };

  return (
    <>
    <Header />
    <Styled.Container>
      <Styled.InputSelector>
        {/* Implement slider here */}
      </Styled.InputSelector>
      
      <Styled.InstructionText>
        Fill out at least one of the fields below. We'll do the rest.
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
    </Styled.Container>
    </>
  );
};

export default Generate;