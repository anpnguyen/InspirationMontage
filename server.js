require("dotenv").config();

const express = require("express");
const axios = require("axios");
const app = express();

app.get("/api/photos", async (req, res) => {
  console.log(req.query.query)
  console.log("calling");
  const params = {
    params: {
      page: 1,
      client_id: process.env.UNSPLASH_KEY,
      per_page: 30,
      query: req.query.query
    }
  };

  try {
    const res = await axios.get(
      `https://api.unsplash.com/search/photos`,
      params
    );
    console.log(res);
  } catch (err) {
    console.log(err);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
