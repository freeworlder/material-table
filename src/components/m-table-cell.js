/* eslint-disable no-unused-vars */
import * as React from 'react';
import TableCell from '@material-ui/core/TableCell';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import DateTimePickerLocal from './DateRangePickerLocal';
import PropTypes, {instanceOf} from 'prop-types';
import OutsideClickHandler from 'react-outside-click-handler';
import { format } from 'date-fns';
import { withStyles } from '@material-ui/core';
/* eslint-enable no-unused-vars */
/* eslint-disable no-useless-escape */
const isoDateRegex = /^\d{4}-(0[1-9]|1[0-2])-([12]\d|0[1-9]|3[01])([T\s](([01]\d|2[0-3])\:[0-5]\d|24\:00)(\:[0-5]\d([\.,]\d+)?)?([zZ]|([\+-])([01]\d|2[0-3])\:?([0-5]\d)?)?)?$/;
/* eslint-enable no-useless-escape */

export default class MTableCell extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fieldValue: null
        };
    }

    componentDidMount() {
        this.setState({ fieldValue: this.props.value });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const value = this.props.value;
        const oldValue = prevProps.value;
        let shouldUpdate = false;
        if (value && oldValue) {
              if (
                (value instanceof Date && value.valueOf() !== oldValue.valueOf()) ||
                (Array.isArray(value) && JSON.stringify(value) !== JSON.stringify(oldValue)) ||
                (!(value instanceof Date) && !Array.isArray(value) && value !== oldValue)
              ) {
                  shouldUpdate = true;
              }
        } else if (value || oldValue) {
            shouldUpdate = true;
        }
        shouldUpdate && this.setState({ fieldValue: this.props.value });
    }

    onFieldChange = (event, cb=() => {}) => {
        const value = event.target.value;
        if (value !== this.state.fieldValue) {
            this.setState({ fieldValue: value }, cb);
        } else cb();
    };

    onCellKeyPress = event => {
        if (event.charCode === 13) {
            this.deselectCell(true);
        }
    };

    deselectCell = selectNext => {
        // const value = this.state.fieldValue !== null ? this.state.fieldValue : this.props.value;
        const value = this.state.fieldValue;
        this.props.deselectCell(value, selectNext)
            .then(() => {
                this.setState({ fieldValue: null });
            });
    };

    // onMultipleDropdownChanged = event => {
    //     // tbd
    // };

    // onDropdownChanged = event => {
    //     this.props.deselectCell(event.target.value, false);
    // };

    getContent() {
        const value = this.state.fieldValue !== null ? this.state.fieldValue : this.props.value;
        let component;
        if (this.props.cellEditing) {
            const { cellEditingProps } = this.props.columnDef;
            const editingType = cellEditingProps && cellEditingProps.type ? cellEditingProps.type : 'text';
            const options = cellEditingProps && cellEditingProps.options && Array.isArray(cellEditingProps.options) ? cellEditingProps.options : [];
            // const isMultiSelect = cellEditingProps ? !!cellEditingProps['multiselect'] : false;
            switch (editingType) {
                case 'dropdown':
                    component = (
                        <OutsideClickHandler
                            onOutsideClick={() => {
                                this.deselectCell(false);
                            }}
                        >
                            <Select
                                // onChange={isMultiSelect ? this.onMultipleDropdownChanged : this.onDropdownChanged}
                                onChange={this.onFieldChange}
                                value={!value ? '' : value}
                                native
                                style={{ width: '100%' }}
                            >
                                {!value ? <option key={value} value=""/> : null}
                                {options.map(option => {
                                    const label = !!option && option instanceof Object ? option.label : option;
                                    const value = !!option && option instanceof Object ? option.value : option;
                                    return (
                                        <option key={value} value={value}>{label}</option>
                                    );
                                })}
                            </Select>
                        </OutsideClickHandler>
                    );
                    break;

                case 'datetimepicker':
                    component = (
                        <DateTimePickerLocal
                          onChange={event => {
                              this.onFieldChange(event, () => {
                                  this.deselectCell(false);
                              });
                          }}
                          value={value}
                          fullwidth
                          deselectCell={this.deselectCell}
                          format={this.props.columnDef.format}
                          minDateTime={cellEditingProps.minDateTime}
                          futureOnly={cellEditingProps.futureOnly}
                        />
                      );
                    break;

                // ignore-no-fallthrough-next-line
                case 'text':
                default:
                    component = (
                        <OutsideClickHandler
                            onOutsideClick={() => {
                                this.deselectCell(false);
                            }}
                        >
                            <Input
                                onChange={this.onFieldChange}
                                onKeyPress={this.onCellKeyPress}
                                // suggestions={this.props.entities.map(entity => {
                                //   return { label: entity.entity_name };
                                // })}
                                value={value}
                                fullWidth
                                autoFocus
                            />
                        </OutsideClickHandler>
                    );

            }
        } else component = this.getRenderValue();
        return component;
    }

    getRenderValue() {
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
            const style = { textAlign: 'left', verticalAlign: 'middle', width: 48 };
            if (this.props.value) {
                return <this.props.icons.Check style={style}/>;
            } else {
                return <this.props.icons.ThirdStateCheck style={style}/>;
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
                return format(this.props.value, this.props.columnDef.format, new Date());
            } else if (isoDateRegex.exec(this.props.value)) {
                if (this.props.columnDef.format) {
                   return format(new Date(this.props.value), this.props.columnDef.format, new Date());
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

    getEmptyValue(emptyValue) {
        if (typeof emptyValue === 'function') {
            return this.props.columnDef.emptyValue(this.props.rowData);
        } else {
            return emptyValue;
        }
    }

    getCurrencyValue(currencySetting, value) {
        if (currencySetting !== undefined) {
            return new Intl.NumberFormat((currencySetting.locale !== undefined) ? currencySetting.locale : 'en-US',
                {
                    style: 'currency',
                    currency: (currencySetting.currencyCode !== undefined) ? currencySetting.currencyCode : 'USD',
                    minimumFractionDigits: (currencySetting.minimumFractionDigits !== undefined) ? currencySetting.minimumFractionDigits : 2,
                    maximumFractionDigits: (currencySetting.maximumFractionDigits !== undefined) ? currencySetting.maximumFractionDigits : 2
                }).format((value !== undefined) ? value : 0);
        } else {
            return new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD'
            }).format((value !== undefined) ? value : 0);
        }
    }

    handleClickCell = e => {
        if (this.props.columnDef.disableClick) {
            e.stopPropagation();
        }
        if (this.props.columnDef.editableCells) {
            this.props.onEditableCellClick();
        }
    };

    getStyle = () => {
        let cellStyle = {
            color: 'inherit',
            width: this.props.columnDef.tableData.width,
            boxSizing: 'border-box'
        };

        if (typeof this.props.columnDef.cellStyle === 'function') {
            cellStyle = { ...cellStyle, ...this.props.columnDef.cellStyle(this.props.value, this.props.rowData) };
        } else {
            cellStyle = { ...cellStyle, ...this.props.columnDef.cellStyle };
        }

        if (this.props.columnDef.disableClick) {
            cellStyle.cursor = 'default';
        }

        return { ...this.props.style, ...cellStyle };
    };

    render() {

        const { icons, columnDef, rowData, selectedCell, deselectCell, cellEditing, onEditableCellClick, ...cellProps } = this.props;

        return (
            <TableCell
                size={this.props.size}
                {...cellProps}
                style={this.getStyle()}
                align={['numeric', 'currency'].indexOf(this.props.columnDef.type) !== -1 ? "right" : "left"}
                onClick={this.handleClickCell}
            >
                {this.props.children}
                {this.getContent()}
            </TableCell>
        );
    }
}

MTableCell.defaultProps = {
    columnDef: {},
    value: undefined,
    cellEditing: false
};

MTableCell.propTypes = {
    columnDef: PropTypes.object.isRequired,
    value: PropTypes.any,
    rowData: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    onEditableCellClick: PropTypes.func,
    cellEditing: PropTypes.bool,
    cellEditingProps: PropTypes.object,
    deselectCell: PropTypes.func
};
