import React, { useContext, useEffect, useState } from 'react'
import styles from "../Analytics/CSS/viewquizanalysis.module.css";
import Leftsidebar from '../Home/Leftsidebar';
import { Context } from '../../index';
import toast from 'react-hot-toast';
import axios from 'axios';
import { quizServer } from '../../utils/utils';

const Viewquizanalysis = ({currentQuizID}) => {

    const {loading, setLoading} = useContext(Context)
    const [quiz, setQuiz] = useState(null)

    const getQuiz = async () => {
        setLoading(true)
        try {
          const {data} = await axios.get(`${quizServer}/getQuizForUpdate/${currentQuizID}`, { withCredentials: true });
          setQuiz(data.quiz);
          setLoading(false)
        } catch (err) {
          setLoading(false)
          console.error(err.message);
          console.log(err)
          toast.error(`Error: ${err.message}`);
        }
      };

    useEffect(() => {
        getQuiz()
    }, [])

    if (!quiz) {
        return <div>Loading...</div>;
    }

    return (
        <div className={`container ${styles.parent}`}>
            <section className={styles.section_1}>
                <h1>{quiz.quizName} Question Analysis</h1>
                <div>
                    <p>Created on : {new Date(quiz.createdAt).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" })}</p>
                    <p>Impressions : {quiz.impressions}</p>
                </div>
            </section>
            <br />
            <br />
            {quiz.questions.map((question, index) => (
                <div key={index} className={styles.question_box}>
                    <h2>Q.{index + 1} {question.question}</h2>
                    <br />
                    <section className={styles.question_div}>
                        <div>
                            <span>{question.correctCount + question.incorrectCount}</span>
                            <p>people Attempted the question</p>
                        </div>
                        <div>
                            <span>{question.correctCount}</span>
                            <p>people Answered Correctly</p>
                        </div>
                        <div>
                            <span>{question.incorrectCount}</span>
                            <p>people Answered Incorrectly</p>
                        </div>
                    </section>
                    <br />
                    <br />
                    <hr />
                    <br />
                </div>
            ))}
        </div>
    )
}

export default Viewquizanalysis;
