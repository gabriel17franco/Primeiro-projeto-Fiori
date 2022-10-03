sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/Filter", 
    "sap/ui/model/FilterOperator",
    "project1/utils/formatter",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller,
	Filter,
	FilterOperator,
	formatter, 
    JSONModel
	) {
        "use strict";
       
        return Controller.extend("project1.controller.Principal", {
            
            formatter: formatter,
        
            onInit: function () {
                this._smartFilterBar = this.getView().byId("smartFilterBar")
                this.oRouter = sap.ui.core.UIComponent.getRouterFor(this)
               
            }, 
            onBeforeRebindTable(oEvent) {
                var mBindingParams = oEvent.getParameter("bindingParams")
                var oMultiComboBox1 = this.getView().byId("Delivery")
                var oMultiComboBox = this.getView().byId("Status")
                var aCountKeys1 = oMultiComboBox1.getSelectedKeys();
                var aCountKeys = oMultiComboBox.getSelectedKeys();
                for (var i = 0; i < aCountKeys.length; i++) {
                    var newFilter = new Filter("Status", FilterOperator.EQ, aCountKeys[i]);
                    if (aCountKeys.length > 0) {
                        mBindingParams.filters.push(newFilter);
                    }
                }
                for (var i = 0; i < aCountKeys1.length; i++) {
                    var newFilter1 = new Filter("Delivery", FilterOperator.EQ, aCountKeys1[i]);
                    if (aCountKeys1.length > 0) {
                        mBindingParams.filters.push(newFilter1)
                    }
                }
            },
            onNavigationPress(oEvent){
                var that = this;
                var oModel = this.getView().getModel() 
                var oRow = oEvent.getSource()
                var PurchaseId = oRow.getBindingContext().getProperty("Purchase")
                var sRead = oModel.createKey("/PurchasesViewSet", {
                    Purchase : PurchaseId  
                })   
                oModel.read( sRead, {
                    success: function(oData, oResponse){
                        that.getView().getModel("PurchaseHeader").setData(oData)
                        that.oRouter.navTo("RouteView4", {
                            purchasePath: window.encodeURIComponent(oRow.getBindingContext().getPath().substr(19, 3))
                        })                   
                    },
                    error: function(oError){
                      
                    }
                })
            },  
            criarPedido(oEvent){
                this.oRouter.navTo("RouteView5")
            },
            
            criarProduto: function(oEvent){
                this.oRouter.navTo("RouteView3")
            },
            visualizar(oEvent){
                this.oRouter.navTo("RouteView6")
            }
        });
    });


    