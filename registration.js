let firstNameTextBox = document.getElementById("firstNameTextBox")
let lastNameTextBox = document.getElementById("lastNameTextBox")
let emailTextBox = document.getElementById("emailTextBox")
let passwordTextBox = document.getElementById("passwordTextBox")
let registerBtn = document.getElementById("registerBtn")
let database = firebase.database()
let usersRef = database.ref('users')


registerBtn.addEventListener('click', function(e) {
  e.preventDefault();
  let email = emailTextBox.value
  let password = passwordTextBox.value
  let firstName = firstNameTextBox.value
  let lastName = lastNameTextBox.value

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(response){
    let userRef = usersRef.child(response.user.uid)
    userRef.set({
      firstName: firstName,
      lastName: lastName
    })
    alert("You have successfully registered!")
    //window.location = "login.html"
  })
  .catch(function(error) {
    var errorCode = error.code
    var errorMessage = error.messages
    console.log(errorMessage)
  })
})
