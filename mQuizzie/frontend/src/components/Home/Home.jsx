import React, { useContext, useState, useEffect } from "react";
import styles from "../Home/CSS/home.module.css";
import Analytics from "../Analytics/Analytics";
import Dashboard from "../Home/Dashboard";
import Popup1 from "../Cards/Popup1";
import Createquiz from "../Quiz/Createquiz";
import Leftsidebar from "../Home/Leftsidebar";
import { Context } from "../../index";
import axios from "axios";
import { userServer } from "../../utils/utils";

const Home = () => {
  const [dashboard, setDashboard] = useState(true);
  const [analytics, setAnalytics] = useState(false);
  const [createQuiz, setCreateQuiz] = useState(false);
  const [getLink, setGetLink] = useState(false);
  const [hidePopup1, setHidePopup1] = useState(false);
  const [quizId, setQuizID] = useState("");
  const [quizname, setQuizName] = useState("");
  const [quizType, setQuizType] = useState("Q&A");

  const { user, setUser, loading, setLoading, isAuthenticated, setIsAuthenticated } = useContext(Context);

  const getMyProfileApi = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${userServer}/getProfile`, { withCredentials: true });
      setLoading(false);
      setUser(data.profile);
      setIsAuthenticated(true);
    } catch (error) {
      setLoading(false);
      setIsAuthenticated(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getMyProfileApi();
  }, []);

  return (
    <div className={`container ${styles.parent}`}>
      <Leftsidebar
        dashboard={dashboard}
        setDashboard={setDashboard}
        analytics={analytics}
        setAnalytics={setAnalytics}
        createQuiz={createQuiz}
        setCreateQuiz={setCreateQuiz}
        setHidePopup1={setHidePopup1}
      />
      {dashboard ? (
        <Dashboard id={user._id} />
      ) : analytics ? (
        <Analytics quizType={quizType} quizId={quizId} setAnalytics={setAnalytics} setDashboard={setDashboard} getLink={getLink} setGetLink={setGetLink} />
      ) : createQuiz ? (
        <div
          onClick={(e) => {
            e.preventDefault();
          }}
          className={styles.dark_overlay}
        >
          {hidePopup1 ? (
            <Createquiz quizId={quizId} setQuizType={setQuizType} setQuizID={setQuizID} setAnalytics={setAnalytics} getLink={getLink} setGetLink={setGetLink} setDashboard={setDashboard} setCreateQuiz={setCreateQuiz} quizName={quizname} quizType={quizType} />
          ) : (
            <Popup1
              quizName={quizname}
              setQuizName={setQuizName}
              setQuizType={setQuizType}
              hidePopup1={hidePopup1}
              setCreateQuiz={setCreateQuiz}
              setDashboard={setDashboard}
              setHidePopup1={setHidePopup1}
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Home;
