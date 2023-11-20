const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const { mongoDB } = require("./helpers/mongodb");
const { createAdminUser } = require("./setup/setupAdmin");

const dotenv = require("dotenv");
dotenv.config();

const userRoutes = require("./routes/userRoutes");
const recoveryRoutes = require("./routes/recoveryRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoDB();
createAdminUser();

app.use(bodyParser.json());

app.use("/user", userRoutes);
app.use("/recovery", recoveryRoutes);
app.use("/admin", adminRoutes);



app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
