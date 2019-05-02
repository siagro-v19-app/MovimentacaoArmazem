sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject){
	"use strict";
	
	return BaseObject.extend("br.com.idxtecMovimentacaoArmazem.model.CaracteristicaQualidadeDetails", {
		constructor: function (sId){
			this.__metadata = {
				uri: "/CaracteristicaQualidades('" + sId + "')"
			};
		}
	});
});