sap.ui.define([
	"br/com/idxtecMovimentacaoArmazem/controller/BaseController",
	"br/com/idxtecMovimentacaoArmazem/model/MovimentacaoArmazem",
	"sap/ui/model/json/JSONModel",
	"br/com/idxtecMovimentacaoArmazem/services/Session",
	"br/com/idxtecMovimentacaoArmazem/model/MovimentacaoArmazemClassificacao",
	"br/com/idxtecMovimentacaoArmazem/model/MovimentacaoArmazemServico",
	"br/com/idxtecMovimentacaoArmazem/services/MovimentacaoArmazemService",
	"br/com/idxtecMovimentacaoArmazem/model/EmpresaDetails",
	"br/com/idxtecMovimentacaoArmazem/model/UsuarioDetails",
	"br/com/idxtecMovimentacaoArmazem/model/MovimentacaoArmazemDetails"
], function(BaseController, MovimentacaoArmazem, JSONModel, Session, Classificacao, Servico,
	Service, EmpresaDetails, UsuarioDetails, MovimentacaoArmazemDetails) {
	"use strict";

	return BaseController.extend("br.com.idxtecMovimentacaoArmazem.controller.FormAddEdit", {
		onInit: function (){
			var oView = this.getView();
			var oRouter = this.getRouter();
			var oViewModel = new JSONModel();
			var oMovModel = new JSONModel();
			var oItemsClassModel = new JSONModel();
			var oItemsServicoModel = new JSONModel();
			var oModel = this.getModel();
			
			oModel.setDeferredGroups(["group"]);
			
			oViewModel.setData({
				tituloPagina: "",
				hasChanges: false
			});
			
			oView.setModel(oViewModel, "viewModel");
			oView.setModel(oMovModel, "movModel");
			oView.setModel(oItemsClassModel, "classModel");
			oView.setModel(oItemsServicoModel, "servicoModel");
			
			this._EmpresaId = Session.get("EMPRESA_ID");
			this._UsuarioId = Session.get("USUARIO_ID");
			
			oRouter.getRoute("FormAddEdit").attachMatched(this._routerMatch, this);
			
			this._blockTab(); 
		},
		
		_routerMatch: function(oEvent){
			var oView = this.getView();
			var oQuery = oEvent.getParameter("arguments")["?query"];
			var oViewModel = oView.getModel("viewModel");
			var oMovModel = oView.getModel("movModel");
			var oItemsClassModel = oView.getModel("classModel");
			var oItemsServicoModel = oView.getModel("servicoModel");
			
			this._action = oQuery.action;
			
			if (this._action === "add"){
				
				oViewModel.setProperty("/tituloPagina", "Incluir Nova Movimentação");
				
				var oEntry = new MovimentacaoArmazem();
				oEntry.Empresa = this._EmpresaId;
				oEntry.Usuario = this._UsuarioId;
				oEntry.EmpresaDetails = new EmpresaDetails(this._EmpresaId);
				oEntry.UsuarioDetails = new UsuarioDetails(this._UsuarioId);
				oMovModel.setData(oEntry);
				oItemsClassModel.setData([]);
				oItemsServicoModel.setData([]);
				
				oView.byId("produto").setValue(null);
				oView.byId("lote").setValue(null);
				oView.byId("parceironegocio").setValue(null);
				oView.byId("motorista").setValue(null);
				oView.byId("veiculo").setValue(null);
				oView.byId("contrato").setValue(null);
				oView.byId("credito").setValue(null);
				
				
			} else if (this._action === "edit"){
				var service = new Service();
				
				oViewModel.setProperty("/tituloPagina", "Editar Movimentação");
			
				this._id = oQuery.id;
				
				oView.setBusyIndicatorDelay(0);
				oView.setBusy(true);
				
				service.fetchData(this).then(function (){
					oView.setBusy(false);
				});
			}
		},
		
		onAddClass: function (oEvent){
			var oView = this.getView();
			var oItemsClassModel = oView.getModel("classModel");
			var oItems = oItemsClassModel.getProperty("/");
			var oNewItem = new Classificacao();
			
			if (this._action === "edit"){
				oNewItem.Empresa = this._EmpresaId;
				oNewItem.EmpresaDetails = new EmpresaDetails(this._EmpresaId);
				oNewItem.Movimentacao = parseInt(this._id, 0);
				oNewItem.MovimentacaoArmazemDetails = new MovimentacaoArmazemDetails(this._id);
			}
			
			var oNewLine = oItems.concat(oNewItem);
			
			oItemsClassModel.setProperty("/", oNewLine);	
		},
		
		onRemoveClass: function (oEvent){
			var oView = this.getView();
			var oItemsClassModel = oView.getModel("classModel");
			var oTable = this.getView().byId("tableClassificacao");
			var oModel = this.getModel();
			
			var nIndex = oTable.getSelectedIndex();
			
			if ( nIndex > -1 ) {
				var oItems = oItemsClassModel.getProperty( "/" );
				var sId = oItems[nIndex].Id;
				
				if ( sId !== 0 ){
					oModel.remove("/MovimentacaoArmazemClassificacaos(" + sId + ")", {
						groupId: "group"
					});
				}
				
				oItems.splice( nIndex, 1 );
				oItemsClassModel.setProperty( "/", oItems );
				oTable.clearSelection();
			} else {
				sap.m.MessageBox.warning("Selecione um item na tabela!");
			}
		},
		
		onAddServico: function (oEvent){
			var oView = this.getView();
			var oItemsServicoModel = oView.getModel("servicoModel");
			var oItems = oItemsServicoModel.getProperty("/");
			var oNewItem = new Servico();
			
			if (this._action === "edit"){
				oNewItem.Empresa = this._EmpresaId;
				oNewItem.EmpresaDetails = new EmpresaDetails(this._EmpresaId);
				oNewItem.Movimentacao = parseInt(this._id, 0);
				oNewItem.MovimentacaoArmazemDetails = new MovimentacaoArmazemDetails(this._id);
			}
			
			var oNewLine = oItems.concat(oNewItem);
			
			oItemsServicoModel.setProperty("/", oNewLine);	
		},
		
		onRemoveServico: function (oEvent){
			var oView = this.getView();
			var oItemsServicoModel = oView.getModel("servicoModel");
			var oTable = this.getView().byId("tableServico");
			var oModel = this.getModel();
			
			var nIndex = oTable.getSelectedIndex();
			
			if ( nIndex > -1 ) {
				var oItems = oItemsServicoModel.getProperty( "/" );
				var sId = oItems[nIndex].Id;
				
				if ( sId !== 0 ){
					oModel.remove("/MovimentacaoArmazemServicos(" + sId + ")", {
						groupId: "group"
					});
				}
				
				oItems.splice( nIndex, 1 );
				oItemsServicoModel.setProperty( "/", oItems );
				oTable.clearSelection();
			} else {
				sap.m.MessageBox.warning("Selecione um item na tabela!");
			}
		},
		
		onSave: function (oEvent){
			var that = this;
			var service = new Service();
			var oView = this.getView();
			var oViewModel = oView.getModel("viewModel");
			
			oView.setBusyIndicatorDelay(0);
			oView.setBusy(true);
				
			if (this._action === "add"){
				
				service.insert(this).then(function (){
					sap.m.MessageBox.success("Movimentação inserida com sucesso!",{
						onClose: function() {
							oViewModel.setProperty("/hasChanges", false);
							that.navBack();
						}
					});		
				}).finally(function (){
					oView.setBusy(false);
				});
				
			} else if (this._action === "edit"){
				
				service.update(this).then(function (){
					sap.m.MessageBox.success("Movimentação alterada com sucesso!",{
						onClose: function() {
							oViewModel.setProperty("/hasChanges", false);
							that.navBack();
						}
					});		
				}).finally(function (){
					oView.setBusy(false);
				});
			}
		},
		
		onCancel: function (){
			var oViewModel = this.getView().getModel("viewModel");
			var that = this;
			this.navBack();
			/*if ( this.formChanged() ) {
				sap.m.MessageBox.warning("Deseja descartar as alterações realizadas ?",{
					actions: [sap.m.MessageBox.Action.YES, sap.m.MessageBox.Action.NO],
					onClose: function(sAction) {
						if (sAction === "YES"){
							oViewModel.setProperty("/hasChanges", false);
							that.navBack();
						}
					}
				});
			} else {
				this.navBack();
			}*/
		}
	});
});