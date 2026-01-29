enum GroupStatus {
    Pending = 'pending',
    Active = 'active',
    Finished = 'finished',
}

type Lecturer = {
    name: string;
    surname: string;
    position: string;
    company: string;
    experience: number;
    courses: string[];
    contacts: string[];
};

class School {
    _areas: Area[] = [];
    _lecturers: Lecturer[] = [];

    get areas(): Area[] {
        return this._areas;
    }

    get lecturers(): Lecturer[] {
        return this._lecturers;
    }

    addArea(area: Area): void {
        this._areas.push(area);
    }

    removeArea(name: string): void {
        this._areas = this._areas.filter(area => area.name !== name);
    }

    addLecturer(lecturer: Lecturer): void {
        this._lecturers.push(lecturer);
    }

    removeLecturer(surname: string): void {
        this._lecturers = this._lecturers.filter(l => l.surname !== surname);
    }
}

class Area {
    _levels: Level[] = [];
    _name: string;

    constructor(name: string) {
        this._name = name;
    }

    get name(): string {
        return this._name;
    }

    get levels(): Level[] {
        return this._levels;
    }

    addLevel(level: Level): void {
        this._levels.push(level);
    }

    removeLevel(name: string): void {
        this._levels = this._levels.filter(level => level.name !== name);
    }
}

class Level {
    _groups: Group[] = [];
    _name: string;
    _description: string;

    constructor(name: string, description: string) {
        this._name = name;
        this._description = description;
    }

    get name(): string {
        return this._name;
    }

    get description(): string {
        return this._description;
    }

    get groups(): Group[] {
        return this._groups;
    }

    addGroup(group: Group): void {
        this._groups.push(group);
    }

    removeGroup(name: string): void {
        this._groups = this._groups.filter(group => group.name !== name);
    }
}

class Group {
    _status: GroupStatus = GroupStatus.Pending;
    _students: Student[] = [];

    name: string;
    levelName: string;

    constructor(name: string, levelName: string) {
        this.name = name;
        this.levelName = levelName;
    }

    get students(): Student[] {
        return this._students;
    }

    get status(): GroupStatus {
        return this._status;
    }

    setStatus(status: GroupStatus): void {
        this._status = status;
    }

    addStudent(student: Student): void {
        this._students.push(student);
    }

    removeStudent(fullName: string): void {
        this._students = this._students.filter(
            student => student.fullName !== fullName
        );
    }

    showPerformance(): Student[] {
        return [...this._students].sort(
            (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
        );
    }
}

class Student {
    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: Record<string, number> = {};
    _visits: boolean[] = [];

    constructor(firstName: string, lastName: string, birthYear: number) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
    }

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        [this._lastName, this._firstName] = value.split(' ');
    }

    get age(): number {
        return new Date().getFullYear() - this._birthYear;
    }

    setGrade(workName: string, mark: number): void {
        this._grades[workName] = mark;
    }

    setVisit(present: boolean): void {
        this._visits.push(present);
    }

    getPerformanceRating(): number {
        const gradeValues = Object.values(this._grades);
        if (!gradeValues.length || !this._visits.length) return 0;

        const averageGrade =
            gradeValues.reduce((sum, grade) => sum + grade, 0) /
            gradeValues.length;

        const attendance =
            (this._visits.filter(Boolean).length / this._visits.length) * 100;

        return (averageGrade + attendance) / 2;
    }
}
