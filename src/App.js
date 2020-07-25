import React,{Component} from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import Navigation from './components/navigation/Navigation';
import Register from './components/Register/Register.js';
import Logo from './components/logo/Logo';
import Signin from './components/signin/Signin.js';
import ImageLink from './components/ImageLink/ImageLink.js';
import FaceRecognition from './components/facerecognition/FaceRecognition.js';
import Rank from './components/rank/Rank.js';
import './App.css';
const app = new Clarifai.App({
 apiKey: 'c7b4fb7f28364326bccdfc9e90ac73b4'
});
const particlesO={
                particles: {
                  number:{
                    value:50,
                    density:{enable:true,value_are: 500}
                  }
                }
              
}

const initialState={
  input:'',
      imageURL:'',
      box:{},
      route:'signin',
      isSignedIn:false,
      user:{
        id:'',
      name:'',
      email:'',
      entries:0,
      joined:''
      }
}

class  App extends Component {
  constructor(){
    super();
    this.state=initialState;
    
  }
  loadUser=(data)=>{
    this.setState({
      user:{
        id:data.id,
      name:data.name,
      email:data.email,
      entries:data.entries,
      joined:data.joined
      }
    })
  }

  calculateFaceLocation=(data)=>{
    const clarifaiFace=data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width=Number(image.width);
    const height =Number(image.height);
    return{
      leftCol:clarifaiFace.left_col*width,
      topRow:clarifaiFace.top_row*height,
      rightCol:width-(clarifaiFace.right_col*width),
      bottomRow:height-(clarifaiFace.bottom_row*height)
    }
  }

  displayFaceBox=(box) =>{
    this.setState({box});
  }

  onInputChange=(event)=>{
    this.setState({input:event.target.value});
  }

    
  onButtonSubmit =()=>{
    this.setState({imageURL:this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response =>{
      if(response){
        fetch('http://localhost:3001/image',{
              method:'put',
          headers:{'Content-Type' :'application/json'},
          body: JSON.stringify({
            id:this.state.user.id
          })  
        })
        .then(response=> response.json())
        .then(count=>{
          this.setState(Object.assign(this.state.user,{entries:count}))
        }).catch(console.log)
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
      .catch(err => console.log(err));
  })
  }

  onRouteChange=(route)=>{
    if(route==='signout'){
      this.setState(initialState);
    }else if(route==='home'){
      this.setState({isSignedIn:true});
    }
    this.setState({route:route});
  }

  render(){
  return (
    <div className="App">
    <Particles className='particles'
      params={particlesO}
      />
      <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
      { this.state.route=== 'home' ?
      <div> 
        <Logo />
        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
        <ImageLink onInputChange={this.onInputChange}  onButtonSubmit={this.onButtonSubmit}/>
        <FaceRecognition box={this.state.box} imageURL={this.state.imageURL} />
      </div>
      : (
          this.state.route==='signin' 
          ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
          : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
      
      }
    </div>
  );
}
}
 
export default App;
