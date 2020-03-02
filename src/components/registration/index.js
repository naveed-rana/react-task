import React, { useState, memo } from "react";
import moment from "moment";
import Grid from "@material-ui/core/Grid";
import SelectCourse from "../Selector/index";
import { coursesName } from "./data.js";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Radio from "@material-ui/core/Radio";
import Button from "@material-ui/core/Button";
import BeatLoader from "react-spinners/BeatLoader";
import Dialog from "@material-ui/core/Dialog";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import toastr from "toastr";
import { useStyles } from "./style";

export default function Registration() {

//state
  const classes = useStyles();
  const [selectedValue, setSelectedValue] = useState("a");
  const [courses, setCourses] = useState(coursesName.a);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectValue, setSelectValue] = useState("");
  const [textArea, setTextArea] = useState("");
  const [loader, setLoader] = useState(false);
  const [open, setOpen] = useState(false);

  //handlers
  const handleClose = () => {
    setOpen(false);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const handleTextArea = e => {
    setTextArea(e.target.value);
  };

  const handleSelectCourse = value => {
    setSelectValue(value);
  };

  const handleChange = event => {
    setSelectedValue(event.target.value);

    setCourses(coursesName[event.target.value]);
  };



  const submitForm = () => {
    let date = moment(selectedDate).format("MM/DD/YYYY");
    if (selectValue === "") {
      toastr.error("select the course");
    } else if (
      (textArea.length > 0 && textArea.length < 20) ||
      textArea.length > 500
    ) {
      toastr.error("Additional notes must be between 20 to 500 words");
    } else if (
      date == "12/20/2019" ||
      date == "01/15/2020" ||
      date == "02/01/2020"
    ) {
      toastr.error(
        "Your selected course and subject is not offered beginning from your selected data"
      );
    } else {
      setLoader(true);
      setTimeout(() => {
        setLoader(false);
        setOpen(true);
      }, 2000);
    }
  };



  return (
    <div className={classes.root}>
      <div className={classes.title}>
        <h1>Registration Form</h1>
      </div>

      <Grid container direction="row" justify="center" align="center">
        <Grid item lg={3}>
          <label>Technical Report Writing</label>
          <Radio
            checked={selectedValue === "a"}
            onChange={handleChange}
            value="a"
            name="Technical Report Writing"
          />
        </Grid>
        <Grid item lg={3}>
          <label>English Literature</label>

          <Radio
            checked={selectedValue === "b"}
            onChange={handleChange}
            value="b"
            name="English Literature"
          />
        </Grid>

        <Grid item lg={3}>
          <label>Computer Sciences</label>
          <Radio
            checked={selectedValue === "c"}
            onChange={handleChange}
            value="c"
            name="Computer Sciences"
          />
        </Grid>
      </Grid>

      <Grid container direction="row" justify="center" align="center">
        <Grid lg={6} xs={12}>
          <SelectCourse
            data={courses}
            handleSelectCourse={handleSelectCourse}
          />
        </Grid>

        <Grid lg={6} xs={12}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid container direction="row" justify="center" align="center">
        <Grid lg={12} xs={12}>
          <textarea
            className={classes.textarea}
            rowsMax={10}
            aria-label="maximum height"
            placeholder="Additional Notes (Optional)"
            value={textArea}
            onChange={handleTextArea}
          />
        </Grid>
        <div>
          <Button
            variant="outlined"
            color="primary"
            onClick={submitForm}
            className={classes.submitbtn}
          >
            {loader ? (
              <BeatLoader size={17} color={"#123abc"} loading={loader} />
            ) : (
              "Submit"
            )}
          </Button>
        </div>
      </Grid>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <div className={classes.dialog}>
          <h2>
            Your course has been successfully submitted{" "}
            <CheckCircleIcon className={classes.icon} />
          </h2>
        </div>
      </Dialog>

      
    </div>
  );
}
