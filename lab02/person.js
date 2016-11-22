b /*An object prototype for a person that includes features for maintaining or computing the following
 *name (and a mutator method that changes the name)
 *birthdate (and an accessor method that computes age; cf. a pretty decent function for this from Naveen Jose.)
 *list of friend objects (and a mutator method that adds a new friend)
 *the ability to print a greeting (e.g., “I’m a person”)
 */
function Person(name, age, birthdate) {
    this.name = name;
    this.birthdate = birthdate;
    this.age = age;
    this.friends = [];
    this.greeting = "I am a stegosaurus!"
}

//Mutator method for changing a person's name
Person.prototype.changeName = function(newName){
	this.name = newName;
}

//Displays a greeting for a person 
Person.prototype.printGreeting = function(){
	console.log(this.greeting);
}

//Displays a person's friends
Person.prototype.showFriends = function(friends){
	console.log(this.friends);
}

Person.prototype.newFriend = function(newFriend){
	this.friends.push(newFriend);
}

/*Function to calculate age
 *Taken from link on lab page*/
Person.prototype.getAge = function(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
}
//Creates student sub-class
function Student(subject){
	this.subject = subject;
	this.greeting = "I'm still in school.";
}

/******************************************************************MAIN CODE AND TESTS****************************************************************/
var jahnDavis = new Person("Jahn Davis", 21, "03/15/1995");
var jishMag = new Person("Josh Maguire", 22, "05/13/1994");


//Tests addFriend, getAge, and printGreeting for jahnDavis
jahnDavis.newFriend(jishMag);
console.log(jahnDavis.getAge("03/15/1995"));
jahnDavis.printGreeting();

//Change Josh's name and print it out
jishMag.changeName("Majestic Locks");
console.log(jishMag.name);

//Tests age comparison
if (jahnDavis.age > jishMag.age){
	console.log("Jahn is older than Josh.");
}
else {
	console.log("Josh is older than Jahn.");
}

//Creates student prototype
Student.prototype = Object.create(Person.prototype);

//Tests Student prototypes and adding subject to Person object
var billWarners = new Student("Bill Warners", 21, "07/23/1995", "History");
var kimoCox = new Student("Kimo Cox", "20", "02/17/1996", "Diaspora Studies");

kimoCox.printGreeting();
console.log(billWarners.getAge("07/23/1995"));
jahnDavis.showFriends();
