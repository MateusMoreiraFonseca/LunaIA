const taskService = require("../services/taskService");
const respostaIaService = require("../services/respostaIaService");

const perguntaIA = async (req, res) => {
  const user = req.user;

  try {
    const taskId = req.params.taskId;
    const { pergunta } = req.body;

    const task = await taskService.getTaskById(taskId);

    const respostaIa = await respostaIaService.perguntaIA(pergunta, task, user);

    res.status(201).json({ message: respostaIa });
  } catch (error) {
    console.error("Erro ao criar CaixaIA:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = { perguntaIA };
