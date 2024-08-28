class Car {

  #brand;
  #model;
  speed = 0;
  isTrunkOpen = false;


  constructor(carDetails){
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  go(){
    if((this.speed+5)<=200 && !this.isTrunkOpen){
      this.speed+=5;
    }
  }

  brake(){
    if((this.speed-5)>=0){
      this.speed-=5;
    }
  }

  openTrunk(){
    if(!this.isTrunkOpen && this.speed==0){
      this.isTrunkOpen = true;
    }
  }

  closeTrunk(){
    if(this.isTrunkOpen){
      this.isTrunkOpen = false;
    }
  }


  displayInfo(){
    let trunkStatusLine =``;
    if(this.isTrunkOpen!=null){
      trunkStatusLine = `, Trunk: ${this.isTrunkOpen ? 'open' : 'closed'}`;
    }
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h${trunkStatusLine}`);
  }
}

class RaceCar extends Car{
  acceleration;

  constructor(carDetails){
    super(carDetails);
    this.acceleration = carDetails.acceleration;
    this.isTrunkOpen = null;
  }

  go(){
    if((this.speed+this.acceleration)<=300){
      this.speed+=this.acceleration;
    }
  }

  openTrunk(){
    return;
  }

  closeTrunk(){
    return;
  }
}

const car1 = new Car({
  brand : 'Toyota',
  model : 'Corolla'
});

const car2 = new Car({
  brand : 'Tesla',
  model : 'Model 3'
});

const raceCar1 = new RaceCar(
  {
    brand : 'McLaren',
    model : 'F1',
    acceleration : 20
  }
);

/*
console.log(car1);
console.log(car2);
car1.go();
car2.brake();
car1.displayInfo();
car2.displayInfo();
car1.brake();
car2.go();
car2.go();
car1.displayInfo();
car2.displayInfo();


car1.displayInfo();
car2.openTrunk();
car2.displayInfo();
car2.go();
car2.displayInfo();
car2.closeTrunk();
car2.go();
car2.displayInfo();
car2.openTrunk();
car2.displayInfo();
*/


car1.displayInfo();
car1.openTrunk();
car1.displayInfo();
raceCar1.displayInfo();
raceCar1.go();
raceCar1.displayInfo();
raceCar1.openTrunk();
raceCar1.go();
raceCar1.displayInfo();
raceCar1.brake();
raceCar1.displayInfo();