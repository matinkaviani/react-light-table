"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Neutral = exports.SortDesc = exports.SortAsc = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = __importDefault(require("react"));
exports.SortAsc = react_1.default.memo(function () {
    return (0, jsx_runtime_1.jsx)("svg", __assign({ width: "30", height: "30", viewBox: "0 0 24 24", fill: "var(--primary)", opacity: ".7", xmlns: "http://www.w3.org/2000/svg" }, { children: (0, jsx_runtime_1.jsx)("path", { fill: "none", d: "M15 13.5L12.3003 10.8003V10.8003C12.1344 10.6344 11.8656 10.6344 11.6997 10.8003V10.8003L9 13.5", stroke: "#323232", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
});
exports.SortDesc = react_1.default.memo(function () {
    return (0, jsx_runtime_1.jsx)("svg", __assign({ width: "30", height: "30", viewBox: "0 0 24 24", fill: "var(--primary)", opacity: ".7", xmlns: "http://www.w3.org/2000/svg" }, { children: (0, jsx_runtime_1.jsx)("path", { fill: "none", d: "M9.5 10.5L12.1997 13.1997V13.1997C12.3656 13.3656 12.6344 13.3656 12.8003 13.1997V13.1997L15.5 10.5", stroke: "#323232", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }));
});
exports.Neutral = react_1.default.memo(function () {
    return (0, jsx_runtime_1.jsxs)("svg", __assign({ width: "30", height: "30", viewBox: "0 0 24 24", fill: "var(--primary)", opacity: ".7", xmlns: "http://www.w3.org/2000/svg" }, { children: [(0, jsx_runtime_1.jsx)("path", { d: "M9 10H15", stroke: "#323232", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), (0, jsx_runtime_1.jsx)("path", { d: "M9 14H15", stroke: "#323232", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] }));
});
