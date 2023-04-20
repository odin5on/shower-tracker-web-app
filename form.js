// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later,
// measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCuJwJ8np2Bcim-ECWnqi6TE-CxbogMCNk",
  authDomain: "showertracker-44ce2.firebaseapp.com",
  databaseURL: "https://showertracker-44ce2-default-rtdb.firebaseio.com/",
  projectId: "showertracker-44ce2",
  storageBucket: "showertracker-44ce2.appspot.com",
  messagingSenderId: "125138892507",
  appId: "1:125138892507:web:651fdd3cf5e6daab133efe",
  measurementId: "G-KMD7EQTCC2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

// Signup function
function signUp() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");

  const promise = auth.createUserWithEmailAndPassword(
    email.value,
    password.value
  );
  promise.catch((e) => alert(e.message));
  alert("SignUp Successfully");
}

// SignIN function
function signIn() {
  var email = document.getElementById("email");
  var password = document.getElementById("password");
  const promise = auth.signInWithEmailAndPassword(
    email.value, password.value);
  promise.catch((e) => alert(e.message));
}

// SignOut
function signOut() {
  auth.signOut();
  alert("SignOut Successfully from System");
  window.location.href = "./login.html";
}

// Active user to homepage
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var email = user.email;
    alert("Active user " + email);
    routetoHome();
  } else {
    alert("No Active user Found");
  }
});

function routetoHome(){
  if(window.location.href.includes("index.html")){
    
  }
  else {
    window.location.href = "./index.html";
  }
}
