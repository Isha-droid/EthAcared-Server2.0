const { contract } = require('../contract/contract');

const dateclashCheck = async (taskDate) => {
    try {
        const tasks = await contract.methods.allStudents().call();

        console.log(tasks)
        const foundTask = tasks.find(task => task.date === taskDate);
        return foundTask || "No Task Found";
    } catch (error) {
        console.error('Error in dateclashCheck:', error);
        throw error;
    }
};

const priorityCheck = async (id) => {
    try {
        const tasks = await contract.methods.allStudents().call();
        const result = tasks[id - 1].name.includes("priority");
        return result;
    } catch (error) {
        console.error('Error in priorityCheck:', error);
        throw error;
    }
};

module.exports = { dateclashCheck, priorityCheck };
