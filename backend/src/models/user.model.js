import mongoose from "mongoose";
//create schema


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
  ,
  googleId: {
    type: String
  },
  picture: {
    type: String,
    default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png'

  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    // required: true,
    minLength: 6
  }
}, 
{
  timestamps: true
})

const User = mongoose.model("User", userSchema);
export { User };