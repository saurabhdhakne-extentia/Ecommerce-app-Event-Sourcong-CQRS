export class UserAddedEvent {
    constructor(
        public readonly id: string,
        public readonly fname: string,
        public readonly email: string,
        public readonly contact: string,
    ) {
    }
}
