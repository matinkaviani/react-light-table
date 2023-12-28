var helpers = /** @class */ (function () {
    function helpers() {
    }
    helpers.sortAsc = function (key, options) {
        return function (a, b) {
            if (!(key in a) && (options === null || options === void 0 ? void 0 : options.putNullAtBottom))
                return 1;
            if (!(key in b) && (options === null || options === void 0 ? void 0 : options.putNullAtBottom))
                return -1;
            var aValue = a[key];
            var bValue = b[key];
            if (aValue === null)
                return (options === null || options === void 0 ? void 0 : options.putNullAtBottom) ? 1 : -1;
            if (bValue === null)
                return (options === null || options === void 0 ? void 0 : options.putNullAtBottom) ? -1 : 1;
            if (!isNaN(aValue) && !isNaN(bValue)) {
                aValue = (options === null || options === void 0 ? void 0 : options.sortByAbsValue) ? Math.abs(parseFloat(aValue)) : parseFloat(aValue);
                bValue = (options === null || options === void 0 ? void 0 : options.sortByAbsValue) ? Math.abs(parseFloat(bValue)) : parseFloat(bValue);
                if (a[key] === b[key])
                    return 0;
                else if (aValue > bValue)
                    return 1;
                else
                    return -1;
            }
            if (a[key] === b[key])
                return 0;
            else if (a[key] > b[key])
                return 1;
            else
                return -1;
        };
    };
    helpers.sortDesc = function (key, options) {
        return function (a, b) {
            if (!(key in a))
                return 1;
            if (!(key in b))
                return -1;
            var aValue = a[key];
            var bValue = b[key];
            if (aValue === null)
                return 1;
            if (bValue === null)
                return -1;
            if (!isNaN(a[key]) && !isNaN(b[key])) {
                aValue = (options === null || options === void 0 ? void 0 : options.sortByAbsValue) ? Math.abs(parseFloat(aValue)) : parseFloat(aValue);
                bValue = (options === null || options === void 0 ? void 0 : options.sortByAbsValue) ? Math.abs(parseFloat(bValue)) : parseFloat(bValue);
                if (a[key] === b[key])
                    return 0;
                else if (aValue > bValue)
                    return -1;
                else
                    return 1;
            }
            if (a[key] === b[key])
                return 0;
            else if (a[key] > b[key])
                return -1;
            else
                return 1;
        };
    };
    return helpers;
}());
export default helpers;
