export class Assignment {
    constructor(
        public name: string,
        public course: string,
        public date: Date
    ) {}
}

export class Course {

    constructor(
        public id: number,
        public name: string,
        public professor: string,
        public desc: string,
        public start_date: Date,
        public end_date: Date,
        public enrolled: boolean,
        public requirements?: string,
        public assignments?: Assignment[]
    ) {}

}