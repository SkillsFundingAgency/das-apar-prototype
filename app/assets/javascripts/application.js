//
// For guidance on how to add JavaScript see:
// https://prototype-kit.service.gov.uk/docs/adding-css-javascript-and-images
//

window.GOVUKPrototypeKit.documentReady(() => {

  //Apprenticeship course autocomplete
accessibleAutocomplete({
  element: document.querySelector('#autocomplete-container'),
  id: 'course-autocomplete',
  source: [
    'Academic professional (level 7)',
    'User researcher (level 4)',
    'Underkeeper (level 2)',
    'Electrical installation (level 3)',
    'Engineering technician (level 3)',
    'Dental nurse (level 3)',
    'Early years educator (level 3)',
    'Construction site supervisor (level 4)',
    'Associate project manager (level 4)',
    'Data engineer (level 4)',
    'Network Engineer (Level 4)',
    'Software Developer (Level 4)',
    'Digital Marketer (Level 3)',
    'Accounting Technician (Level 4)',
    'Laboratory Technician (Level 3)',
    'Healthcare Support Worker (Level 2)',
    'Chartered Surveyor (Level 6)',
    'Civil Engineer (Level 6)',
    'Registered Nurse (Level 6)',
    'Advanced Clinical Practitioner (Level 7)',
    'Domestic Heating Technician (Level 3)',
    'Solar PV installation and maintenance – Apprenticeship unit (level 3)',
  ],
  onConfirm: function (val) {
    document.querySelector('#selected-course').value = val
  }
})


  //Apprenticeship unit course autocomplete
accessibleAutocomplete({
  element: document.querySelector('#autocomplete-container-unit'),
  id: 'unit-autocomplete',
  source: [
    'AI leadership - AI adoption, procurement and governance - Apprenticeship unit (level 5)',
    'AI leadership - AI delivery and organisational transformation - Apprenticeship unit (level 5)',
    'AI leadership – AI strategy and opportunity - Apprenticeship unit (level 5)',
    'Electric vehicle (EV) charging point installation and maintenance – Apprenticeship unit (level 3)',
    'Mechanical fitting and assembly – Apprenticeship unit (level 2)',
    'Permanent modular building assembly – Apprenticeship unit (level 2)',
    'Solar PV installation and maintenance – Apprenticeship unit (level 3)',
    'Welding (mechanised) – Apprenticeship unit (level 2)'
  ],
  onConfirm: function (val) {
    document.querySelector('#selected-unit').value = val
  }
})


//pagination
document.addEventListener('DOMContentLoaded', function () {

  const items = document.querySelectorAll('.js-course-item')
  const paginationContainer = document.getElementById('pagination-list')

  const itemsPerPage = 10
  const totalPages = Math.ceil(items.length / itemsPerPage)

  let currentPage = 1

  function showPage(page) {
    currentPage = page

    items.forEach((item, index) => {
      const start = (page - 1) * itemsPerPage
      const end = start + itemsPerPage

      if (index >= start && index < end) {
        item.style.display = 'block'
      } else {
        item.style.display = 'none'
      }
    })

    renderPagination()
  }

  function renderPagination() {
    paginationContainer.innerHTML = ''

    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
      const li = document.createElement('li')
      li.classList.add('pagination__item')

      if (i === currentPage) {
        li.classList.add('pagination__item--active')
      }

      const link = document.createElement('a')
      link.href = '#'
      link.textContent = i

      link.addEventListener('click', function (e) {
        e.preventDefault()
        showPage(i)
      })

      li.appendChild(link)
      paginationContainer.appendChild(li)
    }

    // Next button
    if (currentPage < totalPages) {
      const li = document.createElement('li')
      li.classList.add('pagination__item', 'pagination__next')

      const link = document.createElement('a')
      link.href = '#'
      link.innerHTML = 'Next →'

      link.addEventListener('click', function (e) {
        e.preventDefault()
        showPage(currentPage + 1)
      })

      li.appendChild(link)
      paginationContainer.appendChild(li)
    }
  }

  // Initialise
  showPage(1)

})
})