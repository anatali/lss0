/*
var object = { foo: null };
object = Object.observe(object, function(changeset) {
    console.log(changeset)
});
object.foo = "bar";
*/

let obj = {a: 1, b: 2};
let p = new Proxy(obj, {
  set(target, name, value) {
    console.log("set " + name + " to " + value);
    target[name] = value;
  }
});
p.a = 3;

/*
In this example, we are using a native JavaScript object 
to which our proxy will forward all operations that are applied to it.
*/
var target = {};
var pp = new Proxy(target, {});

pp.a = 37; // operation forwarded to the target

console.log(target.a); // 37. The operation has been properly forwarded


let validator = {
  set: function(obj, prop, value) {
  	console.log("	validator handler " + obj + " " + prop + " " + value);
    if (prop === 'age') {
      if (!Number.isInteger(value)) {
        throw new TypeError('The age is not an integer');
      }
      if (value > 200) {
        throw new RangeError('The age seems invalid');
      }
    }

    // The default behavior to store the value
    obj[prop] = value;

    // Indicate success
    return true;
  }
};

let person = new Proxy({}, validator);

person.age = 100;
console.log(person.age); // 100
//person.age = 'young'; // Throws an exception
//person.age = 300; // Throws an exception
