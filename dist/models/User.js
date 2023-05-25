"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
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
    skills: [String],
    accounts: [
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
});
const User = (0, mongoose_1.model)("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map