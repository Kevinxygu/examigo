'use client'
import React, { useEffect } from "react";
import { TESTING_API_URL } from "../../app/constants/constants";
import { error } from "console";
import * as Styled from "./Dashboard.styles";
import Header from "../components/layout/Header";
import { useAuth } from "../contexts/AuthContext";

const HelloWorld = () => {
    const [flaskMessage, setFlaskMessage] = React.useState<string | null>(null);
    const { user } = useAuth();

    useEffect(() => {
        fetch(`${TESTING_API_URL}/problems`)
            .then(response => response.json())
            .then(data => setFlaskMessage(data.message))
            .catch(error => alert("There was an error: " + error));
    }, []);

    return (
    <>
    <Header />
      if 
    </>
  );
};

export default HelloWorld;