//change-style.js

  // *** TO BE CUSTOMISED ***

  var style_cookie_name = "css-estilo-de-color" ;
  var style_cookie_cursor = "tamanio-cursor" ;
  var style_cookie_font = "font";
  var style_cookie_lang = "lang";
  var style_cookie_duration = 30 ;

  // *** END OF CUSTOMISABLE SECTION ***
  // You do not need to customise anything below this line
  // You may use this script on your site free of charge provided
  // you do not remove this notice or the URL below. Script from
  // http://www.thesitewizard.com/javascripts/change-style-sheets.shtml


  function switch_style ( css_title )
  {
  var i, link_tag ;
  for (i = 0, link_tag = document.getElementsByTagName("link") ;
	i < link_tag.length ; i++ ) {
		if ((link_tag[i].rel.indexOf( "stylesheet" ) != -1) &&
		  link_tag[i].title) {
		  link_tag[i].disabled = true ;
		if (link_tag[i].title == css_title) {
		  link_tag[i].disabled = false ;
		}
	  }

	  set_cookie( style_cookie_name, css_title,
		style_cookie_duration );
	}
    // console.log(css_title);
  }


function set_style_from_cookie()
{
  var css_title = get_cookie( style_cookie_name );
  if (css_title) {
	switch_style( css_title );
  }

  var css_cursor = get_cookie( style_cookie_cursor );
  if (css_cursor) {
      set_cursor_from_cookie( css_cursor );
      // console.log(css_cursor);
  }


}

function set_cookie ( cookie_name, cookie_value,
  lifespan_in_days, valid_domain )
{
	  // http://www.thesitewizard.com/javascripts/cookies.shtml
	  var domain_string = valid_domain ?
	  ("; domain=" + valid_domain) : '' ;
	  document.cookie = cookie_name +
	  "=" + encodeURIComponent( cookie_value ) +
	  "; max-age=" + 60 * 60 *
	  24 * lifespan_in_days +
	  "; path=/" + domain_string ;
	}

	function get_cookie ( cookie_name )
	{

	  // http://www.thesitewizard.com/javascripts/cookies.shtml
	  var cookie_string = document.cookie ;
	  if (cookie_string.length !== 0) {
		return (document.cookie.match('(^|; )'+cookie_name+'=([^;]*)')||0)[2];
	  }

	  return '' ;
	}

//fin change-style.js

//-----------------------------------------------------------------------

//-----------------------------------------------------------------------

//Tamaño del puntero/cursor del mouse grande

jQuery('#puntero-del-mouse-chico').click(reset_cursor);

jQuery('#puntero-del-mouse-grande').click(grow_cursor);

function set_cursor_from_cookie (css_cursor){
  if(css_cursor == "big"){
	grow_cursor();
  } else {
	reset_cursor();
  }
}

function grow_cursor()
{

  jQuery("*").css("cursor", "url("+servidor+"/images/cursores/cursor-mouse-grande.png), url("+servidor+"/images/cursores/cursor-mouse-grande.cur), auto");
  jQuery("a").css("cursor", "url("+servidor+"/images/cursores/pointer-big-hand.png) 15 0, url("+servidor+"/images/cursores/pointer-big-hand.cur) 15 0, auto");
  jQuery("a img").css("cursor", "url("+servidor+"/images/cursores/pointer-big-hand.png) 15 0, url("+servidor+"/images/cursores/pointer-big-hand.cur) 15 0, auto");

  set_cookie( style_cookie_cursor, "big",
    style_cookie_duration );

  return false;
}


function reset_cursor(){

    jQuery("*").css("cursor", "default");
    jQuery("a").css("cursor", "pointer");

    set_cookie(style_cookie_cursor, "small",
    style_cookie_duration );

  return false;
}

//fin tamaño del puntero/cursor del mouse grande
//-----------------------------------------------------------------------



//-----------------------------------------------------------------------
//Cerrar ventana
function cerrar_ventana_ayuda()
{
  this.close();
}
//fin cerrar ventana
//-----------------------------------------------------------------------



//-----------------------------------------------------------------------
//detecta mobile

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|windows phone/i.test(navigator.userAgent) )
{
	//On mobile YES
	jQuery('.barra-accesibilidad-esconder-items-en-movil').css({"display":"none"})
	// jQuery('#div-altura-variable').css({"display":"none"})//en mobile no se muestra la barra
	jQuery('#barra-accesibilidad').addClass("no-hover-on-mobile");
}
else
{
	//On mobile NO
	jQuery('.barra-accesibilidad-esconder-items-en-movil').css({"display":"inline-block", "display":"inline "})
	jQuery('#barra-accesibilidad').removeClass("no-hover-on-mobile");
}

//fin detecta mobile
//-----------------------------------------------------------------------


// FONT SIZE COOKIES
$(document).ready(function(){


    // Donde queremos cambiar el tamaÃ±o de la fuente
    var donde = $("a,h2,h3,h4,h5,p,li,ol,ul,.btn,span");

    // SE AGREGA REGLA PARA EVITAR MODIFICAR TEXTO EN datos_usuario
    var sin_aumento = $("p.sin_aumento");

    // SE CARGA LA FONT DEPENDIENDO DE LA COOKIE GUARDADAC
    var ultimaFont = donde.css('font-size',get_cookie("font"));
    // donde.animate({fontSize: ultimaFont}, 250);
    donde.css('font-size', ultimaFont);


    sin_aumento.css('font-size', 12);



    if (get_cookie("lang") == 'es')
    {
        $( "#idiomaES" ).hide();
        $( "#idiomaEN" ).show();
    }
    else if(get_cookie("lang") == 'en')
    {
        $( "#idiomaEN" ).hide();
        $( "#idiomaES" ).show();
    }


    $('#idiomaEN').click(function(){
        event.preventDefault();
        set_cookie( style_cookie_lang, "en", style_cookie_duration );
        // console.log(style_cookie_lang);
        window.location = "?lang=en";
        return false;
    });

    $('#idiomaES').click(function(){
        event.preventDefault();
        set_cookie( style_cookie_lang, "es", style_cookie_duration );
        // console.log(style_cookie_lang);
        window.location = "?lang=es";
        return false;
    });


    function reset_font() {
        donde.css('font-size', sizeFuenteOriginal);
        var sizeFuenteOriginal = 14;
        donde.animate({fontSize: sizeFuenteOriginal}, 250);
        set_cookie( style_cookie_font, sizeFuenteOriginal+"px", style_cookie_duration );
        // console.log("Cambio:"+get_cookie(style_cookie_font));

        sin_aumento.css('font-size', 12);
        var sizeFuenteOriginalSin = 12;
        sin_aumento.animate({fontSize: sizeFuenteOriginalSin}, 250);// set_cookie( style_cookie_font, sizeFuenteOriginalSin+"px", style_cookie_duration );
        // console.log("Cambio sin aumento:"+get_cookie(style_cookie_font));

        return false;
    }


    function aumentar1()
    {
        var sizeFuenteNuevo = 16;
        donde.animate({fontSize: sizeFuenteNuevo}, 250);
        set_cookie( style_cookie_font, sizeFuenteNuevo+"px", style_cookie_duration );
        // console.log("get_cookie autmentar 1:"+get_cookie(style_cookie_font));

        sin_aumento.css('font-size', 12);
        var sizeFuenteOriginalSin = 12;
        sin_aumento.animate({fontSize: sizeFuenteOriginalSin}, 250);
        // set_cookie( style_cookie_font, sizeFuenteOriginalSin+"px", style_cookie_duration );
        // console.log("Cambio sin:"+get_cookie(style_cookie_font));

        return false;
    }


    function aumentar2()
    {
        var sizeFuenteNuevo = 18;
        // var sizeFuenteNuevo = 20;
        donde.animate({fontSize: sizeFuenteNuevo}, 250);
        set_cookie( style_cookie_font, sizeFuenteNuevo+"px", style_cookie_duration );
        // console.log("get_cookie autmentar 2:"+get_cookie(style_cookie_font));

        sin_aumento.css('font-size', 12);
        var sizeFuenteOriginalSin = 12;
        sin_aumento.animate({fontSize: sizeFuenteOriginalSin}, 250);
        // set_cookie( style_cookie_font, sizeFuenteOriginalSin+"px", style_cookie_duration );
        // // console.log("Cambio sin:"+get_cookie(style_cookie_font));

        return false;
    }





    $(".reset").click(function()
    {
        reset_font();
    });

    $(".aumentar1").click(function()
    {
        aumentar1();
    });

    $(".aumentar2").click(function()
    {
        aumentar2();
    });


    // SE ESCONDE EL ICONO QUE ESTÁ HABILITADO, POR DEFECTO CARGA EL ICONO DE ALTO CONTRASTE
    $("#icon_version_alto_contraste").click(function()
    {
        // console.log("click en icon_version_alto_contraste");
        $( "#icon_version_alto_contraste" ).hide();
        $( "#icon_version_normal" ).show();
    });

    $("#icon_version_normal").click(function()
    {
        // console.log("click en icon_version_normal");
        $( "#icon_version_normal" ).hide();
        $( "#icon_version_alto_contraste" ).show();
    });

    // FIN SE ESCONDE EL ICONO QUE ESTÁ HABILITADO, POR DEFECTO CARGA EL ICONO DE ALTO CONTRASTE









    if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) )
    {

        // ES ESCRITORIO, POR ENDE SE HABILITA EL HOVER A LA BARRA

       $('#icon_version_alto_contraste').hover(
           function(){
               $("#img_alto_contraste").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_alto_contraste").removeClass('hover_alto_contraste')
           }
       )


       $('#icon_version_normal').hover(
           function(){
               $("#img_alto_contraste").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_alto_contraste").removeClass('hover_alto_contraste')
           }
       )


       $('#puntero-del-mouse-chico').hover(
           function(){
               $("#img_puntero").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_puntero").removeClass('hover_alto_contraste')
           }
       )


       $('#puntero-del-mouse-grande').hover(
           function(){
               $("#img_puntero").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_puntero").removeClass('hover_alto_contraste')
           }
       )


       $('.reset').hover(
           function(){
               $("#img_letra").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_letra").removeClass('hover_alto_contraste')
           }
       )


       $('.aumentar1').hover(
           function(){
               $("#img_letra").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_letra").removeClass('hover_alto_contraste')
           }
       )


       $('.aumentar2').hover(
           function(){
               $("#img_letra").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_letra").removeClass('hover_alto_contraste')
           }
       )


       // IDIOMA
       $('#idiomaES').hover(
           function(){
               $("#img_idioma").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_idioma").removeClass('hover_alto_contraste')
           }
       )

       $('#idiomaEN').hover(
           function(){
               $("#img_idioma").addClass('hover_alto_contraste')
           },
           function(){
               $("#img_idioma").removeClass('hover_alto_contraste')
           }
       )
       // FIN IDIOMA
   }




});
