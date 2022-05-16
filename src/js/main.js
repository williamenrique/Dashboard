/*********************************
 * funcion nav ocultar         *
 * *******************************/
let show = document.querySelector('.show')
let section_nav = document.querySelector('.section-nav')
let main = document.querySelector('.main')
show.addEventListener('click', () => {
	section_nav.classList.toggle('nav-active')
	main.classList.toggle('nav-active')
	show.classList.toggle('arrow')
	if (show.classList.contains('arrow')) {
		let saveNav = localStorage.setItem('nav', 'true')
	} else {
		let saveNav = localStorage.setItem('nav', 'false')
	}
})
// acceder al elemto local
if (localStorage.getItem("nav") === 'true') {
	section_nav.classList.add('nav-active')
	main.classList.add('nav-active')
	show.classList.add('arrow')
} else {
	section_nav.classList.remove('nav-active')
	main.classList.remove('nav-active')
	show.classList.remove('arrow')
}
let show_menu = document.querySelector('.show_menu')
show_menu.addEventListener('click', () => {
	let section_nav = document.querySelector('.section-nav')
	let main = document.querySelector('.main')
	let show = document.querySelector('.show')
	section_nav.classList.toggle('nav-active')
	main.classList.toggle('nav-active')
	// show_menu.classList.toggle('arrow')
	show.classList.toggle('arrow')
})
/*********************************
 * Funciones desplegable  del menu*
 * *******************************/
let listElements = document.querySelectorAll('.button_click')

listElements.forEach(listElement => {
	listElement.addEventListener('click', () => {
		listElement.classList.toggle('arrow')
		let height = 0
		let menu = listElement.nextElementSibling //obtener el hermano adyacente
		// evaluamos el alto de los submenu dinamicamnete
		if (menu.clientHeight == 0) {
			height = menu.scrollHeight
		}
		// cambiar el valor del height
		menu.style.height = `${height}px`
	})
})

// habilitar y deshablitar el boton de confirmar
let btn_confirm = document.querySelector('.btn-confirm')
let confirmDel = document.querySelector('#confirmDel')
confirmDel.addEventListener('click', () => {
	if (confirmDel.checked) {
		btn_confirm.disabled = true
	} else {
		btn_confirm.disabled = false
	}
})
btn_confirm.addEventListener('click', () => {
	alert();
})
let hoy = new Date()
let fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds()

let date = new Date().toDateString();
document.querySelector('.time').innerHTML = hora
document.querySelector('.date').innerHTML = date

// mostrar y ocultar contenido en la simulacion de tabla
let box_cont = document.querySelectorAll('.box-cont')
let iconShow = document.querySelectorAll('.iconShow')

for (let i = 0; i < iconShow.length; i++){
	iconShow[i].addEventListener('click', () => {
		if (parseInt(box_cont[i].style.height)
			!= box_cont[i].scrollHeight) {
			box_cont[i].style.height = box_cont[i].scrollHeight + 'px'
			iconShow[i].classList.remove('bxs-plus-circle')
			iconShow[i].classList.add('bxs-minus-circle')
		} else {
			box_cont[i].style.height = '0px'
			iconShow[i].classList.remove('bxs-minus-circle')
			iconShow[i].classList.add('bxs-plus-circle')
		}
		for (let j = 0; j < box_cont.length; j++){
			if (j !== i){
				box_cont[j].style.height = '0px'
				iconShow[j].classList.remove('bxs-minus-circle')
				iconShow[j].classList.add('bxs-plus-circle')
			}
		}
	})
}

/**********************************
 * cargar la imagen para perfil
 ********************************/
let file = document.querySelector('#file')
let formData = new FormData()
if (document.querySelector('.search')) {
	let search = document.querySelector('.search')
	search.addEventListener('click', () => {
		document.querySelector('#file').click()
		file.value = ""
		createClearFormData()
	})
}

file.addEventListener('change', (e) => { 
	// msj.innerText = file.files[0].name;
	let thumbnail = document.createElement('div') // generar un elemento
	thumbnail.classList.add('thumbnail',0) // asignarle una clase y el id
	thumbnail.dataset.id = 0  //crear un atributo con dat.set y le asignamos el id
	thumbnail.setAttribute('style', `background-image : url(${URL.createObjectURL(file.files[0])})`)
	document.getElementById('preview-images').appendChild(thumbnail)
	createClose(0)
})

const createClearFormData = () => {
	// recorrer el formaData
	for (let key of formData.keys()) {
		//llamamos el formadata y le pasamos el delete con el key
		formData.delete(key)
		console.log(key)
	}
	// quitar todos los thumbnail
	document.querySelectorAll('.thumbnail').forEach((thumbnail) => {
		thumbnail.remove()
	})
}
// funcion para clrear el boton de cerrar la imagen
const createClose = (thumbnail_id) => {
	let closeButton = document.createElement('div')
	closeButton.classList.add('close-button')
	// closeButton.innerText = 'x'
	// despues de crear la funcion para cerrar
	document.getElementsByClassName(thumbnail_id)[0].appendChild(closeButton)
}
// agregamos al body y action de escucha al momento de cancelar la imagen
document.body.addEventListener('click', function (e) {
	if ( e.target.classList.contains('close-button') ) {
		e.target.parentNode.remove();
		formData.delete(e.target.parentNode.dataset.id)
		file.value = ""
	}
})
/***********************
 * funcion para subir 
 * imagen al servidor
 **********************/
let btnUpImg = document.querySelector('.btnUpImg')
let formImg = document.querySelector('.formImg')
btnUpImg.addEventListener('click', () => {
	if (file.files[0] == null) {
		notifi('Debe seleccionar una imagen', 'info');
		
	} else {
		// console.log(file.files[0].size)
		// console.log(file.files[0].type)
		/*************************************************
		* creamos el objeto de envio para tipo de navegador
		* hacer una validacion para diferentes navegadores y crear el formato de lectura
		* y hacemos la peticion mediante ajax
		* usando un if reducido creamos un objeto del contenido en(request)
		*****************************************************/
		let request = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
		let ajaxUrl = base_url + 'User/imgUp';
		//creamos un objeto del formulario con los Pass haciendo referencia a formData
		// let formData = new FormData()
		let formData = new FormData(formImg );
		//prepara los datos por ajax preparando el dom
		request.open('POST', ajaxUrl, true);
		//envio de datos del formulario que se almacena enla variable
		request.send(formData);
		//obtenemos los resultados y evaluamos
		request.onreadystatechange = function () {
			if (request.readyState == 4 && request.status == 200) {
				//obtenemos los datos y convertimos en JSON
				let objData = JSON.parse(request.responseText);
				//leemos el ststus de la respuesta
				if (objData.status) {
					notifi(objData.msg, 'info');
					// formImg.reset()
					// file.value = ""
					// createClearFormData()
				} else {
					notifi(objData.msg, 'error');
				}
			}
		}
	} 
})

/**********************************
 * 
 ********************************/