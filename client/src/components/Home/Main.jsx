import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import game1 from "../../assets/images/games/game1.webp";
import game2 from "../../assets/images/games/game2.png";
import game3 from "../../assets/images/games/game3.avif";
import { useNavigate } from "react-router-dom";
import { MultiSelect } from "primereact/multiselect";
import "primereact/resources/themes/saga-blue/theme.css"; // Theme
import "primereact/resources/primereact.min.css"; // Core styles
import "primeicons/primeicons.css"; // Icons
import { database } from "../../firebase";
import { ref, get } from "firebase/database";

const Main = () => {
  const [user, setUser] = useState(null);
  const history = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");

  let userDataI = JSON.parse(
    JSON.parse(localStorage.getItem("userData")).userInterest
  );
  console.log(userDataI);

  const [preference, setPreference] = useState(userDataI);

  console.log(preference);
  const [type, setType] = useState("courses");

  const handleInterestChange = (e) => {
    setPreference(e.value);
  };

  const [courses, setCourses] = useState([ {
    "id": 1,
    "url": "",
    "name": "Loading...",
    "caption":
      "Loading...",
    "timestamptime": ["0:24", "2:29", "5:46"],
    "timestamptopic": [
      "Classification of Computer Networks",
      "Metropolitan Area Network",
      "The Internet"
    ],
    "image":
      "https://i.ytimg.com/vi/9BIN99rHOCQ/hqdefault.jpg?sqp=-oaymwEnCNACELwBSFryq4qpAxkIARUAAIhCGAHYAQHiAQoIGBACGAY4AUAB&rs=AOn4CLA4Mojx97_-yd-YiePziR8IZ32nHQ",
    "branch": "computer"
  },])
  const [loading, setLoading] = useState(false);

  if(loading) return <div className="loaderb"></div>
  
  useEffect(() =>{
    console.log(courses);
    
  }, [courses])

  useEffect(() => {
    const fetchCourses = async () => {
      try {
      
        const coursesRef = ref(database, "courses"); // Reference to 'courses' node
        const snapshot = await get(coursesRef);
        

        if (snapshot.exists()) {
          setCourses(Object.values(snapshot.val())); // Convert object to array
        } else {
          console.log("No data available");
        }

      
      } catch (error) {
        console.error("Error fetching courses:", error);

      }
 
    };

    fetchCourses();
  }, []);


  const changeToGames = () => {
    setType("games");
    document.getElementById("selGames").style.backgroundColor = "#3a3fc5";
    document.getElementById("selCourse").style.backgroundColor = "#14152a";
  };

  const changeToCourses = () => {
    setType("courses");
    document.getElementById("selCourse").style.backgroundColor = "#3a3fc5";
    document.getElementById("selGames").style.backgroundColor = "#14152a";
  };

  const games = [
    {
      id: 1,
      name: "MCQ Quiz",
      description:
        "Test your knowledge in various programming concepts, from arrays and linked lists to dynamic programming. Perfect for assessing your problem-solving skills.",
      image: game1,
      branch: "Computer Science",
      path: "/quizgame",
    },
    {
      id: 2,
      name: "Coding Challenges",
      description:
        "Take on coding challenges to sharpen your skills and delve into Object-Oriented Programming (OOP) principles. Explore encapsulation, inheritance, and polymorphism for efficient software design and development.",
      image: game2,
      branch: "Information Technology",
      path: "/codinggame",
    },
    {
      id: 3,
      name: "Electrical Simulations",
      description:
        "Immerse yourself in electrical simulations to experience the intricacies of fluid dynamics and engineering. Understand thermodynamics and fluid behavior, gaining insights crucial for mechanical design and analysis.",
      image: game3,
      branch: "Electrical Engineering",
      path: "/simulationgame",
    },
  ];


  const filteredCourses = courses.filter((course) => {
    let count = localStorage.getItem(searchQuery);

    if (count !== null) {
      count = parseInt(count) + 1;
    } else {
      count = 1;
    }

    localStorage.setItem(searchQuery, count);

    const isMatchSearch = course.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const isMatchPreference =
      preference.length === 0 ||
      preference.includes("default") ||
      preference.includes(course.branch);
    return isMatchSearch && isMatchPreference;
  });

  const filteredGames = games.filter((game) =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartCourse = (id) => {
    const coursePath = courses[id - 1].path;

    return <Link to={coursePath} />;
  };

  const handleStartGame = (id) => {
    const gamePath = games[id - 1].path;

    return <Link to={gamePath} />;
  };

  return (
    <div id="mainHome">
      <div id="topBar">
        <div id="selBox">
          <div onClick={changeToCourses} id="selCourse">
            Courses
          </div>
          <div onClick={changeToGames} id="selGames">
            Games
          </div>
        </div>

        <input
          placeholder="Search"
          id="searchField"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* <select
                    className='selPreference'
                    value={preference}
                    onChange={(e) => setPreference(e.target.value)}
                >
                    <option value="default" disabled hidden>Select Preference:</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                </select> */}

        <MultiSelect
          display="chip"
          className="selPreference"
          value={preference}
          options={[
            { label: "civil", value: "civil" },
            { label: "ENTC", value: "ENTC" },
            { label: "computer", value: "computer" },
            { label: "mechanical", value: "mechanical" },
          ]}
          onChange={handleInterestChange}
          placeholder="Select Interests"
        />

        <div id="selIcon">
          <i class="fa-solid fa-trophy"></i>
          <i class="fa-solid fa-user"></i>
        </div>
      </div>
      {type === "courses" ? (
        <div className="courseCards">
          {filteredCourses.map((course) => (
            <div key={course.id} className="courseCard">
              <iframe src={course.url} type="" />
              <div className="courseInfo">
                <h3>{course.name}</h3>
                <p className="courseDesc">{course.caption.slice(0,140) + "..."}</p>
                {/* Use Link instead of window.location.href */}
                <Link
                  to="/learnboard/type"
                  state={{
                    url: "learnboard/check",
                    caption: course.caption,
                    name: course.name,
                    info: course.caption,
                    linkv : course.url,
                    branch : course.branch,
                    timestamptime : course.timestamptime,
                    timestamptopic : course.timestamptopic
                  }}
                >
                  <button className="courseBtn">Start</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="gameCards">
          {filteredGames.map((game) => (
            <div key={game.id} className="gameCard">
              <img src={game.image} alt={`Game ${game.id}`} />
              <div className="gameInfo">
                <h3>{game.name}</h3>
                <p className="gameDesc">{game.description}</p>
                {/* Use Link instead of window.location.href */}
                <Link to={game.path}>
                  <button className="gameBtn">Play</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Main;
