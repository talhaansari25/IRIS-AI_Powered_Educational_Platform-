import React, { useState, useEffect } from "react";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import PollOutlinedIcon from "@mui/icons-material/PollOutlined";
import SummarizeOutlinedIcon from "@mui/icons-material/SummarizeOutlined";
import TipsAndUpdatesOutlinedIcon from "@mui/icons-material/TipsAndUpdatesOutlined";
import Chip from "@mui/material/Chip";
import ScienceIcon from "@mui/icons-material/Science";
import SchoolIcon from "@mui/icons-material/School";

// import Navbar from './Navbar';

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import ReactPlayer from "react-player";
// import myvideo from '../assets/myvideo.mp4'
// import mybird from '../assets/bird.mp4'

import { useParams, useLocation } from "react-router-dom";

export default function LearnBoard(props) {
  const [que, setQue] = useState("");
  const [ans, setAns] = useState("");
  const [userinput, setUserinput] = useState("");
  const { type } = useParams();
  const stateParamsval = useLocation().state.url;
  const stateContent = useLocation().state.content;
  const stateInfo = useLocation().state.info;
  const stateName = useLocation().state.name;
  const stateLinkv = useLocation().state.linkv;
  const tst = useLocation().state.timestamptime;
  const tsl = useLocation().state.timestamptopic;

  const [apiData, setApiData] = useState(null);

  const [showSummary, setShowSummary] = useState(false);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(null);

  console.log(tst);

  useEffect(() =>{
    console.log(quizData);
    
  }, [quizData])
  const fetchQuestions = async () => {
    try {
      setShowQuiz(true); // Show quiz popup
      setQuizData([]); // Clear previous data
      setScore(null); // Reset score
      console.log(stateInfo);
      

      const response = await fetch("http://localhost:8080/generatequest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paragraph: stateName }), // Pass lecture content
      });

      const data = await response.json();
      if (data.error) {
        console.error("Error fetching questions:", data.error);
        setQuizData([]);
      } else {
        console.log(data);
        
        setQuizData(JSON.parse(data));
      }
    } catch (error) {
      console.error("Error calling generatequest API:", error);
    }
  };

  const handleAnswerSelect = (questionIndex, option) => {
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: option });
  };

  const calculateScore = () => {
    let totalScore = 0;
    quizData.forEach((q, index) => {
      if (selectedAnswers[index] === q.answer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
  };

  useEffect(() =>{
    console.log(apiData);
    
  }, [apiData])

  useEffect(() =>{
    console.log(score);
    
  }, [score])

  const fetchSummary = async () => {
    try {
        console.log(stateInfo);
        setApiData("Loading Summary..."); // Show loading text
        setShowSummary(true); // Show the summary popup immediately

        const response = await fetch("http://localhost:8080/summarize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: stateInfo }),
        });

        const data = await response.json();
        if (data.summary) {
            // Capitalize the first letter of the summary
            const formattedSummary = data.summary.charAt(0).toUpperCase() + data.summary.slice(1);
            
            setApiData(formattedSummary);
        } else {
            setApiData("Error fetching summary.");
            console.error("Error fetching summary:", data.error);
        }
    } catch (error) {
        setApiData("Error fetching summary.");
        console.error("Error calling summary API:", error);
    }
};


  const fetchAnswer = async (question) => {
    try {
        setQue(question)
        setAns("Generation your Answer...")
      const response = await fetch("http://localhost:8080/askquestion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paragraph: stateInfo, // Captions or lecture content
          question: question,
        }),
      });
  
      const data = await response.json();
      if (data.answer) {
        setAns(data.answer);
        
      } else {
        console.error("Error fetching answer:", data.error);
      }
    } catch (error) {
      console.error("Error calling ask question API:", error);
    }
  };
  

  return (
    <div className="outer">
      {showSummary && (
        <div
          onClick={() => {
            setShowSummary(false);
          }}
          className="summaryDisplay"
        >
          <h2>Summary</h2>
          <div>{apiData}</div>
        </div>
      )}
      <div id="posAbsTimeLine">
        <div className="timeLine">
          <div className="timeC">0:00</div>
          <div className="timeN">Video Starts</div>
        </div>
        <div className="timeLine">
          <div className="timeC">{tst[0]}</div>
          <div className="timeN">{tsl[0]}</div>
        </div>
        <div className="timeLine">
          <div className="timeC">{tst[1]}</div>
          <div className="timeN">{tsl[1]}</div>
        </div>
        <div className="timeLine">
          <div className="timeC">{tst[2]}</div>
          <div className="timeN">{tsl[2]}</div>
        </div>
      </div>
      <div className="mainScreen">
        <div className="tile1">
          <div
            style={{
              borderRadius: "15px",
              overflow: "hidden",
              marginTop: 10,
              width: 700,
              height: 500,
            }}
          >
            <ReactPlayer
              url={stateLinkv}
              controls={true}
              width="100%"
              height="100%"
            />
          </div>
          <div className="options">
          <PollOutlinedIcon
        onClick={fetchQuestions}
        sx={{ fontSize: 40, color: "green", cursor: "pointer" }}
      />

            <SummarizeOutlinedIcon
              onClick={fetchSummary}
              sx={{ fontSize: 40, color: "green", cursor: "pointer" }}
            />

            <h3>{stateName}</h3>
          </div>
        </div>
        <div className="tile2">
          <CollectionsBookmarkIcon
            sx={{
              fontSize: 60,
              paddingBottom: "15px",
              paddingTop: "15px",
              color: "brown",
            }}
          />
          <div className="myDescHolder">
            <List sx={{ width: "100%", maxWidth: 360, color: "white" }}>
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    sx={{ background: "green" }}
                    alt="Remy Sharp"
                    src="/static/images/avatar/1.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Sumeet Gupta"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="white"
                      >
                        Very Nice Courses
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    sx={{ background: "orange" }}
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Talha"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="white"
                      >
                        Best Content for University Students"
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    sx={{ background: "blue" }}
                    alt="Cindy Baker"
                    src="/static/images/avatar/3.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Saherish Kazi"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="white"
                      >
                        I have a doubt, where to open the assessment result of
                        this lecture
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
              <Divider variant="inset" component="li" />
              <ListItem alignItems="flex-start">
                <ListItemAvatar>
                  <Avatar
                    sx={{ background: "orange" }}
                    alt="Travis Howard"
                    src="/static/images/avatar/2.jpg"
                  />
                </ListItemAvatar>
                <ListItemText
                  primary="Talha"
                  secondary={
                    <React.Fragment>
                      <Typography
                        sx={{ display: "inline" }}
                        component="span"
                        variant="body2"
                        color="white"
                      >
                        You can access through Assessment Page at Home Page"
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </List>
          </div>
          <div className="chips-ui">
            <Chip
              icon={<ScienceIcon />}
              label="Science"
              color="warning"
              variant="outlined"
            />
            <Chip
              icon={<SchoolIcon />}
              label="Tech"
              color="success"
              variant="outlined"
            />
          </div>
        </div>
      </div>
      <div className="helpSection">
        <div className="msgScreen">
          <div className="sample">
            <div className="sample_flex">
              <TipsAndUpdatesOutlinedIcon
                sx={{ fontSize: 40, color: "green", cursor: "pointer" }}
              />
              <h3>{que ? que : "How May I Help You ..?"}</h3>
            </div>
            <p className="bhaians">{ans ? ans : ""}</p>
          </div>
        </div>

        <div className="msgSend">
          <input
            onChange={(e) => {
              setUserinput(e.target.value);
            }}
            type="text"
            placeholder="Type a message..."
          />
         <button onClick={() => fetchAnswer(userinput)}>Ask</button>

        </div>
      </div>
      {/* Quiz Popup */}
      {showQuiz && (
        <div className="quizPopup">
          <h2>Assessment Quiz</h2>
          {quizData.length === 0 ? (
            <p>Loading questions...</p>
          ) : (
            <>
              {quizData.map((q, index) => (
                <div key={index}>
                  <h3>{q.question}</h3>
                  {q.options.map((option, optIndex) => (
                    <label key={optIndex}>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        onChange={() => handleAnswerSelect(index, option)}
                        checked={selectedAnswers[index] === option}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              ))}
              <button onClick={calculateScore}>Submit</button>
              {score !== null && <p className="scoreboard">  Your Score: {score} / {quizData.length}</p>}
            </>
          )}
          <button onClick={() => setShowQuiz(false)}>Close</button>
        </div>
      )}    
    </div>
  );
}
