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
Object.defineProperty(exports, "__esModule", { value: true });
const accessToken_1 = require("../security/accessToken");
const authenticateLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers["authorization"];
    if (!token || typeof token !== "string") {
        return res.status(400).json({
            status: "Fail",
            message: "Please logIn to continue!",
        });
    }
    try {
        const decoded = (0, accessToken_1.validateAccessToken)(token);
        if (decoded) {
            req.user = decoded.data;
        }
        else {
            return res.status(400).json({
                status: "Fail",
                message: "Can not Access User!",
            });
        }
    }
    catch (error) {
        console.log(error);
        res.status(400).json({
            status: "Fail",
            message: "Please logIn to continue!",
        });
    }
    next();
});
exports.default = authenticateLogin;
