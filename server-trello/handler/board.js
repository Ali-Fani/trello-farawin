"use strict";
const board = require("../models/board");
const create = async (req, res) => {
  try {
    const resp = await board.insert(req.body);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};
const update = async (req, res) => {
  try {
    const resp = await board.update(req.body);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};
const list = async (req, res) => {
  try {
    const resp = await board.get(req.body);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};
module.exports = { create, update, list };
