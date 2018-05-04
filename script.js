/* id="box" style="height:150px; width:150px; background-color:#ffa500 */

var btnModifier;
var melt = false;
var kick = false;

/* Grow */
/* When the box grows it affects the layout of the page. To prevent this from happening
   I added a change to marginTop. This change gives the feel of using a pump to make the
   box inflate. I liked the feeling. I needed to make it so the box couldn't grow indefinitely
   so I added logic to prevent its growth after a certain point. I decided that if the box
   inflates, then it should deflate at its max volume. The function() within the 'else if'
   statement was the only way to get both animations to happen simultaneously. Without it,
   the box deflates and all the buttons move up to the top of the screen before everything
   marginTop animation drops them all back down. The box will disapear if you can press 'Deflate'
   twice really fast...but it comes right back with another 'Grow'.*/
$("#button1").on("click", function() {
    if(!melt){
        if($("#box").width() <= 350){
            $("#box").animate({height:"+=25px", width:"+=25px"}, "fast");
            $("#box").animate({marginTop:"-=25"}, "0.01s");
            if($("#box").width() >= 300){
                $("h6").removeClass("warning");
                $("h6").text("The box is going to burst because it's too big. Please deflate the box.")
                btnModifier = true;
            }
            if($("#box").width() >= 350){
                $("#button1").text("Deflate");
            }
        } else if($('#box').width() > 350) {
            $(function() {
                $("#box").animate({height:"-=225px", width:"-=225px"}, 
                    {duration:"fast", queue:false});
                $("#box").animate({marginTop:"+=225"}, 
                    {duration:"fast", queue:false});
            });    
            $("#button1").text("Grow");
            $("h6").addClass("warning");
            btnModifier = false;
        }
    }
    if(melt){
        $("h6").removeClass("warning");
        $("h6").text("The box is melted so it can't grow or deflate. Try 'Condense' first.");
    }
});


/* Blue */
/* Changes color of box from orange to blue then changes button to change back to orange */
$("#button2").on("click", function() {
    if($(this).text() === 'Blue'){
        $("#box").css("background-color", "rgb(0, 47, 255)")
        $('#button2').text('Orange');
    } else if($(this).text() === 'Orange'){
        $('#box').css("background-color", "#ffa500")
        $('#button2').text('Blue');
    }
});


/* Fade */
/* Fades over 3 seconds then changes the button text to 'Fade In' where a second press
   of the button will bring the box to full opacity and change the button back to 'Fade' */
$("#button3").on("click", function() {
    if ($(this).text() === 'Fade'){
        $("#box").fadeTo(3000, 0.001, function(){
            $("#button3").text("Fade In");
        });
    } else if ($(this).text() === "Fade In"){
        $("#box").fadeTo(3000, 1, function(){
            $("#button3").text("Fade");
        });
    }
});


/* Kick */
/* This animates a kick on the box to the right. The button changes to 'Kick Back' to reverse the kick
   animation then resets the button text. If you press the 'Kick' button repeatedly, the box will dance.
   The rotation animation is a variation of something I found in codePen. */
$("#button4").on("click", function() {
    if(!kick){
        $(function (){
            $("#box").animate({"margin-left":"100%", "left": -100}, {duration:600});
            $('#box').animate({  borderSpacing: 180 }, {
                step: function(now,fx) {
                $(this).css('-webkit-transform','rotate('+now+'deg)'); 
                $(this).css('-moz-transform','rotate('+now+'deg)');
                $(this).css('transform','rotate('+now+'deg)');
                },
                duration:'slow',
                queue: false
            },'linear');
            kick = true;
            $("#button4").text("Kick Back")
        });
    }
    if(kick){
        $("#box").animate({"margin-left":"31%", "left": 100}, {duration:600});
        $('#box').animate({  borderSpacing: -180 }, {
            step: function(now,fx) {
            $(this).css('-webkit-transform','rotate('+now+'deg)'); 
            $(this).css('-moz-transform','rotate('+now+'deg)');
            $(this).css('transform','rotate('+now+'deg)');
            },
            duration:'slow',
            queue: false
        },'linear');
        kick = false;
        $("#button4").text("Kick")
    }
});


/* Melt */
/* This animation warps the dimension of the box until the box completely disapears and the button changes
   to 'Condence'. Condence just makes the box reapear with it's original dimensions. */
$("#button5").on("click", function() {
    var dim = $("#box").width();
    var dimV = "-=" + String(dim) + "px";
    var dimH = "+=" + String(dim) + "px";

    if(!melt){
        $(function(){
            $("#box").animate({height: dimV, width: dimH}, 
                {duration:"slow", queue:false});
            $("#box").animate({marginTop: dimH}, {duration:"slow", queue:false});
            if(btnModifier){
                $("h6").addClass("warning");
                $("#button1").text("Grow");
            }
            $("#button5").text('Condense');
            melt = true;
        });
    }
    $("#box").width(150);
    if(melt){
        $(function() {
            $("#box").animate({marginTop:"-=150"}, {duration:1, queue:false});
            $("#box").css("height", "150px");
            $("#box").slideDown(5000);
        });
        $("#button5").text('Melt');
        melt = false;
        $("h6").addClass("warning");
    }
});


/* Reset */
$("#button6").on("click", function() {
    location.reload();
});

