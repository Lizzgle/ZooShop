const classFunctionActivator = document.getElementById("petInfo");
function functionalInheritance() {
    function withTimestamp(fn) {
      return function() {
        const timestamp = new Date().toLocaleString();
        const result = fn.apply(this, arguments);
        return `${timestamp}: ${result}`;
      };
    }

    function Animal(name, age) {
        this.name = name;
        this.age = age;
    }
    Animal.prototype.getName = function() {
        return this.name;
    };
    Animal.prototype.setName = function(name) {
        this.name = name;
    };
    Animal.prototype.getAge = function() {
        return this.age;
    };
    Animal.prototype.setAge = function(age) {
        this.age = age;
    };
    Animal.prototype.getDetails = withTimestamp(function() {
        return `Name: ${this.name}, Age: ${this.age}`;
    });

    function Dog(name, age, breed) {
        Animal.call(this, name, age);
        this.breed = breed;

        this.getBreed = function () {
            return this.breed;
        }
        this.setBreed = function (breed) {
            this.breed = breed;
        }
    }
    Dog.prototype = Object.create(Animal.prototype);
    Dog.prototype.bark = function() {
        return `${this.name} barks!`;
    };
    Dog.prototype.getDetails = function() {
        const animalDetails = Animal.prototype.getDetails.call(this);
        return `${animalDetails}, Breed: ${this.getBreed()}`;
    };

    const myAnimal = new Animal("Rover", 5);
    const myDog = new Dog("Buddy", 3, "Golden Retriever");

    document.getElementById("dogName").textContent = myDog.getName();
    myDog.setName("Badass");
    document.getElementById("updatedDogName").textContent = myDog.getName();
    document.getElementById("animalDetails").textContent = myAnimal.getDetails();
    document.getElementById("dogDetails").textContent = myDog.getDetails();
    document.getElementById("dogBark").textContent = myDog.bark();
}
function classInheritance() {
    function withTimestamp(fn) {
      return function() {
        const timestamp = new Date().toLocaleString();
        const result = fn.apply(this, arguments);
        return `${timestamp}: ${result}`;
      };
    }

    class Animal {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        getName() {
            return this.name;
        }
        setName(name) {
            this.name = name;
        }
        getAge() {
            return this.age;
        }
        setAge(age) {
            this.age = age;
        }
        getDetails = withTimestamp(() => {
            return `Name: ${this.name}, Age: ${this.age}`;
        });
    }

    class Dog extends Animal {
        constructor(name, age, breed) {
            super(name, age);
            this.breed = breed;
        }
        getBreed() {
            return this.breed;
        }
        setBreed(breed) {
            this.breed = breed;
        }
        bark() {
            return `${this.name} barks!`;
        }
        getDetails() {
            const animalDetails = super.getDetails();
            return `${animalDetails}, Breed: ${this.getBreed()}`;
        }
    }

    const myAnimal = new Animal("Rover", 5);
    const myDog = new Dog("Buddy", 3, "Golden Retriever");

    document.getElementById("dogName").textContent = myDog.getName();
    myDog.setName("Badass");
    document.getElementById("updatedDogName").textContent = myDog.getName();
    document.getElementById("animalDetails").textContent = myAnimal.getDetails();
    document.getElementById("dogDetails").textContent = myDog.getDetails();
    document.getElementById("dogBark").textContent = myDog.bark();
}

functionalInheritance();