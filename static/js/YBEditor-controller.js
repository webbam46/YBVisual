/*
   ------------------------------------------------
        YOUBOT CONTROL FUNCTIONS - sends appropriate data to server
   ------------------------------------------------
*/

//Start moving the robot forwards
function moveForward(){SendData("MOVE\nFORWARD");}
//Start moving the robot backwards
function moveBackward(){SendData("MOVE\nBACK");}
//Start moving the robot left
function moveLeft(){SendData("MOVE\nLEFT")}
//Start moving the robot right
function moveRight(){SendData("MOVE\nRIGHT")}
//Start rotating the robot left
function rotateLeft(){SendData("ROTATE\nLEFT"); }
//Start rotating the robot right
function rotateRight(){ SendData("ROTATE\nRIGHT"); }


//Stop the robot from moving
function Halt(){ SendData("HALT"); }


/*
   ------------------------------------------------
        SERVER I/O FUNCTIONS
   ------------------------------------------------
*/
function SendData(_data)
{  $.ajax({ type:"POST",data: _data } ); }