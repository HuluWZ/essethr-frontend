import React from "react";
import PropTypes from "prop-types";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Divider,
  FormControlLabel,
  //   MenuItem,
  TextField,
  Typography,
} from "@material-ui/core";

const HolidayForm = ({
  holiday,
  title,
  submitLabel = "Add",
  onCancel,
  onSubmit,
}) => {
  console.log("[HolidayForm]: Line 26 -> Initial holiday object: ", holiday);
  const formTitle =
    title || (holiday ? "Edit holiday details" : "Add new holiday");
  return (
    <Box p={2}>
      <Typography variant="h3" align="center" gutterBottom>
        {formTitle}
      </Typography>
      <Divider />
      <Formik
        initialValues={
          holiday || {
            name: "",
            date: "",
            halfDay: false,
            inPayroll: true,
          }
        }
        validationSchema={Yup.object({
          name: Yup.string().required("'Name' is required"),
          date: Yup.date().default(new Date()),
          halfDay: Yup.boolean().default(false),
          inPayroll: Yup.boolean().default(true),
        })}
        onSubmit={(values) => {
          console.log(values);
          onSubmit(values);
        }}
      >
        {({
          values,
          touched,
          errors,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              required
              fullWidth
              label="Name"
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
              name="name"
              value={values.name}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              size="small"
            />

            <TextField
              fullWidth
              label="Date"
              error={Boolean(touched.date && errors.date)}
              helperText={touched.date && errors.date}
              name="date"
              type="date"
              value={values.date}
              onBlur={handleBlur}
              onChange={handleChange}
              variant="outlined"
              margin="normal"
              size="small"
            />

            <FormControlLabel
              control={
                <Checkbox
                  name="halfDay"
                  checked={values.halfDay}
                  onChange={handleChange}
                />
              }
              label="Half day?"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="inPayroll"
                  checked={values.inPayroll}
                  onChange={handleChange}
                />
              }
              label="Included in Payroll?"
            />

            <Box display="flex" justifyContent="flex-end" mt={2}>
              <ButtonGroup>
                <Button
                  variant="outlined"
                  onClick={onCancel}
                  aria-label="cancel"
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  aria-label="submit"
                >
                  {submitLabel}
                </Button>
              </ButtonGroup>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

HolidayForm.propTypes = {
  holiday: PropTypes.object,
  title: PropTypes.string,
  submitLabel: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default HolidayForm;