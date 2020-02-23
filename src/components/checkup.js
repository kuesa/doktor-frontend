import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Rating, Segment, Dropdown, Message } from 'semantic-ui-react';

const breakOptions = ['0', '1', '2', '3', '4', '5', '7', '8', '9', '10+']
      .map(elem => ({key: elem, text: elem, value: elem === '10+' ? 10 : Number(elem)}));

const sittingOptions = ['0', '1', '2', '3', '4', '5', '7', '8', '9', '10+']
      .map(elem => ({key: elem, text: elem + (elem === '1' ? ' hour' : ' hours'), value: elem === '10+' ? 10 : Number(elem)}));

class Checkup extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      selectedEnergy: 0,
      selectedBreak: 0,
      sittingTime: 0,
      sleepHours: 0,
      success: false
    };
  }

  handleEnergySelect = (e, { rating }) => {
    this.setState({selectedEnergy: rating});
  }

  handleBreakSelect = (e, { value }) => {
    this.setState({selectedBreak: value});
  }

  handleSittingSelect = (e, { value }) => {
    this.setState({sittingTime: value});
  }

  handleSleepSelect = (e, { value }) => {
    this.setState({sleepHours: value});
  }

  handleSubmit = () => {
    // Create JSON object with params
    let userToken = localStorage.getItem('token');
    let data = {
      token: userToken,
      energy: this.state.selectedEnergy,
      breaks: this.state.selectedBreak,
      sittingTime: this.state.sittingTime,
      sleepHours: this.state.sleepHours
    }

    // Fetch to API with stuff
    fetch('/submitCheckup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      this.setState({success: true});
      setTimeout(() => {this.props.history.push('/dashboard')}, 2000);
    })
    .catch(err => {
      console.error(err);
    });
  }

  render(){
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as='h2' color='blue' textAlign='center'>
            Daily Checkup
          </Header>
          {this.state.success ? <Message success header='Thank You!' content='Checkup Submission Successful' /> : null}
          <Form size='large'>
            <Segment>
              <Form.Field>
                <label>How much energy did you have today?</label>
                <Rating icon='heart' defaultRating={0} maxRating={5} size='massive' onRate={this.handleEnergySelect} />
              </Form.Field>
              <Form.Field>
                <label>How many breaks did you take today?</label>
                <Dropdown selection options={breakOptions} onChange={this.handleBreakSelect} />
              </Form.Field>
              <Form.Field>
                <label>What was the longest amount of time you remained sitting?</label>
                <Dropdown selection options={sittingOptions} onChange={this.handleSittingSelect} />
              </Form.Field>
              <Form.Field>
                <label>How many hours of sleep did you get last night?</label>
                <Dropdown selection options={sittingOptions} onChange={this.handleSleepSelect} />
              </Form.Field>
              <Button color='blue' fluid size='large' onClick={this.handleSubmit} >Submit</Button>
            </Segment>
          </Form>
        </Grid.Column>
      </Grid>
    );
  }
}

export default withRouter(Checkup);