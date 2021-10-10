const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    name: {
		type: String,
		required: true
    },
    Phnumber: {
		type: Number,
		required: true
	},	
	image: {
		type:  String,
	}
})

const ContactModel = mongoose.model('Contact', contactSchema);


module.exports = ContactModel;