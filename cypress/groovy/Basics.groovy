// Basics.groovy

def name = "ChatGPT"
def years = 2

println "Hi, I'm ${name}, helping developers for ${years} years!"

// Loop
2.times {
    println "This is loop iteration #${it + 1}"
}

// Conditional
def score = 85
if (score > 75) {
    println "Great score!"
} else {
    println "Keep practicing!"
}

def list = [3, 5, 7, 9]
list << 11
println list

def map = [name: "Riyas", age: 34]
println map['name']
map.city = "Karaikal"
println map

[1,2,3].each {item -> println "Number $item"}

(1..4).each { println "Count: $it" }