# digibites
- To run this script first run to compile to js
```
tsc index.ts
```

then to run the generated js file run
```
node index.js
```

* Explaination :
    * I created an interface for each part I need product, DeliveryRule, Offer.
    * In my class constructor I initialized all the needed data.
    * add() Method: check for product code If It exists or not and add it to item property
    * total() Method: calculate total price including any offer and discounts and delivery fees.
    * calculateDeliveryCost() Method: calculate delivery cost based on instructions sent to  me.
    * calculateDiscount() Method: I made an extra customization in it so It can handle mutiple offers at the same time from different products not the same one.
        * I get productCount and divide it by quantity specified in offer to know how many time this discount will be applied
        * After I multiply this value by discount value to get totatl discount value
        * I push product code to offers applied to I don't apply multiple offer for the same product code at the same time