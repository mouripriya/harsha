sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "sap/ui/core/routing/History",
    "../model/formatter"
], function (BaseController, JSONModel, History, formatter) {
    "use strict";

    return BaseController.extend("com.sampleproject.controller.Third", {

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
            that.getRouter().getRoute("Third").attachPatternMatched(this._onObjectMatched, this);

            // var oModel = new JSONModel(jQuery.sap.getModulePath("com.sampleproject", "/model/data.json")

            // );
            // that.getView().setModel(oModel, "SapDetailModel");
            var oModel1 = new JSONModel({

                Quantity: "",
                ReasonforVar: "",
                kayValue: "info"
                
                
                    });
 
            that.getView().setModel(oModel1, "viewModel");


            // var oTableModel = new JSONModel("model/sample.json");
            // that.getView().setModel("oTableModel");

            var oTableModel1 = new JSONModel(jQuery.sap.getModulePath("com.sampleproject", "/model/sample.json")

            );
            that.getView().setModel(oTableModel1, "oTableModel");
        },
        _onObjectMatched: function(oEvent) {

            

        },
        onFilterSelect: function(oEvent){
            var that = this;
        
            // var oItems = oEvent.getParameters("items");
            var oKey  = oEvent.getParameter("key");
            var oModel = that.getView().getModel("viewModel").getData();
            var Quantity = that.getView().getModel("viewModel").getData().Quantity;
            var ReasonforVar = that.getView().getModel("viewModel").getData().ReasonforVar;
            


            var  tabBar = that.getView().byId("Icon1").getItems();
            var oLength = tabBar.length;
        //    var oBar =  tabBar.setIconTabFilter(false);
            
            
            // if(oKey === "info1" ){
            if(Quantity === ""  ){
                // that.getView().byId("Icon1").setSelectedKey("info");
                that.getView().getModel("viewModel").setProperty("/kayValue","info");
               
                    
                // sap.m.MessageBox.show(
                //     "Please Fill input Values", {
                //         icon: sap.m.MessageBox.Icon.ERROR,
                //             title: "Error"
                //     });

                    sap.m.MessageBox.show("Please Fill Quantity", {
                        icon: sap.m.MessageBox.Icon.ERROR,
                        title: "Error",
                        actions: [sap.m.MessageBox.Action.OK],
                        onClose: function (oAction) {
                            if (oAction === sap.m.MessageBox.Action.OK) {
                            // that.getView().getModel("viewModel").setProperty("/kayValue","info");
                                    
                           }

                       }
                   });
                   
                
                
           
            }else if(ReasonforVar === ""){
                that.getView().getModel("viewModel").setProperty("/kayValue","info");
                sap.m.MessageBox.show("Please Fill input ReasonFor", {
                    icon: sap.m.MessageBox.Icon.ERROR,
                    title: "Error",
                    actions: [sap.m.MessageBox.Action.OK],
                    onClose: function (oAction) {
                        if (oAction === sap.m.MessageBox.Action.OK) {
                        // that.getView().getModel("viewModel").setProperty("/kayValue","info");
                                
                       }

                   }
               });
            }
            else if(Quantity !== "" && ReasonforVar !== ""){
                var oTable = that.getView().byId("idProductsTable");
            }
        
            
            
            

        },
        onSubmit: function(oEvent){
             var that = this;
            var oTable = that.getView().getModel("oTableModel").getData();
        
            var ActualDataQuantity = that.getView().getModel("viewModel").getProperty("/Quantity");
            var oActualDataQuantity = parseInt(ActualDataQuantity);
            var oTableQuantity = parseInt(0) ;

            for(var i = 0; i < oTable.Sample.length; i++){
                if(oTable.Sample[i].Quantity!==""){
                oTableQuantity = oTableQuantity + parseInt(oTable.Sample[i].Quantity);
                }
                
            }
            if(oTableQuantity !== oActualDataQuantity){
                    
                    sap.m.MessageBox.show(
                           "ActualData values not Equal to table Quantity values", {
                                icon: sap.m.MessageBox.Icon.ERROR,
                                 title: "Error"
                            });
                        
                }


            

        }
    });
});