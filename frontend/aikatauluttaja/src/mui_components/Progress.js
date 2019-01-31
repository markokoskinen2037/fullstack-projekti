import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from '@material-ui/core/styles'
import LinearProgress from '@material-ui/core/LinearProgress'

const styles = {
  root: {
    flexGrow: 1,
  },
}

class ProgressBar extends React.Component {
  state = {
    user: null,
    completed: 0,
    mounted: false,
  }

  componentDidMount() {
    this.setState({
      user: this.props.user,
      completed: this.props.opintopisteet,
      mounted: true,
    })
  }

  render() {
    if (this.state.mounted) {
      let completed = this.props.getOpintopisteet()
      if (completed !== this.state.completed) {
        this.setState({
          completed,
        })
      }
    }

    const { classes } = this.props
    return (
      <div style={{ width: '90%', margin: '0 auto' }} className={classes.root}>
        <LinearProgress
          variant="determinate"
          value={this.state.completed * (100 / 60)}
        />
        <br />
      </div>
    )
  }
}

ProgressBar.propTypes = {
  classes: PropTypes.object.isRequired,
}

export default withStyles(styles)(ProgressBar)
