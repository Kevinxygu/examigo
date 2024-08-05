'use client'
import React, { useEffect } from "react";
import { TESTING_API_URL } from "../../app/constants/constants";
import { error } from "console";
import * as Styled from "./helloworld.styles";
import Header from "../components/layout/Header";

const HelloWorld = () => {
    const [flaskMessage, setFlaskMessage] = React.useState<string | null>(null);
    const [number, setNumber] = React.useState<number>(0);
    const [text, setText] = React.useState<string>("");

    // Fetch the message from the Flask API. helloworld is just to test and use as easter egg!
    useEffect(() => {
        fetch('/api/helloworld')
            .then(response => response.json())
            .then(data => setFlaskMessage(data.message))
            .catch(error => alert("There was an error: " + error));
    }, []);

    // Function to handle test POST request to Flask API
    const handleTestPost = async (event: React.FormEvent) => {
      // event.presentDefault is used to prevent the default behavior of the form (which can cause refreshes for example)
      event.preventDefault();
      try {
          const response = await fetch('/api/helloworld', {
            // This is a POST request
              method: "POST",
              // This header is necessary to tell the Flask API that the data is in JSON format
              headers: {
                  "Content-Type": "application/json"
              },
              // Here are the values that are being sent to the Flask API
              body: JSON.stringify({
                  number: number,
                  text: text
              })
          });
          // Add step if response is not okay
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          // This is the response from the Flask API that is sent over to us
          const data = await response.json();
          // This is the message that is sent from the Flask API
          alert(`The number from the API is ${data.number}`);
          alert(`The text from the API is ${data.text}`);
      } catch (error) {
        // Put an error here if it doesn't work
        alert("There was an error: " + error);
    }
  };

    return (
    <>
    <Header />
      <Styled.EasterEggImage src="/images/easter-egg.jpg" alt="Easter egg for application Examigo" />
      <h2>Hello World!</h2>
      <p>{flaskMessage}</p> {/* This should print out "Hello world from Flask!" To verify if the flask backend is getting API requests*/}
      <form onSubmit={handleTestPost}>
                <div>
                    <label>
                        Number:
                        <input type="number" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
                    </label>
                </div>
                <div>
                    <label>
                        Text:
                        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                    </label>
                </div>
                <button type="submit">Try sending POST Request</button>
            </form>
    </>
  );
};

export default HelloWorld;