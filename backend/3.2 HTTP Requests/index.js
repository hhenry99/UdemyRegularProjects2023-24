import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log(req.rawHeaders);
    res.send("Hello planet!");
});

app.listen(port, ()=>{
    console.log("The server started on " + port);
});