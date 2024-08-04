'use strict'
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./Router/auth-router");
const contactRoute = require("./Router/contact-router");
const dataRoute = require("./Router/data-router");
const adminRoute = require("./Router/admin-router");
const uploadRoute = require("./Router/upload-router");
const connectDb = require("./Utils/mongo");
const errorMiddleware = require("./Middlewares/error-middleware");
const port = process.env.PORT;


const corsOptions = {
    origin: process.env.FRONTEND_URL,
    methods: "GET, PUSH, DELETE, PATCH, HEAD, PUT",
    credentials: true,
}


app.use(cors(corsOptions));
app.use(express.json());
app.use(errorMiddleware);

//http.createServer(function (req, res) {
//    var url_parts = url.parse(req.url, true);
//    res.writeHead(200, { 'Content-Type': 'text/plain' });
//    res.end('Hello ' + url_parts.query.name + '\n');
//    console.log('Handled request from ' + url_parts.query.name)
//}).listen(port);
//console.log('Server running at http://localhost:1337/');

app.use("/api/auth/", authRoute);
app.use("/api/form/", contactRoute);
app.use("/api/data/", dataRoute);
app.use("/api/upload/", uploadRoute);
app.use("/api/admin/", adminRoute);



connectDb().then(() => {

    /* const sslServer = https.createServer({
        key: fs.readFileSync(path.join(__dirname, 'cert', 'key.pem')),
        cert: fs.readFileSync(path.join(__dirname, 'cert', 'cert.pem'))
    }, app)

    sslServer.listen(port, () => {
        console.log("Server is running at https://localhost:1337/");
    }); */

    app.listen(port, () => {
        console.log("server is running at port "+port)
    })
});

