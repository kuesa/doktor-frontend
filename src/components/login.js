import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleEmailChange = (e, {value}) => {
    this.setState({email: value});
  }

  handlePasswordChange = (e, {value}) => {
    this.setState({password: value});
  }

  handleSubmit = () => {
    let data = {
      email: this.state.email,
      password: this.state.password
    };

    // Fetch to API with stuff
    fetch('/createUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      localStorage.setItem('token', data.token);
      this.props.history.push('/dashboard');
    })
    .catch(err => {
      console.error(err);
    });
  }

  render() {
    return(
      <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
          <Icon name='heartbeat' size='huge' color='blue'/>
          <Header as='h2' color='blue' textAlign='center'>
            Please Sign In.
          </Header>
          <Form size='large'>
            <Segment>
              <Form.Input fluid 
                          icon='envelope open' 
                          iconPosition='left' 
                          placeholder='E-mail address' 
                          onChange={this.handleEmailChange} 
              />
              <Form.Input fluid 
                          icon='lock' 
                          iconPosition='left' 
                          placeholder='Password' 
                          type='password' 
                          onChange={this.handlePasswordChange} 
              />
              <Button color='blue' fluid size='large'>Login</Button>
            </Segment>
          </Form>
          <Message>
            Need an account? <Link to='/signup'>Sign Up</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;