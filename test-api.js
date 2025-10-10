// Test file untuk API endpoints
console.log('Testing API endpoints...')

const BASE_URL = 'http://localhost:3000/api'

// Test SDGs endpoints
async function testSDGSAPI() {
  console.log('=== Testing SDGs API ===')
  
  try {
    // GET all SDGs
    const response = await fetch(`${BASE_URL}/sdgs`)
    const data = await response.json()
    console.log('GET /api/sdgs:', data)
    
    if (data.success && data.data.length > 0) {
      // GET specific SDGs
      const firstSDG = data.data[0]
      const detailResponse = await fetch(`${BASE_URL}/sdgs/${firstSDG.id}`)
      const detailData = await detailResponse.json()
      console.log(`GET /api/sdgs/${firstSDG.id}:`, detailData)
    }
  } catch (error) {
    console.error('Error testing SDGs API:', error)
  }
}

// Test Kecamatan endpoints
async function testKecamatanAPI() {
  console.log('=== Testing Kecamatan API ===')
  
  try {
    const response = await fetch(`${BASE_URL}/kecamatan`)
    const data = await response.json()
    console.log('GET /api/kecamatan:', data)
  } catch (error) {
    console.error('Error testing Kecamatan API:', error)
  }
}

// Test Inovator endpoints
async function testInovatorAPI() {
  console.log('=== Testing Inovator API ===')
  
  try {
    const response = await fetch(`${BASE_URL}/inovator`)
    const data = await response.json()
    console.log('GET /api/inovator:', data)
  } catch (error) {
    console.error('Error testing Inovator API:', error)
  }
}

// Test Inovasi endpoints
async function testInovasiAPI() {
  console.log('=== Testing Inovasi API ===')
  
  try {
    const response = await fetch(`${BASE_URL}/inovasi`)
    const data = await response.json()
    console.log('GET /api/inovasi:', data)
  } catch (error) {
    console.error('Error testing Inovasi API:', error)
  }
}

// Test Dashboard stats
async function testDashboardAPI() {
  console.log('=== Testing Dashboard API ===')
  
  try {
    const response = await fetch(`${BASE_URL}/dashboard/stats`)
    const data = await response.json()
    console.log('GET /api/dashboard/stats:', data)
  } catch (error) {
    console.error('Error testing Dashboard API:', error)
  }
}

// Run all tests
async function runAllTests() {
  await testSDGSAPI()
  await testKecamatanAPI()
  await testInovatorAPI()
  await testInovasiAPI()
  await testDashboardAPI()
  console.log('=== All tests completed ===')
}

// For Node.js environment
if (typeof window === 'undefined') {
  // Use node-fetch if available
  const nodeFetch = require('node-fetch')
  global.fetch = nodeFetch
}

// Run tests
runAllTests()