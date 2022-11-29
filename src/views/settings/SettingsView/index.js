import React from "react";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Divider,
  FormControlLabel,
  // Container,
  makeStyles,
  // Typography,
} from "@material-ui/core";

import { Settings as SettingsIcon } from "react-feather";

import PageView from "../../../components/PageView";
import TabbedComponent from "../../../components/TabbedComponent";
import ViewInDevelopment from "../../../components/ViewInDevelopment";
// import AccountGrid from "../../account/AccountView/AccountGrid";

const useStyles = makeStyles((theme) => ({
  root: {},
  card: {
    // backgroundColor: theme.palette.background.dark,
  },
}));

const SettingsView = () => {
  const classes = useStyles();
  return (
    <PageView title="Settings" icon={<SettingsIcon />}>
      <TabbedComponent
        tabs={[
          // { label: "Account", panel: <AccountGrid /> },
          { label: "Permissions", panel: <ViewInDevelopment viewName={'Permissions'} /> },
          { label: "Employee Fields", panel: <ViewInDevelopment viewName={'Employee Fields'} /> },
          { label: "Templates", panel: <ViewInDevelopment viewName={'Templates'} /> },
        ]}
      />
      {/* <Card className={classes.card}>
        <CardHeader
          title={"Navigation options"}
          subheader={"Ease of access controls"}
        />
        <Divider />
        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={false} onChange={() => {}} />}
            label={"Easy find menu"}
          />
        </CardContent>
      </Card>
      <Box mb={2} />
      <Card className={classes.card}>
        <CardHeader title={"Display"} subheader={"Change display settings"} />
        <Divider />
        <CardContent>
          <FormControlLabel
            control={<Checkbox checked={false} onChange={() => {}} />}
            label={"Color calibration"}
          />
        </CardContent>
      </Card> */}
    </PageView>
  );
};

export default SettingsView;
