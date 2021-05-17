 // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBN8QJ1WXLM60mSdJL2LH2Fvdy0pnkPNXU",
    authDomain: "fir-test-731e2.firebaseapp.com",
    databaseURL: "https://fir-test-731e2.firebaseio.com",
    projectId: "fir-test-731e2",
    storageBucket: "fir-test-731e2.appspot.com",
    messagingSenderId: "505488697880",
    appId: "1:505488697880:web:66f4f512a5eee62f47316d",
    measurementId: "G-ENBHQ6JMS5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();


function writeData(){
    firebase.database().ref("User").set({
    name: document.getElementById("nameField").value,
    age: document.getElementById("ageField").value
  });
}

var provider = new firebase.auth.GoogleAuthProvider();
function googleLogin(){
firebase.auth().signInWithPopup(provider).then(res=>{
  console.log(res)
}).catch(e=>{
  console.log(e)
})
};
function logout(){
  firebase.auth().signOut().catch(e=>{
  console.log(e)
});
};

