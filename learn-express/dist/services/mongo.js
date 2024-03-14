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
exports.mongoDisconnect = exports.mongoConnect = void 0;
// database
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
mongoose_1.default.connection.on("open", () => {
    console.info("Database Connected");
}); // events
mongoose_1.default.connection.on("close", () => {
    console.info("Something went wrong"); // when connection is not there
});
const mongoConnect = () => __awaiter(void 0, void 0, void 0, function* () {
    const url = process.env.DATABASE_URL;
    yield mongoose_1.default
        .connect(url);
});
exports.mongoConnect = mongoConnect;
const mongoDisconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
});
exports.mongoDisconnect = mongoDisconnect;
