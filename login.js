let loginTextBox = document.getElementById("loginTextBox")
let loginPasswordBox = document.getElementById("loginPasswordBox")
let loginButton = document.getElementById("loginButton")

firebase.auth().onAuthStateChanged(function(user){
  if(user) {
    window.location = "maindashboardpage.html"
  }else{
    loginButton.addEventListener('click',function(e){
      e.preventDefault()

      let email = loginTextBox.value
      let password = loginPasswordBox.value

      firebase.auth().signInWithEmailAndPassword(email, password)
      .then(function(response){
        window.location = "dashboard.html"
      })
      .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      });
    })
  }
})
