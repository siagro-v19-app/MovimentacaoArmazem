sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.model.MovimentacaoArmazemClassificacao", {
		constructor: function (){
			this.Id = 0;
			this.Empresa = 0;
			this.Usuario = 0;
			this.Movimentacao = 0;
			this.Servico = null;
			this.Quantidade = 0.00;
			this.ValorUnitario = 0.00;
			this.Total = 0.00;
			this.EmpresaDetails = {};
			this.UsuarioDetails = {};
			this.ServicoArmazemDetails = {};
		}	
	});
});