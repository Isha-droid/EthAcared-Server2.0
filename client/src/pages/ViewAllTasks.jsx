import { useState, useEffect } from "react";
import Navigation from "../components/Navigation";

const ViewAllStudents = () => {
    const [studentList, setStudentList] = useState([]);

    useEffect(() => {
        const fetchAllStudents = async () => {
            try {
                const res = await fetch("http://localhost:3000/api/ethereum/view-all-students", {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                });
                const data = await res.json();
                if (data.status === 200) {
                    console.log(data.studentList);
                    setStudentList(data.studentList);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchAllStudents();
    }, []);

    return (
        <>
            <Navigation />
            <div className="view_all_students">
                {studentList.map((student) => {
                    return (
                        <div 
                            className="view_all_students_card"
                            key={student.prn}
                            style={student.prn !== "" && student.name !== "" && student.department !== "" ? {} : { display: "none" }}
                        >   
                            <p>PRN: {student.prn}</p>
                            <p>Name: {student.name}</p>
                            <p>Department: {student.department}</p>
                            <p>Marksheet: {student.marksheet}</p>
                            <p>Phone: {student.phone}</p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ViewAllStudents;
