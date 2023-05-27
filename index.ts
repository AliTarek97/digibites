interface Product {
    code: string;
    price: number;
  }
  
  interface DeliveryRule {
    threshold: number;
    cost: number;
  }
  
  interface Offer {
    productCode: string;
    quantity: number;
    discountPercentage: number;
  }
  
  class Basket {
    private catalogue: Record<string, Product>;
    private deliveryRules: DeliveryRule[];
    private offers: Offer[];
    private items: string[];
  
    constructor(catalogue: Record<string, Product>, deliveryRules: DeliveryRule[], offers: Offer[]) {
      this.catalogue = catalogue;
      this.deliveryRules = deliveryRules;
      this.offers = offers;
      this.items = [];
    }
  
    public add(productCode: string): void {
      if (this.catalogue.hasOwnProperty(productCode)) {
        this.items.push(productCode);
      } else {
        throw new Error(`Product with code ${productCode} does not exist.`);
      }
    }
  
    public total(): number {
      let totalCost = this.items.reduce((sum, productCode) => {
        const product = this.catalogue[productCode];
        return sum + product.price;
      }, 0);
  
      const deliveryCost = this.calculateDeliveryCost(totalCost);
      totalCost += deliveryCost;
  
      const discount = this.calculateDiscount();
      totalCost -= discount;
  
      return totalCost;
    }
  
    private calculateDeliveryCost(totalCost: number): number {
      // @ts-ignore
      const rule = this.deliveryRules.find((rule) => totalCost < rule.threshold);
      return rule ? rule.cost : 0;
    }
  
    private calculateDiscount(): number {
        let totalDiscount = 0;
        const offersApplied: string[] = [];
      
        for (const offer of this.offers) {
          const { productCode, quantity, discountPercentage } = offer;
          // @ts-ignore
          if (offersApplied.includes(productCode)) {
            // Skip the offer if it has already been applied to a product
            continue;
          }
      
          const productCount = this.items.filter((item) => item === productCode).length;
          const eligibleGroups = Math.floor(productCount / quantity);
      
          if (eligibleGroups > 0) {
            const discount = (this.catalogue[productCode].price * discountPercentage) / 100;
            totalDiscount += discount * eligibleGroups;
            offersApplied.push(productCode);
          }
        }
      
        return totalDiscount;
      }
      
  }
  
  const catalogue: Record<string, Product> = {
    R01: { code: 'R01', price: 32.95 },
    G01: { code: 'G01', price: 24.95 },
    B01: { code: 'B01', price: 7.95 },
  };
  
  const deliveryRules: DeliveryRule[] = [
    { threshold: 50, cost: 4.95 },
    { threshold: 90, cost: 2.95 },
  ];
  
  const offers: Offer[] = [
    { productCode: 'R01', quantity: 2, discountPercentage: 50 },
    // { productCode: 'B01', quantity: 3, discountPercentage: 25 },
  ];
  
  const basket = new Basket(catalogue, deliveryRules, offers);
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
  