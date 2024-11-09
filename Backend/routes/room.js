const express = require("express");
const router = express.Router();

const roomControllers = require("../controllers/room");

router.post("/exists", roomControllers.doesRoomExist);
router.post("/create-room", roomControllers.createRoom);
router.post("/join-room", roomControllers.joinRoom);
router.post("/get-room", roomControllers.getRoom);
router.post("/exit-room", roomControllers.exitRoom);

module.exports = router;
