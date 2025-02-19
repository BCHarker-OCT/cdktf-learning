 // HappyDuck class that implements the Duck interface
 class PondDuck implements IDuck {
    name: string;
    age: number;
    type: DuckType;
    color: DuckColor;
    isFlying: boolean; // Additional property not in the interface
    favoriteFood?: string; // Optional property
    favoriteToy?: string;
  
    constructor(
      name: string,
      age: number,
      type: DuckType,
      color: DuckColor,
      favoriteFood?: string,
      favoriteToy?: string
    ) {
      this.name = name;
      this.age = age;

      this.type = type;
      this.color = color;
      this.isFlying = false; // Ducks are not flying by default
      this.favoriteFood = favoriteFood; // Assign optional property if provided
      if (this.type === "Pekin" && !favoriteToy)
      {
        console.log(`Error: Pekin ducks must have a favorite toy.`);
      }
      else
      {
        this.favoriteToy = favoriteToy; 
      }
    }