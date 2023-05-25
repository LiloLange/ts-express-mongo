import mongoose, { Schema, Model, model } from "mongoose";
import { hashSync, genSaltSync, compareSync } from "bcryptjs";

interface emails {
  email: string;
  password: string;
  description: string;
}

interface skills {
  skill: string;
  rate: number;
}

interface accounts {
  name: string;
  description: string;
}
export interface IUser extends Document {
  username: string;
  password: string;
  realname: string;
  netkeyid: string;
  pcpassword: string;
  ip: string;
  birthday: Date;
  groupid: number;
  role: string;
  emails: [emails];
  skills: [skills];
  accounts: [accounts];
  encryptPassword: (password: string) => string;
  // validPassword: (password: string) => boolean;
}

interface IUserModel extends Model<IUser> {}

const UserSchema: Schema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  realname: {
    type: String,
    required: true,
  },
  netkeyid: {
    type: String,
    required: true,
  },
  pcpassword: {
    type: String,
    required: true,
  },
  ip: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  groupid: {
    type: Number,
    required: true,
  },
  role: {
    type: String,
  },
  skills: [
    {
      skill: {
        type: String,
        required: true,
      },
      rate: {
        type: Number,
        default: 2,
      },
    },
  ],
  emails: [
    {
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
  accounts: [
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  ],
});

UserSchema.methods.encryptPassword = (password: string) =>
  hashSync(password, genSaltSync(10));
const User: IUserModel = model<IUser, IUserModel>("User", UserSchema);

export default User;
