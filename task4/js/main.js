function Person(firstName, lastName, age, gender) {
    this.firstName = firstName;
    this.lastName = lastName;

    var MAX_AGE = 150;
    var MIN_AGE = 0
    var GENDERS = ['Male', 'Female'];

    var _age, _gender;

    this.setAge = function(age) {
        if(age < MIN_AGE || age > MAX_AGE) {
            throw new Error('Age is not valid. Should be between ' + MIN_AGE + ' and ' + MAX_AGE );
        }
        _age = age
    }
    this.getAge = function() {
        return _age;
    }
    this.setAge(age);

    this.setGender = function(gender) {
        if(!~GENDERS.indexOf(gender)) {
            throw new Error('Gender is not valid. Should be: ' + GENDERS);
        }
        _gender = gender
    }
    this.getGender = function() {
        return _gender;
    }
    this.setGender(gender);
}

function Employee(firstName, lastName, age, gender, email, id) {
    this.email = email;
    this.id = id;
    Person.call(this, firstName, lastName, age, gender);
}

var mariia = new Person('Mariia', 'Kostornychenko', 25, 'Female');
var mariia_fe_dev = new Employee('Mariia', 'Kostornychenko', 25, 'Female', 'test@test.com', '54dd55fd');

console.log(mariia_fe_dev);