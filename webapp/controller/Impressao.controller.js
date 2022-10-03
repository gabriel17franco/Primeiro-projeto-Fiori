sap.ui.define([
    "sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	'sap/m/MessageToast',
	'jquery.sap.global',
	'sap/ui/model/Filter',
	'sap/ui/core/Fragment'

], function(
	Controller, JSONModel, jQuery,  MessageToast, Fragment, Filter
    
) {
	"use strict";

	return Controller.extend("project1.controller.Impressao", {
        
        onInit: function () {
            this.getSplitAppObj().setHomeIcon({
				'phone':'phone-icon.png',
				'tablet':'tablet-icon.png',
				'icon':'desktop.ico'
			});
			
			this.oRouter = sap.ui.core.UIComponent.getRouterFor(this)
			
			var mock = {
					"results" : [
					{
					  "Invoice": 123213,
					  "Valor": 50,
					  "Status": "Sucesso"
					},
					{
					  "Invoice": 324324,
					  "Valor": 95,
					  "Status": "Falhou"
					},
					{
					  "Invoice": 787987,
					  "Valor": 25,
					  "Status": "Analise"
					},
					{
					  "Invoice": 123213,
					  "Valor": 50,
					  "Status": "Sucesso"
					},
					{
					  "Invoice": 324324,
					  "Valor": 95,
					  "Status": "Falhou"
					},
					{
					  "Invoice": 787987,
					  "Valor": 25,
					  "Status": "Analise"
					},
					{
					  "Invoice": 123213,
					  "Valor": 50,
					  "Status": "Sucesso"
					},
					{
					  "Invoice": 324324,
					  "Valor": 95,
					  "Status": "Falhou"
					},
					{
					  "Invoice": 787987,
					  "Valor": 25,
					  "Status": "Analise"
					}
				]
			}
			var oViewModel =  new JSONModel({
				"Invoice": "",
				"Valor": "",
				"Status": ""
			})
			  
			oViewModel.setData(mock)
			this.getView().setModel(oViewModel, "list")
	
        },
		onOrientationChange: function(oEvent) {
			var bLandscapeOrientation = oEvent.getParameter("landscape"),
				sMsg = "Orientation now is: " + (bLandscapeOrientation ? "Landscape" : "Portrait");
			MessageToast.show(sMsg, {duration: 5000});
		},

		onPressNavToDetail : function(oEvent) {
			this.getSplitAppObj().to(this.createId("detailDetail"));
		},

		onPressDetailBack : function() {
			this.getSplitAppObj().backDetail();
		},

		onPressMasterBack : function() {
			this.getSplitAppObj().backMaster();
		},

		onPressGoToMaster : function() {
			this.getSplitAppObj().toMaster(this.createId("master2"));
		},

		onListItemPress : function(oEvent) {
			var sToPageId = oEvent.getParameter("listItem").getCustomData()[0].getValue();

			this.getSplitAppObj().toDetail(this.createId(sToPageId));
		},

		onPressModeBtn : function(oEvent) {
			var sSplitAppMode = oEvent.getSource().getSelectedButton().getCustomData()[0].getValue();

			this.getSplitAppObj().setMode(sSplitAppMode);
			MessageToast.show("Split Container mode is changed to: " + sSplitAppMode, {duration: 5000});
		},

		getSplitAppObj : function() {
			var result = this.byId("SplitAppDemo");
			if (!result) {
				jQuery.sap.log.info("SplitApp object can't be found");
			}
			return result;
		},
		onListItemPress: function (oEvent){
			debugger
		},
		CarregarDados: function(){
		var that = this
		var JsonData =	FileUpload(that)
		
			function FileUpload(that){
				var oFileUpload = that.getView().byId("fileUploaderFS")
				var domRef = oFileUpload.getFocusDomRef()
				var file = domRef.files[0]
				that.fileName = file.name
				that.fileType = file.type
				var reader = new FileReader()
				 
				reader.onload = function (e) {	
					var unicode = e.currentTarget.result	
					csvToJson(unicode, that)
				}
				 
				reader.readAsBinaryString(file);
			
			}	
			
			function csvToJson(unicode, that){
				var array = unicode.split("\r\n");
				var result = [];
				let headers = array[0].split(";")
				
				for(let i = 1; i < array.length - 1; i++) {
					let obj = {}
					let str = array[i]
					let s = ''
					let flag = 0
					for (let ch of str) {
						if (ch === '"' && flag === 0) {
							flag = 1
						}
						else if (ch === '"' && flag == 1) flag = 0
						if (ch === ';' && flag === 0) ch = '|'
						if (ch !== '"') s += ch
					}
					  
					let properties = s.split("|")	
						for (let j in headers) {
							   if (properties[j].includes(";")) {
								obj[headers[j]] = properties[j].split(";").map(item => item.trim())
							}
							else obj[headers[j]] = properties[j]
						   }
						result.push(obj)
				}
				var string = JSON.stringify(result)
				debugger
				var teste = {
					Json : string
				}
				debugger
				//that.getView().setModel(teste, "teste")
				var oModel = that.getView().getModel()
				oModel.create("/TestJsonSet", teste, {
					success: function(oData, oResponse){
					
					debugger
				},
					error: function(oError){
					debugger
					}
				})
				
				//setData(result, that) 
				
			
			
			}	
			
			function setData(JsonData, that){
				var Object = new JSONModel({
					toppings : []

				})
				
				that.getView().setModel(Object, "ObjectModel")
				that.getView().getModel("ObjectModel").setProperty("/toppings", JsonData)
				
			}
			


		}		
	})
})