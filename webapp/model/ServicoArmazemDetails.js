sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.model.ServicoArmazemDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/ServicoArmazems('" + sId + "')"
			};
		}
	});
});