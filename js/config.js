var siteurl = "http://vantagewebtech.com/findevents";
var realsiteurl = "http://vantagewebtech.com/findevents";
function gup(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

function users_menus(para)
{
	var menu='<li class="profilemenu"><img src="images/GuestUserIcon.png" class="img-fluid" alt="Responsive image"><a href="update_profile.html'+para+'">MY PROFILE</a></li>';
		menu+='<li class="eventmenu"><i class="fa fa-calendar-check-o fa-lg" aria-hidden="true"></i><a href="events.html'+para+'">EVENTS</a></li>';
		menu+='<li class="openspacemenu"><img src="images/openwork.png" class="img-fluid" alt="Responsive image"><a href="open-space.html'+para+'">';
		menu+="OPEN WORK SPACES & CAFE'S</a></li>";
		menu+='<li class="cospacemenu"><i class="fa fa-university fa-lg" aria-hidden="true"></i><a href="co-space.html'+para+'">Coworking spaces</a></li>';
		menu+='<li class="followingmenu"><i class="fa fa-heart fa-lg" aria-hidden="true"></i><a href="event-following.html'+para+'">EVENTS I AM FOLLOWING</a></li>';
		menu+='<li class="ratingmenu"><i class="fa fa-star fa-lg" aria-hidden="true"></i><a href="rating.html'+para+'">MY RATINGS</a></li>';
		menu+='<li><img src="images/logout.png" class="img-fluid" alt="Responsive image"><a href="logout.html'+para+'">LOG OUT</a></li>';
	return menu;
}

var uid=localStorage.getItem('User_ID');
		
if(typeof uid!='undefine' && uid!='' && uid!=null){

	setTimeout(function(){
		if(jQuery.trim(uid)!='' && uid!=null && typeof uid!='undefined'){
			var menu=users_menus('?uid='+uid);
			jQuery('.main-nav-bar ul.inner-nav-bar').html(menu);
		}
	},1000);
}
function checkloggedin(uid)
{
	
	var url=siteurl+'/api/login';
	
	jQuery.ajax({  
	 type: 'POST',  
	 url: url,  
	 //contentType: contentType,  
	 dataType: 'json',  
	 data: {checkloggedin:1,uid:uid},  
	 crossDomain: true,  
	 beforeSend: function() {
		/*jQuery('body .bodyoverlay').remove();
		jQuery('body .preloader').remove();
		var html='<div class="bodyoverlay"></div><div class="preloader"></div>';
		jQuery('body').append(html);*/					
	 },		
	 complete: function() {
		jQuery('body .bodyoverlay').remove();
		jQuery('body .preloader').remove();					
	 },
	 success: function(res) {  
	   if(res['loggedin']!='success')
	   {
		window.location='login.html';   
	   }
		else
		{
			window.location='events.html?uid='+uid;	
		}
	 },  
	 error: function(response, d, a){
		jQuery('body .bodyoverlay').remove();
		jQuery('body .popupbox').remove();
		var html='<div class="bodyoverlay"></div><div class="popupbox errorbox"><div class="popupimg"><img src="../images/error.png" /></div><h1 class="success">ERROR</h1><h1>Server Error.</h1><button class="okbox">OK</button></div>';
		jQuery('body').append(html);
		
		jQuery('.okbox').click(function(){
			jQuery('body .bodyoverlay').remove();
			jQuery('body .popupbox').remove();
		}); 
		
	 } 
   });
}
