let displayWorkoutLItems = document.getElementById("displayWorkoutLItems")

function displayworkouts(bodyPart, level){
    console.log(workouts)
    console.log(level, bodyPart)
    let workout = workouts[level][bodyPart]
    console.log(workout)
    let description = workout['description']
    let weight = workout['weight']
    let reps = workout['reps']
    let sets = workout['sets']
    let rest = workout['rest']
    document.getElementById('exercisePics').style.display = "none"
    displayWorkoutLItems.innerHTML=  `<div id='workoutListing'>
                                    <li>Exercise: ${workout['description']}</li>
                                    <li>Weight: ${workout['weight']}</li>
                                    <li>Reps: ${workout['reps']}</li>
                                    <li>Sets: ${workout['sets']}</li>
                                    <li>Rest: ${workout['rest']}</li>
                                    </div>`
    }

    function playtutorial(bodyPart){
        if (bodyPart == 'chest') {
            document.getElementById('exercisePics').style.display = "none"
            document.getElementById('displayWorkoutLItems').style.display = "none"
            let youtube = document.getElementById("youtubeFrame")
            youtube.innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/x5t9PZ5CsxY" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        }
        else if (bodyPart == 'arm') {
            document.getElementById('exercisePics').style.display = "none"
            document.getElementById('displayWorkoutLItems').style.display = "none"
            let youtube = document.getElementById("youtubeFrame")
            youtube.innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/IUKYRC7GcEo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        }
        else if (bodyPart == 'leg'){
            document.getElementById('exercisePics').style.display = "none"
            document.getElementById('displayWorkoutLItems').style.display = "none"
            let youtube = document.getElementById("youtubeFrame")
            youtube.innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/F0YzTCxPJZg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        }
        else if (bodyPart == 'fullbody'){
            document.getElementById('exercisePics').style.display = "none"
            document.getElementById('displayWorkoutLItems').style.display = "none"
            let youtube = document.getElementById("youtubeFrame")
            youtube.innerHTML += '<iframe width="560" height="315" src="https://www.youtube.com/embed/L9Cc7iDuScM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        }

    }

