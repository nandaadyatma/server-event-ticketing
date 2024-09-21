const mongoose = require('mongoose');
const { model, Schema} = mongoose;

let organizerSchema = Schema(
    {
        organizer: {
            type: String,
            required: [true, "Organizer must be filled"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = model('Organizer', organizerSchema);