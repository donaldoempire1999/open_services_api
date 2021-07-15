const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let PostSchema = new Schema({

    author: {type: Schema.Types.ObjectId , ref: 'User' , required: true},
    likes: Number,
    text: String,
    followers:[{type: Schema.Types.ObjectId , ref: 'User' , required: false}],
    type: {
        type: String,
        enum: ["for_provide" , "for_request"],
        default: "for_request"
    },
    base_amount: Number,
    state: {
        type: String ,
        enum: ["closed", "open"]
    }
});

module.exports = mongoose.model('Post' , PostSchema);
