'use client'

import Image from "next/image";
import * as Styled from "./Question.styles";
import Link from "next/link";
import React from "react";
import { useAuth } from "../../contexts/AuthContext"; // Auth context hook

// this is everything that needs to be rendered in a question. This is the interface for the question
interface QuestionProps {
    title: string;
    q1: string;
    q2: string;
    q3: string;
    q4: string;
    q5: string;
    correct: string;
}

const Question: React.FC<QuestionProps> = ({ title, q1, q2, q3, q4, q5, correct }) => {
    return (
        <Styled.QuestionContainer>
        <h1>{title}</h1>
        <p>{q1}</p>
        <p>{q2}</p>
        <p>{q3}</p>
        <p>{q4}</p>
        <p>{q5}</p>
        <p>{correct}</p>
        </Styled.QuestionContainer>
    );
}

export default Question;
