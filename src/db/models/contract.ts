const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ContractSchema = new Schema({

    provider: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    requester: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    job_description: {
        type: String ,
        required: true
    },

    start_date: Date,

    end_date: Date,

    state: {
        type: String ,
        enum: ["achieve" , "on_working"]
    }
});

module.exports = mongoose.model('Contract', ContractSchema);
