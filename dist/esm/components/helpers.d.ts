declare class helpers {
    static sortAsc(key: string, options?: {
        putNullAtBottom?: boolean;
        sortByAbsValue?: boolean;
    }): (a: any, b: any) => 1 | -1 | 0;
    static sortDesc: (key: string, options?: {
        sortByAbsValue?: boolean;
    }) => (a: any, b: any) => 1 | -1 | 0;
}
export default helpers;
