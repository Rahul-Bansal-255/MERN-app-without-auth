import mongoose from 'mongoose';
import validator from 'validator';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30
  },
  email: {
    type: String,
    required: true,
    maxLength: 200,
    unique: true,
    validator: (value) => {
      return validator.isEmail(value);
    }
  },
  address: {
    type: String,
    minLength: 3,
    maxLength: 500
  }
}, { timestamps: true })

const UserModel = mongoose.model('user', userSchema);

export default UserModel;
