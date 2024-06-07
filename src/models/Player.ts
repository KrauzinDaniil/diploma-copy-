class Player {
    private name: string;
    private age: number;
    private position: number;
    private iconColor: string;
    private avatar: string; 

    constructor(name: string, age: number, position: number, iconColor: string, avatar: string) {
        this.name = name;
        this.age = age;
        this.position = position;
        this.iconColor = iconColor;
        this.avatar = avatar;
    }

    public getName(): string {
        return this.name;
    }

    public getAge(): number {
        return this.age;
    }

    public getAvatar(): string {
        return this.avatar;
    }

    public getPosition(): number {
        return this.position;
    }
    public setPosition(position: number): void { 
        this.position = position
    } 
    public setAge(age: number): void { 
        this.age = age
    } 
    public increasePosition(): void {
        this.position++;
    }
    public getColor(): string  { 
        return this.iconColor
    }
}
export default Player