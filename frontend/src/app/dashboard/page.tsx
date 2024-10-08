'use client'
import React, { useEffect } from "react";
import { error } from "console";
import * as Styled from "./Dashboard.styles";
import Header from "../components/layout/Header";
import { useAuth } from "../contexts/AuthContext";
import { redirect } from "next/navigation";
import Link from "next/link";

interface Question {
    questionTitle: string;
    questions1: string;
    questions2: string;
    questions3: string;
    questions4: string;
    questions5: string;
    correctAnswer: number;
  }
  
  interface Test {
    testName: string;
    questions: Question[];
  }
  
  interface FullResponse {
    name: string;
    problems: Test[];
  }

const HelloWorld = () => {
    const [questions, setQuestions] = React.useState<Test[] | null>([]);
    const { user } = useAuth();

    useEffect(() => {
        if (user) {
        fetch(`/api/dashboard`)
            .then(response => response.json())
            .then(data => setQuestions(data.problems))
            .catch(error => alert("There was an error: " + error));
        } else {
            redirect("/auth/login")
        }
    }, []);

    const hasQuestionsBlock = (
        questions &&
            questions.map((object, index) => {
                return (
                    <div key={index}>
                        <h2>{object.testName}</h2>
                        {object.questions.map((question, index) => {
                            return (
                                <div key={index}>
                                    <h3>{question.questionTitle}</h3>
                                    <p>{question.questions1}</p>
                                    <p>{question.questions2}</p>
                                    <p>{question.questions3}</p>
                                    <p>{question.questions4}</p>
                                    <p>{question.questions5}</p>
                                    <p>{question.correctAnswer}</p>
                                </div>
                            );
                        })}
                    </div>
                );
            })
    );

    const emptyQuestionsBlock = (
        <div>
            <h2>No questions :((((((((((((</h2>
        </div>
    );

    return (
    <>
    <Header />
        <Link href="/dashboard/generate">
            + Generate
        </Link>
        {questions && questions.length > 0 ? hasQuestionsBlock : emptyQuestionsBlock}
    </>
  );
};

export default HelloWorld;