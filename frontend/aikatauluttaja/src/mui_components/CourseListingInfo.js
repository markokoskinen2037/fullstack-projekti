import React, { Component, Fragment } from 'react'
import { Paper, ListItem, ListItemText, Typography } from '@material-ui/core'

export default class CourseListingInfo extends Component {
  render() {
    return (
      <Paper style={{ marginBottom: '35px' }}>
        <ListItem>
          <ListItemText primary="Nimi" />

          <Fragment>
            <Typography>Arvioitu työaika </Typography>
            <i className="material-icons">arrow_right_alt</i>{' '}
            <Typography style={{ marginRight: '20px' }}>
              Henkilökohtainen työaika
            </Typography>
          </Fragment>
          <Fragment>
            <Typography style={{ marginRight: '50px' }}>Tavoite</Typography>
          </Fragment>
          <Fragment>
            <Typography style={{ marginRight: '54px' }}>
              Oma arvio/keskiarvo
            </Typography>
          </Fragment>
          <Fragment>
            <Typography style={{ marginRight: '20px' }}>Op. määrä</Typography>
          </Fragment>
          <Fragment>
            <Typography style={{ marginRight: '30px' }}>Pituus</Typography>
          </Fragment>

          <Fragment>
            <Typography style={{ marginRight: '42px' }}>Muokkaa</Typography>
          </Fragment>
          <Fragment>
            <Typography style={{ marginRight: '45px' }}>Poista</Typography>
          </Fragment>
          <Fragment>
            <Typography style={{ marginRight: '20px' }}>Aktivoi</Typography>
          </Fragment>
        </ListItem>
      </Paper>
    )
  }
}
