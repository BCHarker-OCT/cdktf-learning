// // Syntax 
// const duckName: string = "Daffy";
// const duckAge: number =3; 
// console.log(duckName);
// // Arrays & Objects 
// const bears: string[] = ["Ice Bear", "Grizz", "PanPan"];
// const duck = { name: 'Daffy', age: 3, type: 'Mallard', color: 'Black'};
// console.log(duck.type);
// // Types & Interfaces
// type Bears = {
//     name: string; 
//     age: number;
//     type: string; 
//     color: string;
//     favoriteFood?: string;
// }
// const icebear: Bears = {
//     name: "Ice Bear",
//      age: 25,
//       type: "Polar",
//        color: "white",
//         favoriteFood: "salmon"
// };
// icebear.age = 99; // yes can reassing const values
// console.log(icebear.favoriteFood);
// // functions 
// function makeBearRoar(bear: Bears, times = 1): void{
//     for (let i = 0; i < times; i++){
//         console.log(`${icebear.name} Roars!`);
//     }
// }
// makeBearRoar(icebear, 3);
// arrow functions short-hand way to write functions 
// do const instead and then do the => 
// const makeDuckQuack = (duck: PondDuck, times?: number): void => {
//     const quackCount = times || 1; 
//     for(let i = 0; i < quackCount; i++){
//         console.log(`${duck.name} says: Quack! `);
//     }
// }


class PondDuck { 
    name: string;
    age: number;
    type: string;
    color: string;
    isFlying: boolean;
    favoriteFood?: string;


    constructor(name: string, age: number, type: string, color: string, isFlying: boolean, favoriteFood?: string){
        this.name = name; 
        this.age = age;
        this.type = type;
        this.color = color; 
        this.isFlying = false; // set to false by default 
        this.favoriteFood = favoriteFood; // Assign optional value if provided to us 
    }

    // class members cannot be declared as const 
    quack = (times = 1): void => { 
        // console.log(`${this.name} duck saysz: Quack!`);
        // ToDo 
        // Quack for a number of optional times 
        // expected output Daffy the Black Mallard duck says: Quack 

        for (let i=0; i < times; i++){ 
            console.log(`${this.name} the ${this.color} ${this.type} duck says: Quack`);
        }
    }

    fly():void {
    // ToDo
    // Warn if the duck is already flying
    // Expected Output: Daffy is already flying!
        if (!this.isFlying) {
            this.isFlying = true; 
            console.log(`${this.name} starts flying!`);
        } 
        else {
            console.log(`${this.name} is already flying!`);
        }
    }

    land(): void {
        if(this.isFlying === true) {
            console.log(`${this.name} lands gracefully!`)
            this.isFlying = false; 
        }
        else {
            console.log(`${this.name} is already on the ground.`)
        }
    }
}


const daffy = new PondDuck("Daffy", 3, "Mallard", "Black", true, "corn");

daffy.quack(3);

daffy.fly();

daffy.land();

daffy.land();

daffy.fly();


const donald = new PondDuck("Donald", 4, "Pekin", "White", false);

donald.fly();

donald.land();