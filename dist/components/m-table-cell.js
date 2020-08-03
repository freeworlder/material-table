"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _objectWithoutProperties2 = _interopRequireDefault(require("@babel/runtime/helpers/objectWithoutProperties"));

var _objectSpread2 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var React = _interopRequireWildcard(require("react"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _Input = _interopRequireDefault(require("@material-ui/core/Input"));

var _Select = _interopRequireDefault(require("@material-ui/core/Select"));

var _DateRangePickerLocal = _interopRequireDefault(require("./DateRangePickerLocal"));

var _propTypes = _interopRequireWildcard(require("prop-types"));

var _reactOutsideClickHandler = _interopRequireDefault(require("react-outside-click-handler"));

var _dateFns = require("date-fns");

var _core = require("@material-ui/core");

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* eslint-enable no-unused-vars */

/* eslint-disable no-useless-escape */
var isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3])\:[0-5]\d|24\:00)(\:[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3])\:?([0-5]\d)?)?)?$/;
/* eslint-enable no-useless-escape */

var MTableCell = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MTableCell, _React$Component);

  var _super = _createSuper(MTableCell);

  function MTableCell(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MTableCell);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onFieldChange", function (event) {
      var cb = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
      var value = event.target.value;

      if (value !== _this.state.fieldValue) {
        _this.setState({
          fieldValue: value
        }, cb);
      } else cb();
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onCellKeyPress", function (event) {
      if (event.charCode === 13) {
        _this.deselectCell(true);
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "deselectCell", function (selectNext) {
      // const value = this.state.fieldValue !== null ? this.state.fieldValue : this.props.value;
      var value = _this.state.fieldValue;

      _this.props.deselectCell(value, selectNext).then(function () {
        _this.setState({
          fieldValue: null
        });
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "handleClickCell", function (e) {
      if (_this.props.columnDef.disableClick) {
        e.stopPropagation();
      }

      if (_this.props.columnDef.editableCells) {
        _this.props.onEditableCellClick();
      }
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "getStyle", function () {
      var cellStyle = {
        color: 'inherit',
        width: _this.props.columnDef.tableData.width,
        boxSizing: 'border-box'
      };

      if (typeof _this.props.columnDef.cellStyle === 'function') {
        cellStyle = (0, _objectSpread2["default"])({}, cellStyle, _this.props.columnDef.cellStyle(_this.props.value, _this.props.rowData));
      } else {
        cellStyle = (0, _objectSpread2["default"])({}, cellStyle, _this.props.columnDef.cellStyle);
      }

      if (_this.props.columnDef.disableClick) {
        cellStyle.cursor = 'default';
      }

      return (0, _objectSpread2["default"])({}, _this.props.style, cellStyle);
    });
    _this.state = {
      fieldValue: null
    };
    return _this;
  }

  (0, _createClass2["default"])(MTableCell, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.setState({
        fieldValue: this.props.value
      });
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps, prevState, snapshot) {
      var value = this.props.value;
      var oldValue = prevProps.value;
      var shouldUpdate = false;

      if (value && oldValue) {
        if (value instanceof Date && value.valueOf() !== oldValue.valueOf() || Array.isArray(value) && JSON.stringify(value) !== JSON.stringify(oldValue) || !(value instanceof Date) && !Array.isArray(value) && value !== oldValue) {
          shouldUpdate = true;
        }
      } else if (value || oldValue) {
        shouldUpdate = true;
      }

      shouldUpdate && this.setState({
        fieldValue: this.props.value
      });
    }
  }, {
    key: "getContent",
    // onMultipleDropdownChanged = event => {
    //     // tbd
    // };
    // onDropdownChanged = event => {
    //     this.props.deselectCell(event.target.value, false);
    // };
    value: function getContent() {
      var _this2 = this;

      var value = this.state.fieldValue !== null ? this.state.fieldValue : this.props.value;
      var component;

      if (this.props.cellEditing) {
        var cellEditingProps = this.props.columnDef.cellEditingProps;
        var editingType = cellEditingProps && cellEditingProps.type ? cellEditingProps.type : 'text';
        var options = cellEditingProps && cellEditingProps.options && Array.isArray(cellEditingProps.options) ? cellEditingProps.options : []; // const isMultiSelect = cellEditingProps ? !!cellEditingProps['multiselect'] : false;

        switch (editingType) {
          case 'dropdown':
            component = /*#__PURE__*/React.createElement(_reactOutsideClickHandler["default"], {
              onOutsideClick: function onOutsideClick() {
                _this2.deselectCell(false);
              }
            }, /*#__PURE__*/React.createElement(_Select["default"] // onChange={isMultiSelect ? this.onMultipleDropdownChanged : this.onDropdownChanged}
            , {
              onChange: this.onFieldChange,
              value: !value ? '' : value,
              "native": true,
              style: {
                width: '100%'
              }
            }, !value ? /*#__PURE__*/React.createElement("option", {
              key: value,
              value: ""
            }) : null, options.map(function (option) {
              var label = !!option && option instanceof Object ? option.label : option;
              var value = !!option && option instanceof Object ? option.value : option;
              return /*#__PURE__*/React.createElement("option", {
                key: value,
                value: value
              }, label);
            })));
            break;

          case 'datetimepicker':
            component = /*#__PURE__*/React.createElement(_DateRangePickerLocal["default"], {
              onChange: function onChange(event) {
                _this2.onFieldChange(event, function () {
                  _this2.deselectCell(false);
                });
              },
              value: value,
              fullwidth: true,
              deselectCell: this.deselectCell,
              format: this.props.columnDef.format,
              minDateTime: cellEditingProps.minDateTime,
              futureOnly: cellEditingProps.futureOnly
            });
            break;
          // ignore-no-fallthrough-next-line

          case 'text':
          default:
            component = /*#__PURE__*/React.createElement(_reactOutsideClickHandler["default"], {
              onOutsideClick: function onOutsideClick() {
                _this2.deselectCell(false);
              }
            }, /*#__PURE__*/React.createElement(_Input["default"], {
              onChange: this.onFieldChange,
              onKeyPress: this.onCellKeyPress // suggestions={this.props.entities.map(entity => {
              //   return { label: entity.entity_name };
              // })}
              ,
              value: value,
              fullWidth: true,
              autoFocus: true
            }));
        }
      } else component = this.getRenderValue();

      return component;
    }
  }, {
    key: "getRenderValue",
    value: function getRenderValue() {
      if (this.props.columnDef.emptyValue !== undefined && (this.props.value === undefined || this.props.value === null)) {
        return this.getEmptyValue(this.props.columnDef.emptyValue);
      }

      if (this.props.columnDef.render) {
        if (this.props.rowData) {
          return this.props.columnDef.render(this.props.rowData, 'row');
        } else {
          return this.props.columnDef.render(this.props.value, 'group');
        }
      } else if (this.props.columnDef.type === 'boolean') {
        var style = {
          textAlign: 'left',
          verticalAlign: 'middle',
          width: 48
        };

        if (this.props.value) {
          return /*#__PURE__*/React.createElement(this.props.icons.Check, {
            style: style
          });
        } else {
          return /*#__PURE__*/React.createElement(this.props.icons.ThirdStateCheck, {
            style: style
          });
        }
      } else if (this.props.columnDef.type === 'date') {
        if (this.props.value instanceof Date) {
          return this.props.value.toLocaleDateString();
        } else if (isoDateRegex.exec(this.props.value)) {
          return new Date(this.props.value).toLocaleDateString();
        } else {
          return this.props.value;
        }
      } else if (this.props.columnDef.type === 'time') {
        if (this.props.value instanceof Date) {
          return this.props.value.toLocaleTimeString();
        } else if (isoDateRegex.exec(this.props.value)) {
          return new Date(this.props.value).toLocaleTimeString();
        } else {
          return this.props.value;
        }
      } else if (this.props.columnDef.type === 'datetime') {
        if (this.props.value instanceof Date) {
          return (0, _dateFns.format)(this.props.value, this.props.columnDef.format, new Date());
        } else if (isoDateRegex.exec(this.props.value)) {
          if (this.props.columnDef.format) {
            return (0, _dateFns.format)(new Date(this.props.value), this.props.columnDef.format, new Date());
          } else {
            return new Date(this.props.value).toLocaleString();
          }
        } else {
          return this.props.value;
        }
      } else if (this.props.columnDef.type === 'currency') {
        return this.getCurrencyValue(this.props.columnDef.currencySetting, this.props.value);
      } else if (typeof this.props.value === "boolean") {
        // To avoid forwardref boolean children.
        return this.props.value.toString();
      }

      return this.props.value;
    }
  }, {
    key: "getEmptyValue",
    value: function getEmptyValue(emptyValue) {
      if (typeof emptyValue === 'function') {
        return this.props.columnDef.emptyValue(this.props.rowData);
      } else {
        return emptyValue;
      }
    }
  }, {
    key: "getCurrencyValue",
    value: function getCurrencyValue(currencySetting, value) {
      if (currencySetting !== undefined) {
        return new Intl.NumberFormat(currencySetting.locale !== undefined ? currencySetting.locale : 'en-US', {
          style: 'currency',
          currency: currencySetting.currencyCode !== undefined ? currencySetting.currencyCode : 'USD',
          minimumFractionDigits: currencySetting.minimumFractionDigits !== undefined ? currencySetting.minimumFractionDigits : 2,
          maximumFractionDigits: currencySetting.maximumFractionDigits !== undefined ? currencySetting.maximumFractionDigits : 2
        }).format(value !== undefined ? value : 0);
      } else {
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(value !== undefined ? value : 0);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          icons = _this$props.icons,
          columnDef = _this$props.columnDef,
          rowData = _this$props.rowData,
          selectedCell = _this$props.selectedCell,
          deselectCell = _this$props.deselectCell,
          cellEditing = _this$props.cellEditing,
          onEditableCellClick = _this$props.onEditableCellClick,
          cellProps = (0, _objectWithoutProperties2["default"])(_this$props, ["icons", "columnDef", "rowData", "selectedCell", "deselectCell", "cellEditing", "onEditableCellClick"]);
      return /*#__PURE__*/React.createElement(_TableCell["default"], (0, _extends2["default"])({
        size: this.props.size
      }, cellProps, {
        style: this.getStyle(),
        align: ['numeric', 'currency'].indexOf(this.props.columnDef.type) !== -1 ? "right" : "left",
        onClick: this.handleClickCell
      }), this.props.children, this.getContent());
    }
  }]);
  return MTableCell;
}(React.Component);

exports["default"] = MTableCell;
MTableCell.defaultProps = {
  columnDef: {},
  value: undefined,
  cellEditing: false
};
MTableCell.propTypes = {
  columnDef: _propTypes["default"].object.isRequired,
  value: _propTypes["default"].any,
  rowData: _propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].array]),
  onEditableCellClick: _propTypes["default"].func,
  cellEditing: _propTypes["default"].bool,
  cellEditingProps: _propTypes["default"].object,
  deselectCell: _propTypes["default"].func
};