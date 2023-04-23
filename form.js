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

var userData;

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

function routetoHome() {
  if (window.location.href.includes("index.html")) {

  }
  else {
    window.location.href = "./index.html";
  }
}

function displayName(uid) {

  console.log(uid);
  firebase.database().ref(`users/${uid}/`).on('value', (snapshot) => {
    console.log(snapshot.val());
  });
  document.getElementsByClassName('body')

}

function loadUserData(uid) {
  console.log(uid);
  firebase.database().ref(`users/${uid}/`).on('value', (snapshot) => {
    userData = snapshot.val();
    console.log(userData);
    document.getElementById('welcome').innerHTML = 'Welcome ' + userData.name;
    processShowerData(userData.showers, userData.gpm);
  });
}

function processShowerData(showersData, gpm) {
  var showers = []
  Object.keys(showersData).forEach(key => {
    var shower = { start: '', end: '' };
    shower.start = new Date(userData.showers[key].start);
    shower.end = new Date(userData.showers[key].end);
    showers.push(shower);
  });
  var totalMinutes = 0;
  showers.forEach(shower => {
    const sh = document.createElement("p");
    minutes = (Math.round((shower.end - shower.start) / 600) / 100);
    totalMinutes += minutes;
    sh.innerHTML = shower.start.toLocaleString('en-US') + " - " + shower.end.toLocaleString() + " Minutes: " + minutes;
    sh.classList.add("shower");
    document.getElementById('showers').appendChild(sh);
  });
  const totalMin = document.createElement('p');
  totalMin.innerHTML = 'Total minutes: ' + Math.round(totalMinutes * 100) / 100 + '<br>Total gallons: ' + Math.round(totalMinutes * gpm * 100) / 100;
  document.getElementById('totals').appendChild(totalMin);
}
