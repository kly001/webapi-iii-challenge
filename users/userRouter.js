const express = "express";
const router = require("express").Router();
const Users = require("./userDb.js")
const Posts = require("../posts/postDb.js")


router.post("/",(req,res) => {
    const userInfo = req.body
    if(!userInfo.name) {
        res.status(400).json({errorMessage:"Please provide a name for the user."})
    } else {
        Users.insert(userInfo) 
        .then(user => {
            res.status(201).json(user)
        })
    .catch(err => {
        res.status(500).json({error: "There was an error while saving the post to the database."})
    })
    }
})

//----------------------------------------------------------------

router.post("/:id/posts", (req, res) => {

});

//----------------------------------------------------------------

router.get("/", (req, res) => {
    Users.get(req.query)
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json({message:"Sorry, could not retriever information about users."})
    })
});

//---------------------------------------------------------------

router.get("/:id", (req, res) => {
    const {id} = req.params
    Users.getById(id)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message:` The user with Id# ${id} does not exist.`})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage:"The user information could not be retrieved."})
    })
});
//-------------------------------------------------------------------

router.get("/:id/posts", (req, res) => {
    const {id} = req.params
    Users.getUserPosts(id)
    .then(posts => {
        if(posts.length>0) {
            res.status(200).json(posts)
        } else { 
            res.status(404).json({message:"User posts do not exist"})
        }
    })
    .catch(err => {
        res.status(500).json({message:"Could not retrieve the user's posts"})
    })
});
//-------------------------------------------------------------------

router.delete("/:id", (req, res) => {

});
//--------------------------------------------------------------------

router.put("/:id", (req, res) => {

});
//--------------------------------------------------------------------

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
