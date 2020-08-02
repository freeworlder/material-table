import React from 'react';
import {TextField} from "@material-ui/core";
import {DateTimePicker, LocalizationProvider} from "@material-ui/pickers";
import DateFnsAdapter from '@material-ui/pickers/adapter/date-fns'; // choose your lib
import PropTypes from 'prop-types';
import OutsideClickHandler from "react-outside-click-handler";
import {isValid} from 'date-fns';

/* eslint-disable no-console */

class DateTimePickerLocal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tempValue: null,
      pickerOpen: false
    };
  }

  componentDidMount() {
    const {value} = this.props;
    if (value || value === 0) {
      if (value instanceof Date) {
        this.setState({tempValue: value});
      } else {
        if (isValid(value)) {
          this.setState({tempValue: new Date(value)});
        } else {
          console.log('Cannot parse the incoming date');
        }
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const {value} = this.props;
    if (value) {
      if ((prevProps.value && value.valueOf() !== prevProps.value.valueOf()) || !prevProps.value) {
        if (value instanceof Date) {
          this.setState({tempValue: value});
        } else {
          if (isValid(value)) {
            this.setState({tempValue: new Date(value)});
          } else {
            console.log('Cannot parse the incoming date');
          }
        }
      }
    } else if (prevState.value) {
      this.setState({tempValue: null});
    }
  }

  onAccept = () => {
    this.props.onChange({target: {value: this.state.tempValue}});
    // onChange includes deselect
  };

  onFieldChange = newValue => {
    this.setState({tempValue: newValue});
  }

  render() {
    const {value, onChange, ...other} = this.props;
    return (
      <OutsideClickHandler
        onOutsideClick={() => {
          // we doing anything here only if the picker is open
          if (!this.state.pickerOpen) {
            if ((this.state.tempValue && this.props.value && isValid(this.state.tempValue) && isValid(this.props.value) && this.state.tempValue.valueOf() !== this.props.value.valueOf()) ||
              (this.state.tempValue && this.props.value && isValid(this.state.tempValue) && !isValid(this.props.value)) ||
              (!this.state.tempValue && this.props.value) || (this.state.tempValue && !this.props.value)) {
              this.onAccept();
            } else {
              // this is triggered if the value haven't changed
              this.props.deselectCell(false);
            }
          }
          // if picker is open, then clicking outside would close it and trigger onAccept
        }}
      >
        <LocalizationProvider dateAdapter={DateFnsAdapter}>
          <DateTimePicker
            renderInput={props => (
              <TextField
                {...props}
                // onBlur={() => {
                //   if (!this.props.pickerOpen) this.onAccept();
                // }}
                autoFocus
              />)
            }
            {...other}
            value={this.state.tempValue !== undefined && this.state.tempValue !== null ? new Date(this.state.tempValue) : null}
            onChange={this.onFieldChange}
            onAccept={this.onAccept}
            // onBlur={this.onAccept}
            onOpen={() => {
              this.setState({pickerOpen: true});
            }}
            onClose={() => {
              this.setState({pickerOpen: false});
              // closing will trigger onAccept as well
            }}
            autoAccept
            showTodayButton
            ampm={false}
            inputFormat={this.props.format}
            seconds={this.props.minDateTime}
          />
        </LocalizationProvider>
      </OutsideClickHandler>
    );
  }
}

DateTimePickerLocal.propTypes = {
  value: PropTypes.object,
  onChange: PropTypes.func,
  format: PropTypes.string,
  minDateTime: PropTypes.object
};

export default DateTimePickerLocal;
