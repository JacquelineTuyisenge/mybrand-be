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
const querries_1 = __importDefault(require("../models/querries"));
// post querries
const httpAddQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querry = new querries_1.default({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });
        yield querry.save();
        res.status(201).json({
            status: "success",
            message: "Querry created successfully",
            querry: querry
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
});
//get all querries
const httpGetAllQuerries = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querries = yield querries_1.default.find({});
        res.status(200).json({
            status: "success",
            message: "Querries retrieved successfully",
            querries: querries
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "error",
            message: "Something went wrong"
        });
    }
});
//get single querry
const httpGetQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const singleQuerry = yield querries_1.default.findById(id);
        if (!singleQuerry) {
            res.status(404).json({
                status: "Fail",
                message: "Querry not found!",
            });
            return;
        }
        res.status(200).json({
            status: "Success",
            message: "Querry retrieved successfully",
            querry: singleQuerry,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong"
        });
    }
});
// update querry
const httpUpdateQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const updatedQuerry = yield querries_1.default.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            message: req.body.message,
        }, { new: true });
        if (!updatedQuerry) {
            res.status(404).json({
                status: "Fail",
                message: "Querry not found!",
            });
            return;
        }
        yield (updatedQuerry === null || updatedQuerry === void 0 ? void 0 : updatedQuerry.save());
        res.status(200).json({
            status: "Success",
            message: "Querry updated successfully!",
            querry: updatedQuerry,
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
//delete querry
const httpDeleteQuerry = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (!id) {
            res.status(404).json({
                status: "Fail",
                message: "Querry not found!",
            });
            return;
        }
        yield querries_1.default.findByIdAndDelete(id);
        res.status(200).json({
            status: "Success",
            message: "Querry deleted successfully!",
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            status: "Fail",
            message: "Something went wrong!",
        });
    }
});
exports.default = { httpAddQuerries, httpGetAllQuerries, httpGetQuerry, httpUpdateQuerry, httpDeleteQuerry };
