export default class Post {
    constructor(
        private _id: number | null,
        private _title: string,
        private _content: string,
        private _userId: number,
        private _createdAt: Date,
        private _updatedAt: Date
    ) {
        this.title = _title;
        this.content = _content;
    }

    static validateTitle(title: string): void {
        if (!title || title.length < 3) {
            throw new Error("Le titre doit faire au-moins 3 caractères");
        }
    }

    static validateContent(content: string): void {
        if (!content || content.length < 3) {
            throw new Error("L'article doit faire au-moins 3 caractères");
        }
    }

    get id(): number | null {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        Post.validateTitle(value);
        this._title = value;
    }

    get content(): string {
        return this._content;
    }

    set content(value: string) {
        Post.validateContent(value);
        this._content = value;
    }

    get userId(): number {
        return this._userId;
    }

    set userId(value: number) {
        this._userId = value;
    }

    get createdAt(): Date {
        return this._createdAt;
    }

    set createdAt(value: Date) {
        this._createdAt = value;
    }

    get updatedAt(): Date {
        return this._updatedAt;
    }

    set updatedAt(value: Date) {
        this._updatedAt = value;
    }
}