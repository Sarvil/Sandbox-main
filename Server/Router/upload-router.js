const express = require("express");
const router = express.Router();
const multer = require("multer")
const { question, reply } = require("../Contollers/upload-controllers");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        return cb(null, "../client/public/images");
    },
    filename: function (req, file, cb) {
        const filename = Date.now().toString() + file.originalname;
        
        return cb(null, filename);
    }
})

const upload = multer({ storage });

router.route("/images").post(upload.single('file'), (req, res) => {
    
    
});

router.route("/question").post(question);
router.route("/reply").post(reply);

module.exports = router;