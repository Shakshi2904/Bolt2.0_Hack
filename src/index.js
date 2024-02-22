const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");
const tempelatePath = path.join(__dirname, '../tempelates');
app.use(express.static(path.join(__dirname, '../public')));

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatePath);
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    try {
        res.render("home.hbs");
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.get("/home", (req, res) => {
    res.render("home.hbs");
});

app.get("/login", (req, res) => {
    res.render("login.hbs");
});

app.get("/signup", (req, res) => {
    res.render("signup.hbs");
});

app.get("/final", (req, res) => {
    res.render("final.hbs");
});


app.post("/signup", async (req, res) => {
    try {
        const data = {
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            cpassword: req.body.cpassword,
            gender: req.body.gender,
        };

        await collection.create(data);

        res.render("home"); // Assuming this is the intended response
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error"); // Send an error response
    }
});

app.post("/login", async (req, res) => {
    try {
        const user = await collection.findOne({ username: req.body.username });

        if (!user) {
            return res.render("login");
        }

        // Compare passwords
        if (user.password === req.body.password) {
            return res.render("final");
        } else {
            return res.send("login");
        }
    } catch (error) {
        console.error("Error occurred:", error);
        res.status(500).send("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log("port connected");
});
