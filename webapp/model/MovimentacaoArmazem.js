sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.model.OrdemServicoPlantio", {
		constructor: function(){
			this.Id = 0;
			this.Operacao = "EXPEDIÇÃO";
			this.Produto = 0;
			this.Lote = 0;
			this.Parceiro = 0;
			this.Motorista = 0;
			this.Veiculo = 0;
			this.Data = new Date();
			this.Tara = 0.00;
			this.DataHoraTara = new Date();
			this.PesoBruto = 0.00;
			this.DataHoraPesoBruto = new Date();
			this.PesoLiquido = 0.00;
			this.PesoRecebido = 0.00;
			this.DescontoLimpeza = 0.00;
			this.DescontoSecagem = 0.00;
			this.DescontosDiversos = 0.00;
			this.ContratoCompra = "";
			this.CreditoMonsanto = 0;
			this.NumeroNotaFiscal = "";
			this.ChaveNotaFiscal = "";
			this.SerieNotaFiscal = "";
			this.QuantidadeNotaFiscal = 0.00;
			this.ValorUnitarioNotaFiscal = 0.00;
			this.ValorTotalNotaFiscal = 0.00;
			this.Quadro = "";
			this.Observacoes = "";
			this.Empresa = 0;
			this.Usuario = 0;
			this.EmpresaDetails = {};
			this.UsuarioDetails = {};
			this.ProdutoDetails = {};
			this.LoteArmazenagemDetails = {};
			this.ParceiroNegocioDetails = {};
			this.MotoristaDetails = {};
			this.VeiculoDetails = {};
			this.ContratoCompraDetails = {};
			this.CreditoMonsantoDetails = {};
			this.MovimentacaoArmazemClassificacaoDetails = [];
			this.MovimentacaoArmazemServicoDetails = [];
		}
	});
});