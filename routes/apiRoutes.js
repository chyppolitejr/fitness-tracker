const express = require("express");
const router = express.Router();
const mongojs = require("mongojs");
const Workout = require("../models/workouts");
const path = require("path");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.put("/api/workouts/:id", (req, res) => {
  console.log(req.body);
  Workout.updateOne(
    {
      _id: mongojs.ObjectID(req.params.id),
    },
    {
      $push: {
        exercises: req.body,
      },
    }
  )
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.status(400).json(err);
      console.error(err);
    });
});

// get the last workout
router.get("/api/workouts/", (req, res) => {
  Workout.find({}, null, {sort: {day:1}})
    // .sort({ day: -1 })
    .populate("exercises")
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

//  for dashboard
router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
  .sort({day: 1})
  // .populate("exercises")
		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
      res.json(err);
      console.error(err);
		});
});

module.exports = router;
