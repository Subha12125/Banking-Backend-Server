const mongoose = require('mongoose');

const ledgerSchema = new mongoose.Schema({

    account: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Account',
        required: [ true, "Account is required" ],
        index: true,
        immutable: true
    },

    amount: {
        type: Number,
        required: [ true, "Amount is required" ],
        immutable: true
    },

    transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Transaction',
        required: [ true, "Transaction is required" ],
        index: true,
        immutable: true
    },

    type: {
        type: String,
        enum: {
            values: ["DEBIT", "CREDIT"],
            message: "Type must be either DEBIT or CREDIT",
        }
    }
})

/**
 * Prevent any modifications or deletions to ledger entries after they are created. This ensures the integrity of the ledger and prevents tampering with transaction history.
 */
function preventLedgerModification() {
    throw new Error("Ledger entries cannot be modified or deleted");
}

ledgerSchema.pre('findOneAndUpdate', preventLedgerModification);
ledgerSchema.pre('updateOne', preventLedgerModification);
ledgerSchema.pre('deleteOne', preventLedgerModification);
ledgerSchema.pre('deleteMany', preventLedgerModification);
ledgerSchema.pre('remove', preventLedgerModification);


const LedgerModel = mongoose.model('Ledger', ledgerSchema);

module.exports = LedgerModel;