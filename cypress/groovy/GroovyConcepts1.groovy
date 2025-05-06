//Step 6: Closures

def display = { name -> println "My name is $name" }

display('Riyas khan')

display(201)

def geneic = { println 'Hi, How are you?' }
geneic()

def list = [1, 2, 3]
list.each { println it }  // it = current item

//Step 7: Methods
def add(a, b) {
    return a + b
}

def total = add(50, 25)
println total

/* groovylint-disable-next-line NglParseError */
def multiply(a, b) {
    a * b
}

int result = multiply(5, 5)
println "5 * 5 = $result"

//Step 8: Classes and Objects
class Car {
    def name
    def model
    def price

    def aboutCar() {
        println "This car name is $name, model $model & price $price"
    }
}

def obj = new Car(name: 'Hyundai', model: 2009, price: 200000)
obj.aboutCar()