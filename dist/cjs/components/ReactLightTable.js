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
exports.ReactLightTable = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var Empty_1 = __importDefault(require("./Empty"));
var Pagination_1 = __importDefault(require("./Pagination"));
var SortIndicators_1 = require("./SortIndicators");
var Spinner_1 = __importDefault(require("./Spinner"));
var TextEllipsis_1 = __importDefault(require("./TextEllipsis"));
var helpers_1 = __importDefault(require("./helpers"));
var ReactLightTable = function (_a) {
    var _b;
    var id = _a.id, columns = _a.columns, data = _a.data, sortable = _a.sortable, _c = _a.headerTextAlign, headerTextAlign = _c === void 0 ? "center" : _c, contentTextAlign = _a.contentTextAlign, className = _a.className, _d = _a.hasPagination, hasPagination = _d === void 0 ? false : _d, initSort = _a.initSort, numberRows = _a.numberRows, _e = _a.rowsPerPage, rowsPerPage = _e === void 0 ? 50 : _e, loading = _a.loading, _f = _a.direction, direction = _f === void 0 ? "ltr" : _f, _g = _a.icons, icons = _g === void 0 ? { asc: (0, jsx_runtime_1.jsx)(SortIndicators_1.SortAsc, {}), desc: (0, jsx_runtime_1.jsx)(SortIndicators_1.SortDesc, {}), neutral: (0, jsx_runtime_1.jsx)(SortIndicators_1.Neutral, {}) } : _g, handleRowClick = _a.handleRowClick, rowKey = _a.rowKey, afterSort = _a.afterSort, onCurrentDataChange = _a.onCurrentDataChange;
    var _h = (0, react_1.useState)(initSort
        ? {
            key: initSort.key,
            mode: initSort.mode,
            isAbsoluteValue: initSort.isAbsoluteValue,
        }
        : null), sort = _h[0], setSort = _h[1];
    var _j = (0, react_1.useState)(1), currentPage = _j[0], setCurrentPage = _j[1];
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
        if (currentPage !== 1)
            setCurrentPage(1);
        setSort(newSort);
    };
    var handleThClick = (0, react_1.useCallback)(function (column) {
        var _a, _b, _c;
        sortable && column.sortable
            ? requestSort((_b = (_a = column.key) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "", (_c = column.isAbsoluteValue) !== null && _c !== void 0 ? _c : false)
            : undefined;
    }, [sortable, requestSort]);
    var getClassNamesFor = function (name) {
        var _a;
        if (!sort || !name)
            return "";
        return sort.key === name ? " ".concat((_a = sort.mode) !== null && _a !== void 0 ? _a : "") : "";
    };
    var SortIndicator = function () {
        if (!sortable || !sort)
            return null;
        var component = null;
        switch (sort.mode) {
            case "asc":
                component = icons.asc;
                break;
            case "desc":
                component = icons.desc;
                break;
            default:
                component = icons.neutral;
                break;
        }
        return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: component });
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
        if (sort && sort.mode !== null) {
            var column = columns.find(function (col) { return col.key === sort.key; });
            if (column && column.sortFunction) {
                manageData = column.sortFunction(data, sort.mode).slice(firstPageIndex, lastPageIndex);
            }
            else {
                manageData = __spreadArray([], data, true).sort(helpers_1.default[sort.mode === "asc" ? "sortAsc" : "sortDesc"](sort.key, {
                    putNullAtBottom: true,
                    sortByAbsValue: sort.isAbsoluteValue,
                }))
                    .slice(firstPageIndex, lastPageIndex);
            }
        }
        else {
            // If sort is null or sort.mode is null, use the original data without sorting
            manageData = data.slice(firstPageIndex, lastPageIndex);
        }
    }
    (0, react_1.useEffect)(function () {
        onCurrentDataChange === null || onCurrentDataChange === void 0 ? void 0 : onCurrentDataChange(manageData);
    }, [currentPage]);
    return ((0, jsx_runtime_1.jsxs)("div", __assign({ id: "react-light-table" }, { children: [(0, jsx_runtime_1.jsxs)("table", __assign({ id: id, className: "react-light-table-wrapper".concat(sortable ? " sortable-table" : "").concat(handleRowClick ? " clickable" : "").concat(className ? " ".concat(className) : "") }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [numberRows ? ((0, jsx_runtime_1.jsx)("th", __assign({ className: "number-header-col".concat(headerTextAlign ? " ".concat(headerTextAlign) : "") }, { children: "Row" }))) : null, columns.map(function (column, idx) {
                                    var typeOfTitle = typeof column.title === "string"
                                        ? column.title
                                        : column.title();
                                    return ((0, jsx_runtime_1.jsx)("th", __assign({ onClick: function () { return handleThClick(column); }, className: "".concat(headerTextAlign ? "".concat(headerTextAlign) : "").concat(sortable ? getClassNamesFor(column.key) : "").concat(column.headClassName ? " ".concat(column.headClassName) : ""), title: typeOfTitle }, { children: (0, jsx_runtime_1.jsxs)("span", __assign({ className: "".concat(sortable && column.sortable ? "sortable-header" : "") }, { children: [column.isHeadNowrap ? ((0, jsx_runtime_1.jsx)(TextEllipsis_1.default, { className: "".concat(headerTextAlign), dir: direction, children: typeOfTitle })) : (typeOfTitle), column.sortable && column.key === (sort === null || sort === void 0 ? void 0 : sort.key) ? ((0, jsx_runtime_1.jsx)(SortIndicator, {})) : null] })) }), idx));
                                })] }) }), loading || !manageData || !manageData.length ? null : ((0, jsx_runtime_1.jsx)("tbody", { children: manageData.map(function (item, idx) { return ((0, jsx_runtime_1.jsxs)("tr", __assign({ onClick: function (e) {
                                return handleRowClick ? handleRowClick(item, e) : undefined;
                            } }, { children: [numberRows ? ((0, jsx_runtime_1.jsx)("td", __assign({ className: "number-row".concat(contentTextAlign ? " ".concat(contentTextAlign) : "") }, { children: idx + 1 + (currentPage - 1) * rowsPerPage }), "row")) : null, columns.map(function (column) { return ((0, jsx_runtime_1.jsx)("td", __assign({ className: "".concat(column.cellClassName || "").concat(column.cellClassName && contentTextAlign ? " " : "").concat(contentTextAlign || "") }, { children: column.render
                                        ? column.render(column.key, item)
                                        : item[column.key] }), column.key)); })] }), rowKey ? "row-".concat(rowKey(item)) : idx)); }) }))] })), !manageData || !manageData.length ? ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)(Empty_1.default, {}) })) : null, (0, jsx_runtime_1.jsx)(Spinner_1.default, { loading: loading !== null && loading !== void 0 ? loading : false }), !loading && hasPagination ? ((0, jsx_runtime_1.jsx)(Pagination_1.default, { page: currentPage, totalPages: Math.ceil(((_b = data === null || data === void 0 ? void 0 : data.length) !== null && _b !== void 0 ? _b : 0) / rowsPerPage), handlePagination: handlePages })) : null] })));
};
exports.ReactLightTable = ReactLightTable;
