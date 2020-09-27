export class GameObject {
    private health: number;
    private speed: number;

    constructor(health: number, speed: number) {
        this.health = health;
        this.speed = speed;
    }

    public getHealth(): number {
        return this.health;
    }

    public getSpeed(): number {
        return this.speed
    }

    public setHealth(health): void {
        this.health = health;
    }

    public setSpeed(speed): void {
        this.speed = speed;
    }
}