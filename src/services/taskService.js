const Task = require("../models/taskModel");
const dotenv = require("dotenv");

dotenv.config();



const createTask = async (taskData) => {
  try {
    const newTask = new Task(taskData);
    await newTask.save();

    return {
      message: "Tarefa criada com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};

const getTasksByIdUser = async (userId) => {
  try {
    const tasks = await Task.find({ assignedUser: userId });
    return tasks;
  } catch (error) {
    console.error("Erro ao obter tarefas do usuário:", error);
    throw error;
  }
};

const getTasksByStatus = async (status, userId) => {
  try {
    const tasks = await Task.find({ status: status, assignedUser: userId });
    return tasks;
  } catch (error) {
    console.error("Erro ao obter tarefas pelo status:", error);
    throw error;
  }
};

const getTaskById = async (taskId) => {
  try {
    const task = await Task.findById(taskId);

    if (!task) {
      return {
        error: "Tarefa não encontrada.",
      };
    }

    return task;
  } catch (error) {
    console.error("Erro ao obter tarefa pelo ID:", error);
    throw error;
  }
};

const updateTask = async (taskId, taskData, userId) => {
  try {
    const task = await Task.findOne({ _id: taskId, assignedUser: userId });

    if (!task) {
      return {
        error: "Tarefa não encontrada ou não pertence ao usuário.",
      };
    }

    if (taskData.title !== undefined) {
      task.title = taskData.title;
    }

    if (taskData.description !== undefined) {
      task.description = taskData.description;
    }

    if (taskData.dueDate !== undefined) {
      task.dueDate = taskData.dueDate;
    }

    if (taskData.status !== undefined) {
      task.status = taskData.status;
    }

    await task.save();

    return {
      message: "Tarefa atualizada com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao atualizar tarefa:", error);
    throw error;
  }
};

const deleteTask = async (taskId, userId) => {
  console.log("taskId:", taskId);
  console.log("userId:", userId);

  try {
    const task = await Task.findOne({ _id: taskId, assignedUser: userId });

    if (!task) {
      return {
        error: "Tarefa não encontrada ou não pertence ao usuário.",
      };
    }

    await task.deleteOne();

    return {
      message: "Tarefa excluída com sucesso.",
    };
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    throw error;
  }
};

const getTasksForNextWeek = async (userId, startDate, endDate) => {
  try {
    const tasks = await Task.find({
      assignedUser: userId,
      dueDate: { $gte: startDate, $lte: endDate },
    });

    return tasks;
  } catch (error) {
    console.error("Erro ao obter tarefas para a próxima semana:", error);
    throw error;
  }
};

module.exports = {
  createTask,
  getTasksByIdUser,
  updateTask,
  deleteTask,
  getTasksByStatus,
  getTasksForNextWeek,
  getTaskById,
};
