import { useState } from "react";
import Navigation from "../components/Navigation";

const CreateStudent = ({ state }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState("");

    const closeModal = () => {
        setModalOpen(false);
        setModalContent("");
    };

    const createStudent = async (event) => {
        event.preventDefault();
        const { contract, account } = state;
        const name = document.querySelector("#studentName").value;
        const department = document.querySelector("#studentDepartment").value;
        const marksheet = document.querySelector("#studentMarksheet").value;
        const phone = document.querySelector("#studentPhone").value;

        try {
            // Check if all fields are provided
            if (!name || !department || !marksheet || !phone) {
                throw new Error("All fields are required");
            }

            // Interact with the smart contract
            if (contract && contract.methods) {
                await contract.methods
                    .addStudent(name, department, marksheet, phone)
                    .send({ from: account });
                setModalContent(`Student ${name} added successfully`);
            } else {
                throw new Error("Contract is not available");
            }

        } catch (error) {
            setModalContent(`Failed to add student: ${error.message}`);
        } finally {
            setModalOpen(true);
        }
    };

    return (
        <>
            <Navigation />
            <div className="create_student">
                <form onSubmit={createStudent}>
                    <label>
                        Name:
                        <input id="studentName" required />
                    </label>
                    <label>
                        Department:
                        <input id="studentDepartment" required />
                    </label>
                    <label>
                        Marksheet:
                        <input id="studentMarksheet" required />
                    </label>
                    <label>
                        Phone:
                        <input id="studentPhone" type="text" required />
                    </label>
                    <button type="submit">Create Student</button>
                </form>

                {modalOpen && (
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

export default CreateStudent;
