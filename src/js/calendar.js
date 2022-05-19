/**********************************
 * calendario
 ********************************/
document.addEventListener('DOMContentLoaded', function () {
	document.querySelector('#txtInicio').value = hoy.toISOString().split('T')[0]
	document.querySelector('#txtFin').value = hoy.toISOString().split('T')[0]
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
		events: 'php/listarEvents.php',
		editable: true,
		dateClick: function (info) {
			// console.log(info)
			// formCalendar.reset()
			document.querySelector('#idEvent').value = ''
			let txtTituloEvento = document.querySelector('#txtTituloEvento')
			let title_box = document.querySelector('.title-box').textContent = 'Agregar nuevo evento'
			let txtInicio = document.querySelector('#txtInicio').value = info.dateStr
			document.querySelector('.btn-guardar').textContent = 'Agregar'
			document.querySelector('.btn-delete').style.display = 'none'
		},
		eventClick: function (info) {
			// console.log(info.event.endStr)
			// formClean()
			document.querySelector('.title-box').textContent = 'Editar evento'
			document.querySelector('#idEvent').value = info.event.id
			document.querySelector('.btn-guardar').textContent = 'Editar'
			document.querySelector('.btn-delete').style.display = 'block'
			document.querySelector('#txtTituloEvento').value = info.event.title
			document.querySelector('#txtInicio').value = info.event.startStr
			document.querySelector('#txtFin').value = info.event.endStr
			document.querySelector('#txtColor').value = info.event.backgroundColor
		},
		eventDrop: function (info) {
			// console.log(info)
			const idEvent = info.event.id
			const start = info.event.startStr
			const end = info.event.endtStr
			const formdata = new FormData()
			formdata.append('accion','drop')
			formdata.append('idEvent',idEvent)
			formdata.append('start',start)
			formdata.append('end',end)
			fetch('php/dataEvents.php', {
				method: 'POST',
				body: formdata,
			})
			.then( (response) => {
				return response.json()
			})
			.then( (data) => {
				// console.log(data)
				if (data.status) {
					notifi(data.message,'success')
					calendar.refetchEvents()
					formClean()
				} else {
					notifi(data.message,'error')
				}
			})
			.catch( (err) => {
				console.log(err)
			})
		}
	})
	calendar.render()
	/**********************************************
	 * // funcion para eliminar un evento
	 *********************************************/
	if (document.querySelector('.btn-delete')) {
		document.querySelector('.btn-delete').addEventListener('click', () => {
			// let txtTituloEvento = document.querySelector('#txtTituloEvento').value
			// let txtInicio = document.querySelector('#txtInicio').value
			// let txtColor = document.querySelector('#txtColor').value
			// let idEvent = document.querySelector('#idEvent').value
			const formdata = new FormData(formCalendar);
			formdata.append('accion','delete');
			fetch('php/dataEvents.php', {
				method: 'POST',
				body: formdata,
			})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				// console.log(data)
				if (data.status) {
					notifi(data.message, 'success')
					// document.querySelector('.btn-guardar').textContent = 'guardar'
					// document.querySelector('.btn-delete').style.display = 'none'
					calendar.refetchEvents()
					formClean()
				} else {
					notifi(data.message,'error')
				}
			})
			.catch((err) => {
				console.log(err)
			})
		})
	}
		/**********************************************
	 * // funcion para crear un evento
	 *********************************************/
	formCalendar.addEventListener('submit', (e) => {
		e.preventDefault()
		let txtTituloEvento = document.querySelector('#txtTituloEvento')
		// let txtInicio = document.querySelector('#txtInicio')
		// let txtColor = document.querySelector('#txtColor')
	
		const formdata = new FormData(formCalendar)
		formdata.append('accion','event')
		fetch('php/dataEvents.php', {
			method: 'POST',
			body: formdata,
		})
			.then((response) => {
				return response.json()
			})
			.then((data) => {
				if (data.status) {
					notifi(data.message,'success')
					calendar.refetchEvents()
					formClean()
				} else {
					notifi(data.message, 'error')
					txtTituloEvento.focus()
				}
			})
			.catch((err) => {
				console.log(err)
			})
	})
})


	/**********************************************
	 * limpiar form
	 *********************************************/
const formClean = () => {
	document.querySelector('#txtInicio').value = hoy.toISOString().split('T')[0]
	document.querySelector('#txtFin').value = hoy.toISOString().split('T')[0]
	document.querySelector('.title-box').textContent = 'Agregar Evento'
	document.querySelector('#txtTituloEvento').value = ''
	document.querySelector('#txtColor').value = '#283046'
	document.querySelector('.btn-guardar').textContent = 'Agregar'
	document.querySelector('.btn-delete').style.display = 'none'
}
	/**********************************************
	 * // notificacion
	 *********************************************/
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


const notifi = (title,icon) => {
	Toast.fire({
		icon: icon,
		title: title
	})
}
