import React from "react";
import Header from "@/app/components/layout/Header";
import * as Styled from "./Generate.styles";

const Generate: React.FC = () => {
  const [pastedText, setPastedText] = React.useState<string>("");
  const [descriptionText, setDescriptionText] = React.useState<string>("");

  const handleGenerate = () => {
    // TODO: Implement this function to send POST request to flask backend for generation
    
  }
  return (
    <>
      <Header />
      <h1>Generate</h1>
    </>
  );
}

export default Generate;