// User type
export type User = {
  id: number
  email: string
  firstName: string
  lastName: string
}

// AuthResponse Type
type AuthResponse = {
  message: string
  user: User
}

// SignUpInput type
export type SignUpInput = {
  email: string
  password: string
  firstName: string
  lastName: string
  birthdate: string
}

// helper function for POST calls
async function postJson<T>(url: string, body: unknown): Promise<T> {
  //response headers
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  const data = await res.json().catch(() => ({}))

  // error handling
  if (!res.ok) {
    const message = (data as { error?: string }).error
    throw new Error(message ?? `Request failed (${res.status})`)
  }

  return data as T
}

// login route
export function login(email: string, password: string) {
  return postJson<AuthResponse>('/api/login', { username: email, password })
}

// sign up route
export function signup(input: SignUpInput) {
  return postJson<AuthResponse>('/api/signup', input)
}
