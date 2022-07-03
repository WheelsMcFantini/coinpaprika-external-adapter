const assert = require('chai').assert
const createRequest = require('../index.js').createRequest

describe('createRequest:', () => {
  const jobID = '1'

  // The successful calls run, but the unseccesful ones don't
  context('successful calls', () => {
    const requests = [
      { name: 'id not supplied', testData: { data: { token: 'btc-bitcoin' } } },
      { name: 'token', testData: { id: jobID, data: { token: 'btc-bitcoin' } } },
      { name: 'asset', testData: { id: jobID, data: { asset: 'btc-bitcoin' } } },
      { name: 'coin', testData: { id: jobID, data: { coin: 'btc-bitcoin' } } }
    ]

    requests.forEach(req => {
      it(`${req.name}`, (done) => {
        createRequest(req.testData, (statusCode, data) => {
          assert.equal(statusCode, 200)
          assert.equal(data.jobRunID, jobID)
          assert.isNotEmpty(data.data)
          assert.isAbove(Number(data.data.result.price), 0)
          assert.isAbove(Number(data.data.result.market_cap), 0)
          assert.isAbove(Number(data.data.result.volume_24h), 0)
          done()
        })
      })
    })
  })

  context('error calls', () => {
    const requests = [
      { name: 'empty body', testData: {} },
      { name: 'empty data', testData: { data: {} } },
      { name: 'unknown token', testData: { id: jobID, data: { token: 'not_real' } } }
    ]

    requests.forEach(req => {
      it(`${req.name}`, (done) => {
        createRequest(req.testData, (statusCode, data) => {
          assert.equal(statusCode, 500)
          assert.equal(data.jobRunID, jobID)
          assert.equal(data.status, 'errored')
          assert.isNotEmpty(data.error)
          done()
        })
      })
    })
  })
})
