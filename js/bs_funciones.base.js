/* PhoenixULS:ptdi */
/**
 *
 * Plataforma Tecnológica Docente Integrada (ptdi)
 * Universidad de La Serena (ULS)
 *
 * Proyecto Phoenix
 * Base 4.0
 *
 *
 * 04 de octubre de 2018 - 18:30
 *
 **/
//**********************************************************************************************************//
 
function cambia_accion(formulario, nueva_accion)
{
    formulario.accion.value = nueva_accion;
}
function obtener_elemento(id)
{
    return document.getElementById(id);
}
function encripta_pass()
{
    var form = document.login;
    form.pass.value = hex_md5(form.OBLIG_password.value);
    form.OBLIG_password.value = '';
}
function header_opciones(opcion)
{
    var form = document.form_header;
    form.opcion.value = opcion;
    form.submit();
}
function seleccionar_perfil(form, id_perfil, plataforma)
{
    form.plataforma.value = plataforma;
    form.bs_id_perfil.value = id_perfil;
    form.submit();
}
function tipoNavegador()
{
    var version = 0;
    if (window.XMLHttpRequest)
    {
        if (document.all)
        {
            //IE7
            version = 2;
        }
        else
        {
            //mozilla, safari, opera 9, etc
            version = 1;
        }
    }
    else
    {
        // IE6, o viejos navegadores
        version = 3;
    }
    return version;
}
function cargar_padre(formulario, accion, url, key)
{
    formulario.accion.value = accion;
    formulario.url.value = url;
    formulario.key.value = key;
    formulario.submit();
}
function trimleft(str)
{
    var resultStr = "";
    var i = 0, len = 0;

    if (str + "" == "undefined" || str == null)
        return null;

    str += "";
    if (str.length == 0)
        resultStr = "";
    else
    {
        len = str.length;

        while ((i <= len) && (str.charAt(i) == " "))
            i++;
        resultStr = str.substring(i, len);
    }
    return resultStr;
}
function trimright(str)
{
    var resultstr = "";
    var i = 0;

    if (str + "" == "undefined" || str == null)
        return null;

    str += "";

    if (str.length == 0)
        resultstr = "";
    else
    {
        i = str.length - 1;
        while ((i >= 0) && (str.charAt(i) == " "))
            i--;
        resultstr = str.substring(0, i + 1);
    }

    return resultstr;
}
function trim(str)
{
    var resultstr = "";

    resultstr = trimleft(str);
    resultstr = trimright(resultstr);

    return resultstr;
}
function obtener_precio(tag)
{
    var valor = tag.value;
    valor = reemplaza(valor, "$", "");
    valor = reemplaza(valor, ".", "");

    var largo_valor = trim(valor).length;
    var invertido = "";
    var cont = 0;
    for (var g = (largo_valor - 1); g >= 0; g--)
    {
        var aux = trim(valor).substr(g, 1);
        if (cont == 3)
        {
            invertido = invertido + '.';
            cont = 0;
        }
        invertido = invertido + aux;
        cont++;
    }// fin For

    var valor_retorno = "";
    var largo = trim(invertido).length;
    var aux3 = "";
    for (var hh = (largo - 1); hh >= 0; hh--)
    {

        aux3 = trim(invertido).substr(hh, 1);
        valor_retorno = valor_retorno + aux3;
    }// fin For

    var inicio = valor_retorno.substring(0, 1);

    if (valor_retorno.length > 1 && inicio == 0)
    {
        valor_retorno = valor_retorno.substring(1, valor_retorno.length);
    }

    valor = '$' + valor_retorno;
    tag.value = valor;
}
function limpia_precio(valor)
{
    valor = valor.split("$").join("");
    valor = valor.split(".").join("");
    return valor;
}
function mensajes(formulario, mensaje, tipo)
{
	if (tipo === 1)
    {
        Modal.Info(mensaje);
    }
    else if (tipo === 2)
    {
		if(document.getElementById('OBLHI_boton'))
		{
			presiono_boton(formulario);
			formulario.OBLHI_boton.value = 'activo';
		}	
        Modal.ConfirmarForm(mensaje, formulario);
    }
    else if (tipo == 3)
    {
        Modal.Error(mensaje);
    }
}
function eliminar(id, body, id_tr, callback_acepta, callback_cancela)
{

    callback_acepta = (typeof callback_acepta !== 'undefined') ? callback_acepta : function(){return null;};
    callback_cancela = (typeof callback_cancela !== 'undefined') ? callback_cancela : function(){return null;};

    Modal.Confirmar("Est\u00E1 seguro de eliminar el registro?", function ()
    {
        jQuery('#' + id_tr + id).remove();
        jQuery('#' + body + ' tr').each(function (index)
        {
            jQuery(this).find('span.sn').html(index + 1);
        });
        callback_acepta();
    }, function ()
    {
        callback_cancela();
        return false;
    });
}

/**
 * Clona un registro de tabla en base a un patron, o a una linea de referencia y luego valida el formulario.
 *
 * @param {String} tabla_origen     ID de la tabla de origen de los datos
 * @param {String} tabla_destino    ID de la tabla de destino
 * @param {String} id_tbody_destino     ID del elemento TBODY de la tabla destino
 * @param {String} prefijo_id_tr    Prefijo del id de cada linea de tabla
 * @param {Object} formulario   Objeto HTML DOM, que refiere al formulario contenedor de la tabla
 * @param {Object} referencia_linea     Si se especifica, indica una referencia a la linea que se quiere copiar de la tabla origen (No utilizar el patron definido)
 * @returns {undefined}
 */
function clonar(tabla_origen, tabla_destino, id_tbody_destino, prefijo_id_tr, formulario, referencia_linea)
{
    var contenido = null, clon = null;
    var size = jQuery('#' + tabla_destino + ' >tbody >tr').length + 1;

    if (referencia_linea != undefined)
    {
        contenido = jQuery('#' + tabla_origen).find(referencia_linea).closest('tr');
    }
    else
    {
        contenido = jQuery('#' + tabla_origen + ' tr');
    }

    clon = contenido.clone(true, true);
    clon.attr('id', prefijo_id_tr + size);

    //Actualiza el id del control (boton) de eliminacion de la linea
    clon.find('.delete-record').attr('id', size);

    //Actualiza la columna de numeros de fila
    clon.find('.sn').html(size);


    var cambia_attr = function (atributo, sufijo)
    {
        var attr = atributo.split('_');
        attr.pop(); //elimina el ultimo elemento del array
        return attr.join("_") + "_" + sufijo; //agrega el nuevo sufijo
    };

    clon.find('label').each(function(){
        this.setAttribute('for', cambia_attr($(this).attr('for'), size));
    });

    clon.find('input').each(function ()
    {
        this.setAttribute('id', cambia_attr(this.id, size));
    });

    clon.find('textarea').each(function ()
    {

        this.setAttribute('id', cambia_attr(this.id, size));
    });

    clon.find('select').each(function ()
    {
        this.setAttribute('id', cambia_attr(this.id, size));
    });

    clon.find('span').each(function ()
    {
        if (this.id.substr(0, 5) == 'span_')
        {
            this.setAttribute('id', cambia_attr(this.id, size));
        }
    });

    clon.find('div').each(function ()
    {
        if (this.id.substr(0, 4) == 'div_')
        {
            this.setAttribute('id', cambia_attr(this.id, size));
        }
    });

    clon.appendTo('#' + id_tbody_destino);
}
function ocultar_menu()
{
    $('body').attr('class', 'skin-blue sidebar-mini');
}
function cambiar_id_subelementos(prefijo_id, clase_boton_eliminar, nuevo_elem, nuevo_num, limpiar_form) {

    nuevo_elem.attr('id', prefijo_id + nuevo_num);

    var cambia_attr = function (atributo, sufijo) {
            var attr = atributo.split('_');
            attr.pop(); //elimina el ultimo elemento del array
            return attr.join('_') + '_' + sufijo; //agrega el nuevo sufijo
    };

    var inputs = nuevo_elem.find('input'),
        inputs_check = nuevo_elem.find('input:checkbox'),
        inputs_radio = nuevo_elem.find('input:radio'),
        textareas = nuevo_elem.find('textarea'),
        selects = nuevo_elem.find('select');

    inputs.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
        if (this.getAttribute('data-fecha-inicio')) 
        {
            this.setAttribute('data-fecha-inicio', cambia_attr(this.getAttribute('data-fecha-inicio'), nuevo_num));
        }
        if (this.getAttribute('data-fecha-fin')) 
        {
            this.setAttribute('data-fecha-fin', cambia_attr(this.getAttribute('data-fecha-fin'), nuevo_num));
        }
 
    });

    inputs_check.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    inputs_radio.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    textareas.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    selects.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    nuevo_elem.find('label').each(function() {
        this.setAttribute('for', cambia_attr($(this).attr('for'), nuevo_num));
    });

    nuevo_elem.find('span').each(function () {
        if (this.id.substr(0, 5) == 'span_') {
            this.setAttribute('id', cambia_attr(this.id, nuevo_num));
        }
    });

    nuevo_elem.find('div').each(function () {
        if (this.id.substr(0, 4) == 'div_') {
            this.setAttribute('id', cambia_attr(this.id, nuevo_num));
        }
    });
    
    nuevo_elem.find('.sn').html('<b>'+nuevo_num+'.</b>');

    nuevo_elem.find('.' + clase_boton_eliminar).each(function () {
        this.disabled = false;
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    if(limpiar_form) {
        inputs.val('');
        inputs_check.val([]);
        inputs_radio.val([]);
        textareas.val('');
        selects.val('0');
    }

    return nuevo_elem;
}
/**
 * Clona una sección del formulario con estructura de divs de boostrap (sin necesidad de tablas).
 * Ejemplos de uso en /modulos/egresado/curriculum
 * @param  {string} id_clonable          - id del div a clonar, en formato nombre_del_div_1
 * @param  {string} clase_clonable       - clase asignada al div a clonar.
 * @param  {string} id_boton_agregar     - id del boton agregar, que clona el div del formulario.
 * @param  {string} clase_boton_eliminar - id del boton que elimina el elemento clonado del formulario.
 * @param  {function} callback_boton_agregar - opcional, function que se ejecuta luego de que se llama al boton agregar.
 * @param  {function} callback_boton_eliminar - opcional, function que se ejecuta luego de que se llama al boton eliminar, recibe por parametro el boton que se presiono.
 * @return {[type]}                      [description]
 */
function clonar2(id_clonable, clase_clonable, id_boton_agregar, clase_boton_eliminar, callback_boton_agregar, callback_boton_eliminar) {
  var prefijo_id = id_clonable.replace(/[^\D]/g, ''); //obtiene el prefijo del id. P.E. clonable_1 -> clonable_

  //agrega un listener al boton agregar definido
  $('#' + id_boton_agregar).click(function () {
    var num = $('.' + clase_clonable).length, //Chequea cuantos duplicados hay.
            nuevo_num = new Number(num + 1), //El número de ID del nuevo elemento creado.
            nuevo_elem = $('#' + prefijo_id + num).clone(true, false).fadeIn('slow'), // Crea el nuevo elemento, y cambia su id(no copia los listeners para solventar problema con datapickers)
            limpiar_form1 = true;

    nuevo_elem = cambiar_id_subelementos(prefijo_id, clase_boton_eliminar, nuevo_elem, nuevo_num, limpiar_form1);

    //agregar nuevamente el listener del boton eliminar al elemento clonado
    $(nuevo_elem).find('.' + clase_boton_eliminar).click(function () {

      var boton = this;
      var formulario = boton.form;
      // Dialogo de confirmación.
      Modal.Confirmar("¿Est\u00E1 seguro de eliminar el registro?, Esta acción no podr\u00E1 deshacerse. ",
              function () {
                var num = boton.id.replace(/[\D]/g, '');//obtiene el nro del id. P.E. clonable_1 -> 1

                $('#' + prefijo_id + num).slideUp('slow', function () {
                  $(this).remove();

                  //Se cambia nro de id de los elementos restantes.
                  $('.' + clase_clonable).each(function (indice, elem) {
                    var nuevo_id = indice + 1, limpiar_form2 = false;
                    if (indice > 0) {
                      cambiar_id_subelementos(prefijo_id, clase_boton_eliminar, $(elem), nuevo_id, limpiar_form2);
                    }
                  });
                  if (typeof callback_boton_eliminar === "function") {
                    callback_boton_eliminar(boton);
                  }
                });
                setTimeout(function(){
                    validar(formulario);
                  }, 1000);
              },
              function () {
                return false;
              }
      );

      //return false; //Elimina la última sección que se agrega
    });

    // Inserta el nuevo elemento después del último elemento duplicable.
    $('#' + prefijo_id + num).after(nuevo_elem);

    //valida el formulario para refrescar los validadores de los elementos clonados
    validar(this.form);

    //refresca los contadores de caracteres que existan en los textarea
    $('.cuenta_caracteres').each(function (){cuenta_caracteres(this);});

    //traslada el foco hacia el nuevo elemento insertado
    enfoca_nuevo_clon(nuevo_elem);

    //ejecuta el callback del boton agregar
    if (typeof callback_boton_agregar === "function") {
      callback_boton_agregar();
    }

  });


  //agrega listener a los botones eliminar que existan actualmente (secciones con datos existentes), agregado por solucion a problema con datapickers
  $('.' + clase_boton_eliminar).click(function () {

    var boton = this;
    // Dialogo de confirmación.
    Modal.Confirmar("¿Est\u00E1 seguro de eliminar el registro?, Esta accion no podr\u00E1 deshacerse. ",
            function () {
              var num = boton.id.replace(/[\D]/g, '');//obtiene el nro del id. P.E. clonable_1 -> 1

              $('#' + prefijo_id + num).slideUp('slow', function () {
                $(this).remove();

                //Se cambia nro de id de los elementos restantes.
                $('.' + clase_clonable).each(function (indice, elem) {
                  var nuevo_id = indice + 1, limpiar_form2 = false;
                  if (indice > 0) {
                    cambiar_id_subelementos(prefijo_id, clase_boton_eliminar, $(elem), nuevo_id, limpiar_form2);
                  }
                });
                if (typeof callback_boton_eliminar === "function") {
                  callback_boton_eliminar(boton);
                }
              });
            },
            function () {
              return false;
            }
    );

    //return false; //Elimina la última sección que se agrega
  });


  // Deshabilita el link de eliminar del primer elemento.
  $('.' + clase_boton_eliminar).first().attr('disabled', true);
}

function cuenta_caracteres(input)
{
  var $input = $(input);
  var caracteres_restantes = $input.attr('maxlength') - $input.val().length;
  $input.closest('.form-group').find('.num_cuenta_carac').html(caracteres_restantes);
}

function enfoca_nuevo_clon(nuevo_elem)
{
  //agrega la altura de la barra de encabezado para calcula la posicion
  var offset_encabe = $('#nav_barra_encabezado').height();
  var offset_menu = 0;
  //agrega un pequeño padding al foco
  var ajuste = 20;
  //si existe, agrega la altura de la barra de menu para calcula la posicion
  if ($('#nav_menu_modulo').length > 0) {
    offset_menu = $('#nav_menu_modulo').height();
  }
  $('html, body').animate({scrollTop: $(nuevo_elem).offset().top - (offset_encabe + offset_menu + ajuste)}, 500);
}
/*
 * Funcion de validacion recatpcha
 */
var valida_recaptcha = function (){
  var id_input = $('.g-recaptcha').first().data('inputValidable');
  var input_validable = document.getElementById(id_input);
  input_validable.value = 'validar_token';
  validar(input_validable.form);
};

/*
 * Funcion que reinicia la validacion recapcha si el usuario tarda mucho en enviar el formulario
 */
var reset_recaptcha= function (){
  var id_input = $('.g-recaptcha').first().data('inputValidable');
  var input_validable = document.getElementById(id_input);
  input_validable.value = '';
  validar(input_validable.form);
};


// FUNCION PARA DIRECTORIO TELEFONICO
function cargar_directorio(formulario, accion, url, key)
{
    formulario.accion.value = accion;
    formulario.url.value = url;
    formulario.key.value = key;

    // alert(formulario.accion.value);

    var urlActual   =   window.location.href;
    // alert(urlActual);
    // SI ES DISTINTO A LA PAGINA DE INICIO DEL DIRECTORIO
    if (urlActual != 'https://phoenix.cic.userena.cl/modulos/directorio_telefonico/fx_directorio_telefonico_inicio.php')
    {
        // SE ENVIA FORMULARIO
        formulario.submit();
    }
    else
    {

        // SE LIMPIA LO QUE HAYA ANTES
        if ($('i.directorio.circulo').hasClass("fa-circle"))
        {
            $('i.directorio.circulo').removeClass("fa-circle");
            $('i.directorio.circulo').addClass("fa-circle-o");
        }
        else if ($('i.directorio.cuadrado').hasClass("fa-square"))
        {
            $('i.directorio.cuadrado').removeClass("fa-square");
            $('i.directorio.cuadrado').addClass("fa-square-o");
        }



        // SE VERIFICA SI EXISTE CLASE Y SI NO SE AGREGA
        if ($('i#' + key ).hasClass("fa-circle-o"))
        {
            // SI TIENE CIRCULO VACIO Y SE LLENA
            // console.log('si');
            $('i#' + key ).removeClass("fa-circle-o");
            $('i#' + key ).addClass("fa-circle");
        }
        else if ($('i#' + key ).hasClass("fa-square-o"))
        {
            // SI TIENE CIRCULO VACIO Y SE LLENA
            // console.log('si');
            $('i#' + key ).removeClass("fa-square-o");
            $('i#' + key ).addClass("fa-square");
        }



        // INICIO AJAX
        $.ajax({
            url: 'ajax/cargar_unidad.php',
            method: 'POST',
            data: {
                id_unidad: key
            },
            success: function(data)
            {
                // SE INYECTA HTML DENTRO DEL DIV
                $('#seccion_home').html(data);

                // $( "i.directorio" ).removeClass( "fa-square" ).addClass( "fa-square-o" );
                // $( "i.directorio" ).addClass( "fa-square-o" );

                // SE INICIA DATATABLES
                $('#table_directorio').DataTable({
                    "language": {
                        "url": "/bs_js/lenguaje_esp.json"
                    },
                    "order": [], //no aplicar un orden por defecto
                    "pageLength": 50, //cantidad de resultados mostrados por defecto (10,25,50,100)
                    "search": {
                        "caseInsensitive": true //le indica al buscador que sea insensible a mayusculas
                    }
                });
            }
        });
        // FIN AJAX
    }

}
// FIN FUNCION PARA DIRECTORIO TELEFONICO




// FUNCION PARA DIRECTORIO TELEFONICO
function busqueda_directorio_telefonico(formulario, accion, url, key)
{

    // alert('primer alert');
    // return;

    formulario.accion.value = accion;
    formulario.url.value = url;
    formulario.key.value = key;
    // return;

    var busqueda = $("#busqueda_directorio").val();
    // console.log('busqueda: '+busqueda);


    // console.log('key: '+formulario.key.value);
    // return;

    var urlActual   =   window.location.href;
    // console.log(urlActual);
    // return;


    // alert(urlActual);
    // SI ES DISTINTO A LA PAGINA DE INICIO DEL DIRECTORIO
    if (urlActual != 'https://phoenix.cic.userena.cl/modulos/directorio_telefonico/fx_directorio_telefonico_inicio.php')
    {

        if (busqueda != "")
        {
            // SE ENVIA FORMULARIO
            formulario.key.value = busqueda;
            formulario.submit();
        }
        else
        {
            Modal.Info('Por favor, ingrese palabra clave para realizar la búsqueda en el directorio telefónico.');
        }

    }
    else
    {
        // console.log('Es igual');
        // alert('uno');
        // return;
        if (busqueda != "")
        {

            // alert('dos');

            Modal.ProgresoAjax();
            // INICIO AJAX

            // console.log('Es igual y se carga ajax');
            // Modal.Cerrar();
            // return;

            // INICIO AJAX
            $.ajax({
                // url: 'modulos/directorio_telefonico/ajax/cargar_busqueda.php',
                url: 'ajax/cargar_busqueda.php',
                method: 'POST',
                data: {
                    busqueda: busqueda
                },
                success: function(data)
                {


                    // SE INYECTA HTML DENTRO DEL DIV
                    $('#seccion_home').html(data);

                    // $( "i.directorio" ).removeClass( "fa-square" ).addClass( "fa-square-o" );
                    // $( "i.directorio" ).addClass( "fa-square-o" );

                    // SE INICIA DATATABLES
                    $('#table_directorio').DataTable({
                        "language": {
                            "url": "/bs_js/lenguaje_esp.json"
                        },
                        "order": [], //no aplicar un orden por defecto
                        "pageLength": 50, //cantidad de resultados mostrados por defecto (10,25,50,100)
                        "search": {
                            "caseInsensitive": true //le indica al buscador que sea insensible a mayusculas
                        }
                    });

                    // SE CIERRA LA MODAL DE CARGA
                    Modal.Cerrar();

                }
                // FIN SUCCESS
            });
            // FIN AJAX
        }
        // FIN IF
        else
        {

            Modal.Info('Por favor, ingrese palabra clave para realizar la búsqueda en el directorio telefónico.');
            // return;
        }
    }
    // FIN ELSE
}
// FIN FUNCION PARA DIRECTORIO TELEFONICO

/**
 * Quita el valor del campo oculto OBLHI_boton, para que al momento de precionar un botón, se desactiven los botones que estén validados, de esta forma se controla que el usuario haga clic en un botón más de una vez mientras se ejecuta la acción
 *
 * @param  formulario          - id del formulario que contiene el botón que fue presionado
 */
function presiono_boton(formulario) 
{	
	if(document.getElementById('OBLHI_boton'))
		{
			formulario.OBLHI_boton.value = '';
		}	
	validar(formulario);
}


/**
 * Clona una sección del formulario con estructura de divs de boostrap (sin necesidad de tablas).
 * Ejemplos de uso en /modulos/egresado/curriculum
 * @param  {string} id_clonable          - id del div a clonar, en formato nombre_del_div_1
 * @param  {string} clase_clonable       - clase asignada al div a clonar.
 * @param  {string} id_boton_agregar     - id del boton agregar, que clona el div del formulario.
 * @param  {string} clase_boton_eliminar - id del boton que elimina el elemento clonado del formulario.
 * @param  {function} callback_boton_agregar - opcional, function que se ejecuta luego de que se llama al boton agregar.
 * @param  {function} callback_boton_eliminar - opcional, function que se ejecuta luego de que se llama al boton eliminar, recibe por parametro el boton que se presiono.
 * @param  {function} elemento - opcional.
 * @param  {function} texto - opcional.
 * @return {[type]}                      [description]
 */
 function clonar3(id_clonable, clase_clonable, id_boton_agregar, clase_boton_eliminar, callback_boton_agregar, callback_boton_eliminar, elemento, texto,variable = 0) {
    var prefijo_id = id_clonable.replace(/[^\D]/g, ''); //obtiene el prefijo del id. P.E. clonable_1 -> clonable_
  
    //agrega un listener al boton agregar definido
    $('#' + id_boton_agregar).click(function () {
      var num = $('.' + clase_clonable).length, //Chequea cuantos duplicados hay.
              nuevo_num = new Number(num + 1), //El número de ID del nuevo elemento creado.
              nuevo_elem = $('#' + prefijo_id + num).clone(true, false).fadeIn('slow'), // Crea el nuevo elemento, y cambia su id(no copia los listeners para solventar problema con datapickers)
              limpiar_form1 = true;
  
      nuevo_elem = cambiar_id_subelementos2(prefijo_id, clase_boton_eliminar, nuevo_elem, nuevo_num, limpiar_form1, elemento, texto, variable);
  
      //agregar nuevamente el listener del boton eliminar al elemento clonado
      $(nuevo_elem).find('.' + clase_boton_eliminar).click(function () {
  
        var boton = this;
        var formulario = boton.form;
        // Dialogo de confirmación.
        Modal.Confirmar("¿Est\u00E1 seguro de eliminar el registro?, Esta acción no podr\u00E1 deshacerse. ",
                function () {
                  var num = boton.id.replace(/[\D]/g, '');//obtiene el nro del id. P.E. clonable_1 -> 1
  
                  $('#' + prefijo_id + num).slideUp('slow', function () {
                    $(this).remove();
  
                    //Se cambia nro de id de los elementos restantes.
                    $('.' + clase_clonable).each(function (indice, elem) {
                      var nuevo_id = indice + 1, limpiar_form2 = false;
                      if (indice > 0) {
                        cambiar_id_subelementos2(prefijo_id, clase_boton_eliminar, $(elem), nuevo_id, limpiar_form2, elemento, texto, variable);
                      }
                    });
                    if (typeof callback_boton_eliminar === "function") {
                      callback_boton_eliminar(boton);
                    }
                  });
                  setTimeout(function() {
                    validar(formulario);
                  }, 1000);
                },
                function () {
                  return false;
                }
        );
  
        //return false; //Elimina la última sección que se agrega
      });
  
      // Inserta el nuevo elemento después del último elemento duplicable.
      $('#' + prefijo_id + num).after(nuevo_elem);
  
      //valida el formulario para refrescar los validadores de los elementos clonados
      validar(this.form);
  
      //refresca los contadores de caracteres que existan en los textarea
      $('.cuenta_caracteres').each(function (){cuenta_caracteres(this);});
  
      //traslada el foco hacia el nuevo elemento insertado
      enfoca_nuevo_clon(nuevo_elem);
  
      //ejecuta el callback del boton agregar
      if (typeof callback_boton_agregar === "function") {
        callback_boton_agregar();
      }
  
    });
  
  
    //agrega listener a los botones eliminar que existan actualmente (secciones con datos existentes), agregado por solucion a problema con datapickers
    $('.' + clase_boton_eliminar).click(function () {
  
      var boton = this;
      // Dialogo de confirmación.
      Modal.Confirmar("¿Est\u00E1 seguro de eliminar el registro?, Esta accion no podr\u00E1 deshacerse. ",
              function () {
                var num = boton.id.replace(/[\D]/g, '');//obtiene el nro del id. P.E. clonable_1 -> 1
  
                $('#' + prefijo_id + num).slideUp('slow', function () {
                  $(this).remove();
  
                  //Se cambia nro de id de los elementos restantes.
                  $('.' + clase_clonable).each(function (indice, elem) {
                    var nuevo_id = indice + 1, limpiar_form2 = false;
                    if (indice > 0) {
                      cambiar_id_subelementos2(prefijo_id, clase_boton_eliminar, $(elem), nuevo_id, limpiar_form2, elemento, texto);
                    }
                  });
                  if (typeof callback_boton_eliminar === "function") {
                    callback_boton_eliminar(boton);
                  }
                });
              },
              function () {
                return false;
              }
      );
  
      //return false; //Elimina la última sección que se agrega
    });
  
  
    // Deshabilita el link de eliminar del primer elemento.
    $('.' + clase_boton_eliminar).first().attr('disabled', true);
  }

  function cambiar_id_subelementos2(prefijo_id, clase_boton_eliminar, nuevo_elem, nuevo_num, limpiar_form, elemento_a_agregar_texto, agregar_texto_especifico, variable=0) {

    nuevo_elem.attr('id', prefijo_id + nuevo_num);

    var cambia_attr = function (atributo, sufijo) {
            var attr = atributo.split('_');
            attr.pop(); //elimina el ultimo elemento del array
            return attr.join('_') + '_' + sufijo; //agrega el nuevo sufijo
    };

    var inputs = nuevo_elem.find('input'),
        inputs_check = nuevo_elem.find('input:checkbox'),
        inputs_radio = nuevo_elem.find('input:radio'),
        textareas = nuevo_elem.find('textarea'),
        selects = nuevo_elem.find('select');

    var no_limpiar = false;

    inputs.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
        if (this.getAttribute('data-fecha-inicio')) 
        {
            this.setAttribute('data-fecha-inicio', cambia_attr(this.getAttribute('data-fecha-inicio'), nuevo_num));
        }
        if (this.getAttribute('data-fecha-fin')) 
        {
            this.setAttribute('data-fecha-fin', cambia_attr(this.getAttribute('data-fecha-fin'), nuevo_num));
        }

        if(variable==1)
        {
            if (elemento_a_agregar_texto != null && agregar_texto_especifico != null) {
                if (this.id == elemento_a_agregar_texto + '_' + nuevo_num) {
                    this.value = `${agregar_texto_especifico}`;
                    no_limpiar = true;
                }
            }
        }
        else
        {
            if (elemento_a_agregar_texto != null && agregar_texto_especifico != null) {
                if (this.id == elemento_a_agregar_texto + '_' + nuevo_num) {
                    this.value = `${agregar_texto_especifico}${nuevo_num}`;
                    no_limpiar = true;
                }
            }
        }


    });

    inputs_check.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    inputs_radio.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    textareas.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    selects.each(function () {
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    nuevo_elem.find('label').each(function() {
        this.setAttribute('for', cambia_attr($(this).attr('for'), nuevo_num));
    });

    nuevo_elem.find('span').each(function () {
        if (this.id.substr(0, 5) == 'span_') {
            this.setAttribute('id', cambia_attr(this.id, nuevo_num));
        }
    });

    nuevo_elem.find('div').each(function () {
        if (this.id.substr(0, 4) == 'div_') {
            this.setAttribute('id', cambia_attr(this.id, nuevo_num));
        }
    });
    
    nuevo_elem.find('.sn').html('<b>'+nuevo_num+'.</b>');

    nuevo_elem.find('.' + clase_boton_eliminar).each(function () {
        this.disabled = false;
        this.setAttribute('id', cambia_attr(this.id, nuevo_num));
    });

    if(limpiar_form) {
        if (!no_limpiar) {
            inputs.val('');
        }
        inputs_check.val([]);
        inputs_radio.val([]);
        textareas.val('');
        selects.val('0');
    }

    return nuevo_elem;
}