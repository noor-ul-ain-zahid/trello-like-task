import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: ''
    }
  }
  componentWillReceiveProps(props) {
    props.action === 'edit' ? this.setState({ title: props.data }) : this.setState({ title: '' })
  }

  handleChange = event => { this.setState({ title: event.target.value }) }

  submit = () => { this.props.onSubmit(this.state.title) }

  render() {
    return (
      <Dialog
        open={this.props.open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {this.props.type === 'list' ? 'Enter List details' : 'Enter Task details'}
        </DialogTitle>
        <ValidatorForm ref="form" onSubmit={this.submit}>
          <DialogContent>
            <DialogContentText>
              {this.props.title} details to make changes in the system.
            </DialogContentText>
            <TextValidator
              label="Title"
              onChange={this.handleChange}
              name="title"
              value={this.state.title}
              validators={['required']}
              errorMessages={['this field is required']}
              fullWidth
            />
            <br />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.props.hideModal('')} color="primary">Cancel</Button>
            <Button type="submit" color="primary">Submit</Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}