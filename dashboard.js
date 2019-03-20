let displayWorkoutLItems = document.getElementById("displayWorkoutLItems")

function displayworkouts(bodyPart, level){
    console.log(workouts)
    console.log(level, bodyPart)
    let workout = workouts[level][bodyPart]
    console.log(workout)
    displayWorkoutLItems.innerHTML=  `<div id='workoutListing'>
                                    <li>Exercise: ${workout['description']}</li>
                                    <li>Weight: ${workout['weight']}</li>
                                    <li>Reps: ${workout['reps']}</li>
                                    <li>Sets: ${workout['sets']}</li>
                                    <li>Rest: ${workout['rest']}</li>
                                    </div>`
    }

