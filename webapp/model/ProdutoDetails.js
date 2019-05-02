sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.model.ProdutoDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/Produtos(" + sId + ")"
			};
		}
	});
});