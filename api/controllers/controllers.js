const { dateclashCheck, priorityCheck } = require('../model/tasks');
const { contract } = require('../contract/contract');

const createTask = async (req, res) => {
    const { taskDate } = req.body;
    try {
        const task = await dateclashCheck(taskDate);
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash: Task cannot be added" });
        } else {
            // Logic to create task
            // Ensure to handle account address and transaction details properly
            res.status(200).json({ status: 200, message: "Task can be added" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const updateTask = async (req, res) => {
    const { taskId, newName, newDate } = req.body;
    try {
        const task = await dateclashCheck(newDate);
        if (task !== "No Task Found") {
            res.status(409).json({ status: 409, message: "Date clash: Task cannot be updated" });
        } else {
            await contract.methods.updateTask(taskId, newName, newDate).send({ from: 'yourAccount' });
            res.status(200).json({ status: 200, message: "Task updated successfully" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const deleteTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const isTrue = await priorityCheck(taskId);
        if (isTrue) {
            res.status(403).json({ status: 403, message: "Task cannot be deleted" });
        } else {
            await contract.methods.deleteTask(taskId).send({ from: 'yourAccount' });
            res.status(200).json({ status: 200, message: "Task deleted successfully" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const viewTask = async (req, res) => {
    const { taskId } = req.params;
    try {
        const task = await contract.methods.viewTask(taskId).call();
        const { id, name, date } = task;
        res.status(200).json({ status: 200, task: { id: Number(id), name, date }, message: "Task exists" });
    } catch (error) {
        res.status(404).json({ status: 404, message: "Task does not exist" });
    }
};

const allTasks = async (req, res) => {
    try {
        const tasks = await contract.methods.allTask().call();
        if (tasks.length === 0) {
            res.status(404).json({ status: 404, message: "No tasks found" });
        } else {
            const taskList = tasks.map(({ id, name, date }) => ({
                taskId: Number(id),
                name,
                date
            }));
            res.status(200).json({ status: 200, taskList, message: "Tasks retrieved successfully" });
        }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

module.exports = {
    createTask,
    updateTask,
    deleteTask,
    viewTask,
    allTasks
};