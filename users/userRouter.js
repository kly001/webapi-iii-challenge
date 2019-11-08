const express = "express";
const router = require("express").Router();
const Users = require("./userDb.js")
const Posts = require("../posts/postDb.js")



router.post("/",validateUser,(req,res) => {
    const userInfo = req.body
        Users.insert(userInfo) 
        .then(user => {
            res.status(201).json(user)
        })
        .catch(err => {
            res.status(500).json({error: "There was an error while saving the post to the database."})
    }) 
})

//----------------------------------------------------------------

router.post("/:id/posts",validateUserId, validatePost,(req, res) => {
   const userInfo = req.body
   Posts.insert(userInfo)
   .then(post => {
       res.status(201).json(post)
   })
   .catch(err => {
       res.status(500).json({error: "There was an error adding the post."})
   })
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

router.get("/:id",validateUserId, (req, res) => {
    const {id} = req.params
    Users.getById(id)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ message:` The user with Id# ${id}could not be found.`})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage:"The user information could not be retrieved."})
    })
});
//-------------------------------------------------------------------

router.get("/:id/posts",validateUserId, (req, res) => {
    const {id} = req.params
    Users.getUserPosts(id)
    .then(posts => {
            res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({message:"Could not retrieve the user's posts"})
    })
});
//-------------------------------------------------------------------

router.delete("/:id", validateUserId,(req,res) => {
    const {id} = req.params
    Users.remove(id) 
    .then(delUser => {
        if(delUser>0) {
            res.status(200).json({message:"The user has been deleted."})
        } else {
            res.status(404).json({message:`The user with ID# ${id} does not exist.`})
        }
    })
    .catch(err => {
        res.status(500).json({message:"The user could not be removed."})
    })
})


//--------------------------------------------------------------------

router.put("/:id",validateUserId, validatePost, (req, res) => {
    const {id} = req.params
    const userEdits = req.body
    Users.update(id,userEdits)
    .then(post => {
        res.status(201).json(post)
    })
    .catch(err => {
        res.status(500).json({errorMessage:"Unable to update user."})
    })
});
//--------------------------------------------------------------------

//custom middleware

function validateUserId(req, res, next) {
    const {id} = req.params
    Users.getById(id)
    .then(user => {
        if(!user) {
            res.status(400).json({message:"Invalid user id"})
        } else {
            req.user = user;
            next();
        }
    })
        .catch(err => {res.status(500).json({message: "User could not be retrieved."})
    })
};

//-------------------------------------------------------------------
function validateUser(req, res, next) {
    if(!req.body) {
        res.status(400).json({message:"Missing user data"})
    } else if (!req.body.name) {
        res.status(400).json({message: "Missing required name field"})
    } else {
        next();
    }
};
//-------------------------------------------------------------------
function validatePost(req, res, next) {
    if(!req.body) {
        res.status(400).json({message:"Missing post data."})
    } else if (!req.body.text) {
        res.status(400).json({message:"Missing required text field."})
    } else if (!req.body.user_id) {
        res.status(400).json({message:"Missing required user id field."})
    } else{
        next();
    }
};

module.exports = router;
