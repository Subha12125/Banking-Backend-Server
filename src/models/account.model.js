const mongoose = require('mongoose');
const ledgerModel = require('./ledger.model.js');

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

accountSchema.methods.getBalance = async function() {
    const balanceData = await ledgerModel.aggregate([
        { $macth: { account: this._id } },
        {
            $group: {
                _id: null,
                totalDebit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "DEBIT"] },
                            "$amount",
                            0
                        ]
                    }
                },
                totalCredit: {
                    $sum: {
                        $cond: [
                            { $eq: ["$type", "CREDIT"] },
                            "$amount",
                            0                     
                        ]
                    }
                }
            }
        },
        {
            $project: {
                _id: 0,
                balance: {
                    $subtract: ["$totalCredit", "$totalDebit"]
                }
            }
        }
    ])

    if(balanceData.length === 0) {
        return 0;
    }

    return balanceData[0].balance;
}

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;