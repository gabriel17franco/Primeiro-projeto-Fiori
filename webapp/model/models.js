sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            createDeviceModel: function () {
                var oModel = new JSONModel(Device)
                oModel.setDefaultBindingMode("TwoWay")
                return oModel
            },
             CostumerModel: function () {
                var oModel = new JSONModel({
                    Costumer: "",
                    Name: "",
                    Address: "",
                    City: "",
                    Phonenumber: "",
                    Genero: "",
                    Info: ""
                })
                return oModel
            },
            PurchaseModel: function () {
                var oModel = new JSONModel({
                    Purchase: "",
                    Costumer: "",
                    Status: "",
                    Payment: "",
                    Delivery: "",
                    Createdon: "",
                    Total: ""
                })
                return oModel
            },
            ProductModel: function() {
                var oModel = new JSONModel({
                    Product: "",
                    Productname: "",
                    Description: "",
                    Price: "" 
                })
                return oModel
            },
            RequestModel: function() {
                var oModel = new JSONModel({
                    Purchase: "",
                    Request: "",
                    Product: "",
                    Costumer: ""
                })
                return oModel
            },
            PurchaseHeaderModel: function(){
                var oModel = new JSONModel({
                    Purchase: "",
                    Costumer: "",
                    Status: "",
                    Payment: "",
                    Delivery: "",
                    Total: "",
                    Createdon:"",
                    Name: "",
                    Address: "",
                    Phonenumber: "",
                    City: "",
                    Genero: "",
                    Info: ""
                })
                return oModel
            },
            ItemsModel: function() {
                var oModel = new JSONModel({
                    Purchase: "",
                    Productname: "",
                    Description: ""
                })
                return oModel
            },
            object: function(){
                var oModel = new JSONModel({
                    Invoice: "",
                    Data: "",
                    Docnum: "",
                    Valor: ""
                })
                return oModel
            }
           
        }
    })