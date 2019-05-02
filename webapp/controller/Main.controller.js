sap.ui.define([
	"br/com/idxtecMovimentacaoArmazem/controller/BaseController",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"br/com/idxtecMovimentacaoArmazem/services/Session"
], function(BaseController, Filter, FilterOperator, Session) {
	"use strict";

	return BaseController.extend("br.com.idxtecMovimentacaoArmazem.controller.Main", {
		onInit: function (){
			this._EmpresaId = Session.get("EMPRESA_ID");
			this._UsuarioId = Session.get("USUARIO_ID");
			
			this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			
			var oFilter = new Filter("Empresa", FilterOperator.EQ, this._EmpresaId);
			var oView = this.getView();
			var oTable = oView.byId("tableMovimentacao");
			
			oTable.bindRows({ 
				path: '/MovimentacaoArmazems',
				parameters:{
					expand: 'LoteArmazenagemDetails,MotoristaDetails,ParceiroNegocioDetails,ProdutoDetails,VeiculoDetails'
				},
				sorter: {
					path: 'ParceiroNegocioDetails/RazaoSocial'
				},
				filters: oFilter
			});
		},
		
		filtraMov: function(oEvent){
			var sQuery = oEvent.getParameter("query");
			var oFilter1 = new Filter("Empresa", FilterOperator.EQ, Session.get("EMPRESA_ID"));
			var oFilter2 = new Filter("ParceiroNegocioDetails/RazaoSocial", FilterOperator.Contains, sQuery);
			
			var aFilters = [
				oFilter1,
				oFilter2
			];

			this.getView().byId("tableMovimentacao").getBinding("rows").filter(aFilters, "Application");
		},
		
		getRouter: function (){
			return this.getOwnerComponent().getRouter();
		},
		
		onAdd: function (oEvent){
			var oRouter = this.getRouter();
			oRouter.navTo("FormAddEdit", {
				"query":{
					"action": "add"
				}
			}, false);
		},
		
		onEdit: function (oEvent){
			var oRouter = this.getRouter();
			var oTable = this.getView().byId("tableMovimentacao");
			var nIndex = oTable.getSelectedIndex();
			
			if (nIndex === -1) {
				return;
			}
			var oContext = oTable.getContextByIndex(nIndex);

			oRouter.navTo("FormAddEdit", {
				"query":{
					"action": "edit",
					"id":  oContext.getProperty( "Id" )
				}
			}, false);
		},
		
		onRemove: function (oEvent){
			var that = this;
			var oTable = this.getView().byId("tableMovimentacao");
			var nIndex = oTable.getSelectedIndex();
			
			if (nIndex === -1) {
				return;
			}
			
			sap.m.MessageBox.confirm("Deseja remover esta movimentação?", {
				onClose: function(sResposta){
					if(sResposta === "OK"){
						that._remover(oTable, nIndex);
						sap.m.MessageBox.success("Movimentação removida com sucesso!");
					}
				}
			});
		},
		
		_remover: function(oTable, nIndex){
			var oModel = this.getModel();
			var oContext = oTable.getContextByIndex(nIndex);
			
			oModel.remove(oContext.sPath, {
				success: function(){
					oModel.refresh(true);
					oTable.clearSelection();
				}
			});
		},
	});
});