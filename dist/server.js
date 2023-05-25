"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/api/user"));
const dbConnect_1 = __importDefault(require("./lib/dbConnect"));
const app = (0, express_1.default)();
const port = 5000;
(0, dbConnect_1.default)();
app.use("/api/user", user_1.default);
app.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
//# sourceMappingURL=server.js.map