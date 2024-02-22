const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/loginsignup", { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
})
.then(() => {
    console.log("mongodb connected");
})
.catch((error) => {
    console.log("failed to connect:", error);
});

const LogInSchema = new mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensure unique email addresses
    },
    username: {
        type: String,
        required: true,
        unique: true, // Ensure unique usernames
    },
    password: {
        type: String,
        required: true
    },
    cpassword: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    }
});

const collection = mongoose.model("Collection1", LogInSchema);

module.exports = collection;
