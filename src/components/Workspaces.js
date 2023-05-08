import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/DataContext";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import StarIcon from "@mui/icons-material/Star";
import AddBoard from "./AddBoard";
import Navbar from "./Navbar";
import "./Workspaces.css";

const Workspaces = () => {
  const navigate = useNavigate();
  const { boardId, handleFetchData } = useContext(DataContext);
  const [userInfo, setUserInfo] = useState("");

  const getUserProfile = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("No token found in localStorage");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    try {
      const res = await axios.get("http://localhost:5000/api/user/me");
      setUserInfo(res.data);
      console.log(
        "Displaying user boards:",
        res.data.boards.map((board) => {
          return board._id;
        })
      );
    } catch (error) {
      throw error;
    }
  };

  const handleStarredBoard = async () => {
    try {
      console.log("add board to starred list");
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await axios.put(
        `http://localhost:5000/api/board/${boardId}/starred`
      );
      console.log(res.data);
      handleFetchData();
    } catch (error) {
      console.log(error);
    }
  };

  const goToBoard = (id) => {
    navigate(`/board/${id}`);
    console.log("Board:", id);
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  return (
    <div>
      <Navbar />
      {userInfo && (
        <div className="greeting">
          👋 Hi, <strong>{userInfo.username}!</strong>
          <div className="boards-parent-container">
            {userInfo.boards.length > 0 ? (
              userInfo.boards.map((board, index) => {
                return (
                  <div key={board._id} className="boards-container">
                    <div
                      className="boards"
                      style={{
                        backgroundImage: `url(${
                          "/assets/" + board.background
                        })`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                        height: "170px",
                        width: "230px",
                      }}
                    >
                      <h5
                        className="title"
                        onClick={() => goToBoard(board._id)}
                      >
                        {board.title}
                      </h5>
                      <span className="star">
                        <StarBorderIcon />
                        <span className="filled-star">
                          <StarIcon onClick={handleStarredBoard} />
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <p></p>
            )}
          </div>
          <h3 className="heading"> Create a board:</h3>
          <div className="container">
            <div className="newboard">
              <AddBoard />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Workspaces;
