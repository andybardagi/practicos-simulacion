import { Customer } from "./Customer";

export class Worker {
    private id: number;
    private currentClient?: Customer = undefined;

    constructor(id: number) {
        this.id = id;
    }

    public getId(): number {
        return this.id;
    }

    public isVacant(): boolean {
        return this.currentClient == null;
    }

    public getCurrentClient(): Customer | undefined {
        return this.currentClient;
    }

    public assignClient(client: Customer, clock: number): number {
        this.currentClient = client;
        this.currentClient.setAtentionTime(clock);
        return (Math.random() + 0,5) * 60;
    }

    public exitClient(clock: number): Customer {
        const client = this.currentClient;
        this.currentClient = undefined;
        if (client == null) {
            throw new Error('There is no current client.');
        }
        client.setExitTime(clock);
        return client;
    }
}

