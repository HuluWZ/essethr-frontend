import React from "react";
import PropTypes from "prop-types";

import { Box, Chip, Link, Typography } from "@material-ui/core";
import {
  // Delete as DeleteIcon,
  Edit as EditIcon,
  CheckCircleOutlineRounded as CheckIcon,
  // EmojiNatureSharp as EmptyIcon,
} from "@material-ui/icons";

import TableComponent from "../../components/TableComponent";
import moment from "moment";

const AttendanceTable = ({
  employeesMap,
  requestState,
  attendance,
  onSortParamsChange,
  onEditClicked,
  onApproveClicked,
  onViewEmployeeClicked,
}) => {
  return (
    <TableComponent
      size="small"
      // emptyDataText={
      //   <Box
      //     display="flex"
      //     flexDirection="column"
      //     alignItems="center"
      //     // justifyContent="center"
      //   >
      //     <EmptyIcon
      //       fontSize="large"
      //       size={44}
      //       color="disabled"
      //       style={{ marginBottom: 8 }}
      //     />
      //     <Typography variant="h4" color="textSecondary" gutterBottom>
      //       No one in attendance!
      //     </Typography>
      //     <Typography variant="body1" color="textSecondary">
      //       CLOCK IN or and entry will show up here.
      //     </Typography>
      //   </Box>
      // }
      columns={[
        {
          label: "Employee",
          field: "employeeId",
          sortable: true,
          renderCell: ({ employeeName, employeeId }) => {
            console.log(
              "[AttendanceTable]: Line 54 -> employeeName: ",
              employeeName
            );
            const { _id, firstName, surName } = employeesMap[employeeId] || {};
            const name = employeeName || `${firstName} ${surName}`;
            return (
              <Typography
                variant="h6"
                component={Link}
                onClick={() => onViewEmployeeClicked(_id)}
                style={{ cursor: "pointer" }}
              >
                {name}
              </Typography>
            );
          },
        },
        {
          label: "CLOCK IN",
          field: "checkin",
          sortable: true,
          renderCell: ({ checkin }) => moment(checkin).format("hh:mm A"),
        },
        {
          label: "CLOCK OUT",
          field: "checkout",
          sortable: true,
          renderCell: ({ checkout }) =>
            checkout ? moment(checkout).format("hh:mm A") : "N/A",
        },
        {
          label: "WORKED HRS",
          field: "workedHours",
          align: "center",
          sortable: true,
          renderCell: ({ checkout, workedHours }) => {
            let hrs = workedHours > 0 ? parseInt(workedHours) : workedHours;
            let mins = (parseFloat(workedHours).toFixed(2) - hrs) * 60;
            return workedHours ? (
              <>
                <Typography variant="h4" component="span" mr={1}>
                  {String(`${parseInt(hrs)}`)}
                </Typography>
                <Typography variant="body2" component="span" mr={1}>
                  {hrs > 1 ? "hrs" : "hr"}
                </Typography>
                <Typography variant="h5" component="span" mr={1}>
                  {String(` ${parseInt(mins)}`)}
                </Typography>
                <Typography variant="body2" component="span" mr={1}>
                  {hrs > 1 ? "mins" : "min"}
                </Typography>
              </>
            ) : checkout ? (
              0
            ) : (
              "N/A"
            );
          },
        },
        // {
        //   label: "OVERTIME",
        //   field: "overtimeHours",
        //   align: "center",
        //   sortable: true,
        //   renderCell: ({ checkout, overtimeHours }) => {
        //     // // If todays is holiday
        //     // const holidayAsOvertime = 0;
        //     // // If employee has checked in before work start
        //     // const beforeWork = 0;
        //     // //  If employee has checked out after work end
        //     // const afterWork = 0;

        //     // const calculatedOvertime =
        //     //   holidayAsOvertime || beforeWork + afterWork;

        //     return overtimeHours
        //       ? String(`${parseFloat(overtimeHours).toFixed(1)} hrs`)
        //       : checkout
        //       ? 0
        //       : "N/A";
        //   },
        // },
        {
          label: "REMARK",
          field: "remark",
          renderCell: ({ checkin, remark }) => {
            const calculatedRemark =
              new Date(checkin).toLocaleTimeString() > "08:30:00 AM"
                ? "late"
                : "present";
            const color =
              (remark || calculatedRemark) === "present"
                ? "primary"
                : "secondary";
            return (
              <Chip
                color={color}
                size="small"
                label={remark || calculatedRemark}
              />
            );
          },
        },
        {
          label: "Status",
          field: "status",
          sortable: true,
          renderCell: ({ status }) => (
            <Chip
              size="small"
              color={
                status === "approved"
                  ? "primary"
                  : status === "rejected"
                  ? "secondary"
                  : "default"
              }
              label={status}
            />
          ),
        },
      ]}
      rowActions={[
        {
          label: "Edit",
          handler: (row) => onEditClicked(row),
          icon: <EditIcon size="small" />,

          variant: "outlined",
          size: "small",
        },
        {
          label: "Approve",
          handler: ({ _id }) => onApproveClicked([_id])(),
          icon: <CheckIcon size="small" />,
          disabled: ({ status }) => status === "approved",
        },
      ]}
      selectionEnabled
      selectionActions={[
        {
          icon: <CheckIcon />,
          label: "Approve all",
          handler: (selected) => onApproveClicked(selected),
          variant: "outlined",
          size: "small",
        },
      ]}
      requestState={requestState}
      data={attendance}
      onSortParamsChange={onSortParamsChange}
    />
  );
};

AttendanceTable.propTypes = {
  employeesMap: PropTypes.object,
  requestState: PropTypes.object,
  attendance: PropTypes.array,
  onSortParamsChange: PropTypes.func,
  onEditClicked: PropTypes.func,
  onApproveClicked: PropTypes.func,
  onViewEmployeeClicked: PropTypes.func,
};

export default AttendanceTable;