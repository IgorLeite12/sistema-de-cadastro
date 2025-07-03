import { v4 as uuid } from 'uuid';

export class Client {
    id?: string;
    name?: string;
    email?: string;
    birthdate?: string;
    cpf?: string;
    deleting: boolean = false;
    uf?: string;
    cidade?: string;

    static newClient() {
        const client = new Client();
        client.id = uuid();
        return client;
    }
}