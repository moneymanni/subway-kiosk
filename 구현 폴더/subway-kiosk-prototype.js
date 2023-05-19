Array.prototype.forEach = function (callback, thisArg) {
    for (let i = 0; i < this.length; i++)
        callback.call(thisArg || global, this[i], i, this);
};

const sandwich = (function () {
    function sandwich() { }
    sandwich.prototype.setElement = function (combineElement) {
        combineElement.getElement();
    };
    return sandwich;
})();

const cookie = (function () {
    function cookie() { }
    cookie.prototype.setElement = function (combineElement) {
        combineElement.getElement();
    };
    return cookie;
})();

const drink = (function () {
    function drink() { }
    drink.prototype.setElement = function (combineElement) {
        combineElement.getElement();
    };
    return drink;
})();

// Command Pattern(명령)
const combineElement = (function () {
    function combineElement() {
        this.elements = [];
    }
    combineElement.prototype.getElement = function () {
        this.elements.forEach(function (element) {
            element();
        });
    };
    combineElement.prototype.bread = function (element, elementBread) {
        this.elements.push(function () {
            element.call(null, elementBread);
        });
    };
    combineElement.prototype.cheese = function (element, elementCheese) {
        this.elements.push(function () {
            element.call(null, elementCheese);
        });
    };
    combineElement.prototype.vegetable = function (element, elementvegetable) {
        this.elements.push(function () {
            element.call(null, elementvegetable);
        });
    };
    combineElement.prototype.sauce = function (element, elementSauce) {
        this.elements.push(function () {
            element.call(null, elementSauce);
        });
    };
    combineElement.prototype.mainMenu = function (element, elementMain) {
        this.elements.push(function () {
            element.call(null, elementMain);
        });
    }
    combineElement.prototype.cookie = function (element, elementCookie) {
        this.elements.push(function () {
            element.call(null, elementCookie);
        });
    };
    combineElement.prototype.drink = function (element, elementDrink) {
        this.elements.push(function () {
            element.call(null, elementDrink);
        });
    };
    combineElement.prototype.rewind = function () {
        this.element.pop();
    };
    return combineElement;
})();

// Strategy Pattern(전략)
const makeSandwich = function() { };
makeSandwich.welcome = function() {
    console.log("Subway Kiosk");
};
makeSandwich.showBread = function() {
    console.log("Bread :: Honey Oat | Hearty Italian | Wheat | Parmesan Oregano | White | Flat Bread");
};
makeSandwich.selectBread = function(selectBread) {
    console.log("Chosen Bread - " + selectBread);
};
makeSandwich.showCheese = function() {
    console.log("Cheese :: American Cheese | Shredded Cheese | Mozzarella Cheese");
};
makeSandwich.selectCheese = function(selectCheese) {
    console.log("Chosen Cheese - " + selectCheese);
};
makeSandwich.showVegetable = function() {
    console.log("Vegetable :: Lettuce | Tomatoes | Cucumbers | Peppers | Red Onions | Pickles");
    console.log("Vegetable :: Olives | Jalapenos | Avocado");
};
makeSandwich.selectVegetable = function(selectVegetable) {
    console.log("Chosen Vegetable - " + selectVegetable);
};
makeSandwich.showSauce = function() {
    console.log("Sauce :: Ranch | Mayonnaise | Sweet Onion | Honey Mustard | Sweet Chilli | Hot Chilli");
    console.log("Sauce :: Southwest Chipotle | Yellow Mustard | Horseradish | Olive Oil | RedWine Vinaigrette");
    console.log("Sauce :: Salt | Black Pepper | Smoke BBQ | Italian Dressing");
    console.log("");    
};
makeSandwich.selectSauce = function(selectSauce) {
    console.log("Chosen Sauce - " + selectSauce);
};
makeSandwich.showMain = function() {
    console.log("Classic :: Egg Mayo | Italian B.M.T | B.L.T | Meatball | Ham | Tuna");
    console.log("Fresh & Light :: Roasted Chicken | Rotisserie Barbecue Chicken | Subway Club | Turkey");
    console.log("Premium :: Shrimp | K-BBQ | Pulled Pork Barbecue | Steak & Cheese | Spicy Italian | Chicken Teriyaki");
};
makeSandwich.selectMain = function(selectMain) {
    console.log("Chosen MainSandwich - " + selectMain);
};

const makeCookie = function() { };
makeCookie.showCookie = function() {
    console.log("Cookie :: Double Chocolate Chip | Chocolate Chip | Oatmeal Raisin | Raspberry Cheese Cake");
    console.log("");    
};
makeCookie.selectCookie = function(selectCookie) {
    console.log("Chosen Cookie - " + selectCookie);
};

const makeDrink = function() { };
makeDrink.showDrink = function() {
    console.log("Drink :: Coke | Sprite | Fanta Orange | Fanta Pineapple | Welchs Grapes");
    console.log("");
};
makeDrink.selectDrink = function(selectDrink) {
    console.log("Chosen Drink - " + selectDrink);
};

// Templete Method Pattern
const madeSandwich = function() { 
    this.managers = [];
};
// Observer Pat.
madeSandwich.prototype.subscribe = function(subscriber) {
    this.managers.push(subscriber);
};
madeSandwich.prototype.unsubscribe = function(subscriber) {
    this.managers = this.managers.filter(manager => manager != subscriber);
};

madeSandwich.prototype.orderSandwich = function() {
    console.log("The Basket is Empty!");
};
madeSandwich.prototype.orderCookie = function() {
    console.log("The Basket is Empty!");
};
madeSandwich.prototype.orderDrink = function() {
    console.log("The Basket is Empty!");
};
madeSandwich.prototype.orderByKiosk = function() {
    makeSandwich.showMain();
    makeSandwich.showBread();
    makeSandwich.showCheese();
    makeSandwich.showVegetable();
    makeSandwich.showSauce();
    makeCookie.showCookie();
    makeDrink.showDrink();
    
    console.log("*** Receipt ***");
    console.log("- - - Sandwich - - -");
    let sandwich = this.orderSandwich;
    sandwich();
    console.log("- - - Cookie & Potato - - -");
    let cookie = this.orderCookie;
    cookie();
    console.log("- - - Drink - - -");
    let drink = this.orderDrink;
    drink();

    this.managers.forEach(function(manager) {
        manager.update([sandwich, cookie, drink]);
    });
};

const generalMenu = function() { 
    this.managers = [];
};
generalMenu.prototype = Object.create(madeSandwich.prototype);
generalMenu.prototype.constructor = generalMenu;

generalMenu.prototype.orderSandwich = function() {
    let sandwichOrder = new sandwich();
    let sandwichOrdering = new combineElement();

    sandwichOrdering.mainMenu(makeSandwich.selectMain, "Meatball");
    sandwichOrdering.bread(makeSandwich.selectBread, "Flat Bread");
    sandwichOrdering.cheese(makeSandwich.selectCheese, "Shredded Cheese");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Letture");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Red Onions");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Olives");
    sandwichOrdering.sauce(makeSandwich.selectSauce, "Black Pepper");
    sandwichOrdering.sauce(makeSandwich.selectSauce, "Sweet Chilli");
    sandwichOrder.setElement(sandwichOrdering);
};

const comboMenu = function() {
    this.managers = [];
};
comboMenu.prototype = Object.create(madeSandwich.prototype);
comboMenu.prototype.constructor = comboMenu;

comboMenu.prototype.orderSandwich = function() {
    let sandwichOrder = new sandwich();
    let sandwichOrdering = new combineElement();

    sandwichOrdering.mainMenu(makeSandwich.selectMain, "K-BBQ");
    sandwichOrdering.bread(makeSandwich.selectBread, "Honey Oat");
    sandwichOrdering.cheese(makeSandwich.selectCheese, "American Cheese");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Letture");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Tomatoes");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Cucumbers");
    sandwichOrdering.sauce(makeSandwich.selectSauce, "Ranch");
    sandwichOrdering.sauce(makeSandwich.selectSauce, "Sweet Onion");
    sandwichOrder.setElement(sandwichOrdering);
};
comboMenu.prototype.orderCookie = function() {
    let cookieOrder = new cookie();
    let cookieOrdering = new combineElement();

    cookieOrdering.cookie(makeCookie.selectCookie, "Oatmeal Raisin");
    cookieOrder.setElement(cookieOrdering);
};

const setMenu = function() {
    this.managers = [];
};
setMenu.prototype = Object.create(madeSandwich.prototype);
setMenu.prototype.constructor = setMenu;

setMenu.prototype.orderSandwich = function() {
    let sandwichOrder = new sandwich();
    let sandwichOrdering = new combineElement();

    sandwichOrdering.mainMenu(makeSandwich.selectMain, "Rotisserie Barbecue Chicken");
    sandwichOrdering.bread(makeSandwich.selectBread, "Wheat");
    sandwichOrdering.cheese(makeSandwich.selectCheese, "Mozzarella Cheese");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Peppers");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Pickles");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Olives");
    sandwichOrdering.vegetable(makeSandwich.selectVegetable, "Avocado");
    sandwichOrdering.sauce(makeSandwich.selectSauce, "Olive Oil");
    sandwichOrdering.sauce(makeSandwich.selectSauce, "RedWine Vinaigrette");
    sandwichOrder.setElement(sandwichOrdering);
}
setMenu.prototype.orderCookie = function() {
    let cookieOrder = new cookie();
    let cookieOrdering = new combineElement();

    cookieOrdering.cookie(makeCookie.selectCookie, "Chocolate Chip");
    cookieOrder.setElement(cookieOrdering);
};
setMenu.prototype.orderDrink = function() {
    let drinkOrder = new drink();
    let drinkOrdering = new combineElement();

    drinkOrdering.drink(makeDrink.selectDrink, "Welchs Grapes");
    drinkOrder.setElement(drinkOrdering);
};

// Observer Pat.
const Manager = (function() {
    function Manager() {
        this.chit = [];
    }
    Manager.prototype.update = function(order) {
        this.chit.push(order);
    };
    Manager.prototype.checkChit = function() {
        this.chit.forEach(function(order) {
            order.forEach(function(ingredient) {
                ingredient();
            });
        });
    };
    return Manager;
})();

const SetMenuOrder = new setMenu();

let manager = new Manager();
SetMenuOrder.subscribe(manager);

SetMenuOrder.orderByKiosk();

console.log("\n");
manager.checkChit();