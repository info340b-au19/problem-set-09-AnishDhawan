import React, { Component } from 'react'; //import React Component
import Moment from 'react-moment';
import './Chirper.css'; //load module-specific CSS
import firebase from 'firebase/app';
//A list of chirps that have been posted
export default class ChirpList extends Component {
  constructor(props){
    super(props);
    this.state = {chirps:[]};
  }
  componentDidMount() {
    this.chirpsRef = firebase.database().ref("chirps");
    this.chirpsRef.on('value',(snapshot) => {
      this.setState({chirps: snapshot.val()});
    })
  }
  componentWillUnmount() {
    this.chirpsRef.off();
  }
  render() {
    if(!this.state.chirps) return null; //if no chirps, don't display

    console.log(this.state.chirps);
   let items = Object.keys(this.state.chirps).map((key) => {
      let chirpObj = this.state.chirps[key];
      chirpObj.id = key;
      return chirpObj;
    })


    /* TODO: produce a list of `<ChirpItems>` to render */
    let chirpItems =  items.map ((e) => {
      return <ChirpItem chirp = {e} id = {e.id} currentUser = {this.props.currentUser}/>
    }
    ); //REPLACE THIS with an array of actual values!

    return (
      <div className="container">
          {chirpItems}
      </div>);
  }
}

//A single Chirp
class ChirpItem extends Component {

  likeChirp = () => {
    /* TODO: update the chirp when it is liked */
    let likes = firebase.database().ref('chirps/'+this.props.chirp.id+ '/likes');
    var temp;
    if (this.props.chirp.likes=== undefined){
      temp = {};
    } else {
      temp = this.props.chirp.likes;
    }
    console.log(temp);
    if(this.props.currentUser.uid in temp){
      temp[this.props.currentUser.uid] = null;
    }else {
      temp[this.props.currentUser.uid] = true;
    }
    likes.set(temp).catch((error) => {
      console.log(error.errorMessage);
    });
  }

  render() {

    let chirp = this.props.chirp; //current chirp (convenience)

    //counting likes
    let likeCount = 0; //count likes
    let userLikes = false; //current user has liked
    if(chirp.likes){
      likeCount = Object.keys(chirp.likes).length;
      if(chirp.likes[this.props.currentUser.uid]) //if user id is listed
        userLikes = true; //user liked!
    }

    return (
      <div className="row py-4 bg-white border">
        <div className="col-1">
          <img className="avatar" src={chirp.userPhoto} alt={chirp.userName+' avatar'} />
        </div>
        <div className="col pl-4 pl-lg-1">

          <span className="handle">{chirp.userName} {/*space*/}</span>

          <span className="time"><Moment date={chirp.time} fromNow/></span>

          <div className="chirp">{chirp.text}</div>

          {/* A section for showing chirp likes */}
          <div className="likes">
            <i className={'fa fa-heart '+(userLikes ? 'user-liked': '')} aria-label="like" onClick={this.likeChirp} ></i>
            <span>{/*space*/} {likeCount}</span>
          </div>
        </div>
      </div>
    );
  }
}
