//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// go to correct course from list using the LARS code as the unique identifier
const courses = require('./data/courses')

router.get('/individual-course/:larsCode', function (req, res) {

  const course = courses.find(
    course => course.larsCode === req.params.larsCode
  )

  res.render('individual-course', {
    course
  })

})

//route users from marked for removal to keep course

// Show the confirmation page
router.get('/confirm-keep-course/:larsCode', function (req, res) {

  const course = courses.find(
    course => course.larsCode === req.params.larsCode
  )

  res.render('confirm-keep-course', {
    course
  })

})

// User confirms they want to keep the course
router.post('/confirm-keep-course/:larsCode', function (req, res) {

  const larsCode = req.params.larsCode

  if (!req.session.data.keptCourses) {
    req.session.data.keptCourses = []
  }

  if (!req.session.data.keptCourses.includes(larsCode)) {
    req.session.data.keptCourses.push(larsCode)
  }

  res.redirect('/individual-course/' + larsCode + '?success=true')

})

//route users from course to delete course
router.get('/confirm-delete-course/:larsCode', function (req, res) {

  const course = courses.find(
    course => course.larsCode === req.params.larsCode
  )

  res.render('confirm-delete-course', {
    course
  })

})

// User confirms they want to delete the course
router.post('/confirm-delete-course/:larsCode', function (req, res) {

  const larsCode = req.params.larsCode

  if (!req.session.data.deleteCourses) {
    req.session.data.deleteCourses = []
  }

  if (!req.session.data.deleteCourses.includes(larsCode)) {
    req.session.data.deleteCourses.push(larsCode)
  }

  req.session.data.courseDeleted = larsCode

  res.redirect('/manage-your-standards')
})

// //Apprenticeship units

// router.get('/apprenticeship-units/apprenticeship-unit-list', function (req, res) {

//   // Store current banner state
//   const showBanner = req.session.data['showBanner']

//   // Immediately reset it
//   req.session.data['showBanner'] = false

//   // Render page with the value
//   res.render('apprenticeship-units/apprenticeship-unit-list', {
//     showBanner: showBanner
//   })
// })


// show courses in manage your standards
const defaultCourses = require('./data/courses')

// Show course list (alphabetical, combined)
router.get('/manage-your-standards', function (req, res) {

  const addedCourses = req.session.data.addedCourses || []
  const deletedCourses = req.session.data.deleteCourses || []

  // Combine default + added
  const allCourses = [...defaultCourses, ...addedCourses]

  // Exclude Units and deleted courses
  const filteredCourses = allCourses.filter(course =>
    course.type !== 'Unit' &&
    !deletedCourses.includes(course.larsCode)
  )

  // Sort alphabetically
  filteredCourses.sort((a, b) => {
    return a.title.localeCompare(b.title)
  })

  res.render('manage-your-standards', {
    courses: filteredCourses,
    deletedLarsCode: req.session.data.courseDeleted
  })

  // Clear success message after displaying it once
  delete req.session.data.courseDeleted
})

// // show units in manage your apprenticeship units
router.get('/manage-your-apprenticeship-units', function(req, res) {

  const units = courses.filter(
    course => course.type === 'Unit'
  )

  res.render('manage-your-apprenticeship-units', {
    courses: units
  })

})