sap.ui.define([
	"sap/ui/base/Object",
	"br/com/idxtecMovimentacaoArmazem/services/Session",
	"br/com/idxtecMovimentacaoArmazem/model/CaracteristicaQualidadeDetails",
	"br/com/idxtecMovimentacaoArmazem/model/ContratoCompraDetails",
	"br/com/idxtecMovimentacaoArmazem/model/CreditoMonsantoDetails",
	"br/com/idxtecMovimentacaoArmazem/model/EmpresaDetails",
	"br/com/idxtecMovimentacaoArmazem/model/LoteArmazenagemDetails",
	"br/com/idxtecMovimentacaoArmazem/model/MotoristaDetails",
	"br/com/idxtecMovimentacaoArmazem/model/ParceiroNegocioDetails",
	"br/com/idxtecMovimentacaoArmazem/model/ProdutoDetails",
	"br/com/idxtecMovimentacaoArmazem/model/ServicoArmazemDetails",
	"br/com/idxtecMovimentacaoArmazem/model/UsuarioDetails",
	"br/com/idxtecMovimentacaoArmazem/model/VeiculoDetails"
], function (BaseObject, Session, CaracteristicaQualidadeDetails, ContratoCompraDetails, CreditoMonsantoDetails,
	EmpresaDetails, LoteArmazenagemDetails, MotoristaDetails, ParceiroNegocioDetails, ProdutoDetails, 
	ServicoArmazemDetails, UsuarioDetails, VeiculoDetails){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.services.MovimentacaoArmazemService",{
		
		fetchData: function (oController){
			
			return new Promise(function (resolve, reject){
				
				var oView = oController.getView();
				var oModel = oController.getModel();
				var oMovModel = oView.getModel("movModel");
				var oItemsClassModel = oView.getModel("classModel");
				var oItemsServicoModel = oView.getModel("servicoModel");
				
				oModel.read("/MovimentacaoArmazems(" + oController._id + ")", {
					groupId: "group",
					success: function (oData, oResponse){
						oData.Usuario = oController._UsuarioId;
						oData.UsuarioDetails = new UsuarioDetails(oController._UsuarioId);
						oMovModel.setData(oData);	
					}
				});
				
				oModel.read("/MovimentacaoArmazemClassificacaos", {
					groupId: "group",
					filters:[
						new sap.ui.model.Filter({
							path: "Movimentacao",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: oController._id
						})
					],
					
					success: function (oData){
						oItemsClassModel.setData(oData.results);
					}
				});
				
				oModel.read("/MovimentacaoArmazemServicos", {
					groupId: "group",
					filters:[
						new sap.ui.model.Filter({
							path: "Movimentacao",
							operator: sap.ui.model.FilterOperator.EQ,
							value1: oController._id
						})
					],
					
					success: function (oData){
						oItemsServicoModel.setData(oData.results);
					}
				});
				
				oModel.submitChanges({
					groupId: "group",
					success: function(oResponse) {
						var erro = oResponse.__batchResponses[0].response;
						if (!erro) {
							resolve();
						} else {
							reject(erro);
						}
					}
				});
				
			});	

		},
		
		insert: function (oController) {
			var that = this;
			return new Promise(function (resolve, reject){
				var oView = oController.getView();
				var oModel = oController.getModel();
				var oEntry = that._getData(oController);
				var oItemsClass = oView.getModel("classModel").getData();
				var oItemsServico = oView.getModel("servicoModel").getData();
				
				var EmpresaId = Session.get("EMPRESA_ID");
				var UsuarioId = Session.get("USUARIO_ID");

				if(that.verificaDados(oEntry, oItemsClass, oItemsServico, reject)){
					reject();
					return;
				}
				
				for(var i = 0; i < oItemsClass.length; i++){
					oItemsClass[i].Usuario = UsuarioId;
					oItemsClass[i].UsuarioDetails = new UsuarioDetails(UsuarioId);
					oItemsClass[i].Empresa = EmpresaId;
					oItemsClass[i].EmpresaDetails = new EmpresaDetails(EmpresaId);                         
					oItemsClass[i].CaracteristicaQualidadeDetails = new CaracteristicaQualidadeDetails(oItemsClass[i].Caracteristica);
					oEntry.MovimentacaoArmazemClassificacaoDetails.push(oItemsClass[i]);
				}

				for(var j = 0; j < oItemsServico.length; j++){
					oItemsServico[j].Usuario = UsuarioId;
					oItemsServico[j].UsuarioDetails = new UsuarioDetails(UsuarioId);
					oItemsServico[j].Empresa = EmpresaId;
					oItemsServico[j].EmpresaDetails = new EmpresaDetails(EmpresaId);                         
					oItemsServico[j].ServicoArmazemDetails = new ServicoArmazemDetails(oItemsServico[j].Servico);
					oEntry.MovimentacaoArmazemServicoDetails.push(oItemsServico[j]);
				}

				oModel.create("/MovimentacaoArmazems", oEntry, {
					success: function (oData){
						resolve(oData);					
					},
					error: function(oError){
						reject(oError);
					}
				});		
			});
		},
		
		update: function (oController) {
			var that = this;
			return new Promise(function(resolve, reject){
				var oView  = oController.getView();
				var oModel = oController.getModel();
				var oEntry = that._getData(oController);
				var oItemsClass = oView.getModel("classModel").getData();
				var oItemsServico = oView.getModel("servicoModel").getData();
				
				var sId = oController._id;
				var UsuarioId = Session.get("USUARIO_ID");
				
				if(that.verificaDados(oEntry, oItemsClass, oItemsServico, reject)){
					reject();
					return;
				}
				
				for(var i = 0; i < oItemsClass.length; i++){
					var sItemClassId = oItemsClass[i].Id;
					oItemsClass[i].Usuario = UsuarioId;
					oItemsClass[i].UsuarioDetails = new UsuarioDetails(UsuarioId);
					oItemsClass[i].CaracteristicaQualidadeDetails = new CaracteristicaQualidadeDetails(oItemsClass[i].Caracteristica);
					
					if (sItemClassId === 0) {
						oModel.create("/MovimentacaoArmazemClassificacaos", oItemsClass[i], {
							groupId: "group"
						});
					} else {
						oModel.update("/MovimentacaoArmazemClassificacaos(" + sItemClassId + ")", oItemsClass[i], {
							groupId: "group"
						});
					}
				}
				
				for(var j = 0; j < oItemsServico.length; j++){
					var sItemServicoId = oItemsServico[j].Id;
					oItemsServico[j].Usuario = UsuarioId;
					oItemsServico[j].UsuarioDetails = new UsuarioDetails(UsuarioId);
					oItemsServico[j].ServicoArmazemDetails = new ServicoArmazemDetails(oItemsServico[j].Servico);
					
					if (sItemServicoId === 0) {
						oModel.create("/MovimentacaoArmazemServicos", oItemsServico[j], {
							groupId: "group"
						});
					} else {
						oModel.update("/MovimentacaoArmazemServicos(" + sItemServicoId + ")", oItemsServico[j], {
							groupId: "group"
						});
					}
				}
				
				oModel.update("/MovimentacaoArmazems(" + sId + ")", oEntry, {
					groupId: "group"
				});
			
				oModel.submitChanges({
					groupId: "group",
					success: function(oResponse) {
						var erro = oResponse.__batchResponses[0].response;
						if (!erro) {
							resolve();
						} else {
							reject(erro);
						}
					}
				});
			});
		},
		
		_getData: function (oController){
			var oView = oController.getView();
			var oEntry = oView.getModel("movModel").getData();
			
			oEntry.ContratoCompraDetails = new ContratoCompraDetails(oEntry.ContratoCompra);
			oEntry.CreditoMonsantoDetails = new CreditoMonsantoDetails(oEntry.CreditoMonsanto);
			oEntry.LoteArmazenagemDetails = new LoteArmazenagemDetails(oEntry.Lote);
			oEntry.MotoristaDetails = new MotoristaDetails(oEntry.Motorista);
			oEntry.ParceiroNegocioDetails = new ParceiroNegocioDetails(oEntry.Parceiro);
			oEntry.ProdutoDetails = new ProdutoDetails(oEntry.Produto);
			oEntry.VeiculoDetails = new VeiculoDetails(oEntry.Veiculo);
			
			oEntry.CreditoMonsanto = oEntry.CreditoMonsanto ? oEntry.CreditoMonsanto : 0; 
			
			return oEntry;
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