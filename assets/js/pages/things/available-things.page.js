/* eslint-disable quotes */
parasails.registerPage("available-things", {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    things: [],
    confirmDeleteThingModalOpen: false,
    selectedThing: undefined,
    //syncing / loading state
    syncing: false,
    //server error state
    cloudError: ''
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function () {
    _.extend(this,SAILS_LOCALS);
  },


  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
    clickThing: async function (thingId) {
      console.log("click thing #", +thingId);
      await Cloud.destroyOneThing.with({ id: thingId });
      _.remove(this.things, { id: thingId });
      this.$forceUpdate();
    },

    clickDeleteThing: async function (thingId) {
      console.log('clicked the "delete" button');
      this.confirmDeleteThingModalOpen = true;
      this.selectedThing = _.find(this.things, {id: thingId});
    },

    closeDeleteThingModal: function(){
      this.selectedThing=undefined;
      this.confirmDeleteThingModalOpen= false;
    },

    handleParsingDeleteThingForm: function(){
      return {
        id: this.selectedThing.id
      };
    },

    submittedDeleteThingForm: function(){
      console.log('ok it worked');
      _.remove(this.things, { id: this.selectedThing.id });
      this.$forceUpdate();

      this.confirmDeleteThingModalOpen = false;
      this.selectedThing=undefined;
    }
  },
});
