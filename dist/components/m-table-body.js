"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _objectSpread3 = _interopRequireDefault(require("@babel/runtime/helpers/objectSpread"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _assertThisInitialized2 = _interopRequireDefault(require("@babel/runtime/helpers/assertThisInitialized"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var React = _interopRequireWildcard(require("react"));

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = (0, _getPrototypeOf2["default"])(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = (0, _getPrototypeOf2["default"])(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return (0, _possibleConstructorReturn2["default"])(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

/* eslint-enable no-unused-vars */
var MTableBody = /*#__PURE__*/function (_React$Component) {
  (0, _inherits2["default"])(MTableBody, _React$Component);

  var _super = _createSuper(MTableBody);

  function MTableBody(props) {
    var _this;

    (0, _classCallCheck2["default"])(this, MTableBody);
    _this = _super.call(this, props);
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "onEditableCellClick", function (rowIndex) {
      return function (field) {
        return function ()
        /*event*/
        {
          _this.setState({
            selectedCell: {
              rowIndex: rowIndex,
              field: field
            }
          });
        };
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "deselectCell", function (rowIndex) {
      return function (field) {
        return function (value) {
          var selectNext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          var rowData = _this.props.renderData[rowIndex];
          var entity = (0, _objectSpread3["default"])({}, rowData);
          delete entity.tableData; //todo: check if tableData is present and needs deleting, check format of renderData

          return new Promise(function (resolve) {
            if (value !== null && entity[field] !== value) {
              _this.props.cellEditingUpdate((0, _objectSpread3["default"])({}, entity, (0, _defineProperty2["default"])({}, field, value))).then(function () {
                resolve();

                _this.selectNext(selectNext, rowIndex, field);
              });
            } else {
              resolve();

              _this.selectNext(selectNext, rowIndex, field);
            }
          });
        };
      };
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "selectNext", function (selectNext, rowIndex, field) {
      var selectedCell = {}; //nothing selected

      if (selectNext) {
        // checking there is a next row
        var totalRows = _this.props.totalRecords;
        var currentPage = _this.props.currentPage;
        var rowsPerPage = _this.props.pageSize;

        if (rowsPerPage * currentPage + rowIndex + 1 === totalRows) {
          // last row
          // focus back button
          var prevPaginationRef = _this.props.prevButtonRef;
          prevPaginationRef && prevPaginationRef.current && prevPaginationRef.current.focus();
        } else if (rowIndex === rowsPerPage - 1) {
          // last row on page
          // focus on next button
          var nextPaginationRef = _this.props.nextButtonRef;
          nextPaginationRef && nextPaginationRef.current && nextPaginationRef.current.focus();
        } else {
          selectedCell = {
            field: field,
            rowIndex: rowIndex + 1
          };
        }
      }

      _this.setState({
        selectedCell: selectedCell
      });
    });
    (0, _defineProperty2["default"])((0, _assertThisInitialized2["default"])(_this), "rowRefs", []);
    _this.state = {
      selectedCell: {
        rowIndex: null,
        field: null
      }
    };
    return _this;
  }

  (0, _createClass2["default"])(MTableBody, [{
    key: "renderEmpty",
    value: function renderEmpty(emptyRowCount, renderData) {
      var rowHeight = this.props.options.padding === 'default' ? 49 : 36;
      var localization = (0, _objectSpread3["default"])({}, MTableBody.defaultProps.localization, this.props.localization);

      if (this.props.options.showEmptyDataSourceMessage && renderData.length === 0) {
        var addColumn = 0;

        if (this.props.options.selection) {
          addColumn++;
        }

        if (this.props.actions && this.props.actions.filter(function (a) {
          return a.position === "row" || typeof a === "function";
        }).length > 0) {
          addColumn++;
        }

        if (this.props.hasDetailPanel) {
          addColumn++;
        }

        if (this.props.isTreeData) {
          addColumn++;
        }

        return /*#__PURE__*/React.createElement(_TableRow["default"], {
          style: {
            height: rowHeight * (this.props.options.paging && this.props.options.emptyRowsWhenPaging ? this.props.pageSize : 1)
          },
          key: 'empty-' + 0
        }, /*#__PURE__*/React.createElement(_TableCell["default"], {
          style: {
            paddingTop: 0,
            paddingBottom: 0,
            textAlign: 'center'
          },
          colSpan: this.props.columns.length + addColumn,
          key: "empty-"
        }, localization.emptyDataSourceMessage));
      } else if (this.props.options.emptyRowsWhenPaging) {
        return /*#__PURE__*/React.createElement(React.Fragment, null, (0, _toConsumableArray2["default"])(Array(emptyRowCount)).map(function (r, index) {
          return /*#__PURE__*/React.createElement(_TableRow["default"], {
            style: {
              height: rowHeight
            },
            key: 'empty-' + index
          });
        }), emptyRowCount > 0 && /*#__PURE__*/React.createElement(_TableRow["default"], {
          style: {
            height: 1
          },
          key: 'empty-last1'
        }));
      }
    }
  }, {
    key: "renderUngroupedRows",
    value: function renderUngroupedRows(renderData) {
      var _this2 = this;

      return renderData.map(function (data, index) {
        var ref = React.createRef();

        _this2.rowRefs.push(ref);

        if (data.tableData.editing) {
          return /*#__PURE__*/React.createElement(_this2.props.components.EditRow, {
            columns: _this2.props.columns.filter(function (columnDef) {
              return !columnDef.hidden;
            }),
            components: _this2.props.components,
            data: data,
            icons: _this2.props.icons,
            localization: (0, _objectSpread3["default"])({}, MTableBody.defaultProps.localization.editRow, _this2.props.localization.editRow, {
              dateTimePickerLocalization: _this2.props.localization.dateTimePickerLocalization
            }),
            key: index,
            mode: data.tableData.editing,
            options: _this2.props.options,
            isTreeData: _this2.props.isTreeData,
            detailPanel: _this2.props.detailPanel,
            onEditingCanceled: _this2.props.onEditingCanceled,
            onEditingApproved: _this2.props.onEditingApproved,
            getFieldValue: _this2.props.getFieldValue,
            ref: ref,
            selectedCell: _this2.state.selectedCell,
            onEditableCellClick: _this2.onEditableCellClick(index),
            deselectCell: _this2.deselectCell(index)
          });
        } else {
          return /*#__PURE__*/React.createElement(_this2.props.components.Row, {
            components: _this2.props.components,
            icons: _this2.props.icons,
            data: data,
            index: index,
            key: "row-" + data.tableData.id,
            level: 0,
            options: _this2.props.options,
            localization: (0, _objectSpread3["default"])({}, MTableBody.defaultProps.localization.editRow, _this2.props.localization.editRow),
            onRowSelected: _this2.props.onRowSelected,
            actions: _this2.props.actions,
            columns: _this2.props.columns,
            getFieldValue: _this2.props.getFieldValue,
            detailPanel: _this2.props.detailPanel,
            path: [index + _this2.props.pageSize * _this2.props.currentPage],
            onToggleDetailPanel: _this2.props.onToggleDetailPanel,
            onRowClick: _this2.props.onRowClick,
            isTreeData: _this2.props.isTreeData,
            onTreeExpandChanged: _this2.props.onTreeExpandChanged,
            onEditingCanceled: _this2.props.onEditingCanceled,
            onEditingApproved: _this2.props.onEditingApproved,
            hasAnyEditingRow: _this2.props.hasAnyEditingRow,
            treeDataMaxLevel: _this2.props.treeDataMaxLevel,
            ref: ref,
            selectedCell: _this2.state.selectedCell,
            onEditableCellClick: _this2.onEditableCellClick(index),
            deselectCell: _this2.deselectCell(index)
          });
        }
      });
    }
  }, {
    key: "renderGroupedRows",
    value: function renderGroupedRows(groups, renderData) {
      var _this3 = this;

      return renderData.map(function (groupData, index) {
        var ref = React.createRef();

        _this3.rowRefs.push(ref);

        return /*#__PURE__*/React.createElement(_this3.props.components.GroupRow, {
          actions: _this3.props.actions,
          key: groupData.value == null ? '' + index : groupData.value,
          columns: _this3.props.columns,
          components: _this3.props.components,
          detailPanel: _this3.props.detailPanel,
          getFieldValue: _this3.props.getFieldValue,
          groupData: groupData,
          groups: groups,
          icons: _this3.props.icons,
          level: 0,
          path: [index + _this3.props.pageSize * _this3.props.currentPage],
          onGroupExpandChanged: _this3.props.onGroupExpandChanged,
          onRowSelected: _this3.props.onRowSelected,
          onRowClick: _this3.props.onRowClick,
          onEditingCanceled: _this3.props.onEditingCanceled,
          onEditingApproved: _this3.props.onEditingApproved,
          onToggleDetailPanel: _this3.props.onToggleDetailPanel,
          onTreeExpandChanged: _this3.props.onTreeExpandChanged,
          options: _this3.props.options,
          isTreeData: _this3.props.isTreeData,
          hasAnyEditingRow: _this3.props.hasAnyEditingRow,
          localization: (0, _objectSpread3["default"])({}, MTableBody.defaultProps.localization.editRow, _this3.props.localization.editRow),
          ref: ref,
          selectedCell: _this3.state.selectedCell,
          onEditableCellClick: _this3.onEditableCellClick(index),
          groupInnerSelection: _this3.props.groupInnerSelection
        });
      });
    }
  }, {
    key: "render",
    value: function render() {
      var renderData = this.props.renderData;
      var groups = this.props.columns.filter(function (col) {
        return col.tableData.groupOrder > -1;
      }).sort(function (col1, col2) {
        return col1.tableData.groupOrder - col2.tableData.groupOrder;
      });
      var emptyRowCount = 0;

      if (this.props.options.paging) {
        emptyRowCount = this.props.pageSize - renderData.length;
      }

      return /*#__PURE__*/React.createElement(_TableBody["default"], null, this.props.options.filtering && /*#__PURE__*/React.createElement(this.props.components.FilterRow, {
        columns: this.props.columns.filter(function (columnDef) {
          return !columnDef.hidden;
        }),
        icons: this.props.icons,
        hasActions: this.props.actions.filter(function (a) {
          return a.position === "row" || typeof a === "function";
        }).length > 0,
        actionsColumnIndex: this.props.options.actionsColumnIndex,
        onFilterChanged: this.props.onFilterChanged,
        selection: this.props.options.selection,
        localization: (0, _objectSpread3["default"])({}, MTableBody.defaultProps.localization.filterRow, this.props.localization.filterRow, {
          dateTimePickerLocalization: this.props.localization.dateTimePickerLocalization
        }),
        hasDetailPanel: !!this.props.detailPanel,
        isTreeData: this.props.isTreeData,
        filterCellStyle: this.props.options.filterCellStyle,
        hideFilterIcons: this.props.options.hideFilterIcons
      }), this.props.showAddRow && this.props.options.addRowPosition === "first" && /*#__PURE__*/React.createElement(this.props.components.EditRow, {
        columns: this.props.columns.filter(function (columnDef) {
          return !columnDef.hidden;
        }),
        data: this.props.initialFormData,
        components: this.props.components,
        icons: this.props.icons,
        key: "key-add-row",
        mode: "add",
        localization: (0, _objectSpread3["default"])({}, MTableBody.defaultProps.localization.editRow, this.props.localization.editRow),
        options: this.props.options,
        isTreeData: this.props.isTreeData,
        detailPanel: this.props.detailPanel,
        onEditingCanceled: this.props.onEditingCanceled,
        onEditingApproved: this.props.onEditingApproved,
        getFieldValue: this.props.getFieldValue
      }), groups.length > 0 ? this.renderGroupedRows(groups, renderData) : this.renderUngroupedRows(renderData), this.props.showAddRow && this.props.options.addRowPosition === "last" && /*#__PURE__*/React.createElement(this.props.components.EditRow, {
        columns: this.props.columns.filter(function (columnDef) {
          return !columnDef.hidden;
        }),
        data: this.props.initialFormData,
        components: this.props.components,
        icons: this.props.icons,
        key: "key-add-row",
        mode: "add",
        localization: (0, _objectSpread3["default"])({}, MTableBody.defaultProps.localization.editRow, this.props.localization.editRow),
        options: this.props.options,
        isTreeData: this.props.isTreeData,
        detailPanel: this.props.detailPanel,
        onEditingCanceled: this.props.onEditingCanceled,
        onEditingApproved: this.props.onEditingApproved,
        getFieldValue: this.props.getFieldValue
      }), this.renderEmpty(emptyRowCount, renderData));
    }
  }]);
  return MTableBody;
}(React.Component);

MTableBody.defaultProps = {
  actions: [],
  currentPage: 0,
  pageSize: 5,
  renderData: [],
  selection: false,
  localization: {
    emptyDataSourceMessage: 'No records to display',
    filterRow: {},
    editRow: {}
  },
  groupInnerSelection: false
};
MTableBody.propTypes = {
  actions: _propTypes["default"].array,
  components: _propTypes["default"].object.isRequired,
  columns: _propTypes["default"].array.isRequired,
  currentPage: _propTypes["default"].number,
  detailPanel: _propTypes["default"].oneOfType([_propTypes["default"].func, _propTypes["default"].arrayOf(_propTypes["default"].oneOfType([_propTypes["default"].object, _propTypes["default"].func]))]),
  getFieldValue: _propTypes["default"].func.isRequired,
  hasAnyEditingRow: _propTypes["default"].bool,
  hasDetailPanel: _propTypes["default"].bool.isRequired,
  icons: _propTypes["default"].object.isRequired,
  isTreeData: _propTypes["default"].bool.isRequired,
  onRowSelected: _propTypes["default"].func,
  options: _propTypes["default"].object.isRequired,
  pageSize: _propTypes["default"].number,
  renderData: _propTypes["default"].array,
  initialFormData: _propTypes["default"].object,
  selection: _propTypes["default"].bool.isRequired,
  showAddRow: _propTypes["default"].bool,
  treeDataMaxLevel: _propTypes["default"].number,
  localization: _propTypes["default"].object,
  onFilterChanged: _propTypes["default"].func,
  onGroupExpandChanged: _propTypes["default"].func,
  onToggleDetailPanel: _propTypes["default"].func.isRequired,
  onTreeExpandChanged: _propTypes["default"].func.isRequired,
  onRowClick: _propTypes["default"].func,
  onEditingCanceled: _propTypes["default"].func,
  onEditingApproved: _propTypes["default"].func,
  cellEditingUpdate: _propTypes["default"].func,
  prevButtonRef: _propTypes["default"].object,
  nextButtonRef: _propTypes["default"].object,
  totalRecords: _propTypes["default"].number,
  groupInnerSelection: _propTypes["default"].bool
};
var _default = MTableBody;
exports["default"] = _default;