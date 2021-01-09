const router = require("express").Router();
const Workout = require("../models/workouts.js");

router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// router.put("/api/workouts/:id", (req, res) => {
//   if (req.body.type === "cardio") {
//     Workout.findOneAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       {
//         $push: {
//           exercises: {
//             type: req.body.type,
//             name: req.body.name,
//             duration: req.body.duration,
//             distance: req.body.distance,
//           },
//         },
//       }
//     )
//       .then((dbWorkout) => {
//         res.json(dbWorkout);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   } else {
//     Workout.findOneAndUpdate(
//       {
//         _id: req.params.id,
//       },
//       {
//         $push: {
//           exercises: {
//             type: req.body.type,
//             name: req.body.name,
//             weight: req.body.weight,
//             duration: req.body.duration,
//             reps: req.body.reps,
//             sets: req.body.sets,
//           },
//         },
//       }
//     )
//       .then((dbWorkout) => {
//         res.json(dbWorkout);
//       })
//       .catch((err) => {
//         res.status(400).json(err);
//       });
//   }
// });

router.get("/api/workouts/", (req, res) => {
  Workout.findOne({}).sort({$natural:-1}).limit(1)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;

// app.get("/find/:id", (req, res) => {
//     db.notes.findOne(
//       {
//         _id: mongojs.ObjectId(req.params.id)
//       },
//       (error, data) => {
//         if (error) {
//           res.send(error);
//         } else {
//           res.send(data);
//         }
//       }
//     );
//   });
