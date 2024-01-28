//This is a simple dAPP intracts with deployed ethereum blockchain
import { Web3 } from "web3";
import Tx from "ethereumjs-tx";

//declaring the credentials
const infura_key = process.env["INFURA_KEY"];
const web3 = new Web3("wss://ropsten.infura.io/ws/v3/" + infura_key);
const account = process.env["ACCOUNT_ADDRESS"];
const private_key = process.env["PRIVATE_KEY"];
const private_key_buffer = Buffer.from(private_key, "hex");
const contract_address = process.env["CONTRACT_ADDRESS"];
const abi = process.env["CONTRACT_ABI"];
const contract = new web3.eth.Contract(abi, contract_address); // Instantiating smart contract

async function signTransaction(activity) {
  if (account) {
    await web3.eth.getTransactionCount(account, (err: any, count: any) => {
      web3.eth.getGasPrice(function (e: any, r: any) {
        const txObject = {
          nonce: web3.utils.toHex(count),
          to: contract_address,
          value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
          gasLimit: web3.utils.toHex(2100000),
          gasPrice: web3.utils.toHex(r),
          data: activity,
        };
        const transactionObject = new Tx(txObject, { chain: "ropsten" });
        transactionObject.sign(private_key_buffer);
        const serializedTx = transactionObject.serialize();
        web3.eth
          .sendSignedTransaction("0x" + serializedTx.toString("hex"))
          .on("receipt", (receipt) => {
            console.log(receipt);
          });
      });
    });
  }
}

function createStudent(studentName, studentClass) {

    const activityCreate = contract.methods.create(studentName,studentClass).encodeABI();
    signTransaction(activityCreate);
}


function readStudent(studentRollNo) {
    contract.methods.view(studentRollNo).call().then(function(result) {
        console.log(result);
      });
}

function updateStudent(studentRollNo,studentName, studentClass) {

    const activityUpdate = contract.methods.update(studentRollNo,studentName,studentClass).encodeABI();
    signTransaction(activityUpdate);
}
function deleteStudent(studentRollNo)
{
    const activityDelete = contract.methods.delete(studentRollNo).encodeABI();
    signTransaction(activityDelete);
}



// createStudent('cm','First Year');
//readStudent(0);
//updateStudent(0,'cm','Second Year')
//deleteStudent(0);



