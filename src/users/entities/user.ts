import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryColumn('uuid')
    id: string;

    @Column('varchar')
    fname: string;

    @Column('varchar')
    email: string;

    @Column('varchar')
    contact: string;

    constructor(
        id: string,
        fname: string,
        email: string,
        contact: string
    ) {
        this.id = id;
        this.fname = fname;
        this.email = email;
        this.contact = contact;
    }

    updateFname(newName: string) {
        this.fname += newName;
    }

    updateContact(newContact: string) {
        this.contact += newContact;
    }

}