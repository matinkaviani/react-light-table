class helpers {
    static sortAsc(key: string, options?: { putNullAtBottom?: boolean; sortByAbsValue?: boolean }) {
        return function (a: Record<string, unknown>, b: Record<string, unknown>) {
            if (!(key in a) && options?.putNullAtBottom) return 1;
            if (!(key in b) && options?.putNullAtBottom) return -1;
            const aValue = a[key];
            const bValue = b[key];
            if (aValue === null || aValue === undefined) {
                return options?.putNullAtBottom ? 1 : -1;
            }
            if (bValue === null || bValue === undefined) {
                return options?.putNullAtBottom ? -1 : 1;
            }
            if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
                const aNumber = options?.sortByAbsValue
                    ? Math.abs(parseFloat(String(aValue)))
                    : parseFloat(String(aValue));
                const bNumber = options?.sortByAbsValue
                    ? Math.abs(parseFloat(String(bValue)))
                    : parseFloat(String(bValue));
                if (aNumber === bNumber) return 0;
                else if (aNumber > bNumber) return 1;
                else return -1;
            }
            if (aValue === bValue) return 0;
            else if (String(aValue) > String(bValue)) return 1;
            else return -1;
        };
    }

    static sortDesc(key: string, options?: { putNullAtBottom?: boolean; sortByAbsValue?: boolean }) {
        return function (a: Record<string, unknown>, b: Record<string, unknown>) {
            if (!(key in a) && options?.putNullAtBottom) return 1;
            if (!(key in b) && options?.putNullAtBottom) return -1;
            const aValue = a[key];
            const bValue = b[key];
            if (aValue === null || aValue === undefined) {
                return options?.putNullAtBottom ? 1 : -1;
            }
            if (bValue === null || bValue === undefined) {
                return options?.putNullAtBottom ? -1 : 1;
            }
            if (!isNaN(Number(aValue)) && !isNaN(Number(bValue))) {
                const aNumber = options?.sortByAbsValue
                    ? Math.abs(parseFloat(String(aValue)))
                    : parseFloat(String(aValue));
                const bNumber = options?.sortByAbsValue
                    ? Math.abs(parseFloat(String(bValue)))
                    : parseFloat(String(bValue));
                if (aNumber === bNumber) return 0;
                else if (aNumber > bNumber) return -1;
                else return 1;
            }
            if (aValue === bValue) return 0;
            else if (String(aValue) > String(bValue)) return -1;
            else return 1;
        };
    }
}

export default helpers;
