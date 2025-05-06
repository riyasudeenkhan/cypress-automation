// Class & object
class Book {
    String title
    def author

    void displayDetails() {
        println "This book '$title' written by '$author'"
    }
}

def book = new Book(title: "Sahih Hadees", author: "Imam Buhari")
book.displayDetails()

// Constructor
class Laptop {
    String brand
    int price

    Laptop(brand, price) {
        this.brand = brand
        this.price = price
    }
}

def lap = new Laptop("Lenovo", 50000)
println "Laptop name " + lap.brand
println "&& price is " + lap.price

// Inheritance
class Vehicle {
    void move() {
        println "Vehicle is moving"
    }
}

class Bike extends Vehicle {
    @Override
    void move() {
        println "Bike is racing"
    }
}

def bike = new Bike()
bike.move()

// Trait
trait Swimmable{
    void swim() {
        println "Some livingbeings are swimming"
    }
}

class Fish implements Swimmable {}

def fish = new Fish()
fish.swim()

// Safe Navigation and Elvis Operator
def address = null
println address?.toUpperCase()
println address ?: "Unknown Address"

// Spread Operator
def list = ["dog", "cat", "cow"]
println list*.toUpperCase()

// Closure inside class
class MathOperations {
    def subtract = {a, b -> a - b}
}

def sub = new MathOperations()
def result = sub.subtract(10, 3)
println "If subtract (10, 3) then the answer is $result"

// Shopping list DSL
class ShoppingList {
    def items = []

    def add(String item) {
        items << item
    }
}

def shopping = new ShoppingList()
shopping.add("Milk")
shopping.add "Eggs"
shopping.add "Bread"
println shopping.items

// Daily routine DSL
class DailyRoutine {
    def tasks = []

    void task(String activity, String time) {
        tasks << [activity: activity, time: time]
    }

    void showRoutine() {
        println "Your Daily Routine:"
        tasks.each {
            println "$it.time - $it.activity"
        }
    }
}

def routine = new DailyRoutine()
routine.task "Wake up", "7:00 AM"
routine.task "Go for walk", "7:30 AM"
routine.task "Start Work", "9:00 AM"
routine.task "Lunch Break", "1:00 PM"
routine.task "Wrap up work", "6:00 PM"
routine.showRoutine()

// Pizza Builder DSL
class PizzaBuilder {
    String crust
    String size
    def toppings = []

    void crust(String crust) {
        this.crust = crust
        println crust 
    }

    void size(String size) {
        this.size = size
        println size     
    }

    void addTopping(String topping) {
        toppings << topping
        println toppings
    }

    void showOrder() {
        println "Your Pizza Order:"
        println "Size: $size"
        println "Crust: $crust"
        toppings.each {
            println "Toppings: $it,"
        }
    }
}

def pizza = new PizzaBuilder()
pizza.crust "Thin Crust"
pizza.size "Medium"
pizza.addTopping "Cheese"
pizza.addTopping "Olives"
pizza.addTopping "Jalapenos"
pizza.showOrder()
