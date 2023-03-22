module.exports = {


  friendlyName: 'Add product',


  description: '',


  inputs: {
    photo: {
      type: 'ref',
      description: 'upload file stream',
      required: true
    },
    description: {
      type: 'string'
    },
    price: {
      type: 'number',
      required: true
    }
  },


  exits: {
    badRequest: {
      description: "No image upload was provided.",
      responseType: "badRequest",
    },
  },


  fn: async function (inputs, exits) {

    // All done.
    console.log('produit');
    var image = await sails.uploadOne(inputs.photo);
    
    if(!image) {
      return exits.badRequest;
    }
    console.log(image);
    // eslint-disable-next-line no-undef
    await Product.create({
      imageUploadFd: image.fd,
      imageUploadFdMime: image.type,
      description: inputs.description,
      price: inputs.Product
    });
    return exits.success();

  }


};
