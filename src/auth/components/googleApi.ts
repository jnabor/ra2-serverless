export const getClientId = (url: string): string => {
  if (url.includes('http://localhost:3000')) {
    return '338916328700-q2k4fq1c3bno7sn6uo59rsqscdc3d9ig.apps.googleusercontent.com'
  } else {
    return ''
  }
}
