sap.ui.define([
    "./BaseController",
    "sap/ui/model/json/JSONModel",
    "../model/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    'sap/ui/core/Fragment',
    "sap/m/MessageBox"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator, Fragment,MessageBox) {
    "use strict";

    return BaseController.extend("com.sampleproject.controller.Worklist", {

        formatter: formatter,

        /* =========================================================== */
        /* lifecycle methods                                           */
        /* =========================================================== */

        /**
         * Called when the worklist controller is instantiated.
         * @public
         */
        onInit: function () {
            var oViewModel;
            var that = this;
            // keeps the search state
            this._aTableSearchState = [];

            // Model used to manipulate control states
            oViewModel = new JSONModel({
                worklistTableTitle: this.getResourceBundle().getText("worklistTableTitle"),
                shareSendEmailSubject: this.getResourceBundle().getText("shareSendEmailWorklistSubject"),
                shareSendEmailMessage: this.getResourceBundle().getText("shareSendEmailWorklistMessage", [location.href]),
                tableNoDataText: this.getResourceBundle().getText("tableNoDataText")
            });
            this.setModel(oViewModel, "worklistView");

            var oModel = new JSONModel(jQuery.sap.getModulePath("com.sampleproject", "/model/orders.json")

            );
            that.getView().setModel(oModel, "SapContactModel");

        },

        /* =========================================================== */
        /* event handlers                                              */
        /* =========================================================== */

        /**
         * Triggered by the table's 'updateFinished' event: after new table
         * data is available, this handler method updates the table counter.
         * This should only happen if the update was successful, which is
         * why this handler is attached to 'updateFinished' and not to the
         * table's list binding's 'dataReceived' method.
         * @param {sap.ui.base.Event} oEvent the update finished event
         * @public
         */



        onValueHelpRequested: function (oEvent) {

            var that = this;

            if (!that._valueHelpDialog1) {
                that._valueHelpDialog1 = sap.ui.xmlfragment(
                    "com.sampleproject.fragments.ValueHelpDialog", that.getView().getController()

                );
                that.getView().addDependent(that._valueHelpDialog1);
            }


            that._valueHelpDialog1.open();
            // var oModel = new JSONModel(jQuery.sap.getModulePath("com.sampleproject", "/model/orders.json")

            // );
            // that.getView().setModel(oModel, "SapContactModel");

        },
        handleValueHelpSearch: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new Filter(
                "order",
                sap.ui.model.FilterOperator.Contains, sValue
            );
            evt.getSource().getBinding("items").filter([oFilter]);

        },
        _handleValueHelpClose: function (oEvent) {
            var that = this;
            that._valueHelpDialog1.destroy();
            that._valueHelpDialog1 = null;
            // that._valueHelpDialog1.close();
           
        },
        onListChange: function (oEvent) {
            var that = this;

            var oSelectedItem = oEvent.getParameters("listItems").selectedContexts[0].getObject().order;
            that.getView().getModel("SapContactModel").setProperty("/ProductionOrder", oSelectedItem);
            // that.byId("myId").setValueState("None");
            that.getView().getModel("SapContactModel").setProperty("/PoValueState","None")
            // var oId = that.getView().byId("myId").getValue();
            //     oId.setValueState("None");
            // that.getView().getModel("SapContactModel").refresh();


            that._valueHelpDialog1.destroy();
            // that._valueHelpDialog1.clearSelection();
            that._valueHelpDialog1 = null;

            
            // that._valueHelpDialog1.close();
            // that._valueHelpDialog1.clearSelection();
            //  that._valueHelpDialog1.destroy();


        },
        onValueHelpMaterialRequested: function (oEvent) {

            var that = this;

            if (!that._valueHelpDialog2) {
                that._valueHelpDialog2 = sap.ui.xmlfragment(
                    "com.sampleproject.fragments.ValueHelpDialogMaterial", that.getView().getController()

                );
                that.getView().addDependent(that._valueHelpDialog2);
            }


            that._valueHelpDialog2.open();
            

            

        },
        handleValueHelpSearchMaterial: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new Filter(
                "mat",
                sap.ui.model.FilterOperator.Contains, sValue
            );
            evt.getSource().getBinding("items").filter([oFilter]);

        },
        _handleValueHelpClose1: function (oEvent) {
            var that = this;
            that._valueHelpDialog2.destroy();
            that._valueHelpDialog2 = null;
            
            // that._valueHelpDialog2.close();
           


        },
        onListChangeMaterial: function (oEvent) {
            var that = this;

            var oSelectedItem = oEvent.getParameters("listItems").selectedContexts[0].getObject().mat;
            that.getView().getModel("SapContactModel").setProperty("/materialVale", oSelectedItem);
            that.byId("Mate1").setValueState("None");
            // that.getView().getModel("SapContactModel").refresh();
             that._valueHelpDialog2.destroy();
            that._valueHelpDialog2 = null;
            that._valueHelpDialog2.close();
            //  that._valueHelpDialog2.clearSelection();
            // that._valueHelpDialog2.destroy();


        },
        onValueHelpPlantRequested:
            function (oEvent) {

                var that = this;

                if (!that._valueHelpDialog3) {
                    that._valueHelpDialog3 = sap.ui.xmlfragment(
                        "com.sampleproject.fragments.ValueHelpDialogPlant", that.getView().getController()

                    );
                    that.getView().addDependent(that._valueHelpDialog3);
                }


                that._valueHelpDialog3.open();
                // var oModel2 = new JSONModel(jQuery.sap.getModulePath("com.sampleproject", "/model/plant.json")

                // );
                // that.getView().setModel(oModel2, "SapContactModel");


            },
        handleValueHelpSearchPlant: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new Filter(
                "plant",
                sap.ui.model.FilterOperator.Contains, sValue
            );
            evt.getSource().getBinding("items").filter([oFilter]);

        },
        _handleValueHelpClose2: function (oEvent) {
            var that = this;
            that._valueHelpDialog3.destroy();
            that._valueHelpDialog3 = null;
            // that._valueHelpDialog3.close();
            // that._valueHelpDialog3.clearSelection()
            // that._valueHelpDialog3.destroy();


        },
        onListChangePlant: function (oEvent) {
            var that = this;

            var oSelectedItem = oEvent.getParameters("listItems").selectedContexts[0].getObject().plant;
            that.getView().getModel("SapContactModel").setProperty("/plantValue", oSelectedItem);
            that.byId("plant").setValueState("None");

            that._valueHelpDialog3.destroy();
            that._valueHelpDialog3 = null;
            that._valueHelpDialog3.close();
            // that._valueHelpDialog3.clearSelection()
            
            


        },

        onValueHelpPlanningPlant: function (oEvent) {

            var that = this;

            if (!that._valueHelpDialog4) {
                that._valueHelpDialog4 = sap.ui.xmlfragment(
                    "com.sampleproject.fragments.ValueHelpDialogPlanningPlant", that.getView().getController()

                );
                that.getView().addDependent(that._valueHelpDialog4);
            }


            that._valueHelpDialog4.open();
           

        },
        handleValueHelpPlanningPlant: function (evt) {
            var sValue = evt.getParameter("value");
            var oFilter = new Filter(
                "prodplant",
                sap.ui.model.FilterOperator.Contains, sValue
            );
            evt.getSource().getBinding("items").filter([oFilter]);

        },
        _handleValueHelpClose4: function (oEvent) {
            var that = this;
            that._valueHelpDialog4.destroy();
            that._valueHelpDialog4 = null;
           
            // that._valueHelpDialog4.close();

        },
        onListChangePlanningPlant: function (oEvent) {
            var that = this;

            var oSelectedItem = oEvent.getParameters("listItems").selectedContexts[0].getObject().prodplant;
            that.getView().getModel("SapContactModel").setProperty("/planningplant", oSelectedItem);
            that.byId("planning").setValueState("None");


            that._pValueTableHelpDialog4.destroy();
           
            that._pValueTableHelpDialog4 = null;
            that._valueHelpDialog4.close();
            that._valueHelpDialog4.clearSelection()
            
            // that._valueHelpDialog4.destroy();
        },
        onExecute: function(oEvent){
                      var that = this;
            var productionOrder = that.getView().getModel("SapContactModel").getProperty("/ProductionOrder");
            var material = that.getView().getModel("SapContactModel").getProperty("/materialVale");
            var productionplant = that.getView().getModel("SapContactModel").getProperty("/plantValue");
            var planningPlant = that.getView().getModel("SapContactModel").getProperty("/planningplant");
            
            //   if(productionOrder === "" || material === "" || productionplant === "" || planningPlant === "" ){

			// 	sap.m.MessageBox.show(
			// 		"Please select All Required fileds", {
			// 			icon: sap.m.MessageBox.Icon.ERROR,
			// 			title: "Error"
			// 		});
            //     }
               if(productionOrder === ""){
                //    that.byId("myId").setValueState("Error");
                   that.getView().getModel("SapContactModel").setProperty("/PoValueState","Error")
                // var oId = that.getView().byId("myId").getValue();
                // oId.setValueState("Error");
                sap.m.MessageBox.show(
                    	"Please select Production Order", {
                    		icon: sap.m.MessageBox.Icon.ERROR,
                    			title: "Error"
                    	});
               }else 
               if(material === ""){
                that.byId("Mate1").setValueState("Error");
                sap.m.MessageBox.show(
                    	"Please select Material", {
                    		icon: sap.m.MessageBox.Icon.ERROR,
                    			title: "Error"
                    	});
               }else
               if(productionplant === ""){
                that.byId("plant").setValueState("Error");
                sap.m.MessageBox.show(
                    	"Please select Production Plant", {
                    		icon: sap.m.MessageBox.Icon.ERROR,
                    			title: "Error"
                    	});
               }else
               if(planningPlant === ""){
                   
                that.byId("planning").setValueState("Error");
                    
                sap.m.MessageBox.show(
                    	"Please select Planning Plant", {
                    		icon: sap.m.MessageBox.Icon.ERROR,
                    			title: "Error"
                    	});
               }
               
               var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
               oRouter.navTo("Details", {
   
   
   
              });

        },


        onUpdateFinished: function (oEvent) {
            // update the worklist's object counter after the table update
            var sTitle,
                oTable = oEvent.getSource(),
                iTotalItems = oEvent.getParameter("total");
            // only update the counter if the length is final and
            // the table is not empty
            if (iTotalItems && oTable.getBinding("items").isLengthFinal()) {
                sTitle = this.getResourceBundle().getText("worklistTableTitleCount", [iTotalItems]);
            } else {
                sTitle = this.getResourceBundle().getText("worklistTableTitle");
            }
            this.getModel("worklistView").setProperty("/worklistTableTitle", sTitle);
        },

        /**
         * Event handler when a table item gets pressed
         * @param {sap.ui.base.Event} oEvent the table selectionChange event
         * @public
         */
        onPress: function (oEvent) {
            // The source is the list item that got pressed
            this._showObject(oEvent.getSource());
        },

        /**
         * Event handler for navigating back.
         * Navigate back in the browser history
         * @public
         */
        onNavBack: function () {
            // eslint-disable-next-line sap-no-history-manipulation
            // history.go(-1);
        },


        onSearch: function (oEvent) {
            if (oEvent.getParameters().refreshButtonPressed) {
                // Search field's 'refresh' button has been pressed.
                // This is visible if you select any main list item.
                // In this case no new search is triggered, we only
                // refresh the list binding.
                this.onRefresh();
            } else {
                var aTableSearchState = [];
                var sQuery = oEvent.getParameter("query");

                if (sQuery && sQuery.length > 0) {
                    aTableSearchState = [new Filter("Kunnr", FilterOperator.Contains, sQuery)];
                }
                this._applySearch(aTableSearchState);
            }

        },

        /**
         * Event handler for refresh event. Keeps filter, sort
         * and group settings and refreshes the list binding.
         * @public
         */
        onRefresh: function () {
            var oTable = this.byId("table");
            oTable.getBinding("items").refresh();
        },

        /* =========================================================== */
        /* internal methods                                            */
        /* =========================================================== */

        /**
         * Shows the selected item on the object page
         * @param {sap.m.ObjectListItem} oItem selected Item
         * @private
         */
        _showObject: function (oItem) {
            this.getRouter().navTo("object", {
                objectId: oItem.getBindingContext().getPath().substring("/Sale_HeaderSet".length)
            });
        },

        /**
         * Internal helper method to apply both filter and search state together on the list binding
         * @param {sap.ui.model.Filter[]} aTableSearchState An array of filters for the search
         * @private
         */
        _applySearch: function (aTableSearchState) {
            var oTable = this.byId("table"),
                oViewModel = this.getModel("worklistView");
            oTable.getBinding("items").filter(aTableSearchState, "Application");
            // changes the noDataText of the list in case there are no filter results
            if (aTableSearchState.length !== 0) {
                oViewModel.setProperty("/tableNoDataText", this.getResourceBundle().getText("worklistNoDataWithSearchText"));
            }
        }

    });
});
