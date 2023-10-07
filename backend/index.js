import express from "express";
import Moralis from "moralis";
import dotenv from "dotenv";
import cors from "cors";

// var express = require("express");
// var Moralis = require("moralis");
// var dotenv = require("dotenv");
// var cors = require("cors");

const app = express();
const port = 5001;
dotenv.config();

app.use(cors());
app.use(express.json());

const MORALIS_API_KEY = process.env.NEXT_PUBLIC_MORALIS_API;

app.get("/getwalletbalance", async (req, res) => {
  try {
    const { query } = req;
    const response = await Moralis.EvmApi.balance.getNativeBalance({
      chain: "0xaa36a7",
      address: query.address,
    });

    return res.status(200).json(response);
  } catch (error) {
    console.log("something went wrong");
    return res.status(400).json();
  }
});

app.get("/verifyUser", async (req, res) => {
  try {
    const { query } = req;

    const response = await Moralis.Auth.verify({
      message: query.message,
      signature: query.signature,
      network: "evm",
    });

    return res.status(200).json(response);
  } catch (error) {
    // console.log("error : ", error);
    console.log("something went wrong1");
    return res.status(400).json();
  }
});

Moralis.start({
  apiKey: MORALIS_API_KEY,
}).then(() => {
  app.listen(port, () => {
    console.log(`Listening for API Calls ${port}`);
  });
});
