sap.ui.define([
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator"
],function (Filter, FilterOperator) {
	"use strict";
	
	return {
		
		handleValueHelp: function(oView, sInputId, oController) {
			this._oView = oView;
			this._inputId = sInputId;
			
			oController.getOwnerComponent().getModel().refresh(true);
			
			var sFrag = "br.com.idxtecMovimentacaoArmazem.helpers.CreditoMonsantoHelpDialog"; 
			if (!this._valueHelpDialog) {
				this._valueHelpDialog = sap.ui.xmlfragment(sFrag,this);
				this._oView.addDependent(this._valueHelpDialog);
			}
							
			this._valueHelpDialog.open();
		},
		
		_handleValueHelpSearch : function (evt) {
			var sValue = evt.getParameter("value");
			var aFilters = [];
			var oFilter1 = new sap.ui.model.Filter( "Descricao", sap.ui.model.FilterOperator.Contains, sValue);
			aFilters.push(oFilter1);
			
			evt.getSource().getBinding("items").filter(aFilters);
		},
		
		
		_handleValueHelpClose : function (evt) {
			var oSelectedItem = evt.getParameter("selectedItem");
			if (oSelectedItem) {
				var oInput = sap.ui.getCore().byId(this._inputId); 
				var oCells = oSelectedItem.getCells();
				
				var sId = oCells[0].getNumber();

				oInput.setSelectedKey(sId);
			}
			evt.getSource().getBinding("items").filter([]);
			
			this._valueHelpDialog = undefined;
		}
		
	};
	
});