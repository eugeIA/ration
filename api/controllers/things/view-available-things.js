
/* eslint-disable quotes */
module.exports = {
  friendlyName: "View available things",

  description: 'Display "Available things" page.',

  exits: {
    success: {
      viewTemplatePath: "pages/things/available-things",
    },
  },

  fn: async function (inputs, exits) {

    var me=await User.findOne({
      id: this.req.me.id
    }).populate('friends');

    var friendIds = _.pluck(me.friends, 'id');

    var things = await Thing.find({
      or: [
        { owner: this.req.me.id,},
        { owner: {in: friendIds}}
      ]
    });

    return exits.success({ things });
  },
};
