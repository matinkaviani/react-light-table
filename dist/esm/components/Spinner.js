import { jsx as _jsx } from "react/jsx-runtime";
var Spinner = function (_a) {
    var loading = _a.loading;
    return _jsx("div", { className: "loading-spinner ".concat(loading ? 'visible' : 'hidden') });
};
export default Spinner;
