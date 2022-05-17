/**********************************
 * calendario
 ********************************/
document.addEventListener('DOMContentLoaded', function () {
	// fecthData()
	let formCalendar = document.querySelector('.formCalendar')
	let calendarEl = document.getElementById('calendar')
	let calendar = new FullCalendar.Calendar(calendarEl, {
		initialView: 'dayGridMonth',
		locale : 'es',
		buttonText: {
			prev: 'Ant',
			next: 'Sig',
			today: 'Hoy',
			month: 'Mes',
			week: 'Semana',
			day: 'Día',
			list: 'Agenda',
		},
		headerToolbar: {
			left: 'prev, next, today',
			center: 'title',
			right: 'dayGridMonth, timeGridWeek, listWeek'
		},
		events: 'php/listar.php',
		editable: true,
		dateClick: function (info) {
			// formCalendar.reset()
			document.querySelector('#idEvent').value = ''
			let txtTituloEvento = document.querySelector('#txtTituloEvento')
			let title_box = document.querySelector('.title-box').textContent = 'Agregar nuevo evento'
			let txtInicio = document.querySelector('#txtInicio').value = info.dateStr
			document.querySelector('.btn-guardar').textContent = 'Agregar'
			document.querySelector('.btn-delete').style.display = 'none'
		},
		eventClick: function (info) {
			formCalendar.reset()
			let title_box = document.querySelector('.title-box').textContent = 'Editar evento'
			document.querySelector('#idEvent').value = info.event.id
			document.querySelector('.btn-guardar').textContent = 'Editar'
			document.querySelector('.btn-delete').style.display = 'block'
			document.querySelector('#txtTituloEvento').value = info.event.title
			document.querySelector('#txtInicio').value = info.event.startStr
			document.querySelector('#txtColor').value = info.event.backgroundColor
		},
		eventDrop: function (info) {
			const idEvent = info.event.id
			const start = info.event.startStr
			const formdata = new FormData()
			formdata.append('accion','drop')
			formdata.append('idEvent',idEvent)
			formdata.append('start',start)
			fetch('php/dataEvents.php', {
				method: 'POST',
				body: formdata,
			})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				// console.log(data)
				if (data.status) {
					Toast.fire({
						icon: 'success',
						title: data.message
					})
					// fecthData()
					calendar.refetchEvents()
					formCalendar.reset()
				}else {
					Toast.fire({
						icon: 'success',
						title: data.message
					})
				}
			})
			.catch(function (err) {
				console.log(err)
			})
		}
	})
	calendar.render()

	if (document.querySelector('.btn-delete')) {
		document.querySelector('.btn-delete').addEventListener('click', () => {
			let txtTituloEvento = document.querySelector('#txtTituloEvento').value
			let txtInicio = document.querySelector('#txtInicio').value
			let txtColor = document.querySelector('#txtColor').value
			let idEvent = document.querySelector('#idEvent').value
			const formdata = new FormData(formCalendar);
			formdata.append('accion','delete');
			fetch('php/dataEvents.php', {
				method: 'POST',
				body: formdata,
			})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				// console.log(data)
				if (data.status) {
					Toast.fire({
						icon: 'success',
						title: data.message
					})
					// fecthData()
					calendar.refetchEvents()
					formCalendar.reset()
				} else {
					Toast.fire({
						icon: 'success',
						title: data.message
					})
				}
			})
			.catch(function (err) {
				console.log(err)
			})
		})
	}
	formCalendar.addEventListener('submit', function (e) {
		e.preventDefault()
		let txtTituloEvento = document.querySelector('#txtTituloEvento').value
		let txtInicio = document.querySelector('#txtInicio').value
		let txtColor = document.querySelector('#txtColor').value
	
		const formdata = new FormData(formCalendar)
		formdata.append('accion','agregar')
		fetch('php/dataEvents.php', {
			method: 'POST',
			body: formdata,
		})
			.then(function (response) {
				return response.json()
			})
			.then(function (data) {
				// console.log(data)
				if (data.status) {
					Toast.fire({
						icon: 'success',
						title: data.message
					})
					// fecthData()
					calendar.refetchEvents()
					formCalendar.reset()
				}else {
					Toast.fire({
						icon: 'success',
						title: data.message
					})
				}
			})
			.catch(function (err) {
				console.log(err)
			})
	})
})



const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
})
Toast.fire({
  icon: 'success',
  title: 'Success'
})

// funcion traer datos
function fecthData() {
	fetch('php/database.json')
	// fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
	// retornar el valor
		.then((res) => res.json())
		.then((data) => {
			// pasamos los datos a la funcion donde se muestra la imagen
			// funcion creada mas abajo
			let txtInicio = document.querySelector('#txtInicio')
			// console.log(data)
		})
}
