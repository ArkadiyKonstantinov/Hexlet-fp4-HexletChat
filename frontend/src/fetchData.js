import axios from "axios";
import { routes } from "./routes.js";
import { createAsyncThunk } from "@reduxjs/toolkit";

const fetchData = createAsyncThunk(
  "fetchInitialData",
  async (authHeader) => {
    try {
      const { data } = await axios.get(routes.dataPath(), { headers: authHeader });
      return data;
    } catch (err) {
      throw err;
    }
  }
);

export default fetchData;
