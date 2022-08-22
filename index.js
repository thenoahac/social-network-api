const express = require("express");
const db = require("./config/connections");
const routes = require("./routes");

const app = express();
const PORT = process.env.PORT | 3001;

app.use(routes);
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.get("*", (req,res) => res.status(404).json({message:"This doesn't seem to exist."}));
db.once('open', () =>{
    app.listen(PORT, () => console.log("Your API is now running on server port " + PORT));
});