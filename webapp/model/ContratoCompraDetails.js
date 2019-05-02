sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.model.ContratoCompraDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/ContratoCompras('" + sId + "')"
			};
		}
	});
});