const express = "express";
const router = require("express").Router();
const Users = require("./userDb.js")


router.post("/", (req, res) => {

});

router.post("/:id/posts", (req, res) => {

});

router.get("/", (req, res) => {
    Users.get(req.query)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message:"Sorry, could not retriever information about users."})
    })

});

router.get("/:id", (req, res) => {

});

router.get("/:id/posts", (req, res) => {

});

router.delete("/:id", (req, res) => {

});

router.put("/:id", (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
