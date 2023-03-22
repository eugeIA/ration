parasails.registerPage('req-form', {
  //  ╦╔╗╔╦╔╦╗╦╔═╗╦    ╔═╗╔╦╗╔═╗╔╦╗╔═╗
  //  ║║║║║ ║ ║╠═╣║    ╚═╗ ║ ╠═╣ ║ ║╣
  //  ╩╝╚╝╩ ╩ ╩╩ ╩╩═╝  ╚═╝ ╩ ╩ ╩ ╩ ╚═╝
  data: {
    //…
    products: [],
    syncing: false,
    formData: {
      photo: undefined,
      previewImageSrc: '',
      description: '',
      price: '',
    },

    formErrors: {},

    cloudError: '',

    cloudSuccess: false,
  },

  //  ╦  ╦╔═╗╔═╗╔═╗╦ ╦╔═╗╦  ╔═╗
  //  ║  ║╠╣ ║╣ ║  ╚╦╝║  ║  ║╣
  //  ╩═╝╩╚  ╚═╝╚═╝ ╩ ╚═╝╩═╝╚═╝
  beforeMount: function() {
    //…
  },
  mounted: async function() {
    //…
  },

  //  ╦╔╗╔╔╦╗╔═╗╦═╗╔═╗╔═╗╔╦╗╦╔═╗╔╗╔╔═╗
  //  ║║║║ ║ ║╣ ╠╦╝╠═╣║   ║ ║║ ║║║║╚═╗
  //  ╩╝╚╝ ╩ ╚═╝╩╚═╩ ╩╚═╝ ╩ ╩╚═╝╝╚╝╚═╝
  methods: {
    //…
    changeFileInput: function(files) {
      var selectedFile = files[0];
      if(!selectedFile){
        this.formData.photo = undefined;
        return;
      }
      this.formData.photo = selectedFile;

      var reader = new FileReader();
      reader.onload = (event) => {
        this.formData.previewImageSrc = event.target.result;
        delete reader.onload;
      };
      console.log(reader);
      this.formErrors.photo=false;
      reader.readAsDataURL(selectedFile);
      console.log(selectedFile);
    },

    submittedForm: function(result){
      var newItem = _.extend(result, {
        description: this.formData.description,
      });
      
      this.products.unshift(newItem);

      console.log(this.products)

    },

    handleParsingForm: function(){
      //clear out any pre-existing error messages.
      this.formErrors = {};

      var argins = this.formData;

      //validate price

      if(!argins.price) {
        this.formErrors.description = true;
      }

      if(argins.photo === undefined) {
        this.formErrors.photo = true;
      }
      
      if(Object.keys(this.formErrors).length > 0) {
        return;
      }

      return _.omit(argins, ['previewImageSrc']);

    }
  }
});
