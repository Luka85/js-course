// !NESTED FUNCTION SCOPE
// let a = 10;

// function outer() {
//   let b = 20;
//   function inner() {
//     let c = 30;

//     console.log(a, b, c);
//   }
//   inner();
// }

// outer();
// !CLOSURE

function outer() {
  let counter = 0;
  function inner() {
    counter++;
    console.log(counter);
  }
  return inner;
}

const fn = outer();
fn();
fn();

// !FUNCTION CURRYING
function sum(a, b, c) {
  return a + b + c;
}
console.log(sum(2, 3, 5));

function curry(fn) {
  return function (a) {
    return function (b) {
      return function (c) {
        return fn(a, b, c);
      };
    };
  };
}
const curriedSum = curry(sum);
console.log(curriedSum(2)(3)(5));

const add2 = curriedSum(2);
const add3 = add2(3);
const add5 = add3(5);
console.log(add5);

// !this
function sayMyName(name) {
  console.log(`My name is ${name}`);
}

// sayMyName("Luka");

// *Four ways to invoke a functions in JS and determine the value of this keyword:
// *1. implicit binding
// *2. explicit binding
// *3. New binding
// *4. Default binding

// const name = "Superman";
globalThis.name = "Batman";
// *implicit binding
const person = {
  name: "Luka",
  sayMyName: function () {
    console.log(`My name is ${this.name}`);
  },
};

person.sayMyName();

// *explicit binding
const person1 = {
  name: "Luka",
  sayMyName: function () {
    console.log(`My name is ${this.name}`);
  },
};

function sayMyName() {
  console.log(`My name is ${this.name}`);
}
sayMyName.call(person);

// *New binding

function Person(name) {
  // this = refers to empty object{}
  this.name = name;
}

const p1 = new Person("Luka");
const p2 = new Person("John");

console.log(p1.name);
console.log(p2.name);

// *Default binding

sayMyName();

// *Order of precedence:
// *1. New binding
// *1. Explicit binding
// *1. Implicit binding
// *1. Default binding

// !Prototype
function PersonInfo(fName, lName) {
  this.firstName = fName;
  this.lastName = lName;
}

PersonInfo.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
};

const per1 = new PersonInfo("Luka", "Kikelj");
const per2 = new PersonInfo("John", "Lennon");

console.log(per1.getFullName());
console.log(per2.getFullName());

// !Prototypal inheritance
function SuperHero(fName, lName) {
  this.isSuperHero = true;
  PersonInfo.call(this, fName, lName);
}
SuperHero.prototype.fightCrime = function () {
  // console.log("Fighting crime");
  return "Fight Crime";
};

SuperHero.prototype = Object.create(PersonInfo.prototype);

const batman = new SuperHero("John", "Travolta");

SuperHero.prototype.constructor = SuperHero;
console.log(batman);
