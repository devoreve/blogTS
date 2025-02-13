export default class PostContent {
    constructor(private readonly value: string) {
        if (!value || value.length < 3) {
            throw new Error("L'article doit faire au-moins 3 caractères.");
        }
    }

    get content(): string {
        return this.value;
    }
}