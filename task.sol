// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StudentRecords {

    struct Student {
        uint prn;
        string name;
        string department;
        string marksheet;
        string phone;
    }

    address owner;
    mapping(uint => Student) students; // PRN => Student
    uint public studentCount = 0;
    event StudentCreated(uint prn, string name, string department);
    event StudentUpdated(uint prn, string name, string department);
    event StudentDeleted(uint prn);

    modifier checkPrn(uint prn) {
        require(prn != 0 && prn <= studentCount, "Invalid PRN");
        _;
    }
    modifier onlyOwner() {
        require(msg.sender == owner, "Invalid Owner");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function addStudent(string calldata _name, string calldata _department, string calldata _marksheet, string calldata _phone) public {
        studentCount++;
        students[studentCount] = Student(studentCount, _name, _department, _marksheet, _phone);
        emit StudentCreated(studentCount, _name, _department);
    }

    function updateStudent(uint _prn, string calldata _name, string calldata _department, string calldata _marksheet, string calldata _phone) checkPrn(_prn) public {
        students[_prn] = Student(_prn, _name, _department, _marksheet, _phone);
        emit StudentUpdated(_prn, _name, _department);
    }

    function viewStudent(uint _prn) checkPrn(_prn) public view returns(Student memory) {
        return students[_prn];
    }

    function allStudents() public view returns(Student[] memory) {
        Student[] memory studentList = new Student[](studentCount);
        for (uint i = 0; i < studentCount; i++) {
            studentList[i] = students[i + 1];
        }
        return studentList;
    }

    function deleteStudent(uint _prn) checkPrn(_prn) public {
        delete students[_prn];
        emit StudentDeleted(_prn);
    }
}
