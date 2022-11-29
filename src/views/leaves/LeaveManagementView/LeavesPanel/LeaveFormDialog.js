import React from "react";
import PropTypes from "prop-types";

import { Formik } from "formik";
import * as Yup from "yup";

import {
  Box,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Typography,
} from "@material-ui/core";

import { Alert } from "@material-ui/lab";

import FormikFormFields from "../../../../components/common/FormikFormFields";

import { leaveFormFields } from "./leaveFormFields";

const LeaveFormDialog = ({
  open,
  onClose,
  action,
  leave,
  state,
  onSubmit,
  employees,
  leaveTypes,
  durations,
}) => {
  console.log("LeaveForm state: ", state);

  const employeeOptions = [
    { label: "Choose employee", value: -1 },
    ...employees,
  ];
  const leaveTypeOptions = [
    { label: "Choose a leave type", value: -1 },
    ...leaveTypes,
  ];
  const durationOptions = [
    { label: "Choose duration", value: -1 },
    ...durations,
  ];

  const handleDialogClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    onClose();
  };

  const computeDateDiff = (d1, d2) => {
    return (
      Math.abs(new Date(d1).getTime() - new Date(d2).getTime()) / (24 * 3600000)
    );
  };

  return (
    <Dialog open={open} onClose={handleDialogClose}>
      <DialogContent>
        <Box height="100%" p={2} justifyContent="center">
          {!state.isLoading && (state.message || state.error) && (
            <Box mb={2} p={1}>
              <Alert
                onClose={handleDialogClose}
                severity={state.error ? "error" : "success"}
              >
                {state.message || state.error}
              </Alert>
            </Box>
          )}
          <Typography variant="h4" align="center" gutterBottom>
            {!action || action === "register"
              ? "Register Leave"
              : "Update Leave"}
          </Typography>
          <Divider />
          <FormikFormFields
            initialValues={leave ? leave : null}
            formFields={leaveFormFields({
              employeeOptions,
              leaveTypeOptions,
              durationOptions,
            })}
            submitActionButtonLabel={
              state.isLoading ? (
                <CircularProgress />
              ) : action === "register" ? (
                "Register Leave"
              ) : (
                "Update Leave"
              )
            }
            onSubmit={(values) => {
              let requestInfo = {
                ...values,
              };
              if (values.duration === 1 || values.duration === 2) {
                requestInfo.duration = 0.5;
                requestInfo.to = values.from;
              } else if (values.duration === 3) {
                requestInfo.duration = 1;
              } else {
                requestInfo.duration = computeDateDiff(values.from, values.to);
              }
              onSubmit(requestInfo);
            }}
            onCancel={handleDialogClose}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};

LeaveFormDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  action: PropTypes.string,
  state: PropTypes.object,
  leave: PropTypes.object,
  employees: PropTypes.array,
  leaveTypes: PropTypes.array,
  durations: PropTypes.array,
  onSubmit: PropTypes.func,
};

export default LeaveFormDialog;
