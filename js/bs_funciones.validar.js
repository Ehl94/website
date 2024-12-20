//**************************************************************************************************//
//* BEGIN: ptdi.validar.js *//

//FIXME: este objeto debe eliminarse cuando la libreria de idiomas esta implementada (jmunizaga 07/11/2018)
var TR ={
    form_validacion_oblig: 'Campo obligatorio.',
    form_validacion_oalnu: 'Campo alfanumérico obligatorio.',
    form_validacion_alnum: 'Debe ingresar un valor alfanumérico.',
    form_validacion_onume: 'Campo numérico obligatorio.',
    form_validacion_numer: 'Debe ingresar un valor numérico.',
    form_validacion_ocomb: 'Campo de selección obligatorio.',
    form_validacion_omail: 'Campo mail obligatorio.',
    form_validacion_nmail: 'Debe ingresar un mail.',
    form_validacion_obrut: 'Campo Rut obligatorio.',
    form_validacion_rutno: 'Ingrese un rut válido.',
    form_validacion_horas: 'Debe ingresar una hora (HH:MM).',
    form_validacion_oalfb: 'Campo alfabético obligatorio.',
    form_validacion_alfbe: 'Debe ingresar valores alfabéticos.',
    form_validacion_onota: 'Campo nota obligatorio.',
    form_validacion_nnota: 'Debe ingresar una nota (1.0 a 7.0).',
    form_validacion_notaa: 'Debe ingresar una nota aprobada (4.0 a 7.0).',
    form_validacion_omag0: 'Campo obligatorio mayor o igual a cero.',
    form_validacion_maig0: 'Debe ingresar un valor mayor o igual a cero.',
    form_validacion_omag1: 'Campo obligatorio mayor a uno.',
    form_validacion_maig1: 'Debe ingresar un valor mayor a uno.',
    form_validacion_oissn: 'Campo obligatorio ISSN.',
    form_validacion_issnn: 'Debe ingresar un valor ISSN válido (ISSN XXXX-XXXX).',
    form_validacion_oisbn: 'Campo obligatorio ISBN.',
    form_validacion_isbnn: 'Debe ingresar un valor ISBN válido (ISBN XXX-XXX-XXX-XXX-X).',
    form_validacion_ofile: 'Debe incluir al menos un archivo adjunto.',
    form_validacion_odate: 'La fecha esta fuera del rango valido',
    form_validacion_ohdat: 'La hora y fecha estan fuera del rango valido',
    form_validacion_clave: 'La clave no cumple los requisitos.',
    form_validacion_clav2: 'Las claves deben ser identicas',
    form_validacion_ohora: 'Debe ingresar una hora (HH:MM).'
};

/**
* Objeto que almacena las posibles validaciones para elementos de formulario, cada miembro es una funcion identificada con 
* el prefijo de la validacion y recibe el elemento a validar como parametro, retorna un objeto con el resultado de la validacion.
* 
* @type Object
* @returns {Object}    Campo "validez": indica la validez del elemento(0, 1 ó 2). Campo "texto": es el mensaje que se entrega al usuario.  
*/
var validadores_PTDI = {
    //Campo Generico Obligatorio
    OBLIG: function (elemento){
        if (es_Obligatorio(elemento.value)){
            return {validez: 1, texto: ''};
        }else{
            return {validez: 0, texto: TR.form_validacion_oblig};
        }
    },
    //Campo alfanumerico Opcional
    ALNUM: function (elemento){
        if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_Alfanumerico(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_alnum};
            }
        }
    },
    //Campo numerico opcional
    NUMER: function (elemento){
        if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_Numerico(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_numer};
            }
        }
    },
    //Campo alfanumerico obligatorio
    OALNU: function(elemento){
         if (es_Obligatorio(elemento.value) ){
            if(es_Alfanumerico(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_alnum};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_oalnu};
        }
    },
    //Campo numerico obligatorio
    ONUME: function(elemento){
        if (es_Obligatorio(elemento.value)){
            if (es_Numerico(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_numer};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_onume};
        }
    },
    //combobox obligatorio 
    OCOMB: function(elemento){
        if (es_Combo(elemento.value)){
            return {validez: 1, texto: ''};
        }else{
            return {validez: 0, texto: TR.form_validacion_ocomb};
        }
    },
    //combo opcional
    COMBO: function(elemento){
        return {validez: 1, texto: ''};
    },
    //Campo alfanumerico, incluye simbolo "@" (arroba)
    OARRO: function(elemento){
        if (es_Obligatorio(elemento.value) ){
            if(es_AlfanumericoArroba(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_nmail};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_omail};
        }
    },
    //Campo Rut Obligatorio
    OBRUT: function(elemento){
        if (es_Obligatorio(elemento.value) ){
            if(es_Rut(elemento.value)){
                enMascarar(elemento);
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_rutno};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_obrut};
        }
    },
    //Campo Rut opcional
    RUTNO: function(elemento){
    if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_Rut(elemento.value)){
                enMascarar(elemento);
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_rutno};
            }
        }
    },
    //campo obligatorio sin mensaje
    OBLHI: function (elemento){
        if (es_Obligatorio(elemento.value)){
            return {validez: 1, texto: ''};
        }else{
            return {validez: 0, texto: ''};
        }
    },
    //campo horario (HH:mm) opcional
    HORAS: function(elemento){
     if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if ((trim(elemento.value)).length == 2)
            {
                elemento.value += ':';
            }
            if(es_Hora(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_horas};
            }
        }
    },
    //Campo alfabetico obligatorio
    OALFB: function(elemento){
        if (es_Obligatorio(elemento.value) ){
            if(es_Alfabetico(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_alfbe};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_oalfb};
        }
    },
    //Campo alfabetico opcional
    ALFBE: function(elemento){
    if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_Alfabetico(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_alfbe};
            }
        }
    },
    //Campo mail obligatorio
    OMAIL: function(elemento){
        if (es_Obligatorio(elemento.value) ){
            if(es_Mail(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_nmail};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_omail};
        }
    },
    //campo mail opcional
    NMAIL: function(elemento){
    if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_Mail(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_nmail};
            }
        }
    },
    //Campo nota obligatoria
    ONOTA: function(elemento){
    $(elemento).removeClass('text-danger text-primary font-weight-bold');
    if (es_Obligatorio(elemento.value) ){
            if(es_Nota(elemento.value)){
                enmascarar_Nota(elemento);
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_nnota};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_onota};
        }
    },
    //campo nota opcional
    NNOTA: function(elemento){
        $(elemento).removeClass('text-danger text-primary font-weight-bold');
        if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_Nota(elemento.value)){
                enmascarar_Nota(elemento);
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_nnota};
            }
        }
    },
    //campo nota opcional "aprobada" (sobre 4.0)
    NOTAA: function(elemento){
        $(elemento).removeClass('text-danger text-primary font-weight-bold');
        if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_Nota_Aprobada(elemento.value)){
                 enmascarar_Nota(elemento);
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_notaa};
            }
        }
    },
    //campo fecha obligatoria (sin mensaje)
    OFECH: function(elemento){
        if (es_Obligatorio(elemento.value) ){
            if(es_Fecha(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: ''};
            }
        }else{
            return {validez: 0, texto:''};
        }
    },
    //campo fecha opcional (sin mensaje)
    FECHA: function(elemento){
        if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_Fecha(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: ''};
            }
        }
    },
    //Campo obligatorio mayor o igual a 0
    MAIG0: function (elemento){
        if (es_Obligatorio(elemento.value)){
            if (es_Numerico(elemento.value)){
                var valor = "" + elemento.value;
                if (valor.indexOf(',') != -1){
                    valor = valor.replace(',', '.');
                }
                if (mayorigualcero(valor)){
                    return {validez: 1, texto: ''};
                }else{
                    return {validez: 0, texto: TR.form_validacion_maig0};
                }
            }else{
                return {validez: 0, texto: TR.form_validacion_omag0};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_omag0};
        }
    },
    //Campo obligatorio mayor o igual a 1
    MAIG1: function (elemento){
        if (es_Obligatorio(elemento.value)){
            if (es_Numerico(elemento.value)){
                var valor = "" + elemento.value;
                if (valor.indexOf(',') != -1){
                    valor = valor.replace(',', '.');
                }
                if (mayorigualuno(valor)){
                    return {validez: 1, texto: ''};
                }else{
                    return {validez: 0, texto: TR.form_validacion_maig1};
                }
            }else{
                return {validez: 0, texto: TR.form_validacion_omag1};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_omag1};
        }
    },
    //Campo obligatorio (International Standard Serial Number, Número Internacional Normalizado de Publicaciones Seriadas);
    OISSN: function(elemento){
    if (es_Obligatorio(elemento.value) ){
            if(es_issn(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_issnn};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_oissn};
        }
    },
    //campo opcional (International Standard Serial Number, Número Internacional Normalizado de Publicaciones Seriadas)
    ISSNN:function(elemento){
     if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_issn(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_issnn};
            }
        }
    },
    //campo obligatorio (International Standard Book Number, "Número Estándar Internacional de Libros")
    OISBN: function(elemento){
    if (es_Obligatorio(elemento.value) ){
            if(es_isbn(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_isbnn};
            }
        }else{
            return {validez: 0, texto: TR.form_validacion_oisbn};
        }
    },
    //campo opcional (International Standard Book Number, "Número Estándar Internacional de Libros")
    ISBNN:function(elemento){
     if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_isbn(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_isbnn};
            }
        }
    },
    //
    ONVCO: function(elemento){
        if (es_Obligatorio(elemento.value) ){
           if(es_ComboNull(elemento.value)){
               return {validez: 1, texto: ''};
           }else{
               return {validez: 0, texto: ''};
           }
       }else{
           return {validez: 0, texto:''};
       }
    },
    //
    NVCOM: function(elemento){
    if (es_Vacio(elemento.value)){
            return {validez: 2, texto: ''};
        }else{
            if(es_ComboNull(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: ''};
            }
        }
    },
    //Campo de archivo obligatorio
    OFILE: function (elemento){
        if (es_Obligatorio(elemento.value)){
            return {validez: 1, texto: ''};
        }else{
            return {validez: 0, texto: TR.form_validacion_ofile};
        }
    },
    //campo de archivo opcional
    NFILE: function (elemento){
        return {validez: 1, texto: ''};
    },
    /*Campo fecha obligatorio con datepicker, compara rangos de fechas por medio de data-fecha-[inicio,fin], que indica el id del input con el cual comparar
    * EJ: 
    *   <input type="text" data-provider="datepicker" data-fecha-fin="id_del_input_fecha_fin"/> -> input de fin
    *   <input type="text" data-provider="datepicker" data-fecha-inicio="id_del_input_fecha_inicio"/> -> input de inicio
    *
    */
    ODATE: function(elemento){
       if (es_Obligatorio(elemento.value) ){
            if(es_Fecha(elemento.value) && valida_rango_fecha(elemento)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_odate};
            }
        }else{
            return {validez: 0, texto:TR.form_validacion_oblig};
        }
    },
    /**
     * Campo hora fecha obligatorio(HH:MM dd-mm-yyyy) sin datepicker, compara rangos de horas fechas por medio
     * de data-hfecha-[inicio,fin], que indica el id del input con el cual comparar
     * @param {*} elemento 
     */
    OHDAT: function(elemento){
        if (es_Obligatorio(elemento.value) ){
             if(es_hora_fecha(elemento.value) && valida_rango_hora_fecha(elemento)) {
                 return {validez: 1, texto: ''};
             }else{
                 return {validez: 0, texto: TR.form_validacion_ohdat};
             }
         }else{
             return {validez: 0, texto:TR.form_validacion_oblig};
         }
     },
    /*
    * Campo numerico obligatorio, valida solo si equivale a un numero especificado en el input como data-numero="x" (x= numero)
    * ej: <input type="text" id="ONUEQ_numero" data-numero="10"/> -> valida solo si el usuario digita un 10
    */
    ONUEQ: function(elemento){
        if (es_Obligatorio(elemento.value)){
            if (es_Numerico(elemento.value) && valor_es_igual_a(elemento)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: ''};
            }
        }else{
            return {validez: 0, texto: ''};
        }
    },
    /*
     * 
     * 
     */
    CLAVE: function(elemento){
      var funcion_validadora;
      //verifica que exista la funcion validadora definda en el elemento.
      if (elemento.dataset.validador) {
        funcion_validadora = window[elemento.dataset.validador];
      } else {
        return {validez: 0, texto: TR.form_validacion_clave};
    }
      //ejecuta la funcion validadora
      if (funcion_validadora != "undefined" && funcion_validadora(elemento.value)) {
        return {validez: 1, texto: ''};
      } else {
        return {validez: 0, texto: TR.form_validacion_clave};
      }
    },
    /*
     * 
     * 
     */
    CLAV2: function(elemento){
      var fuente;
      //verifica que exista el origen desde donde comparar las claves
      if (elemento.dataset.fuente) {
        fuente = document.getElementById(elemento.dataset.fuente);
      } else {
        return {validez: 0, texto: TR.form_validacion_clav2};
      }
      //ejecuta la funcion validadora
      if (compara_claves(fuente,elemento)) {
        return {validez: 1, texto: ''};
      } else {
        return {validez: 0, texto: TR.form_validacion_clav2};
      }
    },
    //campo horario (HH:mm) obligatorio
    OHORA: function(elemento){
        if (es_Obligatorio(elemento.value)){
            if ((trim(elemento.value)).length == 2)
            {
                elemento.value += ':';
            }
            if(es_Hora(elemento.value)){
                return {validez: 1, texto: ''};
            }else{
                return {validez: 0, texto: TR.form_validacion_ohora};
            }
        }
        else
        {
            return {validez: 0, texto: TR.form_validacion_ohora};
        }
    },
    //numero no permite decimales
    NTERO: function(e) {
        return es_Vacio(e.value) ? {
            validez: 2,
            texto: ""
        } : es_Numentero(e.value) ? {
            validez: 1,
            texto: ""
        } : {
            validez: 0,
            texto: TR.form_validacion_numer
        };
    }
};

//*************** Funciones CORE

/**
* Valida las inputs del formulario o contenedor que se defina, opcionalmente se puede usar el estilo 'popover' para mostrar los mensajes de validacion
* Solo aplica para etiquetas "select, input, textarea y label"
* 
* @param {type} contenedor     Formulario o contenedor donde se validaran los inputs, 
* @param {type} estilo_mensaje     define el estilo de mensaje para la validacion, si se omite aplica los textos por defecto, 'popover' para aplicar estilos flotantes
* @returns {Boolean}   true si se valido correctamente, false si fallo algun input en la validacion.
*/
function validar(contenedor, estilo_mensaje)
{
if (estilo_mensaje == undefined) {
estilo_mensaje = 'default';
}
var $elementos = $(contenedor).find('textarea, select, input');
var tiene_elementos_validables = false;

$elementos.each(function ()
{
var elemento = this;
var id_validador = elemento.id.substring(0, 5);
if (validadores_PTDI.hasOwnProperty(id_validador)) //verificamos si existe el validador asociado al elemento
{
  tiene_elementos_validables = true;
  var val = validadores_PTDI[id_validador](elemento); //invocamos el validador correspondiente y le pasamos el elemento como parametro
  estado(val.validez, elemento, val.texto, 0, estilo_mensaje); //actualiza el estado en pantalla del elemento
}
});

//Si todos los elementos son validos y en el contenedor existen elementos "validables" (evita que se validen contenedores con validadores invalidos, valga la redundancia :P)
if (!$elementos.hasClass('is-invalid') && tiene_elementos_validables)
{
//paso la validacion
actualizar_boton(contenedor, true);
return true;
} else
{
// no paso la validacion  
actualizar_boton(contenedor, false);
return false;
}
}

//FIXME: verificar esta funcion, ya que la nueva version de validar puede aplicarse tanto como a un form, como a un TR u otro contenedor (jmunizaga 07/11/2018)
function validar_linea(form, cantidad)
{
var activar_boton = 1;
var hasta = 0;
var g = 0;
var sw_activacion = 0;
var inicial = 0;
var cont_input_oblig_faltantes = 0;
var cont_textarea_oblig_faltentes = 0;
var cont_select_oblig_faltantes = 0;

for (i = 0; i <= cantidad; i++)
{
    var id_linea = 'linea_' + i;
    var linea = document.getElementById(id_linea);
    var tag_input = linea.getElementsByTagName("input");
    var tag_select = linea.getElementsByTagName("select");
    var tag_textarea = linea.getElementsByTagName("textarea");
    cont_input_oblig_faltantes = 0;
    cont_textarea_oblig_faltentes = 0;
    cont_select_oblig_faltantes = 0;

    for (j = 0; j < tag_textarea.length; j++)
    {
        var recupero_nombre = tag_textarea[j].id;
        var recupero_valor = tag_textarea[j].value;
        var cadena_sub = recupero_nombre.substring(0, 6);

        if (cadena_sub == 'OBLIG_' && recupero_valor.length == 0)
        {
            activar_boton = 0;
            ++cont_textarea_oblig_faltentes;
        }
    }

    for (var k = 0; k < tag_input.length; k++)
    {
        //alert(tag_input[k].id+tag_input[k].value);
        recupero_nombre = tag_input[k].id;
        recupero_valor = tag_input[k].value;
        cadena_sub = recupero_nombre.substring(0, 6);

        if ((trim(recupero_valor)).length == 0 && (cadena_sub == 'OBRUT_' || cadena_sub == 'OBLIG_' || cadena_sub == 'OBLHI_' || cadena_sub == 'OALNU_' || cadena_sub == 'OALFB_' || cadena_sub == 'ONUME_' || cadena_sub == 'OMAIL_' || cadena_sub == 'ONOTA_' || cadena_sub == 'OARRO_' || cadena_sub == 'OFECH_'))
        {
            activar_boton = 0;
            ++cont_input_oblig_faltantes;
        }
    } // fin For

    for (var ko = 0; ko < tag_select.length; ko++)
    {
        var nombre = tag_select[ko].getAttribute("name");
        var valor = tag_select[ko].value;
        cadena_sub = nombre.substring(0, 6);

        if (cadena_sub == 'OCOMB_' && valor == '0')
        {
            activar_boton = 0;
            ++cont_select_oblig_faltantes;
        } // fin IF COMBO_
    } // fin FOR
    //alert(id_linea);

    if (activar_boton == 1 && sw_activacion == 0)
    {
        inicial = i + 1;
        sw_activacion = 1;
    }

    if (activar_boton == 1 && (cont_select_oblig_faltantes == 0 && cont_input_oblig_faltantes == 0 && cont_textarea_oblig_faltentes == 0))
    {
        hasta = i + 1;
    }
}// fin for de cantidad de lineas a revisar

g = hasta;
//desactivar el resto de las lineas.

for (var h = hasta; h <= cantidad; h++)
{
    id_linea = 'linea_' + h;
    linea = document.getElementById(id_linea);
    tag_input = linea.getElementsByTagName("input");
    tag_select = linea.getElementsByTagName("select");
    tag_textarea = linea.getElementsByTagName("textarea");
    var tag_botones = linea.getElementsByTagName("button");

    for (var b = 0; b < tag_botones.length; b++)
    {
        tag_botones[b].disabled = 'true';
        if (document.getElementById(tag_botones[b].id + '_habilitado'))
        {
            if (document.getElementById(tag_botones[b].id + '_habilitado').style.display == '')
            {
                document.getElementById(tag_botones[b].id + '_habilitado').style.display = 'none';
                document.getElementById(tag_botones[b].id + '_deshabilitado').style.display = '';
            }
        }
        //document.getElementById(tag_botones[b].id).setAttribute("disabled", "disabled;");
    } // fin FOR


    for (var j = 0; j < tag_textarea.length; j++)
    {
        document.getElementById(tag_textarea[j].id).readOnly = true;
        //alert(document.getElementById(tag_textarea[j].id).style.backgroundColor);
        if (document.getElementById(tag_textarea[j].id).style.backgroundColor != '')
        {
            document.getElementById(tag_textarea[j].id).style.backgroundColor = '#999999';
        }
    }

    for (k = 0; k < tag_input.length; k++)
    {
        if (document.getElementById(tag_input[k].id).type == 'text' || document.getElementById(tag_input[k].id).type == 'password' || document.getElementById(tag_input[k].id).type == 'hidden')
        {
            document.getElementById(tag_input[k].id).readOnly = true;//setAttribute("readonly", "readonly", true);
            var hexString = '';
            var rgbString = document.getElementById(tag_input[k].id).style.backgroundColor; // get this in whatever way.
            var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
            // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
            if (parts != null)
            {
                delete (parts[0]);
                for (var i = 1; i <= 3; ++i)
                {
                    parts[i] = parseInt(parts[i]).toString(16);
                    if (parts[i].length == 1)
                        parts[i] = '0' + parts[i];
                }

                hexString = parts.join(''); // "0070ff"
            }

            if (document.getElementById(tag_input[k].id).style.backgroundColor == '#ffffff' || ('#' + hexString == '#ffffff'))
            {
                //alert(document.getElementById(tag_input[k].id).style.backgroundColor);
                document.getElementById(tag_input[k].id).style.backgroundColor = '#999999';
            }
        }
        else
        {
            //document.getElementById(tag_input[k].id).setAttribute("disabled", "disabled;");
        }
        ;
    } // fin For

    for (ko = 0; ko < tag_select.length; ko++)
    {
        //document.getElementById(tag_select[ko].id).setAttribute("disabled", "disabled;");
    } // fin FOR
}


for (var m = inicial; m <= g; m++)
{
    id_linea = 'linea_' + m;

    if (document.getElementById(id_linea))
    {
        linea = document.getElementById(id_linea);
        tag_input = linea.getElementsByTagName("input");
        tag_select = linea.getElementsByTagName("select");
        tag_textarea = linea.getElementsByTagName("textarea");
        tag_botones = linea.getElementsByTagName("button");

        for (b = 0; b < tag_botones.length; b++)
        {
            document.getElementById(tag_botones[b].id).removeAttribute("disabled");
            if (document.getElementById(tag_botones[b].id + '_habilitado'))
            {
                if (document.getElementById(tag_botones[b].id + '_habilitado').style.display == 'none')
                {
                    document.getElementById(tag_botones[b].id + '_habilitado').style.display = '';
                    document.getElementById(tag_botones[b].id + '_deshabilitado').style.display = 'none';
                }
            }
        } // fin FOR


        for (var j = 0; j < tag_textarea.length; j++)
        {
            document.getElementById(tag_textarea[j].id).readOnly = false;

            if (document.getElementById(tag_textarea[j].id).style.backgroundColor == '#999999')
            {
                document.getElementById(tag_textarea[j].id).style.backgroundColor = '#ffffff';
            }
        }

        for (var k = 0; k < tag_input.length; k++)
        {
            if (document.getElementById(tag_input[k].id).type == 'text' || document.getElementById(tag_input[k].id).type == 'password' || document.getElementById(tag_input[k].id).type == 'hidden')
            {
                document.getElementById(tag_input[k].id).readOnly = false;
                var rgbString = document.getElementById(tag_input[k].id).style.backgroundColor; // get this in whatever way.
                var parts = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
                var hexString = '';
                // parts now should be ["rgb(0, 70, 255", "0", "70", "255"]
                if (parts != null)
                {
                    delete (parts[0]);
                    for (var i = 1; i <= 3; ++i)
                    {
                        parts[i] = parseInt(parts[i]).toString(16);
                        if (parts[i].length == 1)
                            parts[i] = '0' + parts[i];
                    }
                    hexString = parts.join(''); // "0070ff"
                }

                if (document.getElementById(tag_input[k].id).style.backgroundColor == '#999999' || ('#' + hexString == '#999999'))
                {
                    //alert('asdasd');
                    document.getElementById(tag_input[k].id).style.backgroundColor = '#ffffff';
                }
            }
            else
            {
                //document.getElementById(tag_input[k].id).removeAttribute("disabled");
            }
        } // fin For

        for (var ko = 0; ko < tag_select.length; ko++)
        {
            //document.getElementById(tag_select[ko].id).removeAttribute("disabled");
        } // fin FOR
    }
}

if (activar_boton == 1)
{
    document.getElementById('OBLHI_linea').value = 'activo';
}
else
{
    document.getElementById('OBLHI_linea').value = '';
}
}

/**
* Actualiza la indicacion visual de validacion de un elemento (icono y texto), opcionalmente define un tipo de estilo visual para mostrar los mensajes. 
* Usar diferentes estilos de respuesta en un mismo contenedor (formulario), puede resultar en comportamientos inesperados.
* 
* @param {int} estado     Define si el elemento es valido (1) o invalido (0)
* @param {object} obj        Objeto que representa el elemento html
* @param {string} texto      Mensaje que se mostrara al usuario cuando no cumple la validacion
* @param {int} check      Flag que indica si el elemento es un checkbox o un radio button group
* @param {string} estilo_mensaje       Texto que indica el estilo en que se presentara el mensaje de validacion al usuario, si se omite se muestra el estilo por defecto 
* @returns {undefined}
*/
function estado(estado, obj, texto, check, estilo_mensaje)
{
var tipo_estilo;
switch (estilo_mensaje) {
    case 'popover':
        tipo_estilo = 1; //popovers;
        break;
    case 'default':
        tipo_estilo= 0; //default;
        break;
    default :
        tipo_estilo = 0; //si se omite, mostrar el estilo default;
        break;
}

var $elemento = $('#' + obj.id);

//si parametros no estan asignados, darles un valor por defecto
texto = (typeof texto !== 'undefined') ? texto : '';
check = (typeof check !== 'undefined') ? check : 0;

var invalido = {
    clase: 'is-invalid',
    icono: 'fa fa-close text-danger'
};
var valido = {
    clase: 'is-valid',
    icono: 'fa fa-check text-success'
};

$.fn.extend({
    limpiaClase: function ()
    {
        this.removeClass(invalido.clase + ' ' + valido.clase);
        return this;
    },
    limpiaIcono: function ()
    {
        this.removeClass(invalido.icono + ' ' + valido.icono);
        return this;
    }
});


if (check != 1) //si no es checkbox, obtiene los nombres desde el elemento.id
{
    var $span_icono = $('#span_' + obj.id);
    var $div_texto = $('#div_' + obj.id);
}
else
{
    var $span_icono = $('#span_' + obj.replace('[]', ''));
    var $div_texto = $('#div_' + obj.replace('[]', ''));
}

if (estado == 0) //invalido
{
    $span_icono.limpiaIcono().addClass(invalido.icono);
    if (check != 1)
    {
        $elemento.limpiaClase().addClass(invalido.clase);
    }
    if(tipo_estilo == 1){
        actualizaPopOver($elemento, texto, true);
    }
    if(tipo_estilo == 0){
        $div_texto.html(texto);
    }
    

}
if (estado == 1) //valido
{
    $span_icono.limpiaIcono().addClass(valido.icono);
    if (check != 1)
    {
        $elemento.limpiaClase().addClass(valido.clase);
    }
    if(tipo_estilo == 1){
        actualizaPopOver($elemento, texto, false);
    }
    if(tipo_estilo == 0){
        $div_texto.html(texto);
    }
}
if (estado == 2) //valido
{
    $span_icono.limpiaIcono();
    $elemento.limpiaClase();
    $div_texto.html('');
}
}

function actualizaPopOver($elemento, mensaje, mostrar)
{
    
if (mostrar)
{
    var popover_error = '<div class="popover" role="tooltip">' +
                            '<div class="arrow"></div>' +
                            '<h3 class="popover-header"></h3>' +
                            '<div class="small popover-body font-weight-bold text-danger"></div>' +
                        '</div>';
    var popOverSettings = {
        placement: 'bottom',
        container: 'body',
        title: '',
        trigger: 'focus hover',
        content: mensaje,
        template: popover_error
    };
    $elemento.popover('dispose').popover(popOverSettings);
    if($elemento.is(':focus')){
        $elemento.popover('show');
    }
}else{
    $elemento.popover('dispose');
}
}

function actualizar_boton(form, estado)
{
var botones = form.getElementsByTagName("button");

for (var i = 0; i < botones.length; i++)
{
    var id_boton = botones[i].id;
    var cadena_sub = id_boton.substring(0, 6);
    if (cadena_sub == 'boton_')
    {
        if (estado == false)
        {
            botones[i].disabled = 'true';
        }
        else
        {
            botones[i].removeAttribute("disabled");
        }// fin else
    }//Fin Boton
}//fin for
}

function validar_cajas_de_texto(form, checkbox, hidden)
{
var opcion = 0;

var check_opciones = document.getElementsByName(checkbox);

for (var i = 0; i < check_opciones.length; i++)
{
    if (check_opciones[i].checked == true)
    {
        opcion = 1;
    }
}


if (opcion == 1)
{
    hidden.value = 1;
    estado(1, checkbox, '', 1);
}
else
{
    estado(0, checkbox, 'Campo obligatorio (seleccione al menos uno)', 1);
    hidden.value = '';
}
validar(form);
}

function validar_cajas_de_texto2(form, checkbox, id_hidden)
{
var opcion = 0, padre_hidden = null, hidden = null;

if(document.getElementById(id_hidden) == null) {
    return false;
}

hidden = document.getElementById(id_hidden);


var check_opciones = document.getElementsByName(checkbox);

for (var i = 0; i < check_opciones.length; i++)
{
    if (check_opciones[i].checked == true)
    {
        opcion = 1;
    }
}


if (opcion == 1 && hidden != null)
{
    padre_hidden = hidden.parentElement;
    padre_hidden.removeChild(hidden);
    estado(1, checkbox, '', 1);
}
else
{
    estado(0, checkbox, 'Campo obligatorio (seleccione al menos uno)', 1);
    hidden.value = '';
}
validar(form);
}

function validar_radios(form, radio)
{
var opcion = 0;

if (radio.checked == true)
{
    opcion = 1;
}
else
{
    for (var i = 0; i < radio.length; i++)
    {
        if (radio[i].checked == true)
        {
            opcion = 1;
        }
    }
}

if (opcion == 1)
{
    actualizar_boton(form, true);
}
else
{
    actualizar_boton(form, false);
}
}

function validar_radios_formulario(formulario)
{
var radios = document.getElementsByTagName('input');

var cont = 0;
var cont2 = 0;
var aux_name = 0;
var nombres = Array();
var nombres_1 = Array();

for (var i = 0; i < radios.length; i++)
{
    if (radios[i].type == 'radio')
    {
        if (radios[i].checked == true)
        {
            ++cont2;
        }//fin if

        if (aux_name != radios[i].name)
        {
            ++cont;
        }//fin if
        aux_name = radios[i].name;
    }//fin if
}//fin for
if (cont == cont2)
{
    actualizar_boton(formulario, true);
}
else
{
    actualizar_boton(formulario, false);
}
}
//****************

//****************Auxiliares

/* Funcion que compara fechas, requiere que el elemento posea un campo data-fecha-fin data-fecha-inicio
* 
* @param {type} elemento Es el input que contiene la fecha en formato "dd-mm-aaaa", y que posee el elemento data-fecha-fin o data-fecha-inicio
*                        el cual especifica el id del input que tiene el valor con el cual se comparara la fecha
* @returns {Boolean} El estado de validacion, si la fecha de inicio es menor que la de fin, y no son valores vacios devuelve TRUE.
*/
function valida_rango_fecha(elemento){
var data = elemento.dataset;
var actual = elemento.value;

if(data.fechaInicio){
var fecha_inicio = document.getElementById(data.fechaInicio).value;
if(compara_fecha(fecha_inicio,actual)){
  return true;
}else{
  return false;
}
}

if(data.fechaFin){
var fecha_fin = document.getElementById(data.fechaFin).value;
if(compara_fecha(actual,fecha_fin)){
  return true;
}else{
  return false;
}
}
}

function valida_rango_hora_fecha(elemento) {
var data = elemento.dataset;
var actual = elemento.value;

if(data.fechaInicio) {
  var fecha_inicio = document.getElementById(data.fechaInicio).value;
  if(es_hora_fecha(fecha_inicio) && compara_hora_fecha(fecha_inicio, actual)) {
    return true;
  } else {
    return false;
  }
}

if(data.fechaFin) {
 var fecha_fin = document.getElementById(data.fechaFin).value;
  if(es_hora_fecha(fecha_fin) && compara_hora_fecha(actual, fecha_fin)) {
    return true;
  } else {
    return false;
  }
}
}

/* Compara dos fechas en formato "dd-mm-aaaa" y retorna la validez del rango 
* 
* @param {type} fecha_inicio string en formato "dd-mm-aaaa"
* @param {type} fecha_fin string en formato "dd-mm-aaaa"
* @returns {Boolean} TRUE si fecha_inicio es menor que fecha_fin
*/
function compara_fecha(fecha_inicio, fecha_fin){

if(fecha_inicio == '' || fecha_fin == ''){
return false;
}

var inicio = fecha_inicio.split('-');
var fin = fecha_fin.split('-');
var dateInicio = new Date(inicio[2],inicio[1],inicio[0]); //año,mes,dia (formato gringo)
var dateFin = new Date(fin[2],fin[1],fin[0]); //año,mes,dia (formato gringo)

if(dateInicio <= dateFin){
return true;
}else{
return false;
}
}

/* Compara dos fechas en formato "HH:MM dd-mm-aaaa" y retorna la validez del rango 
* 
* @param {type} fecha_inicio string en formato "dd-mm-aaaa"
* @param {type} fecha_fin string en formato "dd-mm-aaaa"
* @returns {Boolean} TRUE si fecha_inicio es menor que fecha_fin
*/
function compara_hora_fecha(hfecha_inicio, hfecha_fin) {

if(hfecha_inicio == '' || hfecha_fin == '') {
return false;
}

var arr_hfecha_inicio = hfecha_inicio.split(' ');
var arr_hfecha_fin = hfecha_fin.split(' ');
var inicio = arr_hfecha_inicio[1].split('-');
var fin = arr_hfecha_fin[1].split('-');
var hora_ini = arr_hfecha_inicio[0].split(':');
var hora_fin = arr_hfecha_fin[0].split(':');
var dateInicio = new Date(inicio[2],inicio[1] - 1,inicio[0], hora_ini[0],hora_ini[1]); //año,mes,dia (formato gringo)
var dateFin = new Date(fin[2],fin[1] - 1,fin[0], hora_fin[0],hora_fin[1]); //año,mes,dia (formato gringo)

if(dateInicio <= dateFin){
return true;
}else{
return false;
}
}

function compara_claves(origen,comparando){
if(origen.value.trim()!= '' && comparando.value.trim()!= '' && origen.value == comparando.value){
return true;
}
else{
return false;
}
}

/*
* Compara el valor actual del input con el campo data-numero
* 
* @param {type} elemento  el input que se validara, debe poseer un campo data-numero con el valor a comparar
* @returns {Boolean} si el campo data-numero es igual al valor actual del input, retorna TRUE
*/
function valor_es_igual_a(elemento){
if(elemento.dataset.numero && (elemento.value == elemento.dataset.numero)){
return true;
}else{
return false;
}
}

function reemplaza(valor, texto1, texto2)
{
valor = valor.split(texto1).join(texto2);
return valor;
}

function validar_desde_hasta(desde, hasta, form)
{
var inicio = desde.value;
var largo_inicio = inicio.length;
var fin = hasta.value;
var largo_fin = fin.length;
var val_posicion;
var nuevofin = '';
var opcion = 0;
for (var i = 0; i < largo_fin; i++)
{
    val_posicion = fin.charAt(i);
    if (fin.charAt(i) == '0' && opcion == 0)
    {
        opcion = 0;
    }
    else
    {
        opcion = 1;
        nuevofin = nuevofin + fin.charAt(i);
    }
}
hasta.value = nuevofin;
largo_fin = nuevofin.length;
estado(1, desde);
if (nuevofin >= inicio || largo_fin > largo_inicio)
{
    estado(1, desde);
    estado(1, hasta);
    actualizar_boton(form, true);
}
else
{
    estado(1, desde);
    estado(0, hasta);
    actualizar_boton(form, false);
}
}

function validar_valor(c1, c2, c3, form)
{

var tag_input = document.getElementsByTagName('input');
var valor_c1 = limpia_precio(c1.value);
var valor_c2 = limpia_precio(c2.value);
var valor_c3 = limpia_precio(c3.value);

var suma = valor_c1 + valor_c2 + valor_c3;

if (suma <= 0)
{
    actualizar_boton(form, false);

}
else
{
    actualizar_boton(form, true);
}

}

function discrimina_rut(form, caja_rut, rut_alumno, div)
{
var contador = 1;
var arreglo_posicion = new Array();
var arreglo_valor = new Array();

arreglo_valor[0] = document.getElementById(rut_alumno).value;
arreglo_posicion[0] = 0;
var tag_input = document.getElementsByTagName('input');

for (var i = 0; i < tag_input.length; i++)
{
    if (tag_input[i].name == document.getElementById(caja_rut).name)
    {
        arreglo_posicion[contador] = i;
        arreglo_valor[contador] = tag_input[i].value;
        contador++;
    }
}

if (arreglo_posicion.length > 1)
{
    for (i = 0; i < arreglo_posicion.length - 1; i++)
    {
        for (j = 1; j < arreglo_posicion.length; j++)
        {
            if (arreglo_valor[i] == arreglo_valor[j] && j != i)
            {
                tag_input[arreglo_posicion[j]].value = '';
                validar(form);
                carga_mensaje(div, "El RUT ya fue Ingresado");

            }
        }
    }
}
}

function discrimina_parentesco(form, select_parentesco, div)
{
var contador = 0;
var arreglo_posicion = new Array();
var arreglo_valor = new Array();

var tag_select = document.getElementsByTagName('select');

for (var i = 0; i < tag_select.length; i++)
{
    if (tag_select[i].name == document.getElementById(select_parentesco).name)
    {
        arreglo_posicion[contador] = i;
        arreglo_valor[contador] = tag_select[i].value;
        contador++;
    }
}

if (arreglo_posicion.length > 1)
{
    for (var i = 0; i < arreglo_posicion.length - 1; i++)
    {
        for (var j = 1; j < arreglo_posicion.length; j++)
        {
            if (arreglo_valor[i] == arreglo_valor[j] && j != i && (arreglo_valor[i] == 1 || arreglo_valor[i] == 3))
            {
                if (arreglo_valor[i] == 1)
                {
                    carga_mensaje(div, "Ya ingresaste un padre");
                }
                else
                {
                    carga_mensaje(div, "Ya ingresaste una madre");
                }
                tag_select[arreglo_posicion[j]].value = 0;
                validar(form);
            }
        }
    }
}
}

function checkdate(formulario, dia, mes, ano, hidden)
{

var mes = document.getElementById(mes).value;
var dia = document.getElementById(dia).value;
var ano = document.getElementById(ano).value;

var fecha = new Date();
fecha.setFullYear(ano, (mes - 1), dia);

if ((fecha.getMonth() + 1 == mes && dia < 32) && (mes != 0 && ano != 0 && dia != 0))
{
    actualizar_boton(formulario, true);
    document.getElementById(hidden).value = '2';
    validar(formulario);
}
else if (mes != 0 && ano != 0 && dia != 0)
{
    actualizar_boton(formulario, false);
    document.getElementById(hidden).value = 'x';
    validar(formulario);
}
else
{
    actualizar_boton(formulario, false);
    document.getElementById(hidden).value = '';
    validar(formulario);
}
}

function activar_grupo(form, grupo, cantidad)
{
var activar_boton = 1;
var hasta = 0;
var g = 0;
var sw_activacion = 0;
var inicial = 0;
var cont_input_oblig_faltantes = 0;
var cont_textarea_oblig_faltentes = 0;
var cont_select_oblig_faltantes = 0;

var inicial_activacion = grupo;
var final_activacion = grupo;

if (grupo == 'todos')
{
    inicial_activacion = 1;
    final_activacion = cantidad;
}

g = hasta;
//desactivar el resto de las lineas.
for (var h = 1; h <= cantidad; h++)
{
    var id_grupo = 'grupo_' + h;
    grupo = document.getElementById(id_grupo);
    var tag_input = grupo.getElementsByTagName("input");
    var tag_select = grupo.getElementsByTagName("select");
    var tag_textarea = grupo.getElementsByTagName("textarea");
    var tag_botones = grupo.getElementsByTagName("button");

    for (var b = 0; b < tag_botones.length; b++)
    {
        tag_botones[b].disabled = 'true';
        if (document.getElementById(tag_botones[b].id + '_habilitado'))
        {
            if (document.getElementById(tag_botones[b].id + '_habilitado').style.display == '')
            {
                document.getElementById(tag_botones[b].id + '_habilitado').style.display = 'none';
                document.getElementById(tag_botones[b].id + '_deshabilitado').style.display = '';
            }
        }
        //document.getElementById(tag_botones[b].id).setAttribute("disabled", "disabled;");
    } // fin FOR

    for (var j = 0; j < tag_textarea.length; j++)
    {
        document.getElementById(tag_textarea[j].id).readOnly = false;
    }

    for (var k = 0; k < tag_input.length; k++)
    {
        if (document.getElementById(tag_input[k].id).type == 'text' || document.getElementById(tag_input[k].id).type == 'password')
        {
            document.getElementById(tag_input[k].id).readOnly = false;
        }
        else
        {
            document.getElementById(tag_input[k].id).setAttribute("disabled", "disabled;");
        }
    } // fin For

    for (var ko = 0; ko < tag_select.length; ko++)
    {
        document.getElementById(tag_select[ko].id).setAttribute("disabled", "disabled;");
    } // fin FOR
}

for (var m = inicial_activacion; m <= final_activacion; m++)
{
    id_grupo = 'grupo_' + m;

    if (document.getElementById(id_grupo))
    {
        grupo = document.getElementById(id_grupo);
        tag_input = grupo.getElementsByTagName("input");
        tag_select = grupo.getElementsByTagName("select");
        tag_textarea = grupo.getElementsByTagName("textarea");
        tag_botones = grupo.getElementsByTagName("button");
        //alert('ACAP');

        for (b = 0; b < tag_botones.length; b++)
        {
            document.getElementById(tag_botones[b].id).removeAttribute("disabled");
            if (document.getElementById(tag_botones[b].id + '_habilitado'))
            {
                if (document.getElementById(tag_botones[b].id + '_habilitado').style.display == 'none')
                {
                    document.getElementById(tag_botones[b].id + '_habilitado').style.display = '';
                    document.getElementById(tag_botones[b].id + '_deshabilitado').style.display = 'none';
                }
            }
        } // fin FOR

        for (j = 0; j < tag_textarea.length; j++)
        {
            document.getElementById(tag_textarea[j].id).removeAttribute("readonly");
        }
        for (k = 0; k < tag_input.length; k++)
        {
            if (document.getElementById(tag_input[k].id).type == 'text' || document.getElementById(tag_input[k].id).type == 'password')
            {
                document.getElementById(tag_input[k].id).removeAttribute("readonly");
            }
            else
            {
                document.getElementById(tag_input[k].id).removeAttribute("disabled");
            }
        } // fin For

        for (ko = 0; ko < tag_select.length; ko++)
        {
            document.getElementById(tag_select[ko].id).removeAttribute("disabled");
        } // fin FOR
    }
}
if (activar_boton == 1)
{
    actualizar_boton(form, true);
}
else
{
    actualizar_boton(form, false);
}
}
//****************

//**************** Mascaras
function enmascarar_Nota(objeto)
{
    var nota = objeto.value;
    nota = nota.split(",").join("");
    nota = nota.split(".").join("");

    if (nota.length == 2)
    {

        if (nota < 40)
        {
            $(objeto).removeClass('text-primary').addClass('text-danger font-weight-bold');
        }
        else
        {
            $(objeto).removeClass('text-danger').addClass('text-primary font-weight-bold');
        }

        nota = nota.charAt(0) + '.' + nota.charAt(1);
        objeto.value = nota;
    }
    else
    {
        $(objeto).removeClass('text-danger text-primary font-weight-bold');
    }
}

function enmascara_fono(tag)
{

var valor = tag.value;
var valor = reemplaza(valor, "-", "");
var largo_valor = trim(valor).length;
var invertido = "";
var cont = 0;
for (var g = 0; g < (largo_valor); g++)
{
    var aux = trim(valor).substr(g, 1);
    if (cont == 2)
    {
        invertido = invertido + '-';
    }
    invertido = invertido + aux;
    cont++;
}// fin For

valor = invertido;
tag.value = valor;
}

function mascara_rut(e, objeto)
{
var code;
if (document.all)
    code = event.keyCode;
else
    code = e.keyCode;

if (objeto.value.length == 2 && code != 8)
    objeto.value = objeto.value + '.';
if (objeto.value.length == 6 && objeto.value[2] == '.' && code != 8)
    objeto.value = objeto.value + '.';
if (objeto.value.length == 10 && objeto.value[2] == '.' && objeto.value[6] == '.' && code != 8)
    objeto.value = objeto.value + '-';
}

function enMascarar(objeto)
{
var rut = objeto.value;
var tmpstr = "";
for (var g = 0; g < rut.length; g++)
    //if ( rut.charAt(g) != ' ' && rut.charAt(g) != '.' && rut.charAt(g) != '-' )
    //tmpstr = tmpstr + rut.charAt(g);

    if (rut.charAt(g) != ' ' && rut.charAt(g) != '.' && rut.charAt(g) != '-')
    {
        if (g == 0 && rut.charAt(g) == '0')
        {
        }
        else
        {
            tmpstr = tmpstr + rut.charAt(g);
        }
    }
rut = tmpstr;
var largo = rut.length;

var invertido = "";
for (var d = (largo - 1), j = 0; d >= 0; d--, j++)
    invertido = invertido + rut.charAt(d);

var drut = "";
drut = drut + invertido.charAt(0);
drut = drut + '-';
var cnt = 0;
for (var di = 1, j = 2; di < largo; di++, j++)
{
    if (cnt == 3)
    {
        drut = drut + '.';
        j++;
        drut = drut + invertido.charAt(di);
        cnt = 1;
    }
    else
    {
        drut = drut + invertido.charAt(di);
        cnt++;
    }
}

invertido = "";
for (var fi = (drut.length - 1), j = 0; fi >= 0; fi--, j++)
    invertido = invertido + drut.charAt(fi);


objeto.value = invertido;
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
//****************

//**************** Filtros
function trimleft(str)
{
var resultStr = "";
var i = len = 0;

if (str + "" == "undefined" || str == null)
    return null;

str += "";
if (str.length == 0)
    resultStr = "";
else
{
    var len = str.length;

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

function limpia_precio(valor)
{
valor = valor.split("$").join("");
valor = valor.split(".").join("");
return valor;
}

function limpia_fono(valor)
{
valor = valor.split("-").join("");
return valor;
}

function limpia_valor_numerico(valor)
{
valor = valor.split("$").join("");
valor = valor.split(".").join("");
valor = valor.split(",").join("");
return valor;
}
//****************

//**************** Validaciones de tipo
function es_Obligatorio(recupero_valor)
{

if ((trim(recupero_valor)).length == 0)
{
    return false;
}

return true;
}

function es_Vacio(recupero_valor)
{
if ((trim(recupero_valor)).length == 0)
{
    return true;
}
return false;
}

/*
function es_Alfanumerico(recupero_valor) {

//var exp = /^([0-9a-zñçáéíóúàèìòùâêîôûäëïöüA-ZÑÇÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜ\ \-\º])+$/;
var exp = /^([^@^$^%^&·"!|';_<>¨´ç}{\[\]])+$/;

if ( ( !exp.test(recupero_valor) ) ) {
return false;
}

return true;
}
*/
function es_Alfanumerico(recupero_valor)
{

//var exp = /^([0-9a-zñçáéíóúàèìòùâêîôûäëïöüA-ZÑÇÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÄËÏÖÜ\ \-\º])+$/;

//var exp = /^([^@^$^%^&·"!|';_<>¨´ç}{\[\]])+$/;
//var exp = /^([^@^$^&·"!|';_<>¨´ç}{\[\]])+$/;

//var exp = /^([^@^$^&·!|';_<>¨´ç}{\[\]])+$/;//Modificado después de revisión sin versión (no hay autor de la modificación)

var exp = /^([^@^$^·!|_<>¨´ç}{\[\]])+$/;//se modifica para el ingreso del cuestionario de la umd



if ((!exp.test(recupero_valor)))
{
    return false;
}

return true;
}

function es_AlfanumericoArroba(recupero_valor)
{

var exp = /^([^"^'^$^·!|<>¨´ç}{\[\]])+$/;

if ((!exp.test(recupero_valor)))
{
    return false;
}

return true;
}

function es_Alfabetico(recupero_valor)
{

var exp = /^([^0-9^@^$^%^&·"!|';_<>¨´ç}{\[\]])+$/;

if ((!exp.test(recupero_valor)))
{
    return false;
}

return true;
}

function es_Numerico(recupero_valor)
{

recupero_valor = limpia_precio(recupero_valor);
recupero_valor = limpia_fono(recupero_valor);

var exp = /^(?:\+|-)?\d+,?\d*$/;

if ((!exp.test(recupero_valor)))
{
    return false;
}

return true;
}

/*
JM: LEER este articulo para entender porque fallaba para direcciones largas: https://stackoverflow.com/questions/12803859/regexp-and-string-combination-crashes-chrome
Se recomienda NO USAR REGEX para validar correos, debido a la alta complejidad de posibles combinatorias

function es_Mail (recupero_valor)
{
//var exp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

var exp = /^[A-Za-z0-9]([a-zA-Z0-9]+([_.-][a-zA-Z0-9]+)*)@([A-Za-z0-9]+)(([\.\-]?[a-zA-Z0-9]+)*)\.([A-Za-z]{2,})$/;

if ((!exp.test(recupero_valor)))
{
    return false;
}

return true;
}
*/

/*
* 
* Verifica mails nuevo.
* 
*/
function es_Mail(email) {
// If no email or wrong value gets passed in (or nothing is passed in), immediately return false.
if(typeof email === 'undefined') return null;
if(typeof email !== 'string' || email.indexOf('@') === -1) return false;

// Get email parts
var emailParts = email.split('@'),
    emailName = emailParts[0],
    emailDomain = emailParts[1],
    emailDomainParts = emailDomain.split('.'),
    validChars = 'abcdefghijklmnopqrstuvwxyz.0123456789_-'; //!#$%&\'*+-/=?^_`{|}~

// There must be exactly 2 parts
if(emailParts.length !== 2) {
    //alert("Wrong number of @ signs");
    return false;
}

// Must be at least one char before @ and 3 chars after
if(emailName.length < 1 || emailDomain.length < 3) {
    //alert("Wrong number of characters before or after @ sign");
    return false;
}

if(emailName.charAt(0)=='.' || emailName.slice(-1)=='.') {
    //alert("No comienza ni termina con un punto (.)");
    return false;
}

// Domain must include but not start with .
if(emailDomain.indexOf('.') <= 0) {
    //alert("Domain must include but not start with .");
    return false;
}

// emailName must only include valid chars
for (var i = emailName.length - 1; i >= 0; i--) {
    if(validChars.indexOf(emailName[i]) < 0) {
        //alert("Invalid character in name section");
        return false;
    }
};

// emailDomain must only include valid chars
for (var i = emailDomain.length - 1; i >= 0; i--) {
    if(validChars.indexOf(emailDomain[i]) < 0) {
        //alert("Invalid character in domain section");
        return false;
    }
};

// Domain's last . should be 2 chars or more from the end
if(emailDomainParts[emailDomainParts.length - 1].length < 2) {
    //alert("Domain's last . should be 2 chars or more from the end");
    return false;   
}

//alert("Email address seems valid");
return true;
}

function es_Combo(recupero_valor)
{

if (recupero_valor == '0')
{
    return false;
}

return true;
}

function es_ComboNull(recupero_valor)
{

if (recupero_valor == '')
{
    return false;
}

return true;
}

function es_Nota(recupero_valor)
{

var nota = recupero_valor;
var largo = nota.length;

nota = nota.split(",").join("");
nota = nota.split(".").join("");

//alert(nota);

if (nota.length <= 2)
{
    //if ((nota >= 10 && nota <= 70) || nota == 0)
    //{
    // se devuelve al if original 22-12-2020 Gmarchant
    if (nota >= 10 && nota <= 70) {
        return true;
    }
    else
    {
        return false;
    }
}
else
{
    return false;
}
}

function es_Nota_Aprobada(recupero_valor)
{
var nota = recupero_valor;
var largo = nota.length;

nota = nota.split(",").join("");
nota = nota.split(".").join("");

//alert(nota);

if (nota.length <= 2)
{

    if (nota >= 40 && nota <= 70)
    {
        return true;
    }
    else
    {
        return false;
    }
}
else
{
    return false;
}
}

function es_Rut(recupero_valor)
{

var rut = recupero_valor;
var largo = rut.length;

if (largo < 7 || largo > 13)
{
    return false;
}
else
{

    var tmpstr = "";
    for (var g = 0; g < rut.length; g++)
        if (rut.charAt(g) != ' ' && rut.charAt(g) != '.' && rut.charAt(g) != '-')
            tmpstr = tmpstr + rut.charAt(g);
    rut = tmpstr;
    largo = rut.length;

    var invertido = "";
    for (var h = (largo - 1), j = 0; h >= 0; h--, j++)
        invertido = invertido + rut.charAt(h);

    var drut = "";
    drut = drut + invertido.charAt(0);
    drut = drut + '-';
    var cnt = 0;
    for (var f = 1, j = 2; f < largo; f++, j++)
    {
        if (cnt == 3)
        {
            drut = drut + '.';
            j++;
            drut = drut + invertido.charAt(f);
            cnt = 1;
        }
        else
        {
            drut = drut + invertido.charAt(f);
            cnt++;
        }
    }// fin del for

    invertido = "";
    for (var d = (drut.length - 1), j = 0; d >= 0; d--, j++)
        invertido = invertido + drut.charAt(d);

    var crut = rut;
    rut = crut.substring(0, largo - 1);

    var dv = crut.charAt(largo - 1);

    if (rut != null || dv != null)
    {
        var dvr = '0';
        var suma = 0;
        var mul = 2;
        for (var s = rut.length - 1; s >= 0; s--)
        {
            suma = suma + rut.charAt(s) * mul;
            if (mul == 7)
                mul = 2;
            else
                mul++;
        }
        var res = suma % 11;
        if (res == 1)
            dvr = 'k';
        else if (res == 0)
            dvr = '0';
        else
        {
            var dvi = 11 - res;
            dvr = dvi + "";
        }
        if (dvr != dv.toLowerCase())
        {
            return false;
        }
        else
        {

            return true;

        }

    } // fin del if

} // fin del else		

}

function es_Hora(recupero_valor)
{

var exp = /^(0[0-9]|1\d|2[0-3]):([0-5]\d)$/;

if ((!exp.test(recupero_valor)))
{
    return false;
}

return true;
}

function es_Fecha(recupero_valor)
{
//var exp = /^(\d{4})(\/|-)(0[1-9]|1[012])\2(0[1-9]|[12][0-9]|3[01])$/;
//reg exp revisado, fechas en formato "dd-mm-aaaa" (jmunizaga 02-05-2019)
var exp = /^(?:3[01]|[12][0-9]|0?[1-9])([\-])(0?[1-9]|1[0-2])\1\d{4}$/;

if ((!exp.test(recupero_valor)))
{
    return false;
}
return true;
}

function es_hora_fecha(recupero_valor)
{
var arr_hora_fecha = recupero_valor.split(' '),
    hora = '',
    fecha = '';

if(arr_hora_fecha.length > 2) {
    return false;
}

hora = arr_hora_fecha[0];
fecha = arr_hora_fecha[1];

if(es_Hora(hora) && es_Fecha(fecha)) {
    return true;
}

return false;
}

function es_edad(form, caja)
{
var valor = caja.value;

if (valor < 120)
{
    estado(1, caja);
    actualizar_boton(form, true);
}
else
{
    estado(0, caja);
    actualizar_boton(form, false);
}
}

function es_issn(recupero_valor)
{

var exp = /^(ISSN|issn)(\s)(\d{4})(\-)(\d{3})(\d|[xX])$/;

if ((!exp.test(recupero_valor)))
{
    return false;
}
return true;
}

function es_isbn(recupero_valor)
{

var exp = /^(ISBN|isbn)(\s)(\d{3})(\-)(\d{3})(\-)(\d{2,5})(\-)(\d{2,4})(\-)(\d)$/;

if ((!exp.test(recupero_valor)))
{
    return false;
}
return true;
}

function mayorigualcero(x)
{
x = limpia_valor_numerico(x);
if (parseInt(x) >= 0)
{
    return true;
}
else
{
    return false;
}
}

function mayorigualuno(x)
{
x = limpia_valor_numerico(x);
if (parseInt(x) >= 1)
{
    return true;
}
else
{
    return false;
}
}
function enmascarar_horafecha(obj) {
var v = obj.value;
if (v.match(/^\d{2}$/) !== null) {
    obj.value = v + ':';
} else if (v.match(/^\d{2}\:\d{2}$/) !== null) {
    obj.value = v + ' ';
} else if (v.match(/^\d{2}\:\d{2} \d{2}$/) !== null){
    obj.value = v + '-';
} else if (v.match(/^\d{2}\:\d{2} \d{2}\-\d{2}$/) !== null){
    obj.value = v + '-';
}
}

function es_Numentero(e) {
return !!/^-?\d*$/.test(e);
}
//****************

//*END: ptdi.validar.js *//
//**************************************************************************************************//
