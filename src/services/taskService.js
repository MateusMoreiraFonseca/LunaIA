const Task = require("../models/taskModel");
const dotenv = require("dotenv");

dotenv.config();

const createTask = async (taskData) => {
  try {
    const newTask = new Task(taskData);
    await newTask.save();

    return {
      newTask,
    };
  } catch (error) {
    console.error("Erro ao criar tarefa:", error);
    throw error;
  }
};

const getTasksByIdUser = async (userId) => {
  try {
    const findedTasks = await Task.find({ assignedUser: userId });
    return findedTasks;
  } catch (error) {
    console.error("Erro ao obter tarefas do usuário:", error);
    throw error;
  }
};

const getTasksByStatus = async (status, userId) => {
  try {
    const findedTasks = await Task.find({
      status: status,
      assignedUser: userId,
    });
    return findedTasks;
  } catch (error) {
    console.error("Erro ao obter tarefas pelo status:", error);
    throw error;
  }
};

const getTaskById = async (taskId) => {
  try {
    const findedTask = await Task.findById(taskId);

    if (!findedTask) {
      return {
        error: "Tarefa não encontrada.",
      };
    }

    return findedTask;
  } catch (error) {
    console.error("Erro ao obter tarefa pelo ID:", error);
    throw error;
  }
};

const updateTask = async (taskId, taskData, userId) => {
  try {
    const updatedTask = await Task.findOne({
      _id: taskId,
      assignedUser: userId,
    });

    if (!updatedTask) {
      return {
        error: "Tarefa não encontrada ou não pertence ao usuário.",
      };
    }

    if (taskData.title !== undefined) {
      updatedTask.title = taskData.title;
    }

    if (taskData.description !== undefined) {
      updatedTask.description = taskData.description;
    }

    if (taskData.dueDate !== undefined) {
      updatedTask.dueDate = taskData.dueDate;
    }

    if (taskData.status !== undefined) {
      updatedTask.status = taskData.status;
    }

    await updatedTask.save();

    return {
      updatedTask,
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

    const deletedTask = await task.deleteOne();

    return {
      deletedTask,
    };
  } catch (error) {
    console.error("Erro ao excluir tarefa:", error);
    throw error;
  }
};

const getTasksForNextWeek = async (userId, startDate, endDate) => {
  try {
    const fidedTasks = await Task.find({
      assignedUser: userId,
      dueDate: { $gte: startDate, $lte: endDate },
    });

    return fidedTasks;
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
