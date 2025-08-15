import { Schema, model } from "mongoose";
import bcrypt from "bcrypt-ts";

interface User {
  username: string;
  email: string;
  password: string;
}

const userSchema = new Schema<User>(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true, // This will add createdAt and updatedAt fields
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    this.password = await bcrypt.hash(this.password, 10);
    next();
  } catch (error) {
    next(error as Error);
  }
});

userSchema.methods.checkPassword = async function (inputPassword: string) {
  return await bcrypt.compare(inputPassword, this.password);
};

const User = model<User>("User", userSchema);
export default User;
