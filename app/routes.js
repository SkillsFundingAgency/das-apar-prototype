//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Add your routes here

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
