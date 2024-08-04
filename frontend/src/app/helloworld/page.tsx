'use client'
import React, { useEffect } from "react";
import { TESTING_API_URL } from "../../app/constants/constants";
import { error } from "console";
import * as Styled from "./helloworld.styles";
import Header from "../components/layout/Header";

const HelloWorld = () => {
    const [flaskMessage, setFlaskMessage] = React.useState<string | null>(null);

    useEffect(() => {
        fetch(`${TESTING_API_URL}/helloworld`)
            .then(response => response.json())
            .then(data => setFlaskMessage(data.message))
            .catch(error => alert("There was an error: " + error));
    }, []);

    return (
    <>
    <Header />
      <Styled.EasterEggImage src="/images/easter-egg.jpg" alt="Easter egg for application Examigo" />
      <h2>Hello World!</h2>
      <p>{flaskMessage}</p> {/* This should print out "Hello world from Flask!" To verify if the flask backend is getting API requests*/}
    </>
  );
};

export default HelloWorld;