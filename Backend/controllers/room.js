const Room = require("../models/room");

let doesRoomExist = (req, res, next) => {
  Room.find({
    roomId: req.body.roomId,
  }).then((result) => {
    if (result.length > 0) {
      let userExists =
        result[0].arrayOfUsers.findIndex((element) => {
          return element == req.body.username;
        }) == -1
          ? false
          : true;
      return res.json({
        doesExist: true,
        isPrivate: result[0].isPrivate,
        userDoesExist: userExists,
      });
    } else {
      return res.json({
        doesExist: false,
        isPrivate: false,
      });
    }
  });
};

let createRoom = (req, res, next) => {
  Room.find({
    roomId: req.body.roomId,
  }).then((result) => {
    if (result.length == 0) {
      Room.create({
        ...req.body,
        arrayOfUsers: [req.body.username],
      })
        .then((createdResult) => {
          return res.json({
            success: true,
            roomId: createdResult.roomId,
          });
        })
        .catch(() => {
          return res.json({
            success: false,
          });
        });
    }
  });
};

let joinRoom = (req, res, next) => {
  Room.find({
    roomId: req.body.roomId,
  }).then((result) => {
    if (!result[0].isPrivate) {
      req.body.roomKey = "";
    }
    if (result[0].roomKey == req.body.roomKey) {
      let userExists =
        result[0].arrayOfUsers.findIndex((element) => {
          return element == result[0].username;
        }) == -1
          ? false
          : true;
      if (!userExists) {
        Room.updateOne(
          {
            roomId: result[0].roomId,
          },
          {
            arrayOfUsers: [...result[0].arrayOfUsers, req.body.username],
          }
        ).then((addRes) => {
          res.json({
            roomId: result[0].roomId,
          });
        });
      }
    }
  });
};

let getRoom = (req, res, next) => {
  Room.find({
    roomId: req.body.roomId,
  }).then((result) => {
    res.json(result[0]);
  });
};

let exitRoom = (req, res, next) => {
  Room.find({
    roomId: req.body.roomId,
  }).then((result) => {
    let arr = result[0].arrayOfUsers.filter((element) => {
      return element != req.body.user;
    });
    Room.updateOne(
      {
        roomId: req.body.roomId,
      },
      {
        arrayOfUsers: arr,
      }
    ).then((updatedResult) => {
      res.json({
        success: true,
      });
    });
  });
};

module.exports = {
  doesRoomExist,
  createRoom,
  joinRoom,
  getRoom,
  exitRoom,
};
