const mongoose = require('mongoose');
const { Schema } = mongoose;

const feedbackSchema = new Schema({
    partnerId: {
        type: Schema.Types.ObjectId,
        ref: 'Partner',
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
