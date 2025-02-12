export default class Post {
    constructor(
        public id: number | null,
        public title: string,
        public content: string,
        public userId: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}