import React, { Component } from 'react'; //import React Component
import { AboutPage, ResourcesPage } from './About';
import AdoptPage from './AdoptPet';
import './App.css'; //import css file!
import  {Route, Switch, Link, Redirect, NavLink} from 'react-router-dom'


import SAMPLE_DOGS from './dogs.json'; //a sample list of dogs (model)

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { pets: [] }; //initialize as empty
  }

  componentDidMount() {
    //pretend we loaded external data
    this.setState({ pets: SAMPLE_DOGS });
  }


  render() {
    function renderList(props) {
      return <PetList pets = {props.pets} />;
    }
     console.log(this.props);
    return (
      <div>
        <header className="jumbotron jumbotron-fluid py-4">
          <div className="container">
            <h1> <Link to = "/">Adopt a Pet</Link></h1>
          </div>
        </header>

        <main className="container">
          <div className="row">
            <div className="col-3">
              <AboutNav />
            </div>
            <div className="col-9">
                <Switch>
                <Route exact path="/" render = {() => {return renderList(this.state)}}/>
                  <Route exact path="/about" component={AboutPage}/>
                    <Route exact path="/resources" component={ResourcesPage}/>
                    <Route exact path='/adopt/:nameID' component = {AdoptPage}/>
                    <Redirect to = "/" render = {() => {return renderList(this.state)}}/>
                    </Switch>
            </div>
          </div>
        </main>

              <footer className="container">
                <small>Images from <a href="http://www.seattlehumane.org/adoption/dogs">Seattle Humane Society</a></small>
              </footer>
            </div>
            );
          }
        }

class AboutNav extends Component {
              render() {
            return (
      <nav id="aboutLinks">
              <h2>About</h2>
              <ul className="list-unstyled">
                <li><NavLink activeClassName = "activeLink" exact to = "/">Adopt a Pet</NavLink></li>
                <li><NavLink activeClassName  = "activeLink" exact to = "/about">About Us</NavLink></li>
                <li><NavLink activeClassName  = "activeLink" exact to = "/resources">Resources</NavLink></li>
              </ul>
            </nav>
            );
          }
        }

class PetList extends Component {
              render() {
            let pets = this.props.pets || []; //handle if not provided a prop
    let petCards = pets.map((pet) => {
      return <PetCard key={pet.name} pet={pet} />;
          })

          return (
      <div>
              <h2>Dogs for Adoption</h2>
              <div className="card-deck">
                {petCards}
              </div>
            </div>
            );
          }
        }

class PetCard extends Component {
              constructor(props){
            super(props);
    this.state = {};
          }

  handleClick = () => {
              this.setState({redirect: true});
              console.log("You clicked on", this.props.pet.name);
            }

  render() {
              let pet = this.props.pet; //shortcut
              if (!this.state.redirect){
            return (
      <div className="card" onClick={this.handleClick}>
              <img className="card-img-top" src={pet.images[0]} alt={pet.name} />
              <div className="card-body">
                <h3 className="card-title">{pet.name} {pet.adopted ? '(Adopted)' : ''}</h3>
                <p className="card-text">{pet.sex} {pet.breed}</p>
              </div>
            </div>
            );
          } else {
            return <Redirect push to = {'/adopt/'+ pet.name}/>
          }
        }
      }

export default App;
