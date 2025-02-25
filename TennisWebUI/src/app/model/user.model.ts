export class User {
    id: string | undefined;
    email: string | undefined;
    constructor(email: string) {
        this.email = email;
        let id = Math.random() * 100;
        this.id = Math.floor(id).toString();
    }
}
