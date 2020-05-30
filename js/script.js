$(document).ready(function() {

// Smooth transition between site pages
	var body = $('body');
	body.fadeIn(200);
	$('.lang-link').click(function(e) {
			e.preventDefault();
			$('body').fadeOut(200);
			var self = this;
			setTimeout(function () {
				window.location.href = $(self).attr('href');
			}, 200);
	});

// To top
	$(window).scroll(function() {
		if ($(this).scrollTop() != 0)
			$('#to-top').fadeIn();
		else
			$('#to-top').fadeOut();
	});
	$('#to-top').click(function() {
		$('body, html').animate({
			scrollTop: 0}, 600);
	});
	
//Menu nav
	$('.nav-link').click(function() {
		var target = $(this).attr('href');
		var navHeight = $('.menu').outerHeight();
		$('html, body').animate({scrollTop: $(target).offset().top - navHeight + 5}, 1000);
		if (window.innerWidth <= 992) {
				$('#navlist').slideToggle(500);
				$('#navlist').css(
				{
					'display':'none'
				});

				$('.burger').addClass('burger_active');
				$('.burger').removeClass('burger_active');
		}
		return false;
	});

// Menu icon
	if (window.innerWidth <= 992) {
		document.querySelector('.burger').onclick = function(){
			document.querySelector('.burger').classList.toggle('burger_active');
		}

		$('.burger').click(function() {
			$('#navlist').slideToggle(500);
			$('#navlist').css(
			{
				'display':'block'
			});
		});
	}

// Load More Results for portfolio
	if (document.documentElement.lang.toLowerCase() === 'en') {
		$('.loadMore').loadMoreResults({
			displayedItems: 4,
			showItems: 4,
			button: {
				'class':'btn-load-more',
				'text':'View more'
			}
		});
	}
	if (document.documentElement.lang.toLowerCase() === 'ru') {
		$('.loadMore').loadMoreResults({
			displayedItems: 4,
			showItems: 4,
			button: {
				'class':'btn-load-more',
				'text':'Больше работ'
			}
		});
	}

//E-mail Ajax Send
	$('.menu').css('width', $(window).width() + 'px');
	$('#to-top').css('left', $(window).width()-70 + 'px');

	$('form').submit(function() {
		var th = $(this);
		$.ajax({
			type: 'POST',
			url: 'php/mail.php',
			data: th.serialize()
		}).done(function() {
			$.fancybox.open({
				src : '#pop-up',
				type : 'inline',
				opts : {
					onComplete : function() {
						console.info('done!');
					}
				}
			});
			setTimeout(function() {
				th.trigger('reset');
				$.fancybox.close();
			}, 4000);
		});
		return false;
	});

})