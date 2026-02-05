enum GroupStatus {
    Pending = 'pending',
    Active = 'active',
    Finished = 'finished',
}

type AreaName = 'ux' | 'development' | 'qa';
type LevelName = 'junior' | 'middle' | 'senior';

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
    private _areas: Area[] = [];
    private _lecturers: Lecturer[] = [];

    get areas(): Area[] {
        return this._areas;
    }

    get lecturers(): Lecturer[] {
        return this._lecturers;
    }

    addArea(area: Area): void {
        this._areas.push(area);
    }

    removeArea(name: AreaName): void {
        this._areas = this._areas.filter(area => area.name !== name);
    }

    addLecturer(lecturer: Lecturer): void {
        this._lecturers.push(lecturer);
    }

    removeLecturer(surname: string): void {
        this._lecturers = this._lecturers.filter(
            lecturer => lecturer.surname !== surname
        );
    }
}

class Area {
    private _levels: Level[] = [];

    constructor(private _name: AreaName) {}

    get name(): AreaName {
        return this._name;
    }

    get levels(): Level[] {
        return this._levels;
    }

    addLevel(level: Level): void {
        this._levels.push(level);
    }

    removeLevel(name: LevelName): void {
        this._levels = this._levels.filter(level => level.name !== name);
    }
}

class Level {
    private _groups: Group[] = [];

    constructor(
        private _name: LevelName,
        private _description: string
    ) {}

    get name(): LevelName {
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

    removeGroup(groupName: string): void {
        this._groups = this._groups.filter(group => group.name !== groupName);
    }
}

class Group {
    private _status: GroupStatus = GroupStatus.Pending;
    private _students: Student[] = [];

    constructor(
        private _name: string,
        private _level: Level,
        private _area: Area
    ) {}

    get name(): string {
        return this._name;
    }

    get level(): Level {
        return this._level;
    }

    get area(): Area {
        return this._area;
    }

    get status(): GroupStatus {
        return this._status;
    }

    get students(): Student[] {
        return this._students;
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
    private _grades: Record<string, number> = {};
    private _visits: boolean[] = [];

    constructor(
        private _firstName: string,
        private _lastName: string,
        private _birthYear: number
    ) {}

    get fullName(): string {
        return `${this._lastName} ${this._firstName}`;
    }

    set fullName(value: string) {
        const [lastName, firstName] = value.split(' ');
        this._lastName = lastName;
        this._firstName = firstName;
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
