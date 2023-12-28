"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Spinner = function (_a) {
    var loading = _a.loading;
    return (0, jsx_runtime_1.jsx)("div", { className: "loading-spinner ".concat(loading ? 'visible' : 'hidden') });
};
exports.default = Spinner;
