const { contract } = require('../contract/contract');

const dateclashCheck = async (name) => {
    try {
        const students = await contract.methods.allStudents().call();
        console.log(students);
        
        // Check if a student with the given name exists
        const foundStudent = students.find(student => student.name === name);
        return foundStudent || "No Student Found";
    } catch (error) {
        console.error('Error in dateclashCheck:', error);
        throw error;
    }
};

const priorityCheck = async (prn) => {
    try {
        const students = await contract.methods.allStudents().call();
        
        // Check if the student with the given PRN has a name containing "priority"
        const student = students.find(student => student.prn === prn);
        if (student) {
            const result = student.name.includes("priority");
            return result;
        } else {
            return false; // Student not found
        }
    } catch (error) {
        console.error('Error in priorityCheck:', error);
        throw error;
    }
};

module.exports = { dateclashCheck, priorityCheck };
