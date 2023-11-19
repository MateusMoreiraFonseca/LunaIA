const express = require("express");
const dotenv = require("dotenv");
const indexRoutes = require("./routes/indexRoutes");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const path = require('path'); 
const { mongoDB } = require("./helpers/mongodb");
const { createAdminUser } = require("./setup/setupAdmin");
const loginRoutes = require("./routes/loginRoutes");


dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoDB();
createAdminUser();

app.use(bodyParser.json());

app.use("/", indexRoutes);
app.use("/auth", loginRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});