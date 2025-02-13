import PostTitle from "../valueObjects/PostTitle";
import PostContent from "../valueObjects/PostContent";

export default class Post {
    readonly _id: number;
    private _title: PostTitle;
    private _content: PostContent;
    private _userId: number;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(
        id: number,
        title: string,
        content: string,
        userId: number,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this._id = id;
        this._title = new PostTitle(title);
        this._content = new PostContent(content);
        this._userId = userId;
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    get id(): number {
        return this._id;
    }

    get title(): string {
        return this._title.title;
    }

    set title(value: string) {
        this._title = new PostTitle(value);
    }

    get content(): string {
        return this._content.content;
    }

    set content(value: string) {
        this._content = new PostContent(value);
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