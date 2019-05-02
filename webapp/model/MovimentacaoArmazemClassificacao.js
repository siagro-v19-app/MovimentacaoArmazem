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
			this.Caracteristica = null;
			this.Valor = 0.00;
			this.EmpresaDetails = {};
			this.UsuarioDetails = {};
			this.CaracteristicaQualidadeDetails = {};
		}	
	});
});