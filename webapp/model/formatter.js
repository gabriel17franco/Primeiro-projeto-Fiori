sap.ui.define([
	
], function(
	
) {
	"use strict";

	return {
        formatPayment(sPayment){
         
            switch (sPayment) {
                case 'CC':
                    return "Cartão de Crédito"
               
                case 'CD':
                    return "Cartão de Débito"
                  
                case 'PI':
                    return "Pix"
                    
                case 'DI':
                    return "Dinheiro"
                   
                default:
            }
        },
        totalFormat(sTotal){
    
            return new Intl.NumberFormat( {style: 'currency', currency: 'INR', minimumFractionDigits: 2}).format(sTotal);
           
        }
    }
});