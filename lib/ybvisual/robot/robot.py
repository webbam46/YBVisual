#!/usr/bin/env python
import sys
import rospy
from lib.ybvisual.jsonparser import *
import moveit_commander
from std_msgs.msg import String

#
# Import other robot scripts
#
from lib.ybvisual.robot.robotarm import RobotArm
from lib.ybvisual.robot.robotbase import RobotBase

#Min class is used for triggering an emergency stop
class EStop:
    #Initialise
    def __init__(self):
        #We can subscribe to a ros topic which holds whether the estop was pressed
        self.sub = rospy.Subscriber("chatter",String,self._Callback)
        #We also need a publisher
        self.pub = rospy.Publisher("chatter",String)
    #Callback function
    def _Callback(self,data):
        print data        
    #Trigger the emergency stop
    def Trigger(self):
        self.pub.publish(String("ON"))


#
# Primary Youbot class
#
class Robot:
    #Initialise
    def __init__(self):
        rospy.loginfo("Initialising youbot")
        #Init moveit_commander
        moveit_commander.roscpp_initialize(sys.argv)
        #Init rospy
        rospy.init_node('youbot',anonymous=True)
        #Init robot object
        self.robot = moveit_commander.RobotCommander()
        #Init scene object
        self.scene = moveit_commander.PlanningSceneInterface()
        #robot base
        self.base = RobotBase();
        #robot arm        
        self.arm = RobotArm();
        #Youbot has been initialised
        rospy.loginfo("Youbot initialised")      
        #Finally - print the initial state of the youbot        
        self.Print_State()
        #Estop used for emergency stops
        self.estop = EStop()

    #############################################
    # GENERAL, ROBOT SPECIFIC COMMANDS
    #############################################
    def EmergencyStop(self):
        self.estop.Trigger()
    
    #############################################
    # BASE SPECIFIC COMMANDS
    #############################################
    
    #print the current robot state
    def Print_State(self):
        rospy.loginfo("Displaying current robot state")
        print self.robot.get_current_state()
        print " "
    #Drive the robot a specified distance        
    def DriveDistance(self,lx,ly,amount):
        #Move the base
        self.base.MoveDistance(lx,ly,amount)
    #Drive the robot
    def Drive(self,lx,ly,az,amount):
        #Create a twist message
        self.base.Move(lx,ly,az,amount);
    #Drive the robot to a goal
    def DriveTo(self,x,y,z):
        #Create appropriate ROS message
        self.base.MoveTo(x,y,z);
    #Stop the robot
    def Stop(self):
        #Stop the arm
        self.arm.Stop();
        #stop the base
        self.base.Stop();
        
        
    #############################################
    # ARM SPECIFIC COMMANDS
    #############################################
    #Attempt to reach a pre-specified position using the robot arm
    def Reach(self,name):
        self.arm.MoveTo(name)
    #Grab (Close gripper)
    def Grab(self):
        self.arm.CloseGripper()
    #Drop (Open gripper)
    def Drop(self):
        self.arm.OpenGripper()
    #Print the status of the gripper
    def PrintGripperStatus(self):
        self.arm.PrintGripperStatus()
    #Check if the gripper is open
    def IsGripperOpen(self):
        return (self.arm.GetGripperStatus() == True)
    #Check if the gripper is closed
    def IsGripperClosed(self):
        return (self.arm.GetGripperStatus() == False)


