import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { api } from "../../utils";

export const fetchData = createAsyncThunk(
  "board/fetchBoard",
  async ({ id }, { reject }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found in localStorage");
      }
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      const res = await api.get(`/board/${id}`);
      return res.data.board;
    } catch (error) {
      return reject(error.response.data);
    }
  }
);
