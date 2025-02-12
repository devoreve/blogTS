export default class PostDTO {
    constructor(
        public id: number | null,
        public title: string,
        public content: string,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}