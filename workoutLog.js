//Get unordered list to display exercies from workout
let workoutUL = document.getElementById("workoutUL")
//Custom workout dropdown buttons
let btnWorkout1 = document.getElementById("btnWorkout1")

let dropDownCustom = document.getElementById("dropDownCustom")
//Test arrays
let newWorkoutForm = document.getElementById("newWorkoutForm")
let newWorkoutTextBox = document.getElementById("newWorkoutTextBox")
let btnNewWorkoutSubmit = document.getElementById("btnNewWorkoutSubmit")
let btnAddNewExercise = document.getElementById("btnAddNewExercise")
let newExerciseForm = document.getElementById("newExerciseForm")
let newExerciseTextBox = document.getElementById("newExerciseTextBox")

//Hook up Firebase

let newExerciseKey = ""



let exerciseInstanceHistory = document.getElementById("exerciseInstanceHistory")

//Hook up Firebase
let database = firebase.database()
let workouts = []
let exercises = []
let exerciseInstances = []
let exercisesRef = database.ref("Exercises")

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    let currentUID = firebase.auth().currentUser.uid
    let userRef = exercisesRef.child(currentUID)
    let exerciseTypeRef = userRef.child("Exercise Types")
    let workoutTypeRef = userRef.child("Workout Types")
    let exerciseInstancesRef = userRef.child("Exercise Instances")

    workoutTypeRef.on("child_added", function(snapshot){
      workouts.push({key: snapshot.key, value: snapshot.val()})
    })
    exerciseTypeRef.on("child_added", function(snapshot) {
      exercises.push({key: snapshot.key, value: snapshot.val()})
      populateDropdown(workouts, exercises)
    })
    btnNewWorkoutSubmit.addEventListener('click',function(){
      let newWorkout = newWorkoutTextBox.value
      workoutTypeRef.push({name: newWorkout})
    })
    btnNewExerciseSubmit.addEventListener('click',function(){
      let newExercise = newExerciseTextBox.value
      exerciseTypeRef.child(newExerciseKey).push({name: newExercise})
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
      return `<button onclick="displayExercise('${workout.key}')" class="dropdown-item myButton" type="button">${workout.value.name}</button>`
    })
      dropDownCustom.innerHTML = workoutDropBtns.join('')
}
function displayExercise(key) {
  let workoutNames = []
  for(let i = 0; i < exercises.length; i++){
    if(key == exercises[i].key){
      workoutNames.push(exercises[i])
    }
  }

  if (workoutNames.length > 0) {
    let exerciseObjects = Object.values(workoutNames[0])[1]
    let exerciseNames = Object.values(exerciseObjects)
    let exerciseKeys = Object.keys(exerciseObjects)
    let exerciseLIItems = []
    for(let i = 0; i < exerciseKeys.length; i++) {
      exerciseLIItems.push(`<li>
              <button onclick="displayStats('${exerciseKeys[i]}', '${exerciseNames[i].name}')" class="myButton">${exerciseNames[i].name}</button>
              <div>
              <ul id="exerciseList">
              </ul>
              </div>
              </li>`)
    }
    workoutUL.innerHTML = exerciseLIItems.join('')
    newExerciseKey = key
    let createNewExerciseBtn = `<button class=exerciseButton onclick="showNewExerciseForm()">Add New Exercise</button>`
    workoutUL.insertAdjacentHTML('beforeend', createNewExerciseBtn)
  }else{
    workoutUL.innerHTML = ``
    newExerciseKey = key
    let createNewExerciseBtn = `<button class=exerciseButton onclick="showNewExerciseForm()">Add New Exercise</button>`
    workoutUL.insertAdjacentHTML('beforeend', createNewExerciseBtn)
    exerciseInstanceHistory.innerHTML = ``
    console.log("No exercises have been created for this workout ...")
  }
}

function displayStats(key, name){
  let exerciseInstanceObjects = []
  for(let i = 0; i < exerciseInstances.length; i++){
    if(key == exerciseInstances[i].key){
      exerciseInstanceObjects.push(exerciseInstances[i].value)
    }
  }
  if (exerciseInstanceObjects.length > 0) {
    let exerciseInstanceLIItems = []
    let exerciseInstanceDetails = Object.values(exerciseInstanceObjects[0])
    let exerciseDetail = exerciseInstanceDetails[exerciseInstanceDetails.length-1]
    let exerciseDate = new Date(exerciseDetail.date)
    let exerciseRecord = `<li>
                          <div>Weight: <input style="width: 45px" id="weightInput" type="number" value="${exerciseDetail.weight}"/> lbs.
                          </div>
                          <div>Sets: <input style="width: 40px" id="setsInput" type="number" value="${exerciseDetail.sets}"/>
                          </div>
                          <div>Reps: <input style="width: 40px" id="repsInput" type="number" value="${exerciseDetail.reps}"/>
                          </div>
                          <div>Rest Period between set: <input style="width: 40px" id="restInput" type="number" value="${exerciseDetail.rest}"/> minutes.
                          </div>
                          <div><button class="myButton" onclick="logExercise('${key}')" >Log Exercise</button>
                          </div>
                          </li>`
    exerciseInstanceLIItems.push(exerciseRecord)
    let recentExerciseLIItem = `<li>Most recent ${name} was on ${exerciseDate.toLocaleDateString()} at ${exerciseDate.toLocaleTimeString()}: weight lifted was ${exerciseDetail.weight} pounds for ${exerciseDetail.sets} sets, ${exerciseDetail.reps} reps each set, with a ${exerciseDetail.rest} minute rest period.</li>`
    exerciseInstanceLIItems.push(recentExerciseLIItem)
    exerciseInstanceHistory.innerHTML = exerciseInstanceLIItems.join("")
  }else{
    console.log("Bench does not have any previous exercises logged ...")
    let exerciseRecord = `<li>
                          <div>
                          <label class="col-2 col-form-label">Weight: </label>
                          <input style="width: 45px" id="weightInput" class="form-control" type="number" step="2.5" value="100"/> lbs.
                          </div>
                          <div>Sets: <input style="width: 40px" id="setsInput" type="number" value="3"/>
                          </div>
                          <div>Reps: <input style="width: 40px" id="repsInput" type="number" value="10"/>
                          </div>
                          <div>Rest Period between set: <input style="width: 40px" id="restInput" type="number" value="2"/> minutes.
                          </div>
                          <div><button onclick="logExercise('${key}')" >Log Exercise</button>
                          </div>
                          </li>`
    exerciseInstanceHistory.innerHTML = exerciseRecord
  }
}
function logExercise(exerciseKey) {
  let date = new Date().getTime()
  let weightInput = document.getElementById("weightInput").value
  let setsInput = document.getElementById("setsInput").value
  let repsInput = document.getElementById("repsInput").value
  let restInput = document.getElementById("restInput").value
  let weight = parseInt(weightInput,10)
  let sets = parseInt(setsInput,10)
  let reps = parseInt(repsInput,10)
  let rest = parseInt(restInput,10)
  let currentUID = firebase.auth().currentUser.uid
  let userRef = exercisesRef.child(currentUID)
  let exerciseInstancesRef = userRef.child("Exercise Instances")
  let exerciseInstanceRef = exerciseInstancesRef.child(exerciseKey)
  exerciseInstanceRef.push({
    date: date,
    reps: reps,
    rest: rest,
    sets: sets,
    weight: weight,
  })

}


function showNewWorkoutForm(){
    if (newWorkoutForm.hidden == true) {
      newWorkoutForm.hidden = false;
    } else if (newWorkoutForm.hidden == false){
        newWorkoutForm.hidden = true;}
    }

    function showNewExerciseForm(){
      if (newExerciseForm.hidden == true) {
        newExerciseForm.hidden = false;
      } else if (newExerciseForm.hidden == false){
        newExerciseForm.hidden = true;}
    }
