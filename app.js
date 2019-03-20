//Get unordered list to display exercies from workout
let workoutUL = document.getElementById("workoutUL")
//Custom workout dropdown buttons
let btnWorkout1 = document.getElementById("btnWorkout1")

let dropDownCustom = document.getElementById("dropDownCustom")
let nextList = document.getElementById("nextList")
//Test arrays

let exercises = []
//Hook up Firebase
let database = firebase.database()
let workouts = []
let exercisesRef = database.ref("Exercises")

// adding workout name
/*
exercisesRef.child("6Zm7acP6ZGQi7LUlZRQvXen4LAw2").push({
    name: "Monday"
}) */
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let currentUID = firebase.auth().currentUser.uid
    let userRef = exercisesRef.child(currentUID)
    let exerciseTypeRef = userRef.child("Exercise Types")
    let workoutTypeRef = userRef.child("Workout Types")

    workoutTypeRef
    .on("child_added", function(snapshot){
      workouts.push({key: snapshot.key, value: snapshot.val()})
    })
    exerciseTypeRef.on("child_added", function(snapshot) {
      exercises.push({key: snapshot.key, value: snapshot.val()})
      populateDropdown(workouts, exercises)
    })

  }else {
    console.log("No user is signed in")
  }
})
function populateDropdown(workoutArray, exerciseArray){
    let workoutDropBtns = workoutArray.map(function(workout){
      return `<button onclick="displayExercise('${workout.key}')" class="dropdown-item" type="button">${workout.value.name}</button>`
    })

        //workoutBtn.addEventListener('click',function(){
            //console.log("Button is firing")
            // let liItems = exerciseArray.map(function(exercise) {
            //     return `<li>
            //             <button class="btnExercise">${exercise}</button>
            //             <div>
            //             <ul id="exerciseList">
            //             </ul>
            //             </div>
            //             </li>`
            // })

            //workoutUL.innerHTML = liItems.join('')
            //let btnExercise = document.getElementsByClassName("btnExercise")

        //     for(let i = 0; i < btnExercise.length; i++){
        //         btnExercise[i].addEventListener('click',function(){
        //         //console.log("exercise button is firing")
        //         let newListItems = exerciseArray.map(function(exercise) {
        //             return `<li>
        //                     <span>Last Weight:</span>
        //                     <input type="text" id="weightTextBox" placeholder="Weight (lbs.)">
        //                     </li>`
        //         })
        //         nextList.innerHTML = newListItems.join('')
        //     })
        // }
      dropDownCustom.innerHTML = workoutDropBtns
}
function displayExercise(key) {
  let workoutNames = []
  let exerciseNames = []
  for(let i = 0; i < exercises.length; i++){
    if(key == exercises[i].key){
      workoutNames.push(exercises[i])
    }
  }
  let exerciseObjects = Object.values(workoutNames[0].value)
  for(let i = 0; i < exerciseObjects.length; i++) {
    exerciseNames.push(exerciseObjects[i].name)
  }

  let exerciseLIItems = exerciseNames.map(function(name){
    return `<li>
            <button class="btnExercise">${name}</button>
            <div>
            <ul id="exerciseList">
            </ul>
            </div>
            </li>`
  })
  workoutUL.innerHTML = exerciseLIItems.join('')
}


// exercisesRef.child()
// .on('value',function(snapshot){
//     console.log(snapshot.val())
//     let exerciseInstances = []

    // for(key in snapshot.val()) {
    //     names.push(snapshot.val()[key])
    // }
// })
