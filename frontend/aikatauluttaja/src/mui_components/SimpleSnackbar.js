import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { CircularProgress } from "@material-ui/core";

const styles = theme => ({
  close: {
    width: theme.spacing.unit * 4,
    height: theme.spacing.unit * 4
  }
});

class SimpleSnackbar extends React.Component {
  state = {
    //Alusssa open === false, eli komponenttia ei renderöidä.
    open: false
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    this.setState({ open: false });
    this.props.resetAlert();
    console.log("Resetting alert  from SnackBar-component!");
  };

  componentDidMount() {
    if (this.props.content !== "") {
      this.setState({ open: true });
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center"
          }}
          open={this.state.open}
          autoHideDuration={5000}
          onClose={this.handleClose}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          message={
            <span id="message-id">
              {this.props.content}
              {this.props.inProgress && (
                <CircularProgress
                  className={classes.progress}
                  style={{ color: "white" }}
                  thickness={7}
                />
              )}
            </span>
          }
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </div>
    );
  }
}

SimpleSnackbar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SimpleSnackbar);
