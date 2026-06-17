//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

//Apprenticeship units

router.get('/apprenticeship-units/apprenticeship-unit-list', function (req, res) {

  // Store current banner state
  const showBanner = req.session.data['showBanner']

  // Immediately reset it
  req.session.data['showBanner'] = false

  // Render page with the value
  res.render('apprenticeship-units/apprenticeship-unit-list', {
    showBanner: showBanner
  })
})


// Add restricted course to course list
const defaultCourses = require('./data/courses')

// Show course list (alphabetical, combined)
router.get('/restricted-courses', function (req, res) {

  const addedCourses = req.session.data.addedCourses || []

  // Combine default + added
  const allCourses = [...defaultCourses, ...addedCourses]

  // Sort alphabetically
  allCourses.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })

  res.render('restricted-courses', {
    courses: allCourses
  })
})


// Add restricted course to course list
const defaultProviders = require('./data/providers')

// Show course list (alphabetical, combined)
router.get('/individual-course', function (req, res) {

  const addedProviders = req.session.data.addedProviders || []

  // Combine default + added
  const allProviders = [...defaultProviders, ...addedProviders]

  // Sort alphabetically
  allProviders.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })

  res.render('individual-course', {
    courses: allProviders
  })
})

// Handle adding a new course
// router.post('/restrict-new-course', function (req, res) {

  // ✅ Ensure session data is always an object
//   if (!req.session.data || typeof req.session.data !== 'object') {
//     req.session.data = {}
//   }

//   const selectedTitle = req.body.course

//   // ✅ Ensure addedCourses exists and is an array
//   if (!Array.isArray(req.session.data.addedCourses)) {
//     req.session.data.addedCourses = []
//   }

//   const addedCourses = req.session.data.addedCourses

//   const foundCourse = defaultCourses.find(c => c.title === selectedTitle)

//   // Combine titles safely
//   const allTitles = [
//     ...defaultCourses.map(c => c.title),
//     ...addedCourses.map(c => c.title)
//   ]

//   // Prevent duplicates + only add valid course
//   if (foundCourse && !allTitles.includes(selectedTitle)) {
//     addedCourses.push({
//       ...foundCourse,
//       isNew: true
//     })
//   }

//   res.redirect('/restricted-courses')
// })