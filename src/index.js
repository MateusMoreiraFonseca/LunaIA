const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const { mongoDB } = require("./helpers/mongodb");
const { createAdminUser } = require("./setup/setupAdmin");

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const loginRoutes = require("./routes/loginRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoDB();
createAdminUser();

app.use(bodyParser.json());

app.use("/auth", loginRoutes);
app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
