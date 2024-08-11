const {Web3} = require('web3');
const { contract } = require('../contract/contract');
const {priorityCheck}= require('../model/tasks')

// Initialize Web3 and get accounts
const web3 = new Web3('http://127.0.0.1:8545'); // or the appropriate provider URL
let accountAddress = null;

const getAccountAddress = async () => {
    const accounts = await web3.eth.getAccounts();
    if (accounts.length > 0) {
        accountAddress = accounts[0];
    } else {
        throw new Error('No accounts found');
    }
};

// Call this function once to initialize the account address
getAccountAddress().catch(error => {
    console.error('Error initializing account address:', error);
});

const createStudent = async (req, res) => {
    const { name, department, marksheet, phone } = req.body;
    try {
        // Check for date clash if applicable
        // const task = await dateclashCheck(taskDate);
        // if (task !== "No Task Found") {
        //     res.status(409).json({ status: 409, message: "Date clash: Task cannot be added" });
        // } else {
            await contract.methods.addStudent(name, department, marksheet, phone).send({ from: accountAddress });
            res.status(200).json({ status: 200, message: "Student added successfully" });
        // }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const updateStudent = async (req, res) => {
    const { prn, name, department, marksheet, phone } = req.body;
    try {
        // Check for date clash if applicable
        // const task = await dateclashCheck(newDate);
        // if (task !== "No Task Found") {
        //     res.status(409).json({ status: 409, message: "Date clash: Task cannot be updated" });
        // } else {
            await contract.methods.updateStudent(prn, name, department, marksheet, phone).send({ from: accountAddress });
            res.status(200).json({ status: 200, message: "Student updated successfully" });
        // }
    } catch (error) {
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const deleteStudent = async (req, res) => {
    const { prn } = req.params;
    try {
        const isTrue = await priorityCheck(prn);
        if (isTrue) {
            res.status(403).json({ status: 403, message: "Student cannot be deleted" });
        } else {
            await contract.methods.deleteStudent(prn).send({ from: accountAddress });
            res.status(200).json({ status: 200, message: "Student deleted successfully" });
        }
    } catch (error) {
        console.error('Error in deleteStudent:', error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

const viewStudent = async (req, res) => {
    const { prn } = req.params;
    try {
        const student = await contract.methods.viewStudent(prn).call();
        const { prn, name, department, marksheet, phone } = student;
        res.status(200).json({ status: 200, student: { prn: Number(prn), name, department, marksheet, phone }, message: "Student exists" });
    } catch (error) {
        res.status(404).json({ status: 404, message: "Student does not exist" });
    }
};

const allStudents = async (req, res) => {
    try {
        const students = await contract.methods.allStudents().call();
        if (students.length === 0) {
            res.status(404).json({ status: 404, message: "No students found" });
        } else {
            const studentList = students.map(({ prn, name, department, marksheet, phone }) => ({
                prn: Number(prn),
                name,
                department,
                marksheet,
                phone
            }));
            res.status(200).json({ status: 200, studentList, message: "Students retrieved successfully" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};

module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    viewStudent,
    allStudents
};
