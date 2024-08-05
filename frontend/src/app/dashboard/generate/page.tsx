'use client'

import React, {useState} from "react";
import Header from "@/app/components/layout/Header";
import * as Styled from "./Generate.styles";

const Generate: React.FC = () => {
  const [stepNumber, setStepNumber] = useState<number>(0);
  const [pastedText, setPastedText] = useState<string>('');
  const [questionDescription, setQuestionDescription] = useState<string>('');

  // Sends a POST request to route /problems/generate with the text and question description and TODO file as well
  const handleGenerate = async(event: React.FormEvent) => {
    // event.preventDefault() is used to prevent the default behavior of the form (which can cause refreshes for example)
    event.preventDefault();
    try {
      const response = await fetch('/api/dashboard/generate', {
        // This is a POST request
          method: "POST",
          // This header is necessary to tell the Flask API that the data is in JSON format
          headers: {
              "Content-Type": "application/json"
          },
          // Here are the values that are being sent to the Flask API
          body: JSON.stringify({
              pastedText: pastedText,
              questionDescription: questionDescription
          })
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

        <Styled.FileUploaderWrapper>
          <p>Supported file types: pdf, jpg</p>
          <Styled.Button>Upload</Styled.Button>
        </Styled.FileUploaderWrapper>

      <Styled.ButtonWrapper>
        <Styled.Button>
          Adjust settings
        </Styled.Button>
        <Styled.Button onClick={handleGenerate}>Generate</Styled.Button>
      </Styled.ButtonWrapper>
    </Styled.Container>
  );
};

export default Generate;