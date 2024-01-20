interface IKey  {
    getSignature(): string;
}

class Key implements IKey {
    private signature: string = Math.random().toString(36).substring(2, 10)

    getSignature(): string {
        return this.signature;
    }
}

interface IPerson {
    getKey(): IKey;
}

class Person implements IPerson {
    constructor(private key: IKey){}

    getKey(): IKey{
        return this.key;
    }
}

abstract class House {
    protected door: boolean = false;
    protected tenants: IPerson[] = [];

    constructor(protected key: IKey){}

    comeIn(person: IPerson): void{
        if(this.door){
            this.tenants.push(person);
        }
    }

   abstract openDoor(key: IKey): void
}

class MyHouse extends House {
    openDoor(key: IKey): void{
        if(key.getSignature() === this.key.getSignature()){
            this.door = true;

        }
    }
}

const key = new Key();

const house = new MyHouse(key);
const person = new Person(key);

house.openDoor(person.getKey());

house.comeIn(person);

export {};