import { google } from "@/utils/arctic"
import { cookies } from "next/headers"

export async function GET(request) {
  const url = new URL(request.url)
  const code = url.searchParams.get('code')
  
  const cookieStore = await cookies()
  const codeVerifier = cookieStore.get('codeVerifier')?.value
  
  if (!code || !codeVerifier) {
    return Response.redirect('/auth/login?error=missing_code')
  }

  try {
    const tokens = await google.validateAuthorizationCode(code, codeVerifier)
    // Handle successful authentication
    return Response.redirect('/dashboard')
  } catch (error) {
    console.error('OAuth error:', error)
    return Response.redirect('/auth/login?error=oauth_failed')
  }
}