import React, { Component } from 'react';

import '../styles/styles.scss';
import image from '../assets/images/ghome.png';


// If you use React Router, make this component
// render <Router> with your routes. Currently,
// only synchronous routes are hot reloaded, and
// you will see a warning from <Router> on every reload.
// You can ignore this warning. For details, see:
// https://github.com/reactjs/react-router/issues/2182
export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      voice: ''
    };
  }

  submit = (e)=>{
    e.preventDefault();
    
    var m = this.refs.message.value;
    console.log("Msg: "+m);
    fetch('http://localhost:5000/rest',{
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
      method: 'POST',
      body: JSON.stringify({
        text: m
      })
    }).then((resp) => {
      return resp.json();
    }).then((data) => {
      console.log(data);
      
      var text = data.text[0];

    if( text){
      console.log("VAI");

      this.setState({voice: text});

var sentences = text.split(".")
for (var i = 0; i < sentences.length; i++) {
  var sentence = sentences[i]
  var audio = new SpeechSynthesisUtterance(sentence)
  window.speechSynthesis.speak(audio)
}

    }


    

    }).catch((err) => {
      console.log(err);
    })
    
    return false;
  }

  componentDidUpdate(){

  }

  render() {
    return (
      <div style={{height: '100%', width:'100%', textAlign:'center'}}>
        <img src={image} width="300"/><br/>
        <form onSubmit={(e)=>{this.submit(e); }}>
        <input style={{width: 200}} ref="message" type="text" autoFocus />
        <button type="submit">Enviar</button>
        </form>
        <span className="speech">{this.state.voice}</span>
      </div> 
    );
  }
}
