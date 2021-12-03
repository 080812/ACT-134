status = ""
confidence = 0
label = ""
height = 0
width = 0
X = 0
Y = 0
object = []

function preload() {
    
}

function setup() {
    canvas = createCanvas(500, 450)
    canvas.center()
    video=createCapture(VIDEO)
    video.hide()
    objectdetector = ml5.objectDetector('cocossd', modelLoaded)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function draw() {
    image(video, 0, 0, 500, 450)

    if (status != "") {
        r=random(255)
        g=random(255)
        b=random(255)
        objectdetector.detect(video, gotresult)
        for (i = 0; i < object.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object Detected"
         document.getElementById("no.object").innerHTML="Number of objects detected are "+object.length
            fill(r,g,b)
            percent=floor(object[i].confidence*100)
            text(object[i].label+" "+percent +"%", object[i].x, object[i].y)
            noFill()
            stroke(r,g,b)
            rect(object[i].x,object[i].y,object[i].width,object[i].height)
        }
    }




}

function modelLoaded() {
    console.log("Model is loaded")
    status = true
    
}

function gotresult(error, results) {
    if (error) {
        console.log(error)
    }
    else {
        console.log(results)
        object = results
    }
}