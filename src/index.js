let express = require('express');
let app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const { auth, root, account } = require('./routes');

app.use("/public", express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());

app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(auth)
app.use(root)
app.use("/account", account)

app.listen(3000, function () {
    console.log("Server started on port http://localhost:3000");
});
