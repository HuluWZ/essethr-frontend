import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useLocation } from "react-router-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles,
} from "@material-ui/core";

import {
  PaymentOutlined as PayrollIcon,
  TimeToLeaveOutlined as LeaveIcon,
  DashboardOutlined as DashboardIcon,
  ApartmentOutlined as OrganizationIcon,
} from "@material-ui/icons";

import {
  BarChart as BarChartIcon,
  Settings as SettingsIcon,
  Users as UsersIcon,
  Clock as TimeIcon,
  Linkedin as OrgIcon,
} from "react-feather";

import NavItem from "./NavItem";

import useAuth from "../../../providers/auth";

const navItems = [
  {
    href: "/app/dashboard",
    icon: DashboardIcon,
    title: "Dashboard",
  },
  {
    href: "/app/org",
    icon: OrganizationIcon,
    title: "Admin",
  },
  {
    href: "/app/employees",
    icon: UsersIcon,
    title: "Employees",
  },
  {
    href: "/app/attendance",
    icon: TimeIcon,
    title: "Time management",
  },
  {
    href: "/app/leaves",
    icon: LeaveIcon,
    title: "Leaves and Time-off",
  },
  {
    href: "/app/payroll",
    icon: PayrollIcon,
    title: "Payroll",
  },
  {
    href: "/app/reports",
    icon: BarChartIcon,
    title: "Reports",
  },

  {
    href: "/app/settings",
    icon: SettingsIcon,
    title: "Settings",
  },
  // {
  //   href: "/app/account",
  //   icon: UserIcon,
  //   title: "Account",
  // },
];

const adminNavItems = [
  {
    href: "/app/orgs",
    icon: OrgIcon,
    title: "Organizations",
  },
  {
    href: "/app/users",
    icon: UsersIcon,
    title: "Users",
  },
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 206,
  },
  desktopDrawer: {
    width: 246,
    top: 64,
    height: "calc(100% - 64px)",
  },
  avatar: {
    cursor: "pointer",
    width: 54,
    height: 54,
    marginRight: "10px",
    borderRadius: 50,
  },
  name: {
    fontSize: "1rem",
    fontFamily: "Poppins",
  },
  minimize: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  contactUsButton: {
    cursor: "pointer",
    fontFamily: "Poppins",
  },
}));

const NavBar = ({
  onMobileClose,
  openMobile,
  onMinimize,
  minimized,
  onLogout,
  ...rest
}) => {
  const classes = useStyles();
  const location = useLocation();
  const { auth } = useAuth();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      {auth.isAuth && (
        <>
          <Box
            display="inline-block"
            alignItems="center"
            justifyContent="center"
            p={1}
            mr={1}
            ml={1}
            component={RouterLink}
            to="/app/account"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mt={1}
            >
              <Avatar variant="rounded" className={classes.avatar}>
                {auth.user.firstName.charAt(0) + auth.user.lastName.charAt(0)}
              </Avatar>
            </Box>
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              mt={1}
            >
              <Typography
                className={classes.name}
                color="textSecondary"
                variant="body2"
              >
                {auth.user.name}
              </Typography>
              <Typography
                color="textSecondary"
                variant="body2"
                className={classes.name}
              >
                {auth.user.role}
              </Typography>
              <Box mt={1} />
            </Box>
          </Box>
          <Box p={1} mr={1} ml={1} mb={1}></Box>
        </>
      )}
      <Divider />
      <Box height="100%" p={1}>
        <List>
          {navItems.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
      </Box>
      {auth && auth.user && auth.user.role === "ADMIN" && (
        <Box height="100%" p={2} pb={1}>
          <Typography variant="body2" color="textSecondary">
            ADMIN
          </Typography>

          <List>
            {adminNavItems.map((item) => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
          </List>
        </Box>
      )}
      <Hidden mdDown>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          p={1}
          ml={1}
          mr={1}
          // bgcolor="background.dark"
        >
          <Typography
            align="center"
            color="textSecondary"
            variant="body2"
            className={classes.name}
          >
            Powered by{" "}
            <Typography align="center" component="span">
              FutureTech LLC
            </Typography>
          </Typography>

          <Box
            display="flex"
            justifyContent="center"
            mt={1}
            className={classes.name}
          >
            <Button
              color="primary"
              component="a"
              href="https://futuretech.et"
              variant="outlined"
              size="small"
              className={classes.contactUsButton}
            >
              Contact us
            </Button>
          </Box>
        </Box>
      </Hidden>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          <PerfectScrollbar>{content}</PerfectScrollbar>
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          <PerfectScrollbar>{content}</PerfectScrollbar>
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false,
};

export default NavBar;
