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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
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
    return (_jsx("div", __assign({ className: "pagination" }, { children: totalPages ? (_jsxs("div", __assign({ className: "paginationWrapper" }, { children: [page !== 1 && (_jsx("span", __assign({ onClick: function () { return handlePagination(page - 1); }, className: "pageItem sides" }, { children: arrowLeft !== null && arrowLeft !== void 0 ? arrowLeft : _jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", viewBox: "0 0 24 24", fill: "transparent", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, { children: [_jsx("line", { x1: "19", y1: "12", x2: "5", y2: "12" }), _jsx("polyline", { points: "12 19 5 12 12 5" })] })) }))), pageNumbers.map(function (pageNumber, index) {
                    if (pageNumber === "separator") {
                        return (_jsx("div", __assign({ className: "separator" }, { children: "..." }), index));
                    }
                    return (_jsx("span", __assign({ onClick: function () { return handlePagination(parseFloat(pageNumber.toString())); }, className: "pageItem ".concat(page === pageNumber && "active") }, { children: pageNumber }), index));
                }), page !== totalPages && (_jsx("span", __assign({ onClick: function () { return handlePagination(page + 1); }, className: "pageItem sides" }, { children: arrowRight !== null && arrowRight !== void 0 ? arrowRight : _jsxs("svg", __assign({ xmlns: "http://www.w3.org/2000/svg", width: "15", height: "15", viewBox: "0 0 24 24", fill: "transparent", stroke: "currentColor", "stroke-width": "1.5", "stroke-linecap": "round", "stroke-linejoin": "round" }, { children: [_jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" }), _jsx("polyline", { points: "12 5 19 12 12 19" })] })) })))] }))) : null })));
};
export default Pagination;
