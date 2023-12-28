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
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import Empty from "./Empty";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import TextEllipsis from "./TextEllipsis";
import helpers from "./helpers";
var ReactLightTable = function (_a) {
    var _b;
    var id = _a.id, columns = _a.columns, data = _a.data, sortable = _a.sortable, _c = _a.headerTextAlign, headerTextAlign = _c === void 0 ? "center" : _c, contentTextAlign = _a.contentTextAlign, className = _a.className, hasPagination = _a.hasPagination, initSort = _a.initSort, numberRows = _a.numberRows, _d = _a.rowsPerPage, rowsPerPage = _d === void 0 ? 50 : _d, loading = _a.loading, handleRowClick = _a.handleRowClick, rowKey = _a.rowKey, afterSort = _a.afterSort, onCurrentDataChange = _a.onCurrentDataChange;
    var _e = useState(initSort
        ? {
            key: initSort.key,
            mode: initSort.mode,
            isAbsoluteValue: initSort.isAbsoluteValue,
        }
        : null), sort = _e[0], setSort = _e[1];
    var _f = useState(1), currentPage = _f[0], setCurrentPage = _f[1];
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
            manageData = __spreadArray([], data, true).sort(helpers[sort.mode === "asc" ? "sortAsc" : "sortDesc"](sort.key, {
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
                manageData = data === null || data === void 0 ? void 0 : data.sort(helpers[sort.mode === "asc" ? "sortAsc" : "sortDesc"](sort.key, {
                    putNullAtBottom: true,
                    sortByAbsValue: sort.isAbsoluteValue,
                })).slice(firstPageIndex, lastPageIndex);
        }
    }
    useEffect(function () {
        onCurrentDataChange === null || onCurrentDataChange === void 0 ? void 0 : onCurrentDataChange(manageData);
    }, [currentPage]);
    return (_jsxs("div", __assign({ id: "custom-table" }, { children: [_jsxs("table", __assign({ id: id, className: "react-light-table ".concat(sortable ? "sortable-table" : "", " ").concat(handleRowClick ? "clickable" : "", " ").concat(className !== null && className !== void 0 ? className : "") }, { children: [_jsx("thead", { children: _jsxs("tr", { children: [numberRows ? (_jsx("th", __assign({ className: "".concat(headerTextAlign !== null && headerTextAlign !== void 0 ? headerTextAlign : "", " number-header-col") }, { children: "Row" }))) : null, columns.map(function (column, idx) {
                                    var _a;
                                    var typeOfTitle = typeof column.title === "string"
                                        ? column.title
                                        : column.title();
                                    return (_jsx("th", __assign({ onClick: function () {
                                            return sortable && column.sortable
                                                ? requestSort(column.key, column.isAbsoluteValue)
                                                : undefined;
                                        }, className: "".concat(headerTextAlign, " ").concat(getClassNamesFor(column.key), " ").concat((_a = column.headClassName) !== null && _a !== void 0 ? _a : ""), title: typeOfTitle }, { children: _jsx("span", __assign({ className: "sortable-header" }, { children: column.isHeadNowrap ? (_jsx(TextEllipsis, { children: typeOfTitle })) : (typeOfTitle) })) }), idx));
                                })] }) }), loading || !manageData || !manageData.length ? null : (_jsx("tbody", { children: manageData.map(function (item, idx) { return (_jsxs("tr", __assign({ onClick: function (e) {
                                return handleRowClick ? handleRowClick(item, e) : undefined;
                            } }, { children: [numberRows ? (_jsx("td", __assign({ className: "".concat(contentTextAlign !== null && contentTextAlign !== void 0 ? contentTextAlign : "", " number-row") }, { children: idx + 1 + (currentPage - 1) * rowsPerPage }), "row")) : null, columns.map(function (column) {
                                    var _a;
                                    return (_jsx("td", __assign({ className: "".concat((_a = column.cellClassName) !== null && _a !== void 0 ? _a : "", " ").concat(contentTextAlign !== null && contentTextAlign !== void 0 ? contentTextAlign : "") }, { children: column.render
                                            ? column.render(column.key, item)
                                            : item[column.key] }), column.key));
                                })] }), rowKey ? "row-".concat(rowKey(item)) : idx)); }) }))] })), !manageData || !manageData.length ? (_jsx("div", { children: _jsx(Empty, {}) })) : null, _jsx("div", __assign({ className: "spinner-loader" }, { children: _jsx(Spinner, { loading: loading !== null && loading !== void 0 ? loading : false }) })), !loading && hasPagination ? (_jsx(Pagination, { page: currentPage, totalPages: Math.ceil(((_b = data === null || data === void 0 ? void 0 : data.length) !== null && _b !== void 0 ? _b : 0) / rowsPerPage), handlePagination: handlePages })) : null] })));
};
export default ReactLightTable;
