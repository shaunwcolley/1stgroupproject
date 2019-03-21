//Get unordered list to display exercies from workout
let workoutUL = document.getElementById("workoutUL")
//Custom workout dropdown buttons
let btnWorkout1 = document.getElementById("btnWorkout1")
let dropDownCustom = document.getElementById("dropDownCustom")
let nextList = document.getElementById("nextList")
//Test arrays

let exerciseInstanceHistory = document.getElementById("exerciseInstanceHistory")

//Hook up Firebase
let database = firebase.database()
let workouts = []
let exercises = []
let exerciseInstances = []
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
    let exerciseInstancesRef = userRef.child("Exercise Instances")

    workoutTypeRef
    .on("child_added", function(snapshot){
      workouts.push({key: snapshot.key, value: snapshot.val()})
    })
    exerciseTypeRef.on("child_added", function(snapshot) {
      exercises.push({key: snapshot.key, value: snapshot.val()})
      populateDropdown(workouts, exercises)
    })
    exerciseInstancesRef.on("child_added", function(snapshot){
      exerciseInstances.push({key: snapshot.key, value: snapshot.val()})
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
  for(let i = 0; i < exercises.length; i++){
    if(key == exercises[i].key){
      workoutNames.push(exercises[i])
    }
  }
  let exerciseObjects = Object.values(workoutNames[0])[1]
  let exerciseNames = Object.values(exerciseObjects)
  let exerciseKeys = Object.keys(exerciseObjects)
  let exerciseLIItems = []
  for(let i = 0; i < exerciseKeys.length; i++) {
    exerciseLIItems.push(`<li>
            <button onclick="displayStats('${exerciseKeys[i]}'); logExercise()" class="btnExercise">${exerciseNames[i].name}</button>
            <div>
            <ul id="exerciseList">
            </ul>
            </div>
            </li>`)
  }
  workoutUL.innerHTML = exerciseLIItems.join('')
}

function displayStats(key){
  let exerciseInstanceObjects = []
  for(let i = 0; i < exerciseInstances.length; i++){
    if(key == exerciseInstances[i].key){
      exerciseInstanceObjects.push(exerciseInstances[i].value)
    }
  }
  if (exerciseInstanceObjects.length > 0) {
    let exerciseInstanceDetails = Object.values(exerciseInstanceObjects[0])
    let exerciseInstanceLIItems = exerciseInstanceDetails.map(function(exerciseDetail){
      return `<li>On 'Date' at 'Time': weight lifted was ${exerciseDetail.weight} pounds for ${exerciseDetail.sets} sets, ${exerciseDetail.reps} reps each set, with a ${exerciseDetail.rest} minute rest period.</li>`
    })
    exerciseInstanceHistory.innerHTML = exerciseInstanceLIItems.join('')
  }else{
    console.log("Bench does not have any previous exercises logged ...")
    exerciseInstanceHistory.innerHTML = ``
  }

}
function logExercise() {
  console.log("Exercise being logged...")
}
