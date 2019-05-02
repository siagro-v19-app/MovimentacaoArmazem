sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.model.LoteArmazenagemDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/LoteArmazenagems(" + sId + ")"
			};
		}
	});
});