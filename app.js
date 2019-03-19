//Get unordered list to display exercies from workout
let workoutUL = document.getElementById("workoutUL")
//Custom workout dropdown buttons
let btnWorkout1 = document.getElementById("btnWorkout1")

let dropDownCustom = document.getElementById("dropDownCustom")
let nextList = document.getElementById("nextList")
//Test arrays
let testArray = ["Push","Pull","Leg"]
let exerciseArray = ["Bench","Shoulder press","Skull Crusher"]
//Hook up Firebase
let database = firebase.database()
let workouts = []
let workoutsRef = database.ref("MyWorkouts")

// adding workout name 
/*
workoutsRef.child("6Zm7acP6ZGQi7LUlZRQvXen4LAw2").push({
    name: "Monday"
}) */

workoutsRef.child("6Zm7acP6ZGQi7LUlZRQvXen4LAw2")
.on('value',function(snapshot){
    console.log(snapshot.val())

    let names = [] 

    

    
    for(key in snapshot.val()) {
        names.push(snapshot.val()[key])
    } 
    
    //console.log(names)

})





function populateDropdown(){
    for(var i = 0; i < testArray.length; i++) {
        let workout = testArray[i];
        let workoutBtn = document.createElement("button")
        workoutBtn.innerHTML = workout
        workoutBtn.setAttribute("class","dropdown-item")
        workoutBtn.setAttribute("id",i)
        workoutBtn.setAttribute("type","button")
        dropDownCustom.appendChild(workoutBtn)
        workoutBtn.addEventListener('click',function(){
            console.log("Button is firing")
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
                console.log("exercise button is firing")
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

populateDropdown()