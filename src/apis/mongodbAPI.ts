// For mongoDB APIs
// users
export const mongoBaseUrl: string = process.env.BACKEND_URL || 'http://192.168.0.112:5050'

export const dbUsersRequest: string = mongoBaseUrl + '/users'
export const userInfoRequest: string = mongoBaseUrl + '/users/{userId}'

// shows
export const dbShowsRequest: string = mongoBaseUrl + '/shows'
// progress
export const dbHistoryRequest: string = mongoBaseUrl + '/progress'
export const deleteHistoryEntry: string = mongoBaseUrl + '/progress/{_id}'
