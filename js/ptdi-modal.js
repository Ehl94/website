(function(global) {
    'use strict';

    function Modal() {
        this._opciones = {
            id: '',
            titulo: '',
            mensaje: '',
            detalles: '',
            tipo: 'INFORMACION',
            accion_primaria: {id: 'accion_primaria', nombre: 'Entendido', cb: function(el) {console.log('Entendido')},  tipo: 'primario'},
            accion_positiva: {id: 'accion_positiva', nombre: 'Aceptar',   cb: function(el) {console.log('Aceptar')},    tipo: 'primario'},
            accion_negativa: {id: 'accion_negativa', nombre: 'Cancelar',  cb: function(el) {console.log('Cancelar')},   tipo: null},
            acciones: [],
        };

        this.a11y = null;
        this.nodo = null;
        this.event = null;
    }

    Modal.DEBUG = true;

    Modal.tipos = {
        'INFORMACION'   : {titulo: 'Información',                               bg: 'bg-primary',   text: 'text-light', class: 'card-body-info'},
        'ALERTA'        : {titulo: 'Advertencia',                               bg: 'bg-warning',   text: 'text-dark',  class: 'card-body-alerta'},
        'ERROR'         : {titulo: 'Ha ocurrido un error',                      bg: 'bg-danger',    text: 'text-light', class: 'card-body-error'},
        'CONFIRMACION'  : {titulo: 'Por favor, confirme la siguiente acción',   bg: 'bg-primary',   text: 'text-light', class: 'card-body-confirmacion'},
        'PROGRESO'      : {titulo: 'Por favor, espere',                         bg: 'bg-info',      text: 'text-light', class: 'card-body-progreso'},
        'PROGRESOAJAX'  : {titulo: 'Por favor, espere',                         bg: 'bg-primary',   text: 'text-light', class: 'card-body-progreso h-100 d-flex'}
    };

    Modal.instancia = null;

    Modal.Info = function (mensaje, cb) {
        return Modal.Crear({
            id: 'modal-info',
            mensaje: mensaje,
            tipo: 'INFORMACION',
            accion_primaria: {id: 'accion_primaria', nombre: 'Entendido',  cb: (cb || function(el) {console.log(el.id)}), tipo: 'primario'},
        }).mostrar();
    }

    Modal.Alerta = function (mensaje, cb) {
        return Modal.Crear({
            id: 'modal-alerta',
            mensaje: mensaje,
            tipo: 'ALERTA',
            accion_primaria: {id: 'accion_primaria', nombre: 'Entendido',  cb: (cb || function(el) {console.log(el.id)}), tipo: 'primario'},
        }).mostrar();
    }

    Modal.Error = function (mensaje, cb) {
        return Modal.Crear({
            id: 'modal-error',
            mensaje: mensaje,
            tipo: 'ERROR',
            accion_primaria: {id: 'accion_primaria', nombre: 'Entendido',  cb: (cb || function(el) {console.log(el.id)}), tipo: 'danger'},
        }).mostrar();
    }

    Modal.Confirmar = function(mensaje, accion_positiva, accion_negativa) {
        return Modal.Crear({
            id: 'modal-confirmar',
            mensaje: mensaje,
            tipo: 'CONFIRMACION',
            accion_positiva: {id: 'accion_positiva', nombre: 'Aceptar',    cb: (accion_positiva || function(el) {console.log(el.id)}), tipo: 'primario'},
            accion_negativa: {id: 'accion_negativa', nombre: 'Cancelar',   cb: (accion_negativa || function(el) {console.log(el.id)}), tipo: null},
        }).mostrar();
    }

    Modal.ConfirmarEliminarPub = function(mensaje, accion_positiva, accion_negativa, accion, contador, rut, doi, funcion_eliminar) {
        return Modal.Crear({
            id: 'modal-confirmar',
            mensaje: mensaje,
            tipo: 'CONFIRMACION',
            accion_positiva: {id: 'accion_positiva', nombre: 'Aceptar',    cb: (accion_positiva || function(el) {console.log(el.id); funcion_eliminar(accion, contador, rut, doi);}), tipo: 'primario'},
            accion_negativa: {id: 'accion_negativa', nombre: 'Cancelar',   cb: (accion_negativa || function(el) {console.log(el.id)}), tipo: null},
        }).mostrar();
    }
    
    Modal.ConfirmarEditarPub = function(mensaje, accion_positiva, accion_negativa, funcion_editar) {
        return Modal.Crear({
            id: 'modal-confirmar',
            mensaje: mensaje,
            tipo: 'CONFIRMACION',
            accion_positiva: {id: 'accion_positiva', nombre: 'Aceptar',    cb: (accion_positiva || function(el) {console.log(el.id); funcion_editar('');}), tipo: 'primario'},
            accion_negativa: {id: 'accion_negativa', nombre: 'Cancelar',   cb: (accion_negativa || function(el) {console.log(el.id)}), tipo: null},
        }).mostrar();
    }    

    Modal.ConfirmarAgregarPub = function(mensaje, accion_positiva, accion_negativa, funcion_agregar) {
        return Modal.Crear({
            id: 'modal-confirmar',
            mensaje: mensaje,
            tipo: 'CONFIRMACION',
            accion_positiva: {id: 'accion_positiva', nombre: 'Aceptar',    cb: (accion_positiva || function(el) {console.log(el.id); funcion_agregar();}), tipo: 'primario'},
            accion_negativa: {id: 'accion_negativa', nombre: 'Cancelar',   cb: (accion_negativa || function(el) {console.log(el.id)}), tipo: null},
        }).mostrar();
    }

    Modal.RenovarSesion = function(mensaje, accion_positiva, accion_negativa) {
        return Modal.Crear({
            id: 'modal-confirmar',
            mensaje: mensaje,
            tipo: 'CONFIRMACION',
            accion_positiva: {id: 'accion_positiva', nombre: 'Continuar Sesi\u00F3n',    cb: (accion_positiva || function(el) {console.log(el.id)}), tipo: 'primario'},
            accion_negativa: {id: 'accion_negativa', nombre: 'Cerrar Sesi\u00F3n',   cb: (accion_negativa || function(el) {console.log(el.id)}), tipo: null},
        }).mostrar();
    }

    Modal.ConfirmarForm = function(mensaje, form, accion_negativa) {
        return Modal.Crear({
            id: 'modal-confirmar',
            mensaje: mensaje,
            tipo: 'CONFIRMACION',
            accion_positiva: {id: 'accion_positiva', nombre: 'Aceptar',    cb: function(el) {console.log(el.id); if (form) form.submit(); }, tipo: 'primario'},
            accion_negativa: {id: 'accion_negativa', nombre: 'Cancelar',   cb: (accion_negativa || function(el) {validar(form); console.log(el.id)}), tipo: null},
        }).mostrar();
    }

    Modal.Progreso = function (mensaje, accion_negativa) {
        return Modal.Crear({
            id: 'modal-progreso',
            mensaje: mensaje,
            tipo: 'PROGRESO',
            accion_negativa: {id: 'accion_negativa', nombre: 'Cancelar',   cb: (accion_negativa || function(el) {console.log(el.id)}), tipo: null},
        }).mostrar();
    }

    Modal.ProgresoAjax = function (mensaje, cb) {
       return Modal.Crear({
           id: 'modal-progreso-ajax',
           mensaje: 'Por favor espere mientras se cargan los resultados.',
           tipo: 'PROGRESOAJAX',
           // accion_primaria: {id: 'accion_primaria', nombre: 'Cancelar', cb: cancelar_llamado_ajax, tipo: 'primario'},
           // acciones: [
           // 	{id: 'accion_negativa', nombre: 'Cerrar', cb: function() {ajax.abort();}, tipo: null}
           // ]
       }).mostrar();
   }

    Modal.ProgresoAjaxMensaje = function (mensaje, cb) {
        return Modal.Crear({
            id: 'modal-progreso-ajax',
            mensaje: mensaje,
            tipo: 'PROGRESOAJAX',
            // accion_primaria: {id: 'accion_primaria', nombre: 'Cancelar', cb: cancelar_llamado_ajax, tipo: 'primario'},
            // acciones: [
            // 	{id: 'accion_negativa', nombre: 'Cerrar', cb: function() {ajax.abort();}, tipo: null}
            // ]
        }).mostrar();
    }


    Modal.Crear = function (opciones) {
        // Cerrar modal activo si existe
        if (Modal.instancia !== null) {
            Modal.Cerrar();
        }

        var modal = new Modal();

        // Cargar y verificar opciones
        modal.cargarOpciones(opciones);

        // Crear estructura HTML
        var nodo = modal.crearNodoModal();

        // Insertar HTML al final del body
        var body = document.getElementsByTagName('BODY')[0];
        body.appendChild(nodo);

        // Enganchar con A11y
        modal.a11y = new A11yDialog(nodo, document.getElementById('container'));

        modal.a11y.on('show', function (dialogEl, event) {
            Modal.instancia.nodo.classList.add('show');
        });

        modal.a11y.on('hide', function (dialogEl, event) {
            Modal.instancia.event = event;
            Modal.instancia.nodo.classList.remove('show');
            setTimeout(function() {
                // if (Modal.instancia.event) {
                // SE MODIFICA PARA VERIFICAR QUE VENGA CON BOTONES
                if (Modal.instancia && Modal.instancia.event) {
                    var id_boton = Modal.instancia.event.target.id;
                    Modal.instancia.fire(id_boton);
                }
                Modal.Cerrar();
            }, 500);
        });

        Modal.instancia = modal;
        return Modal.instancia;
    }

    Modal.Cerrar = function() {
        if (Modal.instancia === null) {
            return;
        }

        // Enganchar con A11y
        Modal.instancia.a11y.destroy();

        var nodo = document.getElementById(Modal.instancia._opciones.id);
        var body = document.getElementsByTagName('BODY')[0];
        body.removeChild(nodo);

        delete Modal.instancia;
        Modal.instancia = null;
    }

    Modal.prototype.log = function(msg) {
        if (Modal.DEBUG === true) {
            console.log('Modal: ' + msg);
        }
    }

    Modal.prototype.warn = function(msg) {
        if (Modal.DEBUG === true) {
            console.warn('Modal: ' + msg);
        }
    }

    Modal.prototype.error = function(msg) {
        if (Modal.DEBUG === true) {
            console.error('Modal: ' + msg);
        }
    }

    Modal.prototype.cargarOpciones = function (opciones) {
        // Combinar objeto de opciones
        for (var attributo in opciones) {
            if (this._opciones.hasOwnProperty(attributo)) {
                this._opciones[attributo] = opciones[attributo];
            }
            else {
                this.warn('Parámetro `' + attributo + '` desconocido en objeto de opciones.');
            }
        }

        this.verificarOpciones();
    }

    Modal.prototype.verificarOpciones = function () {
        // Verificar opciones requeridas
        var id = this.obtenerOpcionDefecto(this._opciones.id, '').toString().toLowerCase();
        if (id.length === 0) {
            this.warn('Parámetro `id` vacío.');
            id = 'modal';
        }
        this._opciones.id = id;

        var mensaje = this.obtenerOpcionDefecto(this._opciones.mensaje, '').toString();
        if (mensaje.length === 0) {
            this.warn('Parámetro `mensaje` vacío.');
            mensaje = 'Información';
        }
        this._opciones.mensaje = mensaje;

        // Rellenar título según el tipo si no está definido
        if (this._opciones.titulo.length === 0) {
            this._opciones.titulo = Modal.tipos[this._opciones.tipo].titulo;
        }
    }

    Modal.prototype.crearNodoModal = function () {
        var opciones = this._opciones;

        // Contenedor modal
        var modal_div = document.createElement('DIV');
        modal_div.className = 'fixed-top container container-modal p-0 fade';
        modal_div.id = opciones.id;
        modal_div.setAttribute('aria-hidden', 'true');

        // Overlay
        var modal_overlay = document.createElement('DIV');
        modal_overlay.className = 'modal-backdrop show';
        modal_overlay.setAttribute('tabindex', -1);
        modal_div.appendChild(modal_overlay);

        // Contenido
        var modal_contenido = this.crearContenidoModal();
        modal_div.appendChild(modal_contenido);

        this.nodo = modal_div;

        return this.nodo;
    }

    Modal.prototype.crearContenidoModal = function () {
        var opciones = this._opciones;

        var contenido = document.createElement('DIV');
        contenido.className = 'col-xl-12 col-md-8 col-lg-10 mx-md-auto p-0 border-0 card shadow card-modal';
        contenido.setAttribute('role', 'alertdialog');

        // Construir título
        var id_titulo = opciones.id + '-label';
        var titulo = document.createElement('H5');
        titulo.innerText = opciones.titulo;
        titulo.id = id_titulo;
        titulo.className = 'card-header m-0';
        // Agregar clases extra según el tipo de pensaje
        titulo.className += ' ' + Modal.tipos[this._opciones.tipo].bg + ' ' + Modal.tipos[this._opciones.tipo].text;
        contenido.appendChild(titulo);
        contenido.setAttribute('aria-labelledby', id_titulo);

        // Contenedor para cuerpo del mensaje
        var card_body = document.createElement('DIV');
        card_body.className = 'card-body';
        // Agregar clase extra según el tipo de pensaje
        card_body.className += ' ' + Modal.tipos[this._opciones.tipo].class;

        // Construir mensaje principal
        var id_mensaje = opciones.id + '-desc';
        var mensaje = document.createElement('P');
        mensaje.innerHTML = opciones.mensaje;
        mensaje.id = id_mensaje;
        mensaje.className = 'card-text';
        contenido.setAttribute('aria-describedby', id_mensaje);
        card_body.appendChild(mensaje);

        // Agregar detalle si existe
        if (this._opciones.detalles.length > 0) {
            var detalle = document.createElement('P');
            detalle.innerHTML = this._opciones.detalles;
            detalle.className = 'card-text';
            card_body.appendChild(detalle);
        }

        // Agregar los botones de acción
        var acciones_tipo = this.construirAccionesTipo();
        this._opciones.acciones = (acciones_tipo)  ? this._opciones.acciones.concat(acciones_tipo) : this._opciones.acciones;

        if (this._opciones.acciones.length > 0) {

            this._opciones.acciones.forEach(function(accion) {
                var boton = document.createElement('A');
                boton.innerText = accion.nombre;
                boton.id = accion.id;
                boton.className = 'btn mr-2';

                if (accion.tipo && (accion.tipo === 'primario')) {
                    boton.className += ' btn-primary';
                }
                else if (accion.tipo && (accion.tipo === 'danger')) {
                    boton.className += ' btn-danger';
                }
                else {
                    boton.className += ' btn-secondary';
                }

                boton.setAttribute('role', 'button');
                boton.setAttribute('href', '#' + opciones.id);
                boton.setAttribute('data-a11y-dialog-hide', true);
                card_body.appendChild(boton);
            });

        }

        contenido.appendChild(card_body);

        return contenido;
    }

    Modal.prototype.construirAccionesTipo = function () {
        switch(this._opciones.tipo) {
            case 'INFORMACION' : {
                return [this._opciones.accion_primaria];
                break;
            }

            case 'CONFIRMACION' : {
                return [
                    this._opciones.accion_positiva,
                    this._opciones.accion_negativa
                ];
                break;
            }

            case 'ALERTA' : {
                return [this._opciones.accion_primaria];
                break;
            }

            case 'ERROR' : {
                return [this._opciones.accion_primaria];
                break;
            }

            case 'PROGRESO' : {
                return [this._opciones.accion_negativa];
                break;
            }
        }

        return null;
    }

    Modal.prototype.fire = function(id_boton) {
        if (id_boton === undefined || id_boton === null) {
            return;
        }

        this._opciones.acciones.forEach(function(accion) {
            if (accion.id === id_boton && accion.cb instanceof Function) {
                accion.cb(document.getElementById(id_boton));
            }
        });
    }

    Modal.prototype.obtenerOpcionDefecto = function (valor, valor_defecto) {
        return (valor === undefined || valor === null) ? valor_defecto : valor;
    }

    Modal.prototype.mostrar = function() {
        this.a11y.show();
        return this;
    }

    Modal.prototype.ocultar = function() {
        this.a11y.hide();
        return this;
    }

    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = Modal;
    } else if (typeof define === 'function' && define.amd) {
        define('Modal', [], function() {
            return Modal;
        });
    } else if (typeof global === 'object') {
        global.Modal = Modal;
    }
})(typeof global !== 'undefined' ? global : window);
