import React from "react";
import { useSnackbar } from "notistack";

import { TimeToLeave as LeaveIcon } from "@material-ui/icons";

import API from "../../../api";

import useNotificationSnackbar from "../../../providers/notification-snackbar";

import PageView from "../../../components/PageView";
import TabbedComponent from "../../../components/TabbedComponent";

import LeavesPanel from "./LeavesPanel";
import EntitlementsPanel from "./EntitlementsPanel";
import useLeave from "../../../providers/leave";

const LeaveManagementView = () => {
  const {
    state,
    fetchLeaves,
    fetchLeaveAllowances,
    addLeave,
    approveLeaves,
    updateLeave,
    deleteLeave,
  } = useLeave();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const { notificationSnackbar } = useNotificationSnackbar();
  const notify = notificationSnackbar(enqueueSnackbar, closeSnackbar);

  console.log("Leave management state: ", fetchLeaveAllowances);

  const handleLoadLeaves = (startDate, endDate) => {
    fetchLeaves(startDate, endDate);
  };
  const handleLoadAllowances = () => {
    fetchLeaveAllowances();
  };

  const handleRegisterLeave = (leaveInfo) => {
    addLeave(notify)(leaveInfo);
  };

  const handleApproveLeaves = (leaveIds) => {
    // TODO: Implement approveLeaves action
    approveLeaves(notify)(leaveIds);
  };

  const handleUpdateLeave = (leaveId, leaveUpdate) => {
    updateLeave(notify)(leaveId, leaveUpdate);
  };
  const handleDeleteLeave = (leaveId) => {
    deleteLeave(notify)(leaveId);
  };

  return (
    <PageView
      title="Leave management"
      pageTitle={"Leaves"}
      icon={
        <span style={{ verticalAlign: "middle" }}>
          <LeaveIcon fontSize="large" />
        </span>
      }
    >
      <TabbedComponent
        tabs={[
          {
            label: "Leaves",
            panel: (
              <LeavesPanel
                state={state}
                onFetchLeaves={handleLoadLeaves}
                onRegisterLeave={handleRegisterLeave}
                onApproveLeaves={handleApproveLeaves}
                onUpdateLeave={handleUpdateLeave}
                onDeleteLeave={handleDeleteLeave}
                notify={notify}
              />
            ),
          },
          {
            label: "Leave Balance",
            panel: (
              <EntitlementsPanel
                state={state.fetchLeaveAllowances}
                onFetchAllowances={handleLoadAllowances}
                notify={notify}
              />
            ),
          },
          // { label: "Calendar", panel: <div>Calendar</div> },
        ]}
      />
    </PageView>
  );
};

export default LeaveManagementView;
