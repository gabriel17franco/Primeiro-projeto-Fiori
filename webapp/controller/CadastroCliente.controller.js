sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
	"sap/ui/core/ID"

], function(
	Controller,
	MessageToast
) {
	"use strict";

	return Controller.extend("project1.controller.CadastroCliente", {
    
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this)
        }, 
        onNavBack(oEvent){
            this.oRouter.navTo("RouteView5")
        },
        adicionarCliente(oEvent){
            return new Promise((resolve, reject) => {
                var oModel = this.getView().getModel()
                var  Costumer = oModel.read("/CostumersSet", {
                    success: function(oData, oResponse){
                    var Id = oData.results.length+1
                    var Id = Id.toString()
                    resolve(Id)            
                    },
                    error: function(oError){
                    reject(oResponse)
                    } 
                })
            }).then( (Id) => {
                var oModel = this.getView().getModel()
                var modelCliente = this.getView().getModel("Costumer").getData()           
                var genero = this.getView().byId("Genero").mProperties.selectedIndex = 0 ? "Masculino" : "Feminino"
                var oCliente = {
                    Costumer: Id,
                    Name: modelCliente.Name,
                    Address: modelCliente.Address,
                    City: modelCliente.City,
                    Phonenumber: modelCliente.Phonenumber,
                    Genero: genero,
                    Info: modelCliente.Info
                }
                oModel.create("/CostumersSet", oCliente, {
                    success: function(oData, oResponse){
                        MessageToast.show("Cliente Adicionado!")
                    },
                    error: function(oError){
                        MessageToast.show("Não foi possível adicionar o cliente")
                    }
                })    
            }).catch((oResponse) =>{
                console.log(oResponse)
            })
        }        
    })
})

