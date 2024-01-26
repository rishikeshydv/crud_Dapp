pragma solidity >=0.5.0 <0.6.0;

contract StudentInfo {

//defining types
interface Student {
uint rollNo
string name
uint class
};
uint public nextRollNo;
Student[] public studentList;

function create(string memory _name, uint memory _class) public{
    studentList.push(Student(nextRollNo,{_name,_class}));
    nextRollNo++;
}

function update(uint memory _roll, string memory _name, uint memory _class) public{
    if (studentList[_roll]){
        studentList[_roll].name = _name;
        studentList[_roll].class = _class;
    }
}

function view(uint memory _roll) public returns(uint, string memory, uint memory){
    if studentList[_roll]{
        return (studentList[_roll].roll,studentList[_roll].name,studentList[_roll].class);
    }
    else {
        revert("Student Not Found");
    }
}

function delete(uint memory _roll) public {
    if studentList[_roll]{
        delete studentList[_roll];
    }
}
}