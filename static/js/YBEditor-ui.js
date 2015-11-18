/*
 * Wait for the window to be ready
 */
$(document).ready(function()
{
    console.log("Window ready");
	
	addMovePart('01');
	addRotatePart('02');
});



/*
   ------------------------------------------------
        DIALOG FUNCTIONS
   ------------------------------------------------
*/

/*
  Display a yes/no dialog box
*/
function yesnoDialog(title,desc,func_yes,func_no)
{
	$('#dialog').prop('title',title); //Set dialog title
	$('#dialog_desc').text(desc); //Set dialog description
	
	/*
		Create the dialog
	*/
	$('#dialog').dialog(
   {
	   resizable: false, /* We shouldn't be able to resize the dialog */
	   /*
			-- DIALOG BUTTONS --
	   */
	   buttons:
	   [
	   { text: "YES", click:func_yes }, /* Yes button  */
	   { text:"NO", click:func_no } /* No button */
	   ] 
   }
   );
}

/*
	Display a basic information dialog
*/
function infoDialog(info)
{
	$('#dialog').prop('title',"Robot Info"); //Set dialog title
	//Set dialog information/description
	$('#dialog_desc').text(info); 
	
	/*
		Create the dialog
	*/
	$('#dialog').dialog(
	{
		//Shouldn't be resizable
		resizable: false,
		//Add an OKAY button
		buttons:[{text:"OKAY",click:dialogClose}]
	}
	);
}

/* Close the currently opened dialog */
function dialogClose(){ $('#dialog').dialog("close");  }



/*
   ------------------------------------------------
        USER INTERFACE FUNCTION CALLS
   ------------------------------------------------
*/
//New Project button
function newClicked()
{  
	yesnoDialog("New Project","Are sure you want to start a new project?",function()
	{ 
		//YES
		//SESSION.PROJECT.New();
		dialogClose();
		infoDialog("Starting new project");
	},
	function()
	{ 
		//NO
		dialogClose();
	});
}
//Open project button
function openClicked()
{ 

}
//Save project button
function saveClicked()
{ 

}

/*
   ------------------------------------------------
        VISUAL PROGRAMMING PART FUNCTIONS
   ------------------------------------------------
*/
/*
	Add a move robot part
*/
function addMovePart(_id)
{
	//Main div
	var div = $('<div/>',
	{
		id:_id,
		class: 'vis_part vis_part_move'
	}).appendTo('#editor_visual_content');
	
	//Header
	var header = $('<h1/>',
	{
		text:'MOVE'
	}).appendTo(div);
	
	//Direction components
	var selection_header = $('</p>',{}).text("Direction:").appendTo(div);
	var selectbox = $('<select/>',{ });
	var option_left = $('<option/>',{value:'left'}).text("Left").appendTo(selectbox);
	var option_right = $('<option/>',{value:'right'}).text("Right").appendTo(selectbox);
	var option_forward = $('<option/>',{value:'forward'}).text("Forward").appendTo(selectbox);
	var option_back = $('<option/>',{value:'back'}).text("Back").appendTo(selectbox);
	selectbox.appendTo(div);
	
	//Amount components
	var selection_header = $('</p>',{}).text("Amount:").appendTo(div);
	var input = $('<input/>',{type:'text',name:'amount',value:'0'}).appendTo(div);
	
	//The part needs to be draggable
	partIsDraggable(div);
}

/*
	Add a rotate robot part
*/
function addRotatePart(_id)
{
	//Main div
	var div = $('<div/>',
	{
		id:_id,
		class: 'vis_part vis_part_rot'
	}).appendTo('#editor_visual_content');
	
	//Header
	var header = $('<h1/>',
	{
		text:'ROTATE'
	}).appendTo(div);
	
	//Direction components
	var selection_header = $('</p>',{}).text("Direction:").appendTo(div);
	var selectbox = $('<select/>',{ });
	var option_left = $('<option/>',{value:'left'}).text("Left").appendTo(selectbox);
	var option_right = $('<option/>',{value:'right'}).text("Right").appendTo(selectbox);
	selectbox.appendTo(div);
	
	//Amount components
	var selection_header = $('</p>',{}).text("Amount:").appendTo(div);
	var input = $('<input/>',{type:'text',name:'amount',value:'0'}).appendTo(div);
	
	//The part needs to be draggable
	partIsDraggable(div);
}


/*
	Make a part draggable
*/
function partIsDraggable(div)
{
	//Make div draggable
	//Should be contained in visual area
	//Add a grid (10 x 10)
	div.draggable({containment:"#editor_visual_content",cursor:"crosshair",grid:[10,10]});
}