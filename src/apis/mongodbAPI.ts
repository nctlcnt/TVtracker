// For mongoDB APIs
// users
export const mongoBaseUrl: string = process.env.BACKEND_URL || 'http://localhost:5050'
export const getUsers: string = mongoBaseUrl + '/users'
export const getUserInfo: string = mongoBaseUrl + '/users/{userId}'

// shows
export const getShows: string = mongoBaseUrl + '/shows'

// progress
export const getProgressUrl: string = mongoBaseUrl + '/progress'
