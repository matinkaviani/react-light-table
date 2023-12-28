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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Empty_1 = __importDefault(require("./Empty"));
var Pagination_1 = __importDefault(require("./Pagination"));
var Spinner_1 = __importDefault(require("./Spinner"));
var TextEllipsis_1 = __importDefault(require("./TextEllipsis"));
var helpers_1 = __importDefault(require("./helpers"));
var ReactLightTable = function (_a) {
    var _b;
    var id = _a.id, columns = _a.columns, data = _a.data, sortable = _a.sortable, _c = _a.headerTextAlign, headerTextAlign = _c === void 0 ? "center" : _c, contentTextAlign = _a.contentTextAlign, className = _a.className, hasPagination = _a.hasPagination, initSort = _a.initSort, numberRows = _a.numberRows, _d = _a.rowsPerPage, rowsPerPage = _d === void 0 ? 50 : _d, loading = _a.loading, handleRowClick = _a.handleRowClick, rowKey = _a.rowKey, afterSort = _a.afterSort, onCurrentDataChange = _a.onCurrentDataChange;
    var _e = (0, react_1.useState)(initSort
        ? {
            key: initSort.key,
            mode: initSort.mode,
            isAbsoluteValue: initSort.isAbsoluteValue,
        }
        : null), sort = _e[0], setSort = _e[1];
    var _f = (0, react_1.useState)(1), currentPage = _f[0], setCurrentPage = _f[1];
    var firstPageIndex = (currentPage - 1) * rowsPerPage;
    var lastPageIndex = firstPageIndex + rowsPerPage;
    var handlePages = function (updatedPage) { return setCurrentPage(updatedPage); };
    var requestSort = function (key, isAbsoluteValue) {
        if (!sortable)
            return;
        var toggleSortMode = function (currentSort) {
            if (!currentSort || key !== currentSort.key) {
                return { key: key, mode: "asc", isAbsoluteValue: isAbsoluteValue };
            }
            else {
                var newMode = currentSort.mode === null
                    ? "asc"
                    : currentSort.mode === "asc"
                        ? "desc"
                        : null;
                return { key: key, mode: newMode, isAbsoluteValue: isAbsoluteValue };
            }
        };
        var newSort = toggleSortMode(sort);
        afterSort === null || afterSort === void 0 ? void 0 : afterSort(key, newSort.mode);
        setCurrentPage(1);
        setSort(newSort);
    };
    var getClassNamesFor = function (name) {
        if (!sort || !name)
            return "";
        return sort.key === name ? sort.mode : "";
    };
    var manageData = data;
    if (sort && !hasPagination) {
        var column = columns.find(function (col) { return col.key === sort.key; });
        if (column && column.sortFunction)
            manageData = column.sortFunction(data, sort.mode);
        else if (sort.mode)
            manageData = __spreadArray([], data, true).sort(helpers_1.default[sort.mode === "asc" ? "sortAsc" : "sortDesc"](sort.key, {
                putNullAtBottom: true,
                sortByAbsValue: sort.isAbsoluteValue,
            }));
        else
            manageData = data;
    }
    if (hasPagination) {
        if (sort) {
            var column = columns.find(function (col) { return col.key === sort.key; });
            if (column && column.sortFunction)
                manageData = column.sortFunction(data, sort.mode).slice(firstPageIndex, lastPageIndex);
            else
                manageData = data === null || data === void 0 ? void 0 : data.sort(helpers_1.default[sort.mode === "asc" ? "sortAsc" : "sortDesc"](sort.key, {
                    putNullAtBottom: true,
                    sortByAbsValue: sort.isAbsoluteValue,
                })).slice(firstPageIndex, lastPageIndex);
        }
    }
    (0, react_1.useEffect)(function () {
        onCurrentDataChange === null || onCurrentDataChange === void 0 ? void 0 : onCurrentDataChange(manageData);
    }, [currentPage]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ id: "custom-table" }, { children: [(0, jsx_runtime_1.jsxs)("table", __assign({ id: id, className: "react-light-table ".concat(sortable ? "sortable-table" : "", " ").concat(handleRowClick ? "clickable" : "", " ").concat(className !== null && className !== void 0 ? className : "") }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [numberRows ? ((0, jsx_runtime_1.jsx)("th", __assign({ className: "".concat(headerTextAlign !== null && headerTextAlign !== void 0 ? headerTextAlign : "", " number-header-col") }, { children: "Row" }))) : null, columns.map(function (column, idx) {
                                    var _a;
                                    var typeOfTitle = typeof column.title === "string"
                                        ? column.title
                                        : column.title();
                                    return ((0, jsx_runtime_1.jsx)("th", __assign({ onClick: function () {
                                            return sortable && column.sortable
                                                ? requestSort(column.key, column.isAbsoluteValue)
                                                : undefined;
                                        }, className: "".concat(headerTextAlign, " ").concat(getClassNamesFor(column.key), " ").concat((_a = column.headClassName) !== null && _a !== void 0 ? _a : ""), title: typeOfTitle }, { children: (0, jsx_runtime_1.jsx)("span", __assign({ className: "sortable-header" }, { children: column.isHeadNowrap ? ((0, jsx_runtime_1.jsx)(TextEllipsis_1.default, { children: typeOfTitle })) : (typeOfTitle) })) }), idx));
                                })] }) }), loading || !manageData || !manageData.length ? null : ((0, jsx_runtime_1.jsx)("tbody", { children: manageData.map(function (item, idx) { return ((0, jsx_runtime_1.jsxs)("tr", __assign({ onClick: function (e) {
                                return handleRowClick ? handleRowClick(item, e) : undefined;
                            } }, { children: [numberRows ? ((0, jsx_runtime_1.jsx)("td", __assign({ className: "".concat(contentTextAlign !== null && contentTextAlign !== void 0 ? contentTextAlign : "", " number-row") }, { children: idx + 1 + (currentPage - 1) * rowsPerPage }), "row")) : null, columns.map(function (column) {
                                    var _a;
                                    return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "".concat((_a = column.cellClassName) !== null && _a !== void 0 ? _a : "", " ").concat(contentTextAlign !== null && contentTextAlign !== void 0 ? contentTextAlign : "") }, { children: column.render
                                            ? column.render(column.key, item)
                                            : item[column.key] }), column.key));
                                })] }), rowKey ? "row-".concat(rowKey(item)) : idx)); }) }))] })), !manageData || !manageData.length ? ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Empty_1.default, {}) })) : null, (0, jsx_runtime_1.jsx)("div", __assign({ className: "spinner-loader" }, { children: (0, jsx_runtime_1.jsx)(Spinner_1.default, { loading: loading !== null && loading !== void 0 ? loading : false }) })), !loading && hasPagination ? ((0, jsx_runtime_1.jsx)(Pagination_1.default, { page: currentPage, totalPages: Math.ceil(((_b = data === null || data === void 0 ? void 0 : data.length) !== null && _b !== void 0 ? _b : 0) / rowsPerPage), handlePagination: handlePages })) : null] })));
};
exports.default = ReactLightTable;
