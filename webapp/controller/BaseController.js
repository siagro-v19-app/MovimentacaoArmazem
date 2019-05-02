sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"br/com/idxtecMovimentacaoArmazem/helpers/CaracteristicaQualidadeHelpDialog",
	"br/com/idxtecMovimentacaoArmazem/helpers/ContratoCompraHelpDialog",
	"br/com/idxtecMovimentacaoArmazem/helpers/CreditoMonsantoHelpDialog",
	"br/com/idxtecMovimentacaoArmazem/helpers/LoteArmazenagemHelpDialog",
	"br/com/idxtecMovimentacaoArmazem/helpers/MotoristaHelpDialog",
	"br/com/idxtecMovimentacaoArmazem/helpers/ParceiroNegocioHelpDialog",
	"br/com/idxtecMovimentacaoArmazem/helpers/ProdutoHelpDialog",
	"br/com/idxtecMovimentacaoArmazem/helpers/ServicoArmazemHelpDialog",
	"br/com/idxtecMovimentacaoArmazem/helpers/VeiculoHelpDialog"
], function (Controller, History, CaracteristicaQualidadeHelpDialog, ContratoCompraHelpDialog, CreditoMonsantoHelpDialog,
	LoteArmazenagemHelpDialog, MotoristaHelpDialog, ParceiroNegocioHelpDialog, ProdutoHelpDialog,
	ServicoArmazemHelpDialog, VeiculoHelpDialog){
	"use strict";
	
	return Controller.extend("br.com.idxtec.MovimentacaoArmazem.controller.BaseController", {
		getRouter: function (){
			return sap.ui.core.UIComponent.getRouterFor(this);
		},
		
		getModel: function (sModel){
			return this.getOwnerComponent().getModel();
		},
		
		handleSearchProduto: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			ProdutoHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchLote: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			LoteArmazenagemHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchParceiro: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			ParceiroNegocioHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchMotorista: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			MotoristaHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchVeiculo: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			VeiculoHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchContrato: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			ContratoCompraHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchCredito: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			CreditoMonsantoHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchCaracteristica: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			CaracteristicaQualidadeHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		handleSearchServico: function(oEvent){
			var sInputId = oEvent.getParameter("id");
			ServicoArmazemHelpDialog.handleValueHelp(this.getView(), sInputId, this);
		},
		
		_blockTab: function(){
			var oTabContainer = this.getView().byId("tabMov");
	    	
	    	oTabContainer.addEventDelegate({
	        	onAfterRendering: function() {
					var oTabStrip = this.getAggregation("_tabStrip");
					var oItems = oTabStrip.getItems();
					for (var i = 0; i < oItems.length; i++) {
						var oCloseButton = oItems[i].getAggregation("_closeButton");
						oCloseButton.setVisible(false);
					}
	        	}
	    	}, oTabContainer);
		},
		
		navBack : function(){
			var oRouter = this.getRouter();
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				oRouter.navTo("Main", {}, true);
			}
		},
		
		formChanges: function (oEvent){
			var oViewModel = this.getView().getModel("viewModel");
			oViewModel.setProperty("/hasChanges", true);
		},
		
		formChanged: function (){
			return this.getView().getModel("viewModel").getProperty("/hasChanges");
		},
		
		verificaDados: function(oEntry, oItemsClass, oItemsServico, reject){
			if(this._verificaMovimentacao(oEntry)){
				sap.m.MessageBox.warning("Preencha todos os campos obrigatórios!");
				return true;
			}
			
			if(this._verificaClass(oItemsClass)){
				sap.m.MessageBox.warning("Preencha uma classificação!");
				return true;
			}
			
			if(this._verificaServico(oItemsServico)){
				sap.m.MessageBox.warning("Preenche um serviço!");
				return true;
			}
		},
		
		_verificaMovimentacao: function(oEntry){
			if(oEntry.Produto === null || oEntry.Lote === null || oEntry.Parceiro === null || oEntry.Motorista === null
			|| oEntry.Veiculo === null || oEntry.Data === null || oEntry.DescontoLimpeza === null
			|| oEntry.DescontoSecagem === null || oEntry.DescontosDiversos === null || oEntry.PesoBruto === null
			|| oEntry.PesoLiquido === null || oEntry.PesoRecebido === null || oEntry.Tara === null){
				
				return true; 
			} 
		},
		
		_verificaClass: function(oItemsClass){
			if(oItemsClass.length > 0){
				for(var i=0; i<oItemsClass.length; i++){
					if(oItemsClass[i].Caracteristica === null){
						return true;
					}
				}	
			}
			
		},
		
		_verificaServico: function(oItemsServico){
			for(var i=0; i<oItemsServico.length; i++){
				if(oItemsServico[i].Servico === null){
					return true;
				}
			}
		}
	});
});