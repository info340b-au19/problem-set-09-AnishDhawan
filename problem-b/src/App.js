import React, { Component } from 'react';
import SignUpForm from './components/signup/SignUpForm';
import ChirpBox from './components/chirper/ChirpBox';
import ChirperHeader from './components/chirper/ChirperHeader';
import ChirpList from './components/chirper/ChirpList';
import firebase from 'firebase/app';
import 'firebase/auth';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      errorMessage: null,
      user: null,
      loading: true
    };
    this.authUnRegFunc = null;
  }

  //A callback function for registering new users
  handleSignUp = (email, password, handle, avatar) => {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign up user here */
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredentials) => {
        let firebaseUser = userCredentials.user;
        console.log("User created: " + firebaseUser);
        let updatePromise = firebaseUser.updateProfile({
          displayName: handle,
          photoURL: avatar
        })
        console.log(updatePromise);
        return updatePromise;
    })
    .catch((error) => { //report any errors
        this.setState({errorMessage: error.message})
        // console.log(this.state.errorMessage);
    });
  }

  //A callback function for logging in existing users
  handleSignIn = (email, password) => {
    this.setState({errorMessage:null}); //clear any old errors

    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log(user.user);
    })
      .catch((err) => {
        this.setState({errorMessage: err.message})
      })
  }

  //A callback function for logging out the current user
  handleSignOut = () => {
    this.setState({errorMessage:null}); //clear any old errors

    /* TODO: sign out user here */
    firebase.auth().signOut()
      .catch((err) => {
        this.setState({errorMessage: err.message})
    })
  }

  componentDidMount() {
    this.authUnRegFunc = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if(firebaseUser) {
        this.setState({user: firebaseUser, loading: false});
      } else {
        this.setState({user: null, loading: true});
      }
    });
  }

  componentWillUnmount() {
    this.authUnRegFunc();
  }

  render() {

    let content = null; //content to render
    let spinnerContent = null;

    if(this.state.loading) {
      spinnerContent = (
        <div className="text-center">
          <i className="fa fa-spinner fa-spin fa-3x" aria-label="Connecting..."></i>
        </div>
      );
    }

    if(!this.state.user) { //if logged out, show signup form
      content = (
        <div className="container">
          <h1>Sign Up</h1>
          <SignUpForm
            signUpCallback={this.handleSignUp}
            signInCallback={this.handleSignIn}
            />
        </div>
      );
    }
    else { //if logged in, show welcome message
      content = (
        <div>
          <ChirperHeader user={this.state.user}>
            {/* log out button is child element */}
            {this.state.user &&
              <button className="btn btn-warning" onClick={this.handleSignOut}>
                Log Out {this.state.user.displayName}
              </button>
            }
          </ChirperHeader>
          <ChirpBox currentUser={this.state.user}>
          </ChirpBox>
          <ChirpList currentUser={this.state.user}>
          </ChirpList>
        </div>
      );
    }

    return (
      <div>
        {this.state.errorMessage &&
          <p className="alert alert-danger">{this.state.errorMessage}</p>
        }
        {content}
        {spinnerContent}
      </div>
    )
  }
}

//A component to display a welcome message to a `user` prop (for readability)
class WelcomeHeader extends Component {
  render() {
    return (
      <header className="container">
        <h1>
          Welcome {this.props.user.displayName}!
          {' '}
          <img className="avatar" src={this.props.user.photoURL} alt={this.props.user.displayName} />
        </h1>
        {this.props.children} {/* for button */}
      </header>
    );
  }
}

export default App;
