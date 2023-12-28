class helpers {
    static sortAsc(key: string, options?: { putNullAtBottom?: boolean, sortByAbsValue?: boolean }) {
        return function (a: any, b: any) {
            if (!(key in a) && options?.putNullAtBottom) return 1;
            if (!(key in b) && options?.putNullAtBottom) return -1;
            let aValue = a[key];
            let bValue = b[key];
            if (aValue === null) return options?.putNullAtBottom ? 1 : -1;
            if (bValue === null) return options?.putNullAtBottom ? -1 : 1;
            if (!isNaN(aValue) && !isNaN(bValue)) {
                aValue = options?.sortByAbsValue ? Math.abs(parseFloat(aValue)) : parseFloat(aValue);
                bValue = options?.sortByAbsValue ? Math.abs(parseFloat(bValue)) : parseFloat(bValue);
                if (a[key] === b[key]) return 0;
                else if (aValue > bValue) return 1;
                else return -1;
            }
            if (a[key] === b[key]) return 0;
            else if (a[key] > b[key]) return 1;
            else return -1;
        };
    }
    static sortDesc = function (key: string, options?: { sortByAbsValue?: boolean }) {
        return function (a: any, b: any) {
            if (!(key in a)) return 1;
            if (!(key in b)) return -1;
            let aValue = a[key];
            let bValue = b[key];
            if (aValue === null) return 1;
            if (bValue === null) return -1;
            if (!isNaN(a[key]) && !isNaN(b[key])) {
                aValue = options?.sortByAbsValue ? Math.abs(parseFloat(aValue)) : parseFloat(aValue);
                bValue = options?.sortByAbsValue ? Math.abs(parseFloat(bValue)) : parseFloat(bValue);
                if (a[key] === b[key]) return 0;
                else if (aValue > bValue) return -1;
                else return 1;
            }
            if (a[key] === b[key]) return 0;
            else if (a[key] > b[key]) return -1;
            else return 1;
        };
    };
}

export default helpers;  