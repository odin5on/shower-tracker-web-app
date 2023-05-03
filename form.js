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


const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

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
    email.value.toString(), password.value.toString());
  promise.catch((e) => alert(e.message));
}

// SignOut
function signOut() {
  auth.signOut();
  //alert("SignOut Successfully from System");
  window.location.href = "./login.html";
}

// Active user to homepage
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    var email = user.email;
    //alert("Active user " + email);
    routetoHome();
    loadUserData(auth.X);
  } else {
    //alert("No Active user Found");
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
  showersData.sort
  var showers = []
  Object.keys(showersData).forEach(key => {
    var shower = { start: '', end: '' };
    shower.start = new Date(userData.showers[key].start);
    shower.end = new Date(userData.showers[key].end);
    shower.temperature = userData.showers[key].temperature;
    shower.humidity = userData.showers[key].humidity;
    showers.push(shower);
  });
  console.log(showers);
  showers.sort((a, b) => {
    return b.start - a.start;
  });
  console.log(showers);
  today = new Date();
  console.log(today.getMonth());
  console.log(showers[1].start.getMonth());
  var totalMinutes = 0;
  var showersThisMonth = 0;
  showers.forEach(shower => {
    const sh = document.createElement("li");
    minutes = (Math.round((shower.end - shower.start) / 600) / 100);
    nowMonth = today.getMonth();
    if(nowMonth == shower.start.getMonth()){
      totalMinutes += minutes;
      showersThisMonth++;
    }
    sh.innerHTML = "<span>" + shower.start.toLocaleDateString('en-US') + ":</span>  &emsp;" + shower.start.toLocaleTimeString() + " - " + shower.end.toLocaleTimeString() + " &emsp;Minutes: " + minutes + " &emsp;Temp: " + shower.temperature + " &emsp;Humidity: " + shower.humidity + "%";
    sh.classList.add("shower");
    document.getElementById('showers').appendChild(sh);
  });
  const totalMin = document.createElement('p');
  totalMin.innerHTML = 'Minutes: <br><li><span>' + Math.round(totalMinutes * 100) / 100 + '</span></li>';
  const totalGallons = document.createElement('p');
  totalGallons.innerHTML = 'Gallons: <br><li><span>' + Math.round(totalMinutes * gpm * 100) / 100 + '</span></li>';
  const totalShowers = document.createElement('p');
  totalShowers.innerHTML = 'Showers: <br><li><span>' + showersThisMonth + '</span></li>';
  const estimatedCost = document.createElement('p');
  estimatedCost.innerHTML = 'Estimated Cost: <br><li><span>$' + Math.round(totalMinutes * gpm * .005 * 100)/100 + '</span></li>';
  document.getElementById('total-minutes').appendChild(totalMin);
  document.getElementById('total-gallons').appendChild(totalGallons);
  document.getElementById('total-showers').appendChild(totalShowers);
  document.getElementById('estimated-cost').appendChild(estimatedCost);

  document.getElementById('month-label').innerHTML = monthNames[today.getMonth()] + " Totals:";
}

function editGPM(){
  var prompt = "Your current gallons per minute is set to "+userData.gpm+". \nA standard GPM is 2.5, but it could be as low as 1.5."
  var newgpm = window.prompt(prompt, userData.gpm);
  console.log(auth.X);
  firebase.database().ref().child('users').child(auth.X).update({gpm: newgpm});
  location.reload();
}
