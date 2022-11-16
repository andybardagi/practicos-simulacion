import { Client } from './Client';

export class Employee {
    private id: number;
    private currentClient?: Client = undefined;

    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public isFree(): boolean {
        return this.currentClient == null;
    }

    public getCurrentClient(): Client | undefined {
        return this.currentClient;
    }

    public assignClient(client: Client, clock: number): number {
        this.currentClient = client;
        this.currentClient.setAtentionTime(clock);
        // Each employee takes between 0,5 and 1,5 minutes to attend a client
        return (Math.random() + 0.5) * 60;
    }

    public exitClient(clock: number): Client {
        const client = this.currentClient;
        this.currentClient = undefined;
        if (client == null) {
            throw new Error('Client is null. Calling exit client while not needed.');
        }
        client.setExitTime(clock);
        return client;
    }
}
