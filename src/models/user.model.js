const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/\S+@\S+\.\S+/, "Please provide a valid email address"]
    },

    name: {
        type: String,
        required: [true, "Name is required for new account"]
    },

    password: {
        type: String,
        required: [true, "Password is required for new account"],
        minlength: [6, "Password must be at least 6 characters long"],
        match: [/(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/, "Password must contain at least one uppercase letter, one number, and one special character"],
        select: false,
    }
},{
    timestamps: true
})


userSchema.pre("save", async function(){
    if(!this.isModified("password")){
        return;
    }

    this.password = await bcrypt.hash(this.password, 10);
})


userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;