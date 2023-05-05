import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../store/thunks/fetchList";
import { useDispatch } from "react-redux";
import axios from "axios";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [comment, setComment] = useState("");
  const [cardId, setCardId] = useState(null);
  const [boardId, setBoardId] = useState(null);
  const [cardData, setCardData] = useState(null);
  const [boardData, setBoardData] = useState({
    board: { background: `background1.jpg` },
  });
  const [archiveBtn, setArchiveBtn] = useState(true);
  const dispatch = useDispatch();

  const clearComment = () => {
    console.log("clearComment");
    setComment("");
  };

  const getCard = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/card/${id}`);
      setCardData(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const getBoard = async (id) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/board/${id}`);
      console.log(res);
      setBoardData(res.data);
      const data = res.data;
      console.log("Board data:", data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleFetchData = async () => {
    dispatch(fetchData({ id: boardId }));
    if (cardId) {
      await getCard(cardId);
    }
  };

  useEffect(() => {
    if (cardId) {
      getCard(cardId);
    }
  }, [cardId]);

  return (
    <DataContext.Provider
      value={{
        cardId,
        setCardId,
        boardId,
        setBoardId,
        comment,
        setComment,
        cardData,
        setCardData,
        archiveBtn,
        setArchiveBtn,
        getCard,
        boardData,
        getBoard,
        clearComment,
        handleFetchData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default DataContext;
