export class Assignment {
    constructor(
        public name: string,
        public course: string,
        public date: Date,
        public description?: string
    ) {}
}

export class User {
    constructor(
        public id: number,
        public first_name?: string,
        public last_name?: string,
        public email?: string,
        public rental?: Rentable[],
    ) {}
}

export class Course {

    constructor(
        public id: number,
        public name: string,
        public prof: User,
        public desc: string,
        public start_date: Date,
        public end_date: Date,
        public students: User[],
        public requirements?: string,
        public assignments?: Assignment[],
    ) {}
}

export class Rentable {

    constructor(
        public id: number,
        public type: string,
        public name: string,
        public desc: string,
        public price: number,
        public quantity?: number,
        public start_date?: Date,
        public end_date?: Date,
    ) {}
    
}