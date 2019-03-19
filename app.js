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
    let excerciseTypeRef = userRef.child("Exercise Types")
    let workoutTypeRef = userRef.child("Workout Types")
    workoutTypeRef
    .on("child_added", function(snapshot){
      workouts.push({key: snapshot.key, value: snapshot.val()})
    })
    // let exerciseInstanceRef = userRef.child("Exercise Instances")
    // exerciseInstanceRef.push({
    //   date: "Unix Timestamp",
    //   exerciseType: "Incline",
    //   reps: 5,
    //   rest: 2,
    //   sets: 4,
    //   weight: 145,
    //   workoutType: "Push"
    // })
    // workoutTypeRef.push({
    //   name: "Push"
    // })
    // excerciseTypeRef.push({
    //   name: "Incline"
    // })
  }
  else {
    console.log("No user is signed in")
  }
})



// exercisesRef.child()
// .on('value',function(snapshot){
//     console.log(snapshot.val())
//     let exerciseInstances = []

    // for(key in snapshot.val()) {
    //     names.push(snapshot.val()[key])
    // }
// })

function populateDropdown(workoutArray, excerciseArray){
    for(var i = 0; i < workoutArray.length; i++) {
        let workout = workoutArray[i].value.name;
        let workoutBtn = document.createElement("button")
        workoutBtn.innerHTML = workout
        workoutBtn.setAttribute("class","dropdown-item")
        workoutBtn.setAttribute("id",i)
        workoutBtn.setAttribute("type","button")
        dropDownCustom.appendChild(workoutBtn)
        workoutBtn.addEventListener('click',function(){
            //console.log("Button is firing")
            let liItems = exerciseArray.map(function(exercise) {
                return `<li>
                        <button class="btnExercise">${exercise}</button>
                        <div>
                        <ul id="exerciseList">
                        </ul>
                        </div>
                        </li>`
            })

            workoutUL.innerHTML = liItems.join('')
            let btnExercise = document.getElementsByClassName("btnExercise")

            for(let i = 0; i < btnExercise.length; i++){
                btnExercise[i].addEventListener('click',function(){
                //console.log("exercise button is firing")
                let newListItems = exerciseArray.map(function(exercise) {
                    return `<li>
                            <span>Last Weight:</span>
                            <input type="text" id="weightTextBox" placeholder="Weight (lbs.)">
                            </li>`
                })
                nextList.innerHTML = newListItems.join('')
            })
        }})
    }
}

//populateDropdown()
