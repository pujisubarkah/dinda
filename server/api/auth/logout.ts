// POST /api/auth/logout - User logout (optional, mainly for client-side token cleanup)
export default defineEventHandler(async (event) => {
  const method = getMethod(event)

  if (method !== 'POST') {
    throw createError({
      statusCode: 405,
      statusMessage: 'Method not allowed'
    })
  }

  try {
    // In JWT-based auth, logout is mainly handled on client-side by removing the token
    // This endpoint is mainly for consistency and any server-side cleanup if needed
    
    return {
      success: true,
      message: 'Logout successful'
    }
  } catch (error: any) {
    throw createError({
      statusCode: 500,
      statusMessage: 'Logout failed',
      data: error
    })
  }
})