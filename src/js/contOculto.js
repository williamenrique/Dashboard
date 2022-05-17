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