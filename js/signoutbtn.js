let signOutBtn = document.getElementById("signOutBtn")

signOutBtn.addEventListener('click', function(){
  firebase.auth().signOut()
  .then(function(){
    window.location = "login.html"
  })
  .catch(function(){
    let errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorMessage)
    console.log(errorCode)
  })
})
