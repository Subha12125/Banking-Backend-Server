const transactionModel = require('../models/transaction.model.js');
const ledgerModel = require('../models/ledger.model.js');
const accountModel = require('../models/account.model.js');
const emailService = require('../services/email.service.js');


async function createTransaction(req, res) {
    /**
     * Validate request
     */
    const { fromAccount, toAccount, amount, idempotencyKey } = req.body;

    if(!fromAccount || !toAccount || !amount || !idempotencyKey) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    const fromUserAccount = await accountModel.findOne({
        _id: fromAccount,
    });

    const toUserAccount = await accountModel.findOne({
        _id: toAccount,
    });

    if(!fromUserAccount || !toUserAccount) {
        return res.status(404).json({ error: 'Account not found' });
    }

    /**
     * 2. Validate idempotency key
     */
    const isIransactionAlreadyExists = await transactionModel.findOne({
        idempotencyKey: idempotencyKey,
    });

    if( isIransactionAlreadyExists ) {
        if( isIransactionAlreadyExists.status === 'COMPLETED' ) {
            return res.status(200).json({ message: 'Transaction is already in progress' });
        }

        if( isIransactionAlreadyExists.status === 'PENDING' ) {
            return res.status(400).json({ error: 'Transaction is already in progress' });
        }

        if( isIransactionAlreadyExists.status === 'FAILED' ) {
            return res.status(500).json({ error: 'Transaction failed previously, please try again' });
        }

        if( isTransactionAlreadyExists.status === 'REVERSED' ) {
            return res.status(500).json({ error: 'Transaction was reversed, please try again' });
        }
    }

    /**
     * 3. Check account Status
     */

    if(fromUserAccount.status !== "ACTIVE" || toUserAccount.status !== "ACTIVE") {
        return res.status(400).json({
            message: 'One or both accounts are not active'
        })
    }

    /**
     * 4. Driver sender balance from ledger
     */

    const balance = await fromUserAccount.getBalance();

    if(balance < amount) {
        return res.status(400).json({
            message: `Insufficient balance. Current balance is ${balance}. Rquired balance is ${amount}`
        })
    }
}

module.exports = {
    createTransaction,
};