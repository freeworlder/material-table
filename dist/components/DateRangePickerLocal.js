"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _react = _interopRequireDefault(require("react"));

var _core = require("@material-ui/core");

var _pickers = require("@material-ui/pickers");

var _dateFns = _interopRequireDefault(require("@material-ui/pickers/adapter/date-fns"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactOutsideClickHandler = _interopRequireDefault(require("react-outside-click-handler"));

var _dateFns2 = require("date-fns");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* eslint-disable no-console */
var DateTimePickerLocal = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(DateTimePickerLocal, _React$Component);

  var _super = _createSuper(DateTimePickerLocal);

  function DateTimePickerLocal(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, DateTimePickerLocal);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onAccept", function () {
      _this.props.onChange({
        target: {
          value: _this.state.tempValue
        }
      }); // onChange includes deselect

    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onFieldChange", function (newValue) {
      _this.setState({
        tempValue: newValue
      });
    });
    _this.state = {
      tempValue: null,
      pickerOpen: false
    };
    return _this;
  }

  (0, _createClass2["default"])(DateTimePickerLocal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var value = this.props.value;

      if (value || value === 0) {
        if (value instanceof Date) {
          this.setState({
            tempValue: value
          });
        } else {
          if ((0, _dateFns2.isValid)(value)) {
            this.setState({
              tempValue: new Date(value)
            });
          } else {
            console.log('Cannot parse the incoming date');
          }
        }
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var value = this.props.value;

      if (value) {
        if (prevProps.value && value.valueOf() !== prevProps.value.valueOf() || !prevProps.value) {
          if (value instanceof Date) {
            this.setState({
              tempValue: value
            });
          } else {
            if ((0, _dateFns2.isValid)(value)) {
              this.setState({
                tempValue: new Date(value)
              });
            } else {
              console.log('Cannot parse the incoming date');
            }
          }
        }
      } else if (prevState.value) {
        this.setState({
          tempValue: null
        });
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          value = _this$props.value,
          onChange = _this$props.onChange,
          other = (0, _objectWithoutProperties2["default"])(_this$props, ["value", "onChange"]);
      return /*#__PURE__*/_react["default"].createElement(_reactOutsideClickHandler["default"], {
        onOutsideClick: function onOutsideClick() {
          // we doing anything here only if the picker is open
          if (!_this2.state.pickerOpen) {
            if (_this2.state.tempValue && _this2.props.value && (0, _dateFns2.isValid)(_this2.state.tempValue) && (0, _dateFns2.isValid)(_this2.props.value) && _this2.state.tempValue.valueOf() !== _this2.props.value.valueOf() || _this2.state.tempValue && _this2.props.value && (0, _dateFns2.isValid)(_this2.state.tempValue) && !(0, _dateFns2.isValid)(_this2.props.value) || !_this2.state.tempValue && _this2.props.value || _this2.state.tempValue && !_this2.props.value) {
              _this2.onAccept();
            } else {
              // this is triggered if the value haven't changed
              _this2.props.deselectCell(false);
            }
          } // if picker is open, then clicking outside would close it and trigger onAccept

        }
      }, /*#__PURE__*/_react["default"].createElement(_pickers.LocalizationProvider, {
        dateAdapter: _dateFns["default"]
      }, /*#__PURE__*/_react["default"].createElement(_pickers.DateTimePicker, (0, _extends2["default"])({
        renderInput: function renderInput(props) {
          return /*#__PURE__*/_react["default"].createElement(_core.TextField, (0, _extends2["default"])({}, props, {
            // onBlur={() => {
            //   if (!this.props.pickerOpen) this.onAccept();
            // }}
            autoFocus: true
          }));
        }
      }, other, {
        value: this.state.tempValue !== undefined && this.state.tempValue !== null ? new Date(this.state.tempValue) : null,
        onChange: this.onFieldChange,
        onAccept: this.onAccept // onBlur={this.onAccept}
        ,
        onOpen: function onOpen() {
          _this2.setState({
            pickerOpen: true
          });
        },
        onClose: function onClose() {
          _this2.setState({
            pickerOpen: false
          });

          _this2.onAccept();
        },
        autoAccept: true,
        showTodayButton: true,
        ampm: false,
        inputFormat: this.props.format,
        seconds: this.props.format.includes('ss'),
        minDateTime: this.props.minDateTime
      }))));
    }
  }]);
  return DateTimePickerLocal;
}(_react["default"].Component);

DateTimePickerLocal.propTypes = {
  value: _propTypes["default"].object,
  onChange: _propTypes["default"].func,
  format: _propTypes["default"].string,
  minDateTime: _propTypes["default"].object
};
var _default = DateTimePickerLocal;
exports["default"] = _default;