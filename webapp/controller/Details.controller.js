sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/formatter"
], function (BaseController, JSONModel, History, formatter) {
    "use strict";

    return BaseController.extend("com.sampleproject.controller.Details", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit : function () {
            var that = this
            that.getRouter().getRoute("Details").attachPatternMatched(this._onObjectMatched, this);

            var oModel = new JSONModel(jQuery.sap.getModulePath("com.sampleproject", "/model/data.json")

            );
            that.getView().setModel(oModel, "SapDetailModel");
        },
        _onObjectMatched: function(oEvent) {

            

        },
        onConfirmation: function(oEvent){
            var that = this;
            var selectData = [];
            var conPath = that.byId("idProductsTable").getSelectedContextPaths();
            var oLength = conPath.length;
            // for (var i = 0; i < conPath.length; i++) {
                // var selectrow = oLength.split("/").pop();
                // var selectdata = that.getModel("SapDetailModel").getData().Sample[oLength];
                // selectData.push(selectdata);
            // }
            if(oLength === 0){
            sap.m.MessageBox.show(
                "Please select Line Item", {
                    icon: sap.m.MessageBox.Icon.ERROR,
                        title: "Error"
                });
            }else{

            // var oData = that.getView().getModel("SapDetailModel").getData();
            // var selectdata = that.getModel("SapDetailModel").getData().Sample[oLength];
            var oBj = oEvent.getSource();
            var oRouter = sap.ui.core.UIComponent.getRouterFor(that);
            oRouter.navTo("Third", {
            //  objectId1: selectdata
           });
        }
        },
        onCancellation: function(){
            sap.m.MessageBox.show(
                "Please select Line Item", {
                    icon: sap.m.MessageBox.Icon.ERROR,
                        title: "Error"
                });
        },
        onDisplay: function(){
            sap.m.MessageBox.show(
                "Please select Line Item", {
                    icon: sap.m.MessageBox.Icon.ERROR,
                        title: "Error"
                });
        }
    });

});
