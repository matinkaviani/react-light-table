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
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Pagination = function (_a) {
    var page = _a.page, totalPages = _a.totalPages, handlePagination = _a.handlePagination, arrowRight = _a.arrowRight, arrowLeft = _a.arrowLeft;
    var getPageNumbers = function () {
        var pageNumbers = [];
        if (totalPages <= 7) {
            for (var i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        }
        else {
            if (page <= 4) {
                pageNumbers.push(1, 2, 3, 4, 5, "separator", totalPages);
            }
            else if (page > 4 && page < totalPages - 3) {
                pageNumbers.push(1, "separator", page - 1, page, page + 1, "separator", totalPages);
            }
            else {
                pageNumbers.push(1, "separator", totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
            }
        }
        return pageNumbers;
    };
    var pageNumbers = getPageNumbers();
    return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "pagination" }, { children: totalPages ? ((0, jsx_runtime_1.jsxs)("div", __assign({ className: "paginationWrapper" }, { children: [page !== 1 && ((0, jsx_runtime_1.jsx)("span", __assign({ onClick: function () { return handlePagination(page - 1); }, className: "pageItem sides" }, { children: arrowLeft !== null && arrowLeft !== void 0 ? arrowLeft : (0, jsx_runtime_1.jsxs)("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", viewBox: "0 0 24 24", fill: "transparent", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, { children: [(0, jsx_runtime_1.jsx)("line", { x1: "19", y1: "12", x2: "5", y2: "12" }), (0, jsx_runtime_1.jsx)("polyline", { points: "12 19 5 12 12 5" })] })) }))), pageNumbers.map(function (pageNumber, index) {
                    if (pageNumber === "separator") {
                        return ((0, jsx_runtime_1.jsx)("div", __assign({ className: "separator" }, { children: "..." }), index));
                    }
                    return ((0, jsx_runtime_1.jsx)("span", __assign({ onClick: function () { return handlePagination(parseFloat(pageNumber.toString())); }, className: "pageItem ".concat(page === pageNumber && "active") }, { children: pageNumber }), index));
                }), page !== totalPages && ((0, jsx_runtime_1.jsx)("span", __assign({ onClick: function () { return handlePagination(page + 1); }, className: "pageItem sides" }, { children: arrowRight !== null && arrowRight !== void 0 ? arrowRight : (0, jsx_runtime_1.jsxs)("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", viewBox: "0 0 24 24", fill: "transparent", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }, { children: [(0, jsx_runtime_1.jsx)("line", { x1: "5", y1: "12", x2: "19", y2: "12" }), (0, jsx_runtime_1.jsx)("polyline", { points: "12 5 19 12 12 19" })] })) })))] }))) : null })));
};
exports.default = Pagination;
