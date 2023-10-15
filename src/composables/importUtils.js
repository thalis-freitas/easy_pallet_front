import { showError } from './useSweetAlert'

export function processFile(file, importFunction) {
  if (file) {
    const formData = new FormData()
    formData.append('file', file)

    importFunction(formData)
  } else {
    showError('Nenhum arquivo selecionado')
  }
}


