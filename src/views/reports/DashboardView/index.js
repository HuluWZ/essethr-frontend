import React from "react";
import { useNavigate } from "react-router";

import moment from "moment";

import {
  Card,
  CardContent,
  Container,
  // Box,
  // Card,
  // CardContent,
  // Divider,
  Grid,
  makeStyles,
  Typography,
  // Typography,
} from "@material-ui/core";

import {
  // Report as AddReportIcon,
  DashboardOutlined as DashboardIcon,
} from "@material-ui/icons";

import {
  UserPlus as AddEmployeeIcon,
  PieChart as AddReportIcon,
} from "react-feather";

import useOrg from "../../../providers/org";

import arrayToMap from "../../../utils/arrayToMap";

import PageView from "../../../components/PageView";

import TotalEmployees from "./TotalEmployees";
import TotalAttendance from "./TotalAttendance";
import TotalLeaves from "./TotalLeaves";
import TotalPayroll from "./TotalPayroll";

// import DailyAttendanceSummary from "./DailyAttendanceSummary";
import AttendanceSummary from "../../attendance/AttendanceSummary";
import DailyLeaveSummary from "./DailyLeaveSummary";
import ApproveAttendanceTable from "./ApproveAttendanceTable";

const useStyles = makeStyles((theme) => ({
  root: {},
}));

// My lovely little niece in #Tigray (active war zone right now):
// "I wanna be the first female to develop an AI that can screen for #sexism #racism #tyranny #injustice and I would call it #ArtificialGod"
// Me:
// Sure! Nothing is impossible dear! If lead by ethical people like @timnitGebru

const DashboardView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { org } = useOrg();
  const { employees, departments, positions } = org;

  const handleAddEmployeeClick = () => {
    navigate("/app/employees/new");
  };

  const handleAddReportClick = () => {
    navigate("/app/reports/");
  };

  React.useEffect(() => {}, []);
  return (
    <PageView
      className={classes.root}
      title="Dashboard"
      icon={
        <span style={{ verticalAlign: "middle" }}>
          <DashboardIcon />
        </span>
      }
      actions={[
        {
          label: "Add Employee",
          icon: { node: <AddEmployeeIcon size="18" /> },
          handler: handleAddEmployeeClick,
          otherProps: {
            size: "small",
            variant: "contained",
            color: "primary",
          },
        },
        {
          label: "Create Report",
          icon: { node: <AddReportIcon size="18" /> },
          handler: handleAddReportClick,
          otherProps: {
            size: "small",
            variant: "contained",
            color: "secondary",
          },
        },
      ]}
    >
      <Grid container spacing={2}>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalEmployees
            currentMonthEmployeesCount={employees ? employees.length : 0}
            lastMonthEmployeesCount={
              employees
                ? employees.filter(
                    (e) =>
                      e.hireDate && moment(new Date()).diff(e.hireDate, "M")
                  ).length
                : 0
            }
          />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalAttendance />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalLeaves />
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          <TotalPayroll />
        </Grid>

        <Grid item xs={12} sm={12}>
          <AttendanceSummary
            attendanceByDate={{}}
            totalEmployees={(employees || []).length}
          />
        </Grid>
      </Grid>
    </PageView>
  );
};

export default DashboardView;