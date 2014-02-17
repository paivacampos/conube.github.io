$(document).ready(function() {

	(function($) {
		$.extend($.validator.messages, {
			required: "Este campo &eacute; requerido.",
			remote: "Por favor, corrija este campo.",
			email: "Por favor, forne&ccedil;a um endere&ccedil;o eletr&ocirc;nico v&aacute;lido.",
			url: "Por favor, forne&ccedil;a uma URL v&aacute;lida.",
			date: "Por favor, forne&ccedil;a uma data v&aacute;lida.",
			dateISO: "Por favor, forne&ccedil;a uma data v&aacute;lida (ISO).",
			number: "Por favor, forne&ccedil;a um n&uacute;mero v&aacute;lido.",
			digits: "Por favor, forne&ccedil;a somente d&iacute;gitos.",
			creditcard: "Por favor, forne&ccedil;a um cart&atilde;o de cr&eacute;dito v&aacute;lido.",
			equalTo: "Por favor, forne&ccedil;a o mesmo valor novamente.",
			accept: "Por favor, forne&ccedil;a um valor com uma extens&atilde;o v&aacute;lida.",
			maxlength: $.validator.format("Por favor, forne&ccedil;a n&atilde;o mais que {0} caracteres."),
			minlength: $.validator.format("Por favor, forne&ccedil;a ao menos {0} caracteres."),
			rangelength: $.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1} caracteres de comprimento."),
			range: $.validator.format("Por favor, forne&ccedil;a um valor entre {0} e {1}."),
			max: $.validator.format("Por favor, forne&ccedil;a um valor menor ou igual a {0}."),
			min: $.validator.format("Por favor, forne&ccedil;a um valor maior ou igual a {0}.")
		});
	}(jQuery));

	// Add spin.js to lazy load container
	// History, and back button
	$(function() {
		jQuery.history.listen()
		$('.nav .scroll').click(function() {
			$.history.push('index.html' + $(this).attr('href'));
		});
	});

	$('.lazy-container').spin({
		color: '#000'
	});

	// Lazy loading. 
	$("img.lazy").lazyload({
		// The image starts loading 200 px before it is in viewport
		threshold: 200,
		// Remove the line if you don`t need fade effect. 
		effect: "fadeIn",
		// Change this for fade in speed
		effectspeed: 600,
		//  Hide spinner when loaded
		load: function(elements_left, settings) {
			$(".lazy-container").has(this).addClass('loaded');
			$(".loaded .spinner").remove();
			// refresh bootstrap scrollspy, when image is loaded
			$('[data-spy="scroll"]').each(function() {
				var $spy = $(this).scrollspy('refresh')
			});
		}
	});

	// Lightbox
	$('.lightbox').magnificPopup({
		type: 'image',
		disableOn: function() {
			// Detect here whether you want to show the popup
			// return true if you want
			if ($(window).width() < 500) {
				return false;
			}
			return true;
		},
		preloader: true,
		tLoading: 'Loading',

		// Delay in milliseconds before popup is removed
		removalDelay: 300,
		mainClass: 'mfp-fade',
		callbacks: {
			open: function() {
				$('.navbar').fadeOut('slow');
			},
			close: function() {
				$('.navbar').fadeIn('slow');
			}
		}
	});

	// Lightbox video/maps
	$(' .iframe').magnificPopup({
		type: 'iframe',
		mainClass: 'mfp-fad',
		disableOn: function() {
			if ($(window).width() < 500) {
				return false;
			}
			return true;
		},
		preloader: true,

		callbacks: {
			open: function() {
				$('.navbar').fadeOut('slow');
			},
			close: function() {
				$('.navbar').fadeIn('slow');
			}
		}
	});

	$('.nav li a').on('click', function() {
		ga('send', 'event', 'menu', 'click', $(this).text());
	});

	$('#home a').on('click', function() {
		ga('send', 'event', 'action', 'click', 'Experimente land');
	});

	$('.sing-up a').on('click', function() {
		ga('send', 'event', 'action', 'click', 'Experimente banner');
	});

	$('#funcionalidades a').on('click', function() {
		ga('send', 'event', 'action', 'click', $(this).text());
	});

	$('.newsletter button').on('click', function() {
		ga('send', 'event', 'action', 'click', 'newsletter');
	});

	$('#contact button').on('click', function() {
		ga('send', 'event', 'contact', 'click', $(this).text());
	});

	$('footer .social .fa-facebook-square').on('click', function() {
		ga('send', 'event', 'social', 'click', 'facebook');
	});

	$('footer .social .fa-youtube-square').on('click', function() {
		ga('send', 'event', 'social', 'click', 'youtube');
	});

	$('footer .social .fa-twitter').on('click', function() {
		ga('send', 'event', 'social', 'click', 'twitter');
	});

	// .scroll class for link scrolling
	$('.scroll[href^="#"]').bind('click.smoothscroll', function(e) {
		e.preventDefault();
		var target = this.hash;
		$target = $(target);
		$('html, body').stop().animate({
			'scrollTop': $target.offset().top
		}, 900, 'swing', function() {
			window.location.hash = target;
		});

	});

	// Change icons on accardion
	$('.collapse').on('show.bs.collapse', function() {
		$(this).parent().find(".fa-plus").removeClass("fa-plus").addClass("fa-minus");
		$(this).parent().find(".panel-heading").addClass("active");
	}).on('hide.bs.collapse', function() {
		$(this).parent().find(".fa-minus").removeClass("fa-minus").addClass("fa-plus");
		$(this).parent().find(".panel-heading").removeClass("active");
	});

	// Close menu when in mobile view clicked
	$('.nav .scroll').click(function(e) {
		if ($('.navbar-toggle').is(":visible"))
			$("#nav-collapse").removeClass("in").addClass("collapse");
	});

	// mask forms
	if ($('[data-mask]').length) {
		$('[data-mask]').each(function() {
			$this = $(this);
			var mask = $this.attr('data-mask') || 'error...',
				mask_placeholder = $this.attr('data-mask-placeholder') || '_';

			$this.mask(mask, {
				placeholder: mask_placeholder
			});
		})
	}

	$("form").validate();

	$("#transferir-form").validate({
		submitHandler: function(event) {
			$.ajax({
				dataType: 'jsonp',
				url: "http://getsimpleform.com/messages/ajax?form_api_token=a30b1cd07d26cfcc67ed2181069ad08c",
				data: {
					assunto: $("#tassunto").val(),
					nome: $("#tnome").val(),
					telefone: $("#ttelefone").val(),
					email: $("#temail").val()
				}
			}).done(function() {
				$(event)[0].reset();
				alert("Obrigado pelo contato! Aguarde nosso retorno em breve.");
			});
		}
	});

	$("#abrir-form").validate({
		submitHandler: function(event) {
			$.ajax({
				dataType: 'jsonp',
				url: "http://getsimpleform.com/messages/ajax?form_api_token=a30b1cd07d26cfcc67ed2181069ad08c",
				data: {
					assunto: $("#aassunto").val(),
					nome: $("#anome").val(),
					telefone: $("#atelefone").val(),
					email: $("#aemail").val()
				}
			}).done(function() {
				$(event)[0].reset();
				alert("Obrigado pelo contato! Aguarde nosso retorno em breve.");
			});
		}
	});

});