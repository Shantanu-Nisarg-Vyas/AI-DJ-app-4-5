harry = "";
peter = "";
leftwristy = "";
rightwristy = "";
leftwristx = "";
rightwristx = "";

function setup() {
    canvas = createCanvas(650, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function preload() {
    harry = loadSound("harry.mp3");
    peter = loadSound("peter.mp3");
}

function draw() {
    image(video, 0, 0, 650, 500);
    circle(rightwristx, rightwristy, 20);
}

function modelLoaded() {
    console.log("PoseNet Initialized!");
}

function play() {
    harry.play();
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        leftwristy = floor(results[0].pose.leftWrist.y);
        rightwristy = floor(results[0].pose.rightWrist.y);
        leftwristx = floor(results[0].pose.leftWrist.x);
        rightwristx = floor(results[0].pose.rightWrist.x);
        scoreleftwrist = results[0].pose.keypoints[9].score;
        scorerightwrist = results[0].pose.keypoints[10].score;
        console.log("Left Wrist Y = " + leftwristy + ", Right Wrist Y = " + rightwristy + ", Left Wrist Y = " + leftwristy + ", Right Wrist Y = " + rightwristy);
        if (scoreleftwrist > 0.2) {
            fill("red");
            stroke("red");
            circle(leftwristx, leftwristy, 20);
            peter.stop();
            console.log(harry.isPlaying())
            if (harry.isPlaying() = false) {
                harry.play();
                document.getElementById("song").innerHTML = "Song: Harry Potter";
            }
        }
        if (scorerightwrist > 0.2) {
            fill("red");
            stroke("red");
            circle(rightwristx, rightwristy, 20);
            harry.stop();
            console.log(peter.isPlaying())
            if (peter.isPlaying() = false) {
                peter.play();
                document.getElementById("song").innerHTML = "Song: Peter Pan";
            }
        }
    }
}