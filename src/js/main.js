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
// acceder al elemto localstore
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

// console.log('hoy es '+hoy)
console.log();


