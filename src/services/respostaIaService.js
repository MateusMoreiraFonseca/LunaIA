const userService = require("./userService");
const RespostaIa = require("../models/respostaIaModel");

const OpenAI = require("openai");
const apiKey = process.env.API_KEY;
const openai = new OpenAI({ apiKey });

const perguntaIA = async (pergunta, task, idUser) => {
  try {
    const user = await userService.getUserByIdUsernameEmail(idUser);
    const resposta = await obterRespostaDoGPT(pergunta, task);

    const respostaIa = new RespostaIa({
      pergunta: pergunta,
      resposta: resposta,
      titulo: task.title,
      task: task._id,
    });
    await respostaIa.save();

    user.RespostasSalvasIA.push(respostaIa);
    await user.save();

    return {
      respostaIa,
    };
  } catch (error) {
    console.error("Erro ao criar CaixaIA:", error);
    throw error;
  }
};

const obterRespostaDoGPT = async (pergunta, task) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: task.title + " " + task.description,
        },
        { role: "user", content: pergunta },
      ],
    });

    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message.content;
    } else {
      console.error("Nenhuma resposta válida recebida.");
      return "Desculpe, não foi possível obter uma resposta neste momento.";
    }
  } catch (error) {
    console.error("Erro na chamada da API:", error);
    throw new Error("Desculpe, ocorreu um erro ao obter a resposta.");
  }
};

module.exports = { perguntaIA };
