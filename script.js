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
  var toDo = document.querySelector('#list');

//Creating User Data
var provider = new firebase.auth.GoogleAuthProvider();
function googleLogin(){
firebase.auth().signInWithPopup(provider).then(cred =>{
  userUID = cred.user.uid;
  userSignedIn = "signedIn";
  //console.log(userUID);
  //realtime data upd
db.collection(userUID).onSnapshot(snapshot => {
  let changes = snapshot.docChanges();
    changes.forEach(change =>{
      if(change.type == "added"){
      renderToDo(change.doc)
      }else if(change.type == "removed"){
      let li = toDo.querySelector('[data-id=' + change.doc.id + ']');
      toDo.removeChild(li);
      console.log(change.doc.id)         
        }
  })
})

return db.collection(cred.user.uid).doc(cred.user.uid).set({})
  
})
document.getElementById("login").style.display = "none";
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
function renderToDo(doc){
  let li = document.createElement('li');
  let doThis = document.createElement('span');
  //let date = document.createElement('span');
  let cross = document.createElement('span');
  li.setAttribute('data-id', doc.id);
  doThis.textContent = doc.data().whatToDo;
  //date.textContent = doc.data().when;
  cross.textContent = "x"

  li.appendChild(doThis);
  li.appendChild(cross);
  //li.appendChild(date);
  toDo.appendChild(li);
  cross.id = "space"
  
  //deleting data
  cross.addEventListener("click", e =>{
    e.stopPropagation();
    let id = e.target.parentElement.getAttribute("data-id");
    db.collection(userUID).doc(id).delete()
  })
}

