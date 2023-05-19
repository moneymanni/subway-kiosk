Array.prototype.forEach = function (callback, thisArg) {
    for (let i = 0; i < this.length; i++)
        callback.call(thisArg || global, this[i], i, this);
};

class sandwich {
    constructor() { }
    setElement(combineElement) {
        combineElement.getElement();
    }
}
class cookie {
    constructor() { }
    setElement(combineElement) {
        combineElement.getElement();
    }
}
class drink {
    constructor() { }
    setElement(combineElement) {
        combineElement.getElement();
    }
}

// Command Pattern(명령)
class combineElement {
    constructor() {
        this.elements = [];
    }
    getElement() {
        this.elements.forEach(function (element) {
            element();
        });
    }
    bread(element, elementBread) {
        this.elements.push(function () {
            element.call(null, elementBread);
        });
    }
    cheese(element, elementCheese) {
        this.elements.push(function () {
            element.call(null, elementCheese);
        });
    }
    vegetable(element, elementvegetable) {
        this.elements.push(function () {
            element.call(null, elementvegetable);
        });
    }
    sauce(element, elementSauce) {
        this.elements.push(function () {
            element.call(null, elementSauce);
        });
    }
    mainMenu(element, elementMain) {
        this.elements.push(function () {
            element.call(null, elementMain);
        });
    }
    cookie(element, elementCookie) {
        this.elements.push(function () {
            element.call(null, elementCookie);
        });
    }
    drink(element, elementDrink) {
        this.elements.push(function () {
            element.call(null, elementDrink);
        });
    }
    rewind() {
        this.element.pop();
    }
}

// Strategy Pattern(전략)
class makeSandwich {
    constructor() { }
    static welcome() { }
    static showBread() { }
    static selectBread(selectBread) { }
    static showCheese() { }
    static selectCheese(selectCheese) { }
    static showVegetable() { }
    static selectVegetable(selectVegetable) { }
    static showSauce() { }
    static selectSauce(selectSauce) { }
    static showMain() { }
    static selectMain(selectMain) { }
}
class makeCookie {
    constructor() { }
    static showCookie() { }
    static selectCookie(selectCookie) { }
}
class makeDrink {
    constructor() { }
    static showDrink() { }
    static selectDrink(selectDrink) { }
}

// Templete Method Pattern
class madeSandwich {
    constructor() {
        this.managers = [];
    }
    subscribe(subscriber) {
        this.managers.push(subscriber);
    }
    unsubscribe(subscriber) {
        this.managers = this.managers.filter(manager => manager != subscriber);
    }
    orderSandwich() { }
    orderCookie() { }
    orderDrink() { }
    orderByKiosk() {
        makeSandwich.showMain();
        makeSandwich.showBread();
        makeSandwich.showCheese();
        makeSandwich.showVegetable();
        makeSandwich.showSauce();
        makeCookie.showCookie();
        makeDrink.showDrink();

        this.orderSandwich();
        this.orderCookie();
        this.orderDrink();

        
        let sandwich = this.orderSandwich;
        let cookie = this.orderCookie;
        let drink = this.orderDrink;

        this.managers.forEach(function(manager) {
            manager.update([sandwich, cookie, drink]);
        });
    }
}

class generalMenu extends madeSandwich {
    orderSandwich() {
        let sandwichOrder = new sandwich();
        let sandwichOrdering = new combineElement();
    
        sandwichOrdering.mainMenu(makeSandwich.selectMain, "main");
        sandwichOrdering.bread(makeSandwich.selectBread, "bread");
        sandwichOrdering.cheese(makeSandwich.selectCheese, "cheese");
        sandwichOrdering.vegetable(makeSandwich.selectVegetable, "vegatable");
        sandwichOrdering.sauce(makeSandwich.selectSauce, "sauce");
        sandwichOrder.setElement(sandwichOrdering);
    }
}
class comboMenu extends madeSandwich {
    orderSandwich() {
        let sandwichOrder = new sandwich();
        let sandwichOrdering = new combineElement();

        sandwichOrdering.mainMenu(makeSandwich.selectMain, "main");
        sandwichOrdering.bread(makeSandwich.selectBread, "bread");
        sandwichOrdering.cheese(makeSandwich.selectCheese, "cheese");
        sandwichOrdering.vegetable(makeSandwich.selectVegetable, "vegatable");
        sandwichOrdering.sauce(makeSandwich.selectSauce, "sauce");
        sandwichOrder.setElement(sandwichOrdering);
    }
    orderCookie() {
        let cookieOrder = new cookie();
        let cookieOrdering = new combineElement();
    
        cookieOrdering.cookie(makeCookie.selectCookie, "cookie");
        cookieOrder.setElement(cookieOrdering);
    }
}
class setMenu extends madeSandwich {
    orderSandwich() {
        let sandwichOrder = new sandwich();
        let sandwichOrdering = new combineElement();
    
        sandwichOrdering.mainMenu(makeSandwich.selectMain, "main");
        sandwichOrdering.bread(makeSandwich.selectBread, "bread");
        sandwichOrdering.cheese(makeSandwich.selectCheese, "cheese");
        sandwichOrdering.vegetable(makeSandwich.selectVegetable, "vegatable");
        sandwichOrdering.sauce(makeSandwich.selectSauce, "sauce");
        sandwichOrder.setElement(sandwichOrdering);
    }
    orderCookie() {
        let cookieOrder = new cookie();
        let cookieOrdering = new combineElement();
    
        cookieOrdering.cookie(makeCookie.selectCookie, "cookie");
        cookieOrder.setElement(cookieOrdering);
    }
    orderDrink() {
        let drinkOrder = new drink();
        let drinkOrdering = new combineElement();
    
        drinkOrdering.drink(makeDrink.selectDrink, "drink");
        drinkOrder.setElement(drinkOrdering);
    }
}

// Observer Pat.
class Manager {
    constructor() {
        this.chit = [];
    }
    update(order) {
        this.chit.push(order);
    }
    checkChit() {
        this.chit.forEach(function(order) {
            order.forEach(function(ingredient) {
                ingredient();
            });
        });
    }
}


const SetMenuOrder = new setMenu();
let manager = new Manager();

SetMenuOrder.subscribe(manager);
SetMenuOrder.orderByKiosk();
manager.checkChit();