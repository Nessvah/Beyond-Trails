const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  visitorsId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' }],
  partnerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Partner' }, 
  promotionName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  endDate: {
    type: Date,
    required: true,
  },
  startDate:{
    type: Date,
    required: true},
  requiredPoints: {
    type: Number,
    required: true
  },
  image: {
    type: String,
    
  },
  qrCode: {
    type: String,
  
  },
});

const Promotion = mongoose.model('Promotion', promotionSchema, "Promotions");

module.exports = {Promotion};
