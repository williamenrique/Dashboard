/**********************************
 * calendario
 ********************************/
let formCalendar = document.querySelector('.formCalendar')
document.addEventListener('DOMContentLoaded', function () {
	// fecthData()
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
		events : 'php/listar.php',
		dateClick: function (info) {
			let txtTituloEvento = document.querySelector('#txtTituloEvento')
			let title_box = document.querySelector('.title-box').textContent = 'Agregar nuevo evento'
			let txtInicio = document.querySelector('#txtInicio').value = info.dateStr
			// let txtFinaliza = document.querySelector('#txtFinaliza')
		},
		eventClick: function (info) {
			document.querySelector('#idEvent').value = info.event.id
		}
	})
	calendar.render()
})

formCalendar.addEventListener('submit', function (e) {
	e.preventDefault()
	let txtTituloEvento = document.querySelector('#txtTituloEvento').value
	let txtInicio = document.querySelector('#txtInicio').value
	let txtColor = document.querySelector('#txtColor').value

	if (txtTituloEvento == '' || txtInicio == "" || txtColor == "") {
		
		Swal.fire('Aviso','todos los campos son requeridos','warning')
	} else {
		const formdata = new FormData(formCalendar);
		
		fetch('php/ajax.php?accion=agregar', {
			method: 'POST',
			body: formdata
		})
			.then(function (response) {
			return response.json()
			})
			.then(function (data) {
				// console.log(data)
				if (data.status) {
					alert(data.message)
					fecthData()
				} else {
					console.log(data.message)
				}
			})
			.catch(function (error) {
			console.log(error)
		})
	}
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
			console.log(data)
		})
}
