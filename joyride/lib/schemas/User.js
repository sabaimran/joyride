"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

// @TODO determine which fields I want to keep in generic user.
var userSchema = new _mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  license: String
});
var userModel = (0, _mongoose.model)('User', userSchema);
var _default = userModel;
exports["default"] = _default;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL2NsaWVudC9zY2hlbWFzL1VzZXIudHMiXSwibmFtZXMiOlsidXNlclNjaGVtYSIsIlNjaGVtYSIsImZpcnN0TmFtZSIsIlN0cmluZyIsImxhc3ROYW1lIiwiZW1haWwiLCJsaWNlbnNlIiwidXNlck1vZGVsIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7O0FBR0E7QUFFQSxJQUFNQSxVQUFVLEdBQUcsSUFBSUMsZ0JBQUosQ0FBVztBQUMxQkMsRUFBQUEsU0FBUyxFQUFFQyxNQURlO0FBRTFCQyxFQUFBQSxRQUFRLEVBQUVELE1BRmdCO0FBRzFCRSxFQUFBQSxLQUFLLEVBQUVGLE1BSG1CO0FBSTFCRyxFQUFBQSxPQUFPLEVBQUVIO0FBSmlCLENBQVgsQ0FBbkI7QUFPQSxJQUFNSSxTQUFTLEdBQUcscUJBQXdCLE1BQXhCLEVBQWdDUCxVQUFoQyxDQUFsQjtlQUNlTyxTIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRG9jdW1lbnQsIE1vZGVsLCBTY2hlbWEsIG1vZGVsIH0gZnJvbSBcIm1vbmdvb3NlXCI7XHJcbmltcG9ydCB7IElVc2VyIH0gZnJvbSAnLi4vaW50ZXJmYWNlcy9JVXNlcic7XHJcblxyXG4vLyBAVE9ETyBkZXRlcm1pbmUgd2hpY2ggZmllbGRzIEkgd2FudCB0byBrZWVwIGluIGdlbmVyaWMgdXNlci5cclxuXHJcbmNvbnN0IHVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hKHtcclxuICAgIGZpcnN0TmFtZTogU3RyaW5nLFxyXG4gICAgbGFzdE5hbWU6IFN0cmluZyxcclxuICAgIGVtYWlsOiBTdHJpbmcsXHJcbiAgICBsaWNlbnNlOiBTdHJpbmdcclxufSk7XHJcblxyXG5jb25zdCB1c2VyTW9kZWwgPSBtb2RlbDxJVXNlciAmIERvY3VtZW50PignVXNlcicsIHVzZXJTY2hlbWEpO1xyXG5leHBvcnQgZGVmYXVsdCB1c2VyTW9kZWw7Il19