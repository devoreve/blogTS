export default class User {
    constructor(
        public id: number,
        public email: string,
        public password: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}

}