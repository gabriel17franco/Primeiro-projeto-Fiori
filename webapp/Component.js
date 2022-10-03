sap.ui.define([
        "sap/ui/core/UIComponent",
        "sap/ui/Device",
        "project1/model/models"
    ],
    function (UIComponent, Device, models) {
        "use strict";

        return UIComponent.extend("project1.Component", {
            metadata: {
                manifest: "json"
            },

            /**
             * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
             * @public
             * @override
             */
            init: function () {
                // call the base component's init function
                UIComponent.prototype.init.apply(this, arguments);

                // enable routing
                this.getRouter().initialize();

                // set the device model
                this.setModel(models.createDeviceModel(), "device"
                this.setModel(models.CostumerModel(), "Costumer")
                this.setModel(models.PurchaseModel(), "Purchase")
                this.setModel(models.ProductModel(), "Product")
                this.setModel(models.RequestModel(), "Request")
                this.setModel(models.PurchaseHeaderModel(), "PurchaseHeader")
                this.setModel(models.ItemsModel(), "ItemsModel")
                this.setModel(models.object(), "ObjectModel")
            }
        });
    }
);