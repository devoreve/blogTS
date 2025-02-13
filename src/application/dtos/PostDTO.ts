export default class PostDTO {
    constructor(
        readonly id: number | null,
        readonly title: string,
        readonly content: string,
        readonly createdAt: Date
    ) {}
}