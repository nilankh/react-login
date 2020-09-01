// import React from "react";

// import "./App.scss";
// import "./components/loginde/style.scss";
// import Login from "./components/loginde/Login";
// import Register from "./components/loginde/Register";

// class App extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       isLogginActive: true,
//     };
//   }

//   changeState() {
//     const { isLogginActive } = this.state;
//     if (isLogginActive) {
//       this.rightSide.classList.remove("right");
//       this.rightSide.classList.add("left");
//     } else {
//       this.rightSide.classList.remove("left");
//       this.rightSide.classList.add("right");
//     }
//     this.setState((prevState) => ({
//       isLogginActive: !prevState.isLogginActive,
//     }));
//   }
//   render() {
//     const { isLogginActive } = this.state;
//     const current = isLogginActive ? "Register" : "Login";
//     const currentActive = isLogginActive ? "login" : "register";
//     return (
//       <div className="App">
//         <div className="login">
//           <div className="container">
//             {isLogginActive && (
//               <Login containerRef={(ref) => (this.current = ref)} />
//             )}
//             {!isLogginActive && (
//               <Register containerRef={(ref) => (this.current = ref)} />
//             )}
//           </div>
//           <RightSide
//             current={current}
//             containerRef={(ref) => (this.rightSide = ref)}
//             onClick={this.changeState.bind(this)}
//           />
//         </div>
//       </div>
//     );
//   }
// }
// const RightSide = (props) => {
//   return (
//     <div
//       className="right-side"
//       ref={props.containerRef}
//       onClick={props.onClick}
//     >
//       <div className="inner-container">
//         <div className="text">{props.current}</div>
//       </div>
//     </div>
//   );
// };
// export default App;

import React, { Component } from "react";
import firebase from "./firebase";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      files: null,
    };
  }
  handleChange = (files) => {
    this.setState({
      files: files,
    });
  };

  handleSave = () => {
    let bucketName = "images";
    let file = this.state.files[0];
    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
    let uploadTask = storageRef.put(file);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
      let downloadURL = uploadTask.snapshot.downloadURL;
    });
  };
  showImage = () => {
    let storageRef = firebase.storage().ref();
    let spaceRef = storageRef.child("images/" + this.state.files[0].name);
    storageRef
      .child("images/" + this.state.files[0].name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        document.getElementById("new-img").src = url;
      });
  };
  render() {
    return (
      <div>
        <input type="file" onChange={(e)=>{this.handleChange(e.target.files)} }/>
        <button onClick={this.handleSave}>Save</button>
        <button onClick={this.showImage}>Show Images</button>
        <img id="new-img" />
      </div>
    );
  }
}

export default App;
