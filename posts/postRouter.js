const express = 'express';
const router = require("express").Router();
const Posts = require ("./postDb.js")

router.get('/', (req, res) => {
    Posts.get()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({errorMessage:"Could not get posts."})
    })
});
//----------------------------------------------------------
router.get('/:id',validatePostId,(req, res) => {
    const {id} = req.params
    Posts.getById(id)
    .then(post => {
        res.status(200).json(post)
    })
    .catch(err => {
        res.status(500).json({ errorMessage: "Error getting post."})
    })
});
//----------------------------------------------------------
router.delete('/:id', validatePostId,(req, res) => {
    const {id} = req.params;
    Posts.remove(id)
    .then(post => {
        res.status(204).json({message:`Post with the Id# ${id} has successfully been deleted.`})
    })
    .catch(err => {
        res.status(500).json({errorMessage:"Unable to delete post."})
    })
});
//----------------------------------------------------------
router.put('/:id',validatePostId, (req, res) => {
    const {id} = req.params 
    const postEdits = req.body
    Posts.update(id, postEdits)
    .then(post => {
        res.status(204).json({message:`Post with Id# ${id} has been successfully updated.`})
    })
    .catch(err => {
        escape.status(500).json({errorMessage:"There was an error when trying to update post."})
    })
});
//----------------------------------------------------------
// custom middleware

function validatePostId(req, res, next) {
    const {id} = req.params
    Posts.getById(id)
    .then(user => {
        if(user) {
            req.user = user;
            next();
        } else {
            res.status(400).json({message: "Invalid Id."})
        }
    })
    .catch(err => {
        res.status(500).json({errorMessage:" Error validating post Id."})
    })
};

module.exports = router;