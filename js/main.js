$(function(){
	$("#menu-toggler").on("click", function(){
		$(this).hide();
	})
	$("#close-menu").on("click", function(){
		$("#menu-toggler").delay(300).show(600);
	})
})

$(document).ready(function() {

	var $animation_elements = $('.running-honey');
	var $window = $(window);

	function check_if_in_view() {
	  var window_height = $window.height();
	  var window_top_position = $window.scrollTop();
	  var window_bottom_position = (window_top_position + window_height);
	 
	  $.each($animation_elements, function() {
	    var $element = $(this);
	    var element_height = $element.outerHeight();
	    var element_top_position = $element.offset().top;
	    var element_bottom_position = (element_top_position + element_height);
	 
	    //check to see if this current container is within viewport
	    if ((element_bottom_position >= window_top_position) &&
	        (element_top_position <= window_bottom_position)) {
	      $element.addClass('state2');
	    } else {
	      $element.removeClass('state2');
	    }
	  });
	}

	$window.on('scroll resize', check_if_in_view);
	check_if_in_view();


	$('.gallery a').simpleLightbox({ animationSpeed: 500, animationSlide: false });

});

$(function () {

     // when the form is submitted
    $('#contact-form').on('submit', function (e) {

        // if the validator does not prevent form submit
        if (!e.isDefaultPrevented()) {
            var url = "contact.php";

            // POST values in the background the the script URL
            $.ajax({
                type: "POST",
                url: url,
                data: $(this).serialize(),
                success: function (data)
                {
                    // inject the alert to .messages div in our form
                    var message = $('#contact-form').find('.messages');
                    message.text('Спасибо, что связались с нами. Мы ответим Вам в ближайшее время');
                    setTimeout(function(){
                    	message.text('');
                    },10000);
                    // empty the form
                    $('#contact-form')[0].reset();
                    $(".controls").hide().delay(10000).show(1000);

                }
            });
            return false;
        }
    })
});

let map;

function initMap() {
	map = new google.maps.Map(document.getElementById("map"), {
		center: { lat: 47.288173, lng: 39.022039 },
		zoom: 6,
		disableDefaultUI: true,
		draggable: false, 
		zoomControl: false, 
		scrollwheel: false, 
		disableDoubleClickZoom: true,
    	mapTypeId: google.maps.MapTypeId.HYBRID,
    	styles: [
            {elementType: 'labels.text.stroke', stylers: [{"lightness": 15}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#637F42'}]},
          ]
		});
	/*let marker = new google.maps.Marker({
		map: map, 
		position: { lat: 47.281095, lng: 39.026352}
	})*/
	russia();

	if(Modernizr.geolocation){
		navigator.geolocation.getCurrentPosition(success);
	}

	function success(position){
		if(position.coords.latitude <= 38 && position.coords.latitude >= 44 && position.coords.longitude <= 44 && position.coords.longitude >= 50){
			rostov();
		} else {
			russia();
		}
	}
	
 }

 function rostov(){
 	$("#ros").addClass("delivery-active");
 	$("#rus").removeClass("delivery-active");
 	$("#rusdelivery").hide();
 	$("#rosdelivery").hide().fadeIn("slow");
 	map.setCenter(new google.maps.LatLng(47.288173, 39.022039));
 	map.setZoom(6);
 }

 function russia(){
 	$("#rus").addClass("delivery-active");
 	$("#ros").removeClass("delivery-active");
 	$("#rosdelivery").hide();
 	$("#rusdelivery").hide().fadeIn("slow");
 	map.setCenter(new google.maps.LatLng(58.033618, 56.265990));
 	map.setZoom(3);
 }

function clickOnLink(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  }


$('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(clickOnLink);

$(".callbutton").on('click', () => { $("#contactsLink").trigger('click'); })
