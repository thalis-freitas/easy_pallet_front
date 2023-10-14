import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/src/sweetalert2.scss'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

export function showSuccess(title) {
  Toast.fire({
    icon: 'success',
    title: title
  })
}

export function showError(title) {
  Toast.fire({
    icon: 'error',
    title: title
  })
}

export function showConfirmation(text, action) {
  Swal.fire({
    title: 'Tem certeza?',
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sim, excluir!'
  }).then((result) => {
    if (result.isConfirmed) {
      action()
    }
  })
}

export function showSuccessfullyRemoved (text) {
  Swal.fire(
    'Removido!',
    text,
    'success'
  )
}
