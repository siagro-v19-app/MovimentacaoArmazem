sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.model.ParceiroNegocioDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/ParceiroNegocios(" + sId + ")"
			};
		}
	});
});