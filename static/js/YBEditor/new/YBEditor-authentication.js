/*

	YBEDITOR Authentication - Functions for ensuring proper authentication:
	#TODO:
	#There may be a system password defined -- the robot must ask for this password if required, then remember the user for a set period
	#Programs -- Users may not work on the same program at the same time.
	#Running - 
	
*/
//Holds true if user is authenticated
var AUTHENTICATED = false;


/**
	Check the authentication of the current user
	
**/
function AuthUser(showlogin){
	SendData(createJSON("AUTHCHECK","",""),function(data){
		var auth = data;
		/*
			User is not authenticated
		*/
		if(auth == "NO"){
			AUTHENTICATED  =false;
			//Show the login dialog?
			if(showlogin){
				showLoginForm();
			}
			showIndicator();
		}
		/*
			User is already authenticated - We don't need to hide content
		*/
		else{
			AUTHENTICATED = true;
			hideLoginForm();
			hideIndicator();
		}
	});

}


/**
	Used to check the given password
	**/
function CheckPassword(){
	var given_pass = document.getElementById('pass_box').value;
	SendData(createJSON("PASSCHECK",given_pass,""),function(data){
		var auth = data;
		
		/*
			The password is not correct
		*/
		if(auth == "NO"){

			AUTHENTICATED  =false;
			showLoginForm();
			showIndicator();
		}
		/*
			The password is correct
		*/
		else{
			AUTHENTICATED = true;
			hideLoginForm();
			hideIndicator();
		}
	});
}

function CheckAdminPassword(){
		var given_pass = document.getElementById('pass_box').value;
		SendData(createJSON("PASSCHECK",given_pass,""),function(data){
		var auth = data;
		
		/*
			The password is not correct
		*/
		if(auth == "NO"){
			showLoginForm();
			$('#main_interface').hide();
		}
		/*
			The password is correct
		*/
		else{
			hideLoginForm();
			$('#main_interface').show();	
		}
	});
}
	
	

/**
 * 	Show message with auth check
 * **/
function AuthCheck(usage){
	isStillAuth();
	if(AUTHENTICATED){
		return true;
	}else
	{
		ShowError("Unable to " + usage + ", you need to login first.") 
		showIndicator();
		return false;
	}
}


/**
	Show the login form
	**/
function showLoginForm(){ ShowMessage("This robot requires a password.. please log in"); $('#login_form').window('open'); }
/**
	Hide the login form
	**/
function hideLoginForm(){ $('#login_form').window('close'); }

/**
 * Show login indicator
 * 	**/
function showIndicator(){ $('#auth_indicator').show(); }

/**
 * 
 * Hide login indicator
 * **/
function hideIndicator(){ $('#auth_indicator').hide(); }