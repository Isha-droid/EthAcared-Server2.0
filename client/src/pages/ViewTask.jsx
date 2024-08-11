import { useState } from "react";
import Navigation from "../components/Navigation";
import "./ViewStudent.css"

const ViewStudent = () => {
    const [student, setStudent] = useState({
        prn: null,
        name: null,
        department: null,
        marksheet: null,
        phone: null
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const viewStudent = async (event) => {
        event.preventDefault();
        const prn = document.querySelector("#prn").value;

        try {
            const res = await fetch(`http://localhost:3000/api/ethereum/view-student/${prn}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json"
                }
            });

            if (res.ok) {
                const data = await res.json();
                if (data.status === 200 && data.student) {
                    setStudent(data.student);
                } else {
                    throw new Error("Student not found");
                }
            } else {
                throw new Error("Network response was not ok");
            }
        } catch (error) {
            setModalContent(error.message);
            setModalVisible(true);
        }
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalContent("");
    };

    return (
        <>
            <Navigation />
            <div className="view_student todo_btn">
                {student.prn !== null && student.name !== null && student.department !== null ? (
                    <div className="view_student_by_prn view_all_students_card">
                        <p>PRN: {student.prn}</p>
                        <p>Name: {student.name}</p>
                        <p>Department: {student.department}</p>
                        <p>Marksheet: {student.marksheet}</p>
                        <p>Phone: {student.phone}</p>
                    </div>
                ) : (
                    <div className="empty_div"></div>
                )}
                <form onSubmit={viewStudent}>
                    <label>
                        PRN:
                        <input id="prn" />
                    </label>
                    <button type="submit">View Student</button>
                </form>
                {modalVisible && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={closeModal}>
                                &times;
                            </span>
                            <p>{modalContent}</p>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewStudent;
