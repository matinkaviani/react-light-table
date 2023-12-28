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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx } from "react/jsx-runtime";
var TextEllipsis = function (_a) {
    var children = _a.children, _b = _a.lineClamp, lineClamp = _b === void 0 ? 1 : _b, _c = _a.as, as = _c === void 0 ? "div" : _c, _d = _a.dir, dir = _d === void 0 ? "rtl" : _d, className = _a.className, rest = __rest(_a, ["children", "lineClamp", "as", "dir", "className"]);
    var Wrapper = as;
    return (_jsx(Wrapper, __assign({ className: "multiline-ellipsis ".concat(className !== null && className !== void 0 ? className : ""), style: { WebkitLineClamp: lineClamp, direction: dir } }, rest, { children: children })));
};
export default TextEllipsis;
