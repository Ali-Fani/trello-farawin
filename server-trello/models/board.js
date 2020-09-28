"use strict";
const { ObjectID } = require("mongodb");
const { insertOne, updateOne, findOne, deleteOne } = require("../db");
const insert = async (body) => {
  if (!body.name) {
    return { success: false, error: "missing name" };
  }
  if (body.name.length < 3) {
    return { success: false, error: "invalid name" };
  }
  if (!body.desc || body.desc.length < 8) {
    return { success: false, error: "invalid desc" };
  }
  const res = await insertOne("board", { name: body.name, desc: body.desc });
  return { success: true, boardID: res.insertedId };
};

const update = async (body) => {
  if (!body.id || !isNaN(body.id)) {
    return { success: false, error: "invalid board" };
  }
  if (!body.name) {
    return { success: false, error: "missing name" };
  }
  if (body.name.length < 3) {
    return { success: false, error: "invalid name" };
  }
  if (!req.body.desc || req.body.desc.length < 8) {
    return { success: false, error: "invalid desc" };
  }
  const res = await updateOne(
    "board",
    { name: body.name, desc: body.desc },
    { _id: ObjectID(id) }
  );
  return { success: true, nModified: res.nModified };
};

const get = async (body) => {
  if (!body.id || body.id.length != 24) {
    return { success: false, error: "invalid board" };
  }
  const res = await findOne("board", { _id: ObjectID(body.id) });
  if (!res) {
    return { success: false, error: "board not found" };
  }
  return { success: true, board: res };
};

const remove = async (body) => {
  if (!body.id || body.id.length != 24) {
    return { success: false, error: "invalid board" };
  }
  const res = await deleteOne("board", { _id: ObjectID(body.id) });
  return { success: true, board: res };
};

module.exports = { insert, update, get, remove };
