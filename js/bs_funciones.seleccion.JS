//* ptdi.funciones.seleccion.js *//
//***********************************************************************************************//
function seleccionar_todos(total , combo) {

	if (combo.checked==false) {
		combo.checked = true;
	} else {
		for (var i = 0; i < combo.length; i++)
		combo[i].checked = true;
	}

	total.checked = true;
	total.value = 1;
}
//***********************************************************************************************//
function seleccionar_todos_grupo(formulario,combo) {

	if (combo.checked==false) {
		combo.checked = true;
	} else {
		for (var i = 0; i < combo.length; i++) {
			combo[i].checked = true;
			id = combo[i].value;
			id_name = 'check_enganches_corresponde_'+id+'[]'; 

			if( document.formulario.elements[id_name] != null) {
				combo2 = document.formulario.elements[id_name];
			}

			if (combo2.checked==false) {
				combo2.checked = true;

			} else {
				for (var j = 0; j < combo2.length; j++) {
				combo2[j].checked = true;
				} // end for
			} // end else
		} // end for
	} //end else
}
//**********************************************************************************************//
function seleccionar_todos_grupo_general(formulario,combo) {

	if (combo.checked==false) {
		combo.checked = true;
	} else {

		for (var i = 0; i < combo.length; i++) {
			combo[i].checked = true;
			id = combo[i].value;
			id_name = 'check_enganches_corresponde_'+id+'[]'; 
			if (document.formulario.elements[id_name] != null) {
				combo2 = document.formulario.elements[id_name];
			} else {
				id_name = 'check_enganches_nocorresponde_'+id+'[]';
				if (document.formulario.elements[id_name] != null) {
					combo2 = document.formulario.elements[id_name];
				}	
			}

			if (combo2.checked==false) {
				combo2.checked = true;
			} else {
				for (var j = 0; j < combo2.length; j++) {
					combo2[j].checked = true;
				}
	 		}
		} // end for
	} //end else
}
//**********************************************************************************************//
function seleccionar_ninguno_grupo(formulario, combo) {

	if (combo.checked==true) {
		combo.checked = false;
	} else {
		for (var i = 0; i < combo.length; i++) {
			combo[i].checked = false;
			id = combo[i].value;
			id_name = 'check_enganches_corresponde_'+id+'[]'; 
				
			if ( document.formulario.elements[id_name] != null) {
				combo2 = document.formulario.elements[id_name];
			} else {
				id_name = 'check_enganches_nocorresponde_'+id+'[]';

				if( document.formulario.elements[id_name] != null) {
					combo2 = document.formulario.elements[id_name];
				}	
			}
				
			if (combo2.checked==true) {
				combo2.checked = false;
			} else {

				for (var j = 0; j < combo2.length; j++) {
					combo2[j].checked = false;
				}
	 		}
		} // end for
	} //end else
}
//***********************************************************************************************//
function seleccionar_hijo(combo_padre,combo,id_combo_padre) {

	if (combo_padre[id_combo_padre].checked == true) {

		if(combo.checked==false){
			combo.checked = true;
		}

		for (var i = 0; i < combo.length; i++) {
			if(combo[i].checked == false) {
				combo[i].checked = true;
			}
		}
	
	} else {

		if(combo.checked==true){
			combo.checked = false;
		}

		for (var i = 0; i < combo.length; i++) {
			if(combo[i].checked == true) {
				combo[i].checked = false;
			}
		}
	}
}
//***********************************************************************************************//
function estado_padre(combo_padre,combo,id_combo_padre) {

	if (combo_padre[id_combo_padre].checked == false) {

		if(combo.checked==true){
			combo.checked = false;
		}

		for (var i = 0; i < combo.length; i++) {
			if (combo[i].checked == true) {
				combo[i].checked = false;
			}
		}
	}
}
//***********************************************************************************************//
function seleccionar_pagina(total, combo) {

	if (combo.checked==false) {
		combo.checked = true;
	} else {
		for (var i = 0; i < combo.length; i++) {
			combo[i].checked = true;
		}
	}

	total.checked = false;
	total.value = 0;
}
//***********************************************************************************************//
function seleccionar_ninguno(total, combo) {

	if (combo.checked==true) {
		combo.checked = false;
	} else {
		for (var i = 0; i < combo.length; i++) {
			combo[i].checked = false;
		}
	}

	total.checked = false;
	total.value = 0;
}
//***********************************************************************************************//
function seleccionar_invertir(total,combo) {

	if (combo.checked==false) {
		combo.checked = true;

	} else if (combo.checked==true) {
		combo.checked = false;
	}

	for (var i = 0; i < combo.length; i++) {
		
		if(combo[i].checked == false) {
			combo[i].checked = true;

		} else {
			combo[i].checked = false;
		}			
	}

	total.checked = false;
	total.value = 0;
}
//***********************************************************************************************//
function cambiar_usuario(formulario, nuevo_usuario) {
	formulario.id_usuario.value = nuevo_usuario;
}