const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema(
    {
        number: {
            type: String
        },
        booked: {
            type: Boolean,
            default: false
        },
        price : {
            type : Number,

        }


    }
);

const Table = mongoose.model('Table', tableSchema);
module.exports = Table;
