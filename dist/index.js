"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class School {
    directions = [];
    addDirection(direction) {
        this.directions.push(direction);
    }
}
class Direction {
    _name;
    levels = [];
    constructor(name) {
        this._name = name;
    }
    get name() {
        return this._name;
    }
    addLevel(level) {
        this.levels.push(level);
    }
}
class Level {
    _name;
    _program;
    groups = [];
    constructor(name, program) {
        this._name = name;
        this._program = program;
    }
    get name() {
        return this._name;
    }
    get program() {
        return this._program;
    }
    addGroup(group) {
        this.groups.push(group);
    }
}
class Group {
    directionName;
    levelName;
    _students = [];
    constructor(directionName, levelName) {
        this.directionName = directionName;
        this.levelName = levelName;
    }
    get students() {
        return this._students;
    }
    addStudent(student) {
        this._students.push(student);
    }
    showPerformance() {
        // let sortedStudents: any = this.students.toSorted(
        //     (a: any, b: any) => b.getPerformanceRating() - a.getPerformanceRating()
        // ); //версія TS-5.0 не бачить метод .toSorted
        const sortedStudents = [...this.students].sort((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
        return sortedStudents;
    }
}
class Student {
    firstName;
    lastName;
    birthYear;
    grades = {};
    attendance = [];
    constructor(firstName, lastName, birthYear) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthYear = birthYear;
    }
    get fullName() {
        return `${this.lastName} ${this.firstName}`;
    }
    set fullName(value) {
        [this.lastName, this.firstName] = value.split(" ");
    }
    get age() {
        return new Date().getFullYear() - this.birthYear;
    }
    setGrade(subject, grade) {
        this.grades[subject] = grade;
    }
    markAttendance(present) {
        this.attendance.push(present);
    }
    getPerformanceRating() {
        const gradeValues = Object.values(this.grades);
        if (gradeValues.length === 0)
            return 0;
        const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage = (this.attendance.filter((present) => present).length /
            this.attendance.length) *
            100;
        return (averageGrade + attendancePercentage) / 2;
    }
}
