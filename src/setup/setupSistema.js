const userService = require("../services/userService");
const { createAdmin } = require("../services/adminService");
const { createUser } = require("../services/userService");
const Task = require("../models/taskModel");
const RespostaIa = require("../models/respostaIaModel");
async function installAll(req, res) {
  try {
    const startTime = Date.now();
    console.log("Iniciando instalação...");

    const createdUsers = [];
    const createdAdmins = [];

    for (let i = 0; i < 5; i++) {
      const userData = {
        username: `user${i + 1}`,
        email: `user${i + 1}@example.com`,
        password: "userPassword123",
        nameUser: `User ${i + 1}`,
        age: 25 + i,
      };

      console.log(`Criando usuário: ${userData.username}`);
      const newUser = await createUser(userData);
      createdUsers.push(newUser);

      for (let j = 0; j < 5; j++) {
        const newTask = new Task({
          title: `Task ${j + 1} for ${userData.username}`,
          description: `Description for Task ${j + 1}`,
          dueDate: new Date().setDate(new Date().getDate() + j),
          assignedUser: newUser.newUser._id,
        });

        console.log(`Criando tarefa para ${userData.username}`);
        const savedTask = await newTask.save();

        for (let k = 0; k < 5; k++) {
          const newRespostaIa = new RespostaIa({
            pergunta: `Pergunta ${k + 1} for Task ${j + 1}`,
            titulo: `Título ${k + 1}`,
            resposta: `Resposta ${k + 1}`,
            task: savedTask._id,
          });

          console.log(`Criando resposta de IA para Task ${j + 1}`);
          await newRespostaIa.save();

          const user = await userService.getUserByIdUsernameEmail(
            newUser.newUser
          );

          user.RespostasSalvasIA.push(newRespostaIa);
          await user.save();
        }
      }
    }

    for (let i = 0; i < 5; i++) {
      const userData = {
        username: `admin${i + 1}`,
        email: `admin${i + 1}@example.com`,
        password: "adminPassword123",
        nameUser: `Admin ${i + 1}`,
        age: 25 + i,
      };

      console.log(`Criando usuário: ${userData.username}`);
      const newUser = await createAdmin(userData);
      createdAdmins.push(newUser);

      for (let j = 0; j < 5; j++) {
        const newTask = new Task({
          title: `Task ${j + 1} for ${userData.username}`,
          description: `Description for Task ${j + 1}`,
          dueDate: new Date().setDate(new Date().getDate() + j),
          assignedUser: newUser._id,
        });

        console.log(`Criando tarefa para ${userData.username}`);
        const savedTask = await newTask.save();

        for (let k = 0; k < 5; k++) {
          const newRespostaIa = new RespostaIa({
            pergunta: `Pergunta ${k + 1} for Task ${j + 1}`,
            titulo: `Título ${k + 1}`,
            resposta: `Resposta ${k + 1}`,
            task: savedTask._id,
          });

          console.log(`Criando resposta de IA para Task ${j + 1}`);
          await newRespostaIa.save();

          const user = await userService.getUserByIdUsernameEmail(
            newUser.message
          );

          console.log(user);
          console.log(newRespostaIa);
          user.RespostasSalvasIA.push(newRespostaIa);
          await user.save();
        }
      }
    }

    const endTime = Date.now();
    const elapsedTime = (endTime - startTime) / 1000;
    const responseMessage = `
      Instalação concluída com sucesso:
      - Usuários criados: ${createdUsers.length}
      - Administradores criados: ${createdAdmins.length}
      - Tempo gasto: ${elapsedTime} segundos
    `;

    console.log("Instalação concluída!");

    res
      .status(200)
      .json({ message: responseMessage, createdUsers, createdAdmins });
  } catch (error) {
    console.error("Erro ao criar registros:", error);

    res
      .status(500)
      .json({ error: "Erro ao criar registros", message: error.message });
  }
}

module.exports = { installAll };
