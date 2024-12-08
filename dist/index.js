"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const messageroutes_1 = __importDefault(require("./routes/messageroutes"));
const app = (0, express_1.default)();
const path = require("path");
app.use(express_1.default.json());
app.use("/", messageroutes_1.default);
app.get("/:id", (req, res) => {
    const id = req.params;
    console.log(id);
    res.json({ id: id });
});
app.listen(8000);
