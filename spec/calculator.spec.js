describe("Calculator", function() {

  describe(".pricingWithInterest", function(){
    var pricing = Moip.Calculator.pricingWithInterest({
        "amount" : 10000,
        "fixed" : 69,
        "transaction_percentage" : 4.69,
        "antecipation_percentage" : 2.49,
        "floating" : 14,
        "installment" : 4,
        "interest_rate" : 1.99
    });

    it("calculates total amounts with interest", function() {
      expect(pricing.amount).toEqual([10000,10300,10401,10504,10605,10710,10815,10920,11025,11130,11231,11340]);
    });
    
    it("calculates total advance with interest", function() {
      expect(pricing.installment_value).toEqual([100,51.5,34.67,26.26,21.21,17.85,15.45,13.65,12.25,11.13,10.21,9.45]);
    });
    
    it("calculates total net value with interest", function() {
      expect(pricing.liquid_value).toEqual([93.36,94.97,94.68,94.39,94.06,93.73,93.38,93.01,92.61,92.18,91.7,91.26]);
    });
  });
  
  describe(".pricing", function(){
    var pricing = Moip.Calculator.pricing({
       "amount" : 10000,
       "fixed" : 69,
       "transaction_percentage" : 4.69,
       "antecipation_percentage" : 2.49,
       "floating" : 14,
       "installment" : 4
    });

    it("calculates the transaction value", function() {
      expect(pricing.amount).toEqual(10000);
    });

    it("calculates the installment values", function() {
      expect(pricing.installment_value).toEqual([100,50,33.33,25,20,16.67,14.29,12.5,11.11,10,9.09,8.33]);
    });

    it("calculates the liquid values", function() {
      expect(pricing.liquid_value).toEqual([93.36,92.19,91.01,89.83,88.65,87.47,86.3,85.12,83.94,82.76,81.58,80.41]);
    });

    it("calculates the liquid values", function() {
      expect(pricing.total_tax).toEqual([ 6.64, 7.81, 8.99, 10.17, 11.35, 12.53, 13.70, 14.88, 16.06, 17.24, 18.42, 19.59]);
    });

    it("calculates the antecipation percentages", function() {
      expect(pricing.antecipation_percentage).toEqual([1.26, 2.43, 3.61, 4.79, 5.97, 7.15, 8.32, 9.5, 10.68, 11.86, 13.04, 14.21]);
    });
    
    it("calculates the antecipation percentages", function() {
      expect(pricing.antecipation_percentage).toEqual([1.26, 2.43, 3.61, 4.79, 5.97, 7.15, 8.32, 9.5, 10.68, 11.86, 13.04, 14.21]);
    });
    
    it("calculates the antecipation percentages", function() {
      expect(pricing.antecipation_percentage).toEqual([1.26, 2.43, 3.61, 4.79, 5.97, 7.15, 8.32, 9.5, 10.68, 11.86, 13.04, 14.21]);
    });

        
        

  });
  
});