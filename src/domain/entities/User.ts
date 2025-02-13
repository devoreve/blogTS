import Email from "../valueObjects/Email";
import Password from "../valueObjects/Password";

export default class User {
    readonly _id: number;
    private _email: Email;
    private _password: Password;
    private _createdAt: Date;
    private _updatedAt: Date;

    constructor(
        id: number,
        email: string,
        password: string,
        createdAt: Date = new Date(),
        updatedAt: Date = new Date()
    ) {
        this._id = id;
        this._email = new Email(email);
        this._password = new Password(password);
        this._createdAt = createdAt;
        this._updatedAt = updatedAt;
    }

    get id(): number {
        return this._id;
    }

    get email(): string {
        return this._email.email;
    }

    set email(value: string) {
        this._email = new Email(value);
    }

    get password(): string {
        return this._password.password;
    }

    set password(value: string) {
        this._password = new Password(value);
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