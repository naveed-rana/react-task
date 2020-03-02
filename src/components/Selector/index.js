import React, { useState, memo } from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formControl: {
    minWidth: 120
  }
});

function SelectCourse({ data, handleSelectCourse }) {

  //use style
  const classes = useStyles();
  const [course, setCourse] = useState("");

  const handleChange = event => {
    setCourse(event.target.value);
    handleSelectCourse(event.target.value);
  };

  return (
    <>
      <FormControl className={classes.formControl}>
        <InputLabel id="select-label">Courses</InputLabel>
        <Select labelId="select-label" value={course} onChange={handleChange}>
          {data.map(value => (
            <MenuItem value={value}>{value}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}


export default memo(SelectCourse)
