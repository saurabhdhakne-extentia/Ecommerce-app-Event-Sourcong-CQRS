export class AddUserCommand {
    constructor(
        public readonly fname: string,
        public readonly email: string,
        public readonly contact: string
    ) {
    }
}
