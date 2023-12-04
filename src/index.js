const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const { mongoDB } = require("./utils/mongodb");
const { createAdminUser } = require("./setup/setupAdmin");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("../swagger_output.json");

const dotenv = require("dotenv");
dotenv.config();

const installRoutes = require("./routes/installRoutes");
const userRoutes = require("./routes/userRoutes");
const recoveryRoutes = require("./routes/recoveryRoutes");
const adminRoutes = require("./routes/adminRoutes");
const tasksRoutes = require("./routes/taskRoutes");
const respostaIaRoutes = require("./routes/respostaIaRoutes");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoDB();
createAdminUser();

app.use(bodyParser.json());

app.use("/", installRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile))
app.use("/user", userRoutes);
app.use("/recovery", recoveryRoutes);
app.use("/admin", adminRoutes);
app.use("/tasks", tasksRoutes);
app.use("/ia", respostaIaRoutes);

app.listen(PORT, () => {
  console.log(`Servidor iniciado na porta ${PORT}`);
});
