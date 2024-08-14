import { useState } from "react";
import Navigation from "../components/Navigation";

const UpdateStudent = ({ state }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const closeModal = () => {
        setModalVisible(false);
        setModalContent("");
    };

    const { contract, account } = state;

    const updateStudent = async (event) => {
        event.preventDefault();
        const prn = document.querySelector("#studentPRN").value;
        const name = document.querySelector("#studentName").value;
        const department = document.querySelector("#studentDepartment").value;
        const marksheet = document.querySelector("#studentMarksheet").value;
        const phone = document.querySelector("#studentPhone").value;

        try {
            // Optional: API call for additional backend checks
            const res = await fetch(
                "http://localhost:3000/api/ethereum/update-student",
                {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({ prn })
                }
            );

            const data = await res.json();
            if (data.status === 200) {
                if (contract && contract.methods) {
                    await contract.methods.updateStudent(prn, name, department, marksheet, phone).send({ from: account });
                    setModalContent(
                        `Student with PRN ${prn} updated successfully with name ${name}, department ${department}, marksheet ${marksheet}, and phone ${phone}`
                    );
                    setModalVisible(true);
                }
            } else {
                throw new Error("Student cannot be updated due to backend checks");
            }

        } catch (error) {
            setModalContent("Student cannot be updated");
            setModalVisible(true);
        }
    }

    return (
        <>
            <Navigation />
            <div className="update_student todo_btn">
                <form onSubmit={updateStudent}>
                    <label>
                        PRN:
                        <input id="studentPRN" />
                    </label>
                    <label>
                        Name:
                        <input id="studentName" />
                    </label>
                    <label>
                        Department:
                        <input id="studentDepartment" />
                    </label>
                    <label>
                        Marksheet:
                        <input id="studentMarksheet" />
                    </label>
                    <label>
                        Phone:
                        <input id="studentPhone" type="text" />
                    </label>
                    <button type="submit">Update Student</button>
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
}

export default UpdateStudent;
