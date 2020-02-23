import React from 'react';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { LineChart } from 'react-chartkick';
import 'chart.js';

class Dashboard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      name: '',
      energyData: [],
      breakData: [],
      sittingData: [],
      sleepData: []
    };
  }

  componentDidMount = () => {
    let token = localStorage.getItem('token');
    fetch('/statistics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({token: token})
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        name: data.name,
        energyData: data.energyData,
        breakData: data.breakData,
        sittingData: data.sittingData,
        sleepData: data.sleepData
      });
    })
    .catch(err => {
      console.error(err);
    });
  }

  logout = () => {
    localStorage.removeItem('token');
    this.props.history.push('/');
  }

  handleCheckup = () => {
    this.props.history.push('/checkup');
  }

  render(){
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Row style={{marginTop: 28}}>
          <Grid.Column style={{ maxWidth: 450 }}>
            <Message>
              <Header as='h1' color='blue' textAlign='center'>
                Hello, {this.state.name ? this.state.name : 'Gamer'}!
              </Header>
            </Message>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ maxWidth: 250 }}>
            <Button color='blue' fluid onClick={this.handleCheckup}>Submit Checkup</Button>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ minWidth: 450 }}>
            <Segment>
                <label>Overall Daily Energy</label>
                <LineChart data={this.state.energyData} />
            </Segment>
          </Grid.Column>

          <Grid.Column style={{ minWidth: 450 }}>
            <Segment>
              <Form.Field>
                <label>Break Frequency</label>
                <LineChart data={this.state.breakData} />
              </Form.Field>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column style={{ minWidth: 450 }}>
            <Segment>
              <Form.Field>
                <label>Sitting Frequency</label>
                <LineChart data={this.state.sittingData} />
              </Form.Field>
            </Segment>
          </Grid.Column>

          <Grid.Column style={{ minWidth: 450 }}>
            <Segment>
              <Form.Field>
                <label>Sleep Hours</label>
                <LineChart data={this.state.sleepData} />
              </Form.Field>
            </Segment>
          </Grid.Column>
        </Grid.Row>
        <Grid.Row style={{ maxWidth: 450 }}>
          <Button color='blue' fluid onClick={this.logout}>Log Out</Button>
        </Grid.Row>
      </Grid>
    );
    
  }
}

export default withRouter(Dashboard);
