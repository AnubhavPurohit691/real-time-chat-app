"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
router.post("/usercreate", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { fullName, email, password } = req.body;
    const user = yield prisma.user.create({
        data: {
            fullName: fullName,
            email: email,
            password: password
        }
    });
    res.json({ message: user });
}));
router.post("/messagesend", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, userId } = req.query;
    console.log(id, userId);
    const { body } = req.body;
    console.log(id);
    let conversations = yield prisma.conversation.findFirst({
        where: {
            participantsId: {
                hasEvery: [Number(userId), Number(id)]
            }
        }
    });
    if (!conversations) {
        conversations = yield prisma.conversation.create({
            data: {
                participantsId: {
                    set: [Number(userId), Number(id)]
                }
            }
        });
    }
    const message = yield prisma.message.create({
        data: {
            body: body,
            conversationId: conversations.id,
            senderId: Number(userId)
        }
    });
    res.json({
        message: message,
        conversation: conversations,
    });
}));
exports.default = router;
