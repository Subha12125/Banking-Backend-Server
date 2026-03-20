const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        index: true
    },
    status: {
        type: String,
        enum: {
            values: ["Active", "Closed", "Frozen"],
            message: "Status must be either Active, Closed, or Frozen",
        },
        default: "Active"
    },
    currency: {
        type: String,
        required: [true, "Currency is required"],
        default: "INR"
    },

}, {
    timestamps: true
})

// compund index to ensure a user can have only one active account at a time
accountSchema.index({
    user: 1,
    status: 1
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;