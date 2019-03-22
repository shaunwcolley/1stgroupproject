
let a = document.getElementById("a")
let editBtn = document.getElementById("editBtn")

firebase.auth().onAuthStateChanged(function(user){
  if(user) {
    firebase.database().ref("users").on('child_added', function(snapshot) {

      if (user.uid == snapshot.key) {
        let firstName = snapshot.val().firstName
        let lastName = snapshot.val().lastName
        let city = Object.values(snapshot.val().location)[0]
        let state = Object.values(snapshot.val().location)[1]
        let weight =  snapshot.val().weight
        let age = snapshot.val().age

        let heightFeet = Object.values(snapshot.val().height)[0]
        let heightInches = Object.values(snapshot.val().height)[1]
        let profilePageBody = `<div><p>First Name: ${firstName}</p>
        <p>Last Name: ${lastName}</p>
        <p>Age: ${age}</p>
        <p>city:${city}</p>
        <p>state: ${state}</p>
        <p>Height Feet: ${heightFeet}</p>
        <p>HeightInches :${heightInches}</p></div>`

        a.innerHTML = profilePageBody

        editBtn.addEventListener('click', function(){
           let profilePageBodyChange = `<form>
                                        <div class="form-row">
                                          <div class="form-group col-sm-3">
                                            <label for="inputEmail4">First Name</label>
                                            <input type="text" class="form-control" id="firstNameTextBox" value="${firstName}">
                                          </div>
                                          <div class="form-group col-sm-3">
                                            <label for="inputPassword4">Last Name</label>
                                            <input type="text" class="form-control" id="lastNameTextBox" value="${lastName}">
                                          </div>
                                        </div>
                                        <div class="form-row">
                                          <div class="form-group col-sm-2">
                                            <label for="inputCity">City</label>
                                            <input type="text" class="form-control" id="cityTextBox" value="${city}">
                                          </div>
                                          <div class="form-group col-sm-2">
                                            <label for="inputState">State</label>
                                            <input type="text" class="form-control" id="stateTextBox" value="${state}">
                                          </div>
                                        </div>
                                        <div class="form-row">
                                          <div class="form-group col-sm-1">
                                            <label for="inputEmail4">Weight-lbs</label>
                                            <input type="text" class="form-control" id="weightTextBox" value="${weight}">
                                          </div>
                                          <div class="form-group col-sm-1">
                                            <label for="inputEmail4">Age</label>
                                            <input type="text" class="form-control" id="ageTextBox" value="${age}">
                                          </div>
                                        </div>
                                        <div>
                                          <span>Height</span>
                                        </div>
                                        <div class="form-row">
                                          <div class="form-group col-sm-1">
                                            <label for="inputPassword4">Feet</label>
                                            <input type="text" class="form-control" id="feetTextBox" value="${heightFeet}">
                                        </div>
                                        <div class="form-group col-sm-1">
                                          <label for="inputPassword4">Inches</label>
                                          <input type="text" class="form-control" id="inchesTextBox" value="${heightInches}">
                                        </div>
                                      </div>
                                      </form>`
        a.innerHTML = profilePageBodyChange
        let backBtn = `<button onclick="goBack('${a}', '${profilePageBody}')" class="btn btn-primary">Back</button>`
        a.insertAdjacentHTML('beforeend', backBtn)
        updateBtn.addEventListener('click', function(){
          let firstNameTextBox = document.getElementById("firstNameTextBox").value
          let lastNameTextBox = document.getElementById("lastNameTextBox").value
          let cityTextBox = document.getElementById("cityTextBox").value
          let stateTextBox = document.getElementById("stateTextBox").value
          let weightTextBox = document.getElementById("weightTextBox").value
          let ageTextBox = document.getElementById("ageTextBox").value
          let feetTextBox = document.getElementById("feetTextBox").value
          let inchesTextBox = document.getElementById("inchesTextBox").value

          let weight = parseInt(weightTextBox,10)
          let age = parseInt(ageTextBox,10)
          let feet = parseInt(feetTextBox,10)
          let inches = parseInt(inchesTextBox,10)
          let userRef = firebase.database().ref(`users/${user.uid}`)
            userRef.update({
            firstName: firstNameTextBox,
            lastName: lastNameTextBox,
            location: {
              city: cityTextBox,
              state: stateTextBox,
            },
            weight: weight,
            age : age,
            height: {feet: feet,
            inches: inches}
          })
          a.innerHTML = profilePageBody
        })
        })
      function goBack(innerLocation, inner){
        innerLocation.innerHTML = inner
      }
    }
    })
  }else {
  alert("Please Login.")
window.location = "login.html"}
})
