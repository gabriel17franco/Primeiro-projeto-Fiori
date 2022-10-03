sap.ui.define([
	"sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter", 
    "sap/ui/model/FilterOperator",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
	  "sap/m/MessageToast",
	  "sap/m/Select"

], function(
	Controller,
	Filter,
	FilterOperator,
	JSONModel,
	formatter,
	MessageToast,
 
) {
	"use strict";

	return Controller.extend("project1.controller.DetalhePedido", {
        formatter: formatter,
        onInit: function () {
            this.oRouter = sap.ui.core.UIComponent.getRouterFor(this)
            this.oRouter.getRoute("RouteView4").attachBeforeMatched(this._onObjectMatched, this)
     
        },
        _onObjectMatched: function(oEvent){
            this.getView().bindElement({
                path: "/" + window.decodeURIComponent(oEvent.getParameter("arguments").purchasePath),
                model: "PurchaseHeader"
            })
            var that = this
            var oViewModel = new JSONModel({
                Purchase: "",
                Productname: "",
                Description: ""
            })
            var oModel = this.getView().getModel()
         
            var cod = this.getView().byId("title")

            var sRead = "/PurchasesSet"+"("+"'"+(cod.mProperties.text.substring(23, 26))+"'"+")"+"/GetItems"
            oModel.read( sRead, {
                success: function(oData, oResponse){
                    oViewModel.setData(oData)
                    that.getView().setModel(oViewModel, "list")
                },
                error: function(oError){
                  console.log(oError)
                }
            })    
           
        },
        atualizarStatus(oEvent, status) {
          debugger
          var that = this
          if (oEvent.mParameters.id.substring(12) == "cancelar")
            setStatus(that, "Cancelado")
          else 
            setStatus(that, pegarStatus(that))
        
          function pegarStatus(that){
            var oSelect= that.byId("status2").mProperties.selectedKey
            switch(oSelect){
                case 'PE':
                  oSelect = "Pendente"
                  break
                  case 'PR':
                  oSelect = "Preparando"
                  break
                  case 'EN':
                  oSelect = "Entregue"
                  break
                  case 'CO':
                  oSelect = "Concluído"
                  break
                  default:
            }
            return oSelect
          } 
          
          function setStatus(that, status){
            var oModelPurchase = that.getView().getModel("PurchaseHeader");
            var oModel = that.getView().getModel();
            var oCurrentPurchase = oModelPurchase.getData();
            
            var oUpdatePurchase = {
              Purchase:  oCurrentPurchase.Purchase,
              Costumer:  oCurrentPurchase.Costumer,
              Status:   status,
              Payment:  oCurrentPurchase.Payment,
              Delivery:  oCurrentPurchase.Delivery,
              Createdon:  oCurrentPurchase.Createdon,
              Total:  oCurrentPurchase.Total
            }
            
            var sUpdate = oModel.createKey("/PurchasesSet", {
              method: "PUT",
              Purchase: oUpdatePurchase.Purchase
            });
            
            oModel.update(sUpdate, oUpdatePurchase, { 
              success: function (Odata, oResponse) {
                MessageToast.show("Atualizado")
                oModel.refresh();
                that.oRouter.navTo("RouteView1")
              },
              error: function (oError) {
                console.log("Falha!")
              }
            })
          }
        },
        onNavBack(oEvent){
          this.oRouter.navTo("RouteView1")
        }                                                        
    })
})

//   atualizarStatus(oEvent)
// oModel.remove("/PurchasesSet('" + cod + "')", {
//  method: "DELETE",                                                                
// success: function (odata, Response) {                                                               
//  MessageToast.show("Cancelado!")
//  this.oRouter.navTo("RouteView1")	
// },
// error: function (oResponse) {
//   MessageToast.show("Erro ao deletar!")
// }
// });
// this.oRouter.navTo("RouteView1")                                                                                                                             
                                                                