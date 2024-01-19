declare class helpers {
    static sortAsc(key: string, options?: {
        putNullAtBottom?: boolean;
        sortByAbsValue?: boolean;
    }): (a: any, b: any) => 0 | 1 | -1;
    static sortDesc: (key: string, options?: {
        sortByAbsValue?: boolean;
    }) => (a: any, b: any) => 0 | 1 | -1;
}
export default helpers;
