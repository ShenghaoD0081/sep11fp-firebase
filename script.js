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
  //Firestore
  var db = firebase.firestore();
  var userUID = [];
  var userSignedIn = [];



//Creating User Data
var provider = new firebase.auth.GoogleAuthProvider();
function googleLogin(){
firebase.auth().signInWithPopup(provider).then(cred =>{
  userUID = cred.user.uid;
  userSignedIn = "loggedIn";
  console.log(userUID);
  db.collection(userUID).get().then((snapshot) => {
  snapshot.docs.forEach(doc =>{
    renderToDo(doc)
  })
  })
  return db.collection(cred.user.uid).doc(cred.user.uid).set({
  })

  
})
};


//Saving Data
document.addEventListener("DOMContentLoaded", function(){
var form = document.querySelector("#myForm");
form.addEventListener('submit', (e) => {
  e.preventDefault();
  db.collection(userUID).add({
    whatToDo: form.whatToDo.value,
    //when: form.when.value
  })
  form.whatToDo.value = '';
  //form.when.value = '';
})

});





//Render toDo function
const toDoList = document.querySelector('#list');
function renderToDo(doc){
  let li = document.createElement('li');
  let doThis = document.createElement('span');
  //let date = document.createElement('span');
  console.log(doc.id)
  li.setAttribute('data-id', doc.id);
  doThis.textContent = doc.data().whatToDo;
  //date.textContent = doc.data().when;

  li.appendChild(doThis);
  // li.appendChild(date);
  list.appendChild(li);
}

//Getting Data
if(userSignedIn == "loggedIn"){
  console.log("hi");
  db.collection(userUID).get().then((snapshot) => {
  snapshot.docs.forEach(doc =>{
    renderToDo(doc)
  })
})
}

//Test
// db.collection('users').get(userUID).then((docs)=>{
//     docs.forEach(doc => {
//         renderToDo(doc);
//     })
// });

//Realtime Listener
function realtime(){
  console.log(userSignedIn)
  console.log(userUID)
  db.collection(userUID).onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
  changes.forEach(change =>{
    console.log(change.doc.data())
    if(change.type == "added"){
      renderToDo(change.doc)
    }
  })
})
}