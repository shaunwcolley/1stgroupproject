let heading = document.getElementById('heading')
let a = document.getElementById("a")

firebase.auth().onAuthStateChanged(function(user){
  if(user) {
    firebase.database().ref("users").on('child_added', function(snapshot) {

      if (user.uid == snapshot.key) {
        var firstName = snapshot.val().firstName
        console.log(firstName)
  heading.innerHTML = `Hi, ${firstName}!`
}

})
}else {
  alert("Please Login.")
window.location = "login.html"}
})
