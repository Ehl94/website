//* ptdi.lib.ajax.js *//
//***********************************************************************************************//
function CrearObjetoAjax(XMLHttp)
{
    if (window.XMLHttpRequest)
    {
        XMLHttp = new XMLHttpRequest();
    }
    else
    {
        if (!window.ActiveXObject)
        {
            return false;
        }
        else
        {
            try {
                XMLHttp = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (e)
            {
                try
                {
                    XMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (e) {
                }
            }// Fin catch
        } // Fin else
    }// fin else  XMLHttpRequest
    return XMLHttp;
}
function renovar_cookie(){
	var base_sitio = window.location.origin;
	
	var XMLHttp = false;
	XMLHttp = CrearObjetoAjax(XMLHttp);
	XMLHttp.onreadystatechange =
	function(){ 
	if (XMLHttp.readyState != 4) { return }
		document.form_header.tiempo_session.value = 30; 
		document.getElementById("counter").innerHTML = '';
		clearInterval(idhora);
		consultar_tiempo_session();
	}
	
	var url = base_sitio+'/ajax/fx_renovar_cookie.php';
	
	XMLHttp.open('GET', url, true);
	XMLHttp.send(null);
}
/*
 * version 1.0 
function busqueda(div_nombre, array, php_ajax, tamano, orden)
{
    var XMLHttp = false;
    XMLHttp = CrearObjetoAjax(XMLHttp);

    var campo = new Array(array.length);
    var i;

    for (i = 0; i < array.length; i++)
    {
        campo[i] = document.getElementById(array[i]).value;
    }

    XMLHttp.onreadystatechange =
            function ()
            {
                if (XMLHttp.readyState != 4)
                {
                    return
                }

                $(document).ready(function ()
                {
                    $('#tabla_contenedora').DataTable({
                        "scrollX": true,
                        "language": {
                            "url": "/bs_js/lenguaje_esp.json"
                        },
                        "pageLength": 10,
                        "numbers_length": 2
                    });
                });

                document.getElementById(div_nombre).innerHTML = XMLHttp.responseText;
            }

    var url = "ajax/" + php_ajax + "?orden=" + orden + "&";

    for (var j = 1; j <= campo.length; j++)
    {

        url = url + "campo" + j + "=" + campo[j - 1] + "&";
    }

    url = url + "php_ajax=" + php_ajax + "&div_nombre=" + div_nombre;

    XMLHttp.open('GET', url, true);
    XMLHttp.send(null);

    if (XMLHttp.readyState == 1)
    {
        document.getElementById(div_nombre).innerHTML = '<table width="100%" border="0" cellspacing="0" cellpadding="0"><tr class="linea boton"><td class="general centrado"><img src="/medios/imagenes/iconos/cargando.gif" alt="icon"></img></td></tr></table>';
    }
}
*/

/**
 * Funcion busqueda
 * Recibe el id del elemento a mostrar datos, la url del ajax, y opcionalmente, los ids de overlay (base_4) y funciones de callback para administrar
 * los datos recibidos, mantiene compatibilidad con la base 3 de ptdi.
 * 
 * @param {string} contenedor_objetivo    Id del contenedor al que se enviaran los datos de respuesta   
 * @param {array} array_valores      arraJAVA con los ids de los inputs que deben ser considerados para envio (filtros de busqueda)
 * @param {string} ajax_name      nombre del ajax que manejara la peticion (no incluir "ajax/", solo nombre)
 * @param {int} limite     limite de registros para traer, si no se requiere utilizar un string vacio ('') (por implementacion de dataTables, este parametro sera deprecado y actualmente no tiene un uso)
 * @param {string} orden      nombre de la columna por el cual se ordenara la paticion, si no se requiere utilizar un string vacio ('') (por implementacion de dataTables, este parametro sera deprecado)
 * @param {string} id_overlay     ids en formato "querySelector", indica los ids de los overlay (gif cargando) que se mostrarn al hacer la peticion, 
 *                                <br>Ejemplo: 
 *                                <ol>
 *                                <li>"#overlay_uno" => muestra el overlay con el id "overlay_uno"</li>
 *                                <li>"#overlay_uno,#overlay_dos" => muestra los overlay con los ids "overlay_uno" y "overlay_dos"</li>
 *                                </ol>
 * @param {callback} exitoCallback  Funcion callback,si se define, en caso de exito omite el comportamiento por defecto y pasa la respuesta del ajax como parametro a la funcion callback.
 * @param {callback} errorCallback  Funcion callback,si se define, en caso de fallo omite el comportamiento por defecto y pasa la respuesta del ajax como parametro a la funcion callback.
 * @returns {undefined}
 * @version 2.0-beta
 */
function busqueda(contenedor_objetivo, array_valores, ajax_name, limite, orden, id_overlay, exitoCallback, errorCallback)
{
    //FIXME: eliminar objeto cuando libreria de idiomas este implementada
    var TR = {
        msg_errorProcesandoAJAX: 'Ocurrió un error al procesar su solicitud.'
    };
    
    //asignacion de valores por defecto para mantener la compatibilidad
    limite = limite || '';
    orden = orden || '';
    

    var ajaxURL = 'ajax/' + ajax_name;

    //serializacion de los datos del "arrayJAVA"
    var serializar = function (arrayJAVA)
    {
        var data_serializada = "orden=" + orden + "&";
        $.each(arrayJAVA, function (i, value)
        {
            data_serializada += 'campo' + (i + 1) + '=' + $('#' + value).val() + "&";
        });
        data_serializada += "limite=" + limite + "&php_ajax=" + ajax_name + "&div_nombre=" + contenedor_objetivo;
        return data_serializada;
    };
    
    $.ajax({
        type: 'GET',
        url: ajaxURL,
        data: serializar(array_valores),
        dataType: 'html',
        contentType: 'text/html; charset=iso8859-1',
        processData: false,
        beforeSend: function ()
        {
            $(id_overlay).toggle(); //cambia el estado de la clase display de "none" a "block"
        },
        success: function (data, textStatus)
        {

            if (typeof exitoCallback !== 'undefined') //si la funcion esta definida, le pasamos los datos el callback
            {
                exitoCallback(data, textStatus);
            }
            else
            {
                $('#' + contenedor_objetivo).html(data); //por defecto: reemplazamos los datos del contenedor_objetivo
                //$('#' + contenedor_objetivo).get(0).innerHTML = respuesta;
            }
        },
        error: function (jqXHR, textStatus)
        {
            if (typeof errorCallback !== 'undefined') //si la funcion esta definida, le pasamos el objeto xhr y el mensaje de error al callback
            {
                errorCallback(textStatus,jqXHR); 
            }
            else
            {
                Modal.Error(TR.msg_errorProcesandoAJAX);//por defecto: mostramos un mensaje de error
            }
        },
        complete: function ()
        {
            $(id_overlay).toggle(); //volvemos a cambiar la clase display de "block" a "none"
        }
    });
}