const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      minLength: [5, "Name must be at least 5 char"],
      maxLength: [20, "Name should be less than 20 char"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      unique: [true, "Already registered"],
      trim: true,
    },
    password: {
      type: String,
      unique: [true, "Password already used"],
      select: false,
    },

    forgatePasswordToken: {
      type: String,
    },

    forPasswordExpiryDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
    
    if(!this.isModified('password'))
    {
        return next()
    }
    this.password = await bcrypt.hash(this.password,10)
    next()
});

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
