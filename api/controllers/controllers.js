const { Web3 } = require('web3');
const { contract } = require('../contract/contract');
const { priorityCheck } = require('../model/tasks');

// Initialize Web3 and get the default account
const web3 = new Web3('http://127.0.0.1:8545');
let accountAddress = null;

// Function to initialize the account
const getAccountAddress = async () => {
    try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
            accountAddress = accounts[0];
            console.log('Account initialized:', accountAddress);
        } else {
            throw new Error('No accounts found');
        }
    } catch (error) {
        console.error('Error initializing account address:', error);
    }
};

// Call the function to initialize the account at startup
getAccountAddress();

// Controllers
const createStudent = async (req, res) => {
    try {
        const studentData = {
            name: req.body.name,
            department: req.body.department,
            marksheet: req.body.marksheet,
            phone: req.body.phone,
            email: req.body.email,
            homeAddress: req.body.homeAddress,
            dob: req.body.dob
        };

        // Send the transaction to add the student
        const result = await contract.methods.addStudent(studentData).send({ from: accountAddress });

        // Extract and convert BigInt values
        const event = result.events.StudentCreated;
        const prn = event ? event.returnValues.prn.toString() : null; // Ensure prn is converted to string

        // Convert the entire result to handle BigInt values
        const resultStringified = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.status(200).json({
            status: 200,
            message: "Student added successfully",
            result: resultStringified,
            prn: prn // Include the prn in the response
        });
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: "Failed to add student",
            error: error.message
        });
    }
};

const updateStudent = async (req, res) => {
    const { prn } = req.params;
    const studentInfo = req.body;

    // Validate PRN
    if (!prn || isNaN(prn)) {
        return res.status(400).json({ status: 400, message: "Invalid PRN" });
    }

    // Validate studentInfo fields
    const requiredFields = ['name', 'department', 'marksheet', 'phone', 'email', 'homeAddress', 'dob'];
    for (const field of requiredFields) {
        if (!studentInfo[field]) {
            return res.status(400).json({ status: 400, message: `Missing ${field}` });
        }
    }

    try {
        // Fetch existing student data to check if the email is being updated
        const existingStudent = await contract.methods.viewStudent(prn).call();
        const currentEmail = existingStudent.email;

        // Check if email is being updated
        if (currentEmail !== studentInfo.email) {
            // Validate new email format
            if (!/\S+@\S+\.\S+/.test(studentInfo.email)) {
                return res.status(400).json({ status: 400, message: "Invalid email format" });
            }
        }

        // Update the student data on the blockchain
        const result = await contract.methods.updateStudent(
            prn,  // uint _prn
            studentInfo // StudentInfo struct
        ).send({ from: accountAddress });

        // Extract and convert BigInt values
        const event = result.events.StudentUpdated;
        const updatedPrn = event ? event.returnValues.prn.toString() : null; // Ensure prn is converted to string

        // Convert the entire result to handle BigInt values
        const resultStringified = JSON.parse(JSON.stringify(result, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        ));

        res.status(200).json({
            status: 200,
            message: "Student updated successfully",
            result: resultStringified,
            prn: updatedPrn // Include the prn in the response
        });
    } catch (error) {
        console.error('Error updating student:', error);
        res.status(500).json({
            status: 500,
            message: "Failed to update student",
            error: error.message
        });
    }
};







const deleteStudent = async (req, res) => {
    const { prn } = req.params;
    try {
        // const isTrue = await priorityCheck(prn);
        // if (isTrue) {
        //     res.status(403).json({ status: 403, message: "Student cannot be deleted" });
        // } else {
            // Estimate gas limit
            const gasEstimate = await contract.methods.deleteStudent(prn).estimateGas({ from: accountAddress });

            // Send the transaction with gas limit
            await contract.methods.deleteStudent(prn).send({ 
                from: accountAddress,
                gas: gasEstimate,  // Set the estimated gas limit
                gasPrice: '20000000000'  // Set the gas price (optional, in Wei)
            });

            res.status(200).json({ status: 200, message: "Student deleted successfully" });
        // }
    } catch (error) {
        console.error('Error in deleteStudent:', error);
        res.status(500).json({ status: 500, message: "Internal Server Error" });
    }
};


const viewStudent = async (req, res) => {
    const { prn } = req.params;
    try {
        const student = await contract.methods.viewStudent(prn).call();
        const { name, department, marksheet, phone, email, homeAddress, dob } = student;
        res.status(200).json({ status: 200, student: { prn: Number(prn), name, department, marksheet, phone, email, homeAddress, dob }, message: "Student exists" });
    } catch (error) {
        res.status(404).json({ status: 404, message: "Student does not exist" });
    }
};

const allStudents = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;
        const startIndex = (page - 1) * pageSize;

        // Fetch total students
        const totalStudents = await contract.methods.studentCount().call();
        if (totalStudents <= 0) {
            res.status(404).json({ status: 404, message: "No students found" });
            return;
        }

        // Fetch students with pagination
        const students = await contract.methods.allStudents().call();

        const studentList = students.map(({ prn, name, department, marksheet, phone, email, homeAddress, dob }) => ({
            prn: Number(prn),
            name,
            department,
            marksheet,
            phone,
            email,
            homeAddress,
            dob
        }));

        res.status(200).json({ status: 200, studentList, message: "Students retrieved successfully" });
    } catch (error) {
        console.log(error);
        if (error.message.includes('Transaction ran out of gas')) {
            res.status(500).json({ status: 500, message: "Transaction ran out of gas" });
        } else {
            res.status(500).json({ status: 500, message: "Internal Server Error" });
        }
    }
};

const getStudentsByDepartment = async (req, res) => {
    const { department } = req.params;

    if (!department) {
        return res.status(400).json({ status: 400, message: "Department is required" });
    }

    try {
        // Fetch students from the contract
        const students = await contract.methods.getStudentsByDepartment(department).call();
        
        const studentsStringified = students.map(student => {
            const studentCopy = { ...student };
            
            for (const key in studentCopy) {
                if (typeof studentCopy[key] === 'bigint') {
                    studentCopy[key] = studentCopy[key].toString();
                }
            }
            
            return studentCopy;
        });

        res.status(200).json({ status: 200, students: studentsStringified, message: "Students retrieved successfully" });
    } catch (error) {
        console.error('Error getting students by department:', error);
        res.status(500).json({ status: 500, message: "Failed to get students by department", error: error.message });
    }
};



const getProfileByEmail = async (req, res) => {
    const { email } = req.params;
    console.log(email)
    const email1= email
    try {
        const student = await contract.methods.viewStudentByEmail(email1).call();
        const { prn, name, department, marksheet, phone, email, homeAddress, dob } = student;
        res.status(200).json({ status: 200, student: { prn: Number(prn), name, department, marksheet, phone, email, homeAddress, dob }, message: "Student profile found" });
    } catch (error) {
        console.log(error)
        res.status(404).json({ status: 404, message: "Student with the given email does not exist" });
    }
};

module.exports = {
    createStudent,
    updateStudent,
    deleteStudent,
    viewStudent,
    allStudents,
    getProfileByEmail,
    getStudentsByDepartment
};
