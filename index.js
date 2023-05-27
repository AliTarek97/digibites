var Basket = /** @class */ (function () {
    function Basket(catalogue, deliveryRules, offers) {
        this.catalogue = catalogue;
        this.deliveryRules = deliveryRules;
        this.offers = offers;
        this.items = [];
    }
    Basket.prototype.add = function (productCode) {
        if (this.catalogue.hasOwnProperty(productCode)) {
            this.items.push(productCode);
        }
        else {
            throw new Error("Product with code ".concat(productCode, " does not exist."));
        }
    };
    Basket.prototype.total = function () {
        var _this = this;
        var totalCost = this.items.reduce(function (sum, productCode) {
            var product = _this.catalogue[productCode];
            return sum + product.price;
        }, 0);
        var deliveryCost = this.calculateDeliveryCost(totalCost);
        totalCost += deliveryCost;
        var discount = this.calculateDiscount();
        totalCost -= discount;
        return totalCost;
    };
    Basket.prototype.calculateDeliveryCost = function (totalCost) {
        // @ts-ignore
        var rule = this.deliveryRules.find(function (rule) { return totalCost < rule.threshold; });
        return rule ? rule.cost : 0;
    };
    Basket.prototype.calculateDiscount = function () {
        var totalDiscount = 0;
        var offersApplied = [];
        var _loop_1 = function (offer) {
            var productCode = offer.productCode, quantity = offer.quantity, discountPercentage = offer.discountPercentage;
            // @ts-ignore
            if (offersApplied.includes(productCode)) {
                return "continue";
            }
            var productCount = this_1.items.filter(function (item) { return item === productCode; }).length;
            var eligibleGroups = Math.floor(productCount / quantity);
            if (eligibleGroups > 0) {
                var discount = (this_1.catalogue[productCode].price * discountPercentage) / 100;
                totalDiscount += discount * eligibleGroups;
                offersApplied.push(productCode);
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.offers; _i < _a.length; _i++) {
            var offer = _a[_i];
            _loop_1(offer);
        }
        return totalDiscount;
    };
    return Basket;
}());
var catalogue = {
    R01: { code: 'R01', price: 32.95 },
    G01: { code: 'G01', price: 24.95 },
    B01: { code: 'B01', price: 7.95 },
};
var deliveryRules = [
    { threshold: 50, cost: 4.95 },
    { threshold: 90, cost: 2.95 },
];
var offers = [
    { productCode: 'R01', quantity: 2, discountPercentage: 50 },
    // { productCode: 'B01', quantity: 3, discountPercentage: 25 },
];
var basket = new Basket(catalogue, deliveryRules, offers);
// basket.add('B01');
// basket.add('G01');
// console.log(basket.total()); // Output: 37.85
// basket.add('R01');
// basket.add('R01');
// console.log(basket.total()); // Output: 54.37
// basket.add('R01');
// basket.add('G01');
// console.log(basket.total()); // Output: 60.85
// basket.add('B01');
// basket.add('B01');
// basket.add('B01');
basket.add('R01');
basket.add('R01');
basket.add('R01');
console.log(basket.total()); // Output: 98.27
