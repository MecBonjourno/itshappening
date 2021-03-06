const router = require('express').Router();
let Exercise = require('../models/exercise.model');

    router.route('/').get((req, res) => {
    Exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err))
    });

    router.route('/add').post((req,res) => {
        const username = req.body.username
        const description = req.body.description
        const insta = req.body.insta
        const twitter = req.body.twitter
        const connections = req.body.connections

        const newExercise = new Exercise({username, description, insta, twitter, connections});

        newExercise.save()
            .then(() => res.json("New Exercise Added"))
            .catch(err => res.status(400).json('Error: ' + err))
    })

    router.route('/:id').get((req,res) => {
        Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(err => res.status(400).json('Error: ' + err))
    })

    router.route('/:id').delete((req,res) => {
        Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json("Exercise Deleted"))
        .catch(err => res.status(400).json('Error: ' + err))
    })

    router.route('/update/:id').put((req,res) => {
        Exercise.findById(req.params.id)
          .then( exercise => {
        exercise.username = req.body.username
        exercise.description = req.body.description
        exercise.insta = req.body.insta
        exercise.twitter = req.body.twitter
        
        const addConnections = exercise.connections
            console.log(addConnections)
        addConnections.push( req.body.connections)
        

        console.log("deu isso: "+addConnections)

        exercise.save()
            .then(() => res.json("Exercise Updated "))
            .catch(err => res.status(400).json('Error: ' + err))
        })
        .catch(err => res.status(400).json('Error: ' + err))
    })


module.exports = router;