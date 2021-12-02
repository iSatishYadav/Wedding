	var mobileMenuOutsideClick = function () {

		$(document).click(function (e) {
			var container = $("#fh5co-offcanvas, .js-fh5co-nav-toggle");
			if (!container.is(e.target) && container.has(e.target).length === 0) {

				if ($('body').hasClass('offcanvas')) {

					$('body').removeClass('offcanvas');
					$('.js-fh5co-nav-toggle').removeClass('active');
				}
			}
		});

	};


	var offcanvasMenu = function () {

		$('#page').prepend('<div id="fh5co-offcanvas" />');
		$('#page').prepend('<a href="#" class="js-fh5co-nav-toggle fh5co-nav-toggle fh5co-nav-white"><i></i></a>');
		var clone1 = $('.menu-1 > ul').clone();
		$('#fh5co-offcanvas').append(clone1);
		var clone2 = $('.menu-2 > ul').clone();
		$('#fh5co-offcanvas').append(clone2);

		$('#fh5co-offcanvas .has-dropdown').addClass('offcanvas-has-dropdown');
		$('#fh5co-offcanvas')
			.find('li')
			.removeClass('has-dropdown');

		// Hover dropdown menu on mobile
		$('.offcanvas-has-dropdown').mouseenter(function () {
			var $this = $(this);

			$this
				.addClass('active')
				.find('ul')
				.slideDown(500, 'easeOutExpo');
		}).mouseleave(function () {

			var $this = $(this);
			$this
				.removeClass('active')
				.find('ul')
				.slideUp(500, 'easeOutExpo');
		});


		$(window).resize(function () {

			if ($('body').hasClass('offcanvas')) {

				$('body').removeClass('offcanvas');
				$('.js-fh5co-nav-toggle').removeClass('active');

			}
		});
	};


	var burgerMenu = function () {

		$('body').on('click', '.js-fh5co-nav-toggle', function (event) {
			var $this = $(this);


			if ($('body').hasClass('overflow offcanvas')) {
				$('body').removeClass('overflow offcanvas');
			} else {
				$('body').addClass('overflow offcanvas');
			}
			$this.toggleClass('active');
			event.preventDefault();

		});
	};



	var contentWayPoint = function () {
		var i = 0;
		$('.animate-box').waypoint(function (direction) {

			if (direction === 'down' && !$(this.element).hasClass('animated-fast')) {

				i++;

				$(this.element).addClass('item-animate');
				setTimeout(function () {

					$('body .animate-box.item-animate').each(function (k) {
						var el = $(this);
						setTimeout(function () {
							var effect = el.data('animate-effect');
							if (effect === 'fadeIn') {
								el.addClass('fadeIn animated-fast');
							} else if (effect === 'fadeInLeft') {
								el.addClass('fadeInLeft animated-fast');
							} else if (effect === 'fadeInRight') {
								el.addClass('fadeInRight animated-fast');
							} else {
								el.addClass('fadeInUp animated-fast');
							}

							el.removeClass('item-animate');
						}, k * 200, 'easeInOutExpo');
					});

				}, 100);

			}

		}, { offset: '85%' });
	};


	var dropdown = function () {

		$('.has-dropdown').mouseenter(function () {

			var $this = $(this);
			$this
				.find('.dropdown')
				.css('display', 'block')
				.addClass('animated-fast fadeInUpMenu');

		}).mouseleave(function () {
			var $this = $(this);

			$this
				.find('.dropdown')
				.css('display', 'none')
				.removeClass('animated-fast fadeInUpMenu');
		});

	};


	var testimonialCarousel = function () {
		fetch('assets/wishes.json')
			.then(response => response.json())
			.catch(e => console.error("FE", e))
			.then(data => {
				console.log("wishes", data);
				var $child = $("#friendsWishes");
				data.forEach(w => {	
					$child.append(`<div class="item">
						<div class="testimony-slide active text-center">
							<figure>
								<img src="${w.img !=null ? w.img : 'images/couple-3.jpg'}" alt="user">
								</figure>
								<span>${w.user}, via <a href="#" class="twitter">${w.via}</a></span>
								<blockquote>
									<p>"${w.wish}"</p>
									</blockquote>
									</div>
									</div>`);
				});
				var owl = $('.owl-carousel-fullwidth');
				owl.owlCarousel({
					items: 1,
					loop: true,
					margin: 0,
					responsiveClass: true,
					nav: false,
					dots: true,
					smartSpeed: 800,
					autoHeight: true,
				});
			})
			.catch(e => console.error("FE", e))
			;
		
	};


	var goToTop = function () {

		$('.js-gotop').on('click', function (event) {

			event.preventDefault();

			$('html, body').animate({
				scrollTop: $('html').offset().top
			}, 500, 'easeInOutExpo');

			return false;
		});

		$(window).scroll(function () {

			var $win = $(window);
			if ($win.scrollTop() > 200) {
				$('.js-top').addClass('active');
			} else {
				$('.js-top').removeClass('active');
			}

		});

	};


	// Loading page
	var loaderPage = function () {
		$(".fh5co-loader").fadeOut("slow");
	};

	var counter = function () {
		$('.js-counter').countTo({
			formatter: function (value, options) {
				return value.toFixed(options.decimals);
			},
		});
	};

	var counterWayPoint = function () {
		if ($('#fh5co-counter').length > 0) {
			$('#fh5co-counter').waypoint(function (direction) {

				if (direction === 'down' && !$(this.element).hasClass('animated')) {
					setTimeout(counter, 400);
					$(this.element).addClass('animated');
				}
			}, { offset: '90%' });
		}
	};

	// Parallax
	var parallax = function () {
		$(window).stellar();
	};
	var parseJwt = function parseJwt(token) {
		var base64Url = token.split('.')[1];
		var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));
		return JSON.parse(jsonPayload);
	};

	var iAmAttending = function () {
		$("#iAmAttending").click(function () {
			var gsd = window.sessionStorage.getItem("GSD");
			if (gsd == null) {
				$("#iAmAttending").html('Please reload and Sign-in before RSVP!');
			}
			else {
				var dec = parseJwt(gsd);
				if ($("#name").val() == dec.name && $("#email").val() == dec.email) {
					$("#iAmAttending").html('Sending RSVP...');
					emailjs.sendForm('service_f9h3uae', 'template_m0b48gw', '#iAmAttendingForm')
						.then(function (response) {
							console.log('SUCCESS!', response.status, response.text);
							$("#name").prop('readonly', 'readonly');
							$("#email").prop('readonly', 'readonly');
							$("#iAmAttending").html('Thanks for RSVP!');
							location.replace("#");
							location.reload();
						}, function (error) {
							console.log('FAILED...', error);
							$("#iAmAttending").html('Error sending RSVP...');
						});
				}
				else {
					$("#iAmAttending").html('Wrong details!');
				}
			}
		});
	}

	$(document).ready(function() {
		mobileMenuOutsideClick();
		parallax();
		// offcanvasMenu();
		burgerMenu();
		contentWayPoint();
		dropdown();
		testimonialCarousel();
		goToTop();
		loaderPage();
		counter();
		counterWayPoint();
		iAmAttending();
	});
