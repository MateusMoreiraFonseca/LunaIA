const taskService = require("../services/taskService");

const createTask = async (req, res) => {
  try {
    const { title, description, dueDate, status } = req.body;
    const user = req.user;

    const taskData = {
      title,
      description,
      dueDate,
      status,
      assignedUser: user.userId,
    };

    const createdTask = await taskService.createTask(taskData);
    res.status(201).json(createdTask);
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};



const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const userId = req.user.userId;

    const deletedTask = await taskService.deleteTask(taskId, userId);
    res.status(200).json(deletedTask);
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const updateTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const taskData = req.body;
    const userId = req.user.userId;

    const updatedTasks = await taskService.updateTask(taskId, taskData, userId);
    res.status(200).json(updatedTasks);
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const getSelfTasks = async (req, res) => {
  try {
    const userId = req.user.userId;

    const findedTasks = await taskService.getTasksByIdUser(userId);
    res.status(200).json(findedTasks);
  } catch (error) {
    console.error("Erro ao obter tarefas do usuário:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const getTasksByStatus = async (req, res) => {
  try {
    const statusParam = req.params.status;
    const userId = req.user.userId;

    const statusMapping = {
      1: "To Do",
      2: "In Progress",
      3: "Done",
    };

    if (!statusMapping[statusParam]) {
      return res.status(400).json({ message: "Status inválido." });
    }

    const status = statusMapping[statusParam];
    const findedTasks = await taskService.getTasksByStatus(status, userId);
    res.status(200).json(findedTasks);
  } catch (error) {
    console.error("Erro ao obter tarefas pelo status:", error);
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

const getTasksForNextWeek = async (req, res) => {
  try {
    const userId = req.user.userId;

    const currentDate = new Date();

    const nextWeekDate = new Date();
    nextWeekDate.setDate(currentDate.getDate() + 7);

    const findedTasks = await taskService.getTasksForNextWeek(
      userId,
      currentDate,
      nextWeekDate
    );

    res.status(200).json(findedTasks);
  } catch (error) {
    res.status(500).json({ message: "Erro interno do servidor." });
  }
};

module.exports = {
  createTask,
  getSelfTasks,
  getTasksByStatus,
  updateTask,
  deleteTask,
  getTasksForNextWeek,
};
