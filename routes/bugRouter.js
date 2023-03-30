import express from "express";

import bugModel from "../models/bugModel";

const router = express.Router();

router.post("/addbugs", (req, res) => {
  req.body.createdDate = new Date().toLocaleDateString();
  req.body.createdTime = new Date().toLocaleTimeString();
  const bugId = Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
  req.body.bugId = bugId;
  bugModel.create(req.body, (err, bugs) => {
    if (err) {
      res.send(err);
    } else {
      res.status(200).redirect("/bugs");
    }
  });
});

router.get("/", (req, res) => {
  bugModel.find((err, result) => {
    if (err) {
      res.send(err.message);
    } else {
      let dayDifference;
      const bugsResult = [];
      for (let index = 0; index < result.length; index++) {
        const todayDate = new Date();
        const bugsRegDate = new Date(result[index].createdDate);
        const dayDifference = todayDate.getDate() - bugsRegDate.getDate();
        // dayDifference = timeDiffernce / (1000 * 60 * 60 * 24);
        const status = result[index].isResolved;

        if (dayDifference > 3 && !status) {
          result[index].leftOver = "Expired";
          result[index].resolveStatus = "Not Resolved";
        } else if (dayDifference == 0 && !status) {
          result[index].leftOver = " 3 days";
          result[index].resolveStatus = "Not Resolved";
        } else if (dayDifference == 1 && !status) {
          result[index].leftOver = "2 days";
          result[index].resolveStatus = "Not Resolved";
        } else if (dayDifference == 2 && !status) {
          result[index].leftOver = "1 day";
          result[index].resolveStatus = "Not Resolved";
        } else if (dayDifference == 1 && !status) {
          result[index].leftOver = "1 day";
          result[index].resolveStatus = "Not Resolved";
        } else if (status) {
          result[index].leftOver = "Done";
          result[index].resolveStatus = "Resolved";
        } else {
          result[index].leftOver = "Last day";
          result[index].resolveStatus = "Not Resolved";
        }

        bugsResult.push(result[index]);
      }

      res.render("showbugs", { bugs: bugsResult });
    }
  });
});
router.post("/updatebugs", (req, res) => {
  if (req.body.isResolved == 1) {
    req.body.isResolved = true;
  } else {
    req.body.isResolved = false;
  }
  bugModel.findOneAndUpdate(
    { bugId: req.body.bugId },
    { $set: { isResolved: req.body.isResolved } },
    (err, response) => {
      if (err) {
        res.status(402).send(err);
      } else {
        res.redirect("/bugs");
      }
    }
  );
});
export default router;


// db.bugs.updateOne({_id: ObjectId("64246653d20045254e3ddef7"},{$set:{createdDate:'3/22/2023'}})
