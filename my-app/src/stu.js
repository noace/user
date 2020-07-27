let students = [{
    name: 'Irene',
    age: 10,
    title: 'dev',
    local: 'China'
}, {
    name: 'Ada',
    age: 9,
    title: 'dev',
    local: 'China'
}, {
    name: 'Mia',
    age: 7,
    title: 'dev',
    local: 'China'
}, {
    name: 'Sage',
    age: 7,
    title: 'dev',
    local: 'China'
}];

let stu = students.filter((student) => {
    if(student.name.includes('a') && student.age<10){
        return student;
    }
});
console.log(stu);

let stu2 = students.filter((student) => {
    if(student.name.startsWith('a') || student.name[2] == 'a' ){
        return student;
    }
});
console.log(stu2);


function age(){
    students.map((student) => {
        if(student.age > 8 ){
            console.log('true');
        }else{
            console.log('false');
        }
    });
}

age();

function print(){
    let s = new Set();
    students.map((student) => {
        s.add(student.age)
    });
    console.log(s);
}
print();