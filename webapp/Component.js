sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"br/com/idxtecMovimentacaoArmazem/model/models",
	"br/com/idxtecMovimentacaoArmazem/services/ErrorHandler"
], function(UIComponent, Device, models, ErrorHandler) {
	"use strict";

	return UIComponent.extend("br.com.idxtecMovimentacaoArmazem.Component", {

		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 * @public
		 * @override
		 */
		init: function() {
			this._oErrorHandler = new ErrorHandler(this);
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);

			// set the device model
			this.setModel(models.createDeviceModel(), "device");
			
			this.getRouter().initialize();
			
			this.getModel().setSizeLimit(1000000);
		},
		
		destroy: function(){
			this._oErrorHandler.destroy();
			
			UIComponent.prototype.destroy.apply(this, arguments);
		},
		
		getContentDensityClass: function(){
			if(!this._sContentDensityClass){
				if(!sap.ui.Device.support.touch){
					this._sContentDensityClass = "sapUiSizeCompact";
				} else {
					this._sContentDensityClass = "sapUiSizeCozy";
				}
			}
			return this._sContentDensityClass;
		}
	});
});