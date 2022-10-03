sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/Filter", 
    "sap/ui/model/FilterOperator",
    "project1/utils/formatter",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageToast"
], function(
	Controller,
	Filter,
	FilterOperator,
	formatter,
	JSONModel,
	MessageToast
) {
	"use strict"

	return Controller.extend("project1.controller.CadastroProduto", {
		onInit: function () {
           // this._smartFilterBar = this.getView().byId("smartFilterBar")
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this)
        }, 
        onNavBack(oEvent){
            this.oRouter.navTo("RouteView1")
        },
		cancelar(oEvent){
			this.oRouter.navTo("RouteView1")
		},
		salvarProduto(oEvent){
			return new Promise((resolve, reject) => {
                var oModel = this.getView().getModel()
                var  Product = oModel.read("/ProductsSet", {
                    success: function(oData, oResponse){
                        var Id = oData.results.length+1
                        var Id = Id.toString()
                        resolve(Id)            
                    },
                    error: function(oError){
                        reject(oResponse)
                    } 
                })  
            }).then((Id)=>{
                var modelProduct = this.getView().getModel("Product").getData()
                var oModel = this.getView().getModel()
                var oProduct = {
                    Product: Id,
                    Productname: modelProduct.Productname,
                    Description: modelProduct.Description,
                    Price: modelProduct.Price
                }
                oModel.create("/ProductsSet", oProduct, {
                    success: function(oData, oResponse){
                    MessageToast.show("Produto criado com sucesso!")
                    },
                    error: function(oError){
                    MessageToast.show("Não foi possível criar o producto")
                    }   
                })
            })
		
	    }
	})
})