import React from 'react';
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
    };
  }

  handleNameChange = (e, {value}) => {
    this.setState({name: value});
  }

  handleEmailChange = (e, {value}) => {
    this.setState({email: value});
  }

  handlePasswordChange = (e, {value}) => {
    this.setState({password: value});
  }

  handleSubmit = () => {
    let data = {
      name: this.state.name,
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
          <Header as='h2' color='blue' textAlign='center'>
            Sign Up
          </Header>
          <Form size='large'>
            <Segment>
              <Form.Input fluid 
                          icon='user' 
                          iconPosition='left' 
                          placeholder='Name' 
                          onChange={this.handleNameChange} 
              />
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
              <Button color='blue' fluid size='large' onClick={this.handleSubmit} >Sign Up</Button>
            </Segment>
          </Form>
          <Message>
            Already have an account? <Link to='/login'>Log in</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Signup;