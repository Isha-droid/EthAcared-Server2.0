import PropTypes from 'prop-types';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import ABI from "./ABI.json";

const Wallet = ({ saveState }) => {
    const navigateTo = useNavigate();

    const connectWallet = async () => {
        try {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts"
                });

                const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                const contract = new web3.eth.Contract(ABI, contractAddress);

                saveState({ web3, contract, account: accounts[0] });
                navigateTo("/view-all-tasks");
            } else {
                alert("MetaMask is not installed. Please install MetaMask and try again.");
            }
        } catch (error) {
            console.error("Failed to connect wallet:", error);
            alert(`Failed to connect wallet: ${error.message}`);
        }
    };

    return (
        <>
            <div className="wallet_header">
                <span>WELCOME TO</span> <p>TODO 3.0</p>
            </div>
            <div className="connect_wallet_section todo_btn">
                <p>Please connect your MetaMask wallet to access the app</p>
                <button onClick={connectWallet}>Connect Wallet</button>
            </div>
        </>
    );
}

Wallet.propTypes = {
    saveState: PropTypes.func.isRequired,
};

export default Wallet;
