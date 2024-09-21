const mongoose = require("mongoose");
const { model, Schema } = mongoose;
const bcrypt = require('bcrypt');

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, "Organizer name must be filled"],
            minlength: 3,
            maxlenght: 50,
        },
        email: {
            type: String,
            unique: true,
            required: [true, "Organizer email must be filled"],
        },
        password: {
            type: String,
            minlength: 6,
            required: [true, "Organizer passwpod must be filled"],
        },
        role: {
            type: String,
            enum: ["admin", "organizer", "owner"],
            default: 'admin',
        },
        organizer: {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true
        }

    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    const User = this;
    if (User.isModified('password')) {
        User.password = await bcrypt.hash(User.password, 12);
    }
    next();
})

userSchema.methods.comparePassword = async function (candidatePassword) {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch
}

module.exports = model('User', userSchema);
