sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
	
], function(
	Controller,
	Filter,
	FilterOperator,
	MessageToast
)  {
	"use strict";

	return Controller.extend("project1.controller.CadastroPedido", {
		onInit: function () {
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			
		}, 
		Comprar: function(){
			var that = this
			
			execute(that)

				function pegarId(that){
					return new Promise((resolve)=> {			
						var oModel = that.getView().getModel()
						var Purchase = oModel.read("/PurchasesSet", {
							success: function(oData, oResponse){
								var Id = oData.results.length+1
								var PurchaseNumber = Id.toString()
								resolve(PurchaseNumber)            
							},
							error: function(oError){
							} 
						})  
					}).then((PurchaseNumber)=>{
						return PurchaseNumber
					})
				}	

				function criarCompra(that, PurchaseNumber){
					return new Promise((resolve)=>{
						var oModel = that.getView().getModel()
						var oSearchCostumer = that.getView().byId("idListCostumer")
						var oSearchProduct = that.getView().byId("idListProduct")
						var productList = oSearchProduct.getSelectedItems()
						var tempo = new Date()
						var total = 0
						var paymentType
						
						var oRadioPayment = that.getView().byId("Payment").mProperties.selectedIndex
							switch (oRadioPayment) {
								case 0:
									paymentType = "CC"
									break
								case 1:
									paymentType = "CD"
									break
								case 2:
									paymentType = "PI"
									break 
								case 3:
									paymentType = "DI"
								break;
								default:
							}
						
						productList.forEach(function (element) {
							total += parseFloat(element.mProperties.info)
						})
						
						var oPurchase = {
							Purchase: PurchaseNumber, 
							Costumer: oSearchCostumer.getSelectedItem().mProperties.title,
							Status: "Pendente",
							Payment: paymentType,
							Createdon: tempo.toDateString(),
							Delivery: that.getView().byId("Delivery").mProperties.selectedIndex = 0 ? "Entregar" : "Retirar",
							Total: total.toString()
						}
						
						oModel.create("/PurchasesSet", oPurchase, {
							success: function(oData, oResponse){
							resolve(oSearchCostumer.getSelectedItem().mProperties.title)
							},
							error: function(oError){
							}
						})
					})
				}		
			
				function criarPedido(that, PurchaseNumber, RequestNumber, idCostumer, idProduct){
					return new Promise((resolve)=>{	
						var oModel = that.getView().getModel()
						var request = {
						Purchase: PurchaseNumber,  
						Request: RequestNumber.toString(),
						Product: idProduct,
						Costumer: idCostumer  
						}	
						oModel.create("/RequestsSet", request, {
							success: function(oData, oResponse){
							MessageToast.show("Pedido criado com sucesso!")
							resolve()
							},
							error: function(oError){
							MessageToast.show("Não foi possível criar o pedido")
							}   
						})		
					})				
				}
				async function execute (that){
					
					var PurchaseNumber = await pegarId(that).then()	
								
					var idCostumer = await criarCompra(that, PurchaseNumber)
					
					var oSearchProduct = that.getView().byId("idListProduct")
					
					var productList = oSearchProduct.getSelectedItems()

					productList.forEach(async function(element, index) {
						return new Promise((resolve)=>{
							criarPedido(that, PurchaseNumber, index, idCostumer, element.mProperties.title)
							resolve()
						})
							
					})		
				}														
		},	

		cadastrarCliente(oEvent){
			this.oRouter.navTo("RouteView2")
		},
		
		onNavBack(oEvent){
			this.oRouter.navTo("RouteView1")
		},
		
		onSearchProduct: function (oEvent) {
			var aFilters = [];
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var filter = new Filter("Productname", FilterOperator.Contains, sQuery);
				aFilters.push(filter);
			}
			var oList = this.byId("idListProduct");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},
		onSelectionChangeProduct: function (oEvent) {
			var oList = oEvent.getSource();
			var oLabel = this.byId("idFilterLabel");
			var oInfoToolbar = this.byId("idInfoToolbar");
			var aContexts = oList.getSelectedContexts(true);
			var bSelected = (aContexts && aContexts.length > 0);
			var sText = (bSelected) ? aContexts.length + " selected" : null;
			oInfoToolbar.setVisible(bSelected);
			oLabel.setText(sText);
		},
		
		onSearchCostumer: function(oEvent){
			var sQuery = oEvent.getSource().getValue();
			if (sQuery && sQuery.length > 0) {
				var aFilters = new sap.ui.model.Filter({
					filters: [
						new sap.ui.model.Filter("Name", sap.ui.model.FilterOperator.Contains, sQuery),
						new sap.ui.model.Filter("City", sap.ui.model.FilterOperator.Contains, sQuery)
					],
					and: false
				});
			}
			var oList = this.byId("idListCostumer");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilters, "Application");
		},
		onSelectionChangeCostumer: function (oEvent) {
			var oList = oEvent.getSource();
			var oLabel = this.byId("idFilterLabel");
			var oInfoToolbar = this.byId("idInfoToolbar");
			// With the 'getSelectedContexts' function you can access the context paths
			// of all list items that have been selected, regardless of any current
			// filter on the aggregation binding.
			var aContexts = oList.getSelectedContexts(true);
			// update UI //ue
			var bSelected = (aContexts && aContexts.length > 0);
			var sText = (bSelected) ? aContexts.length + " selected" : null;
			oInfoToolbar.setVisible(bSelected);
			oLabel.setText(sText); //teste
		}
		
	})	
})
	