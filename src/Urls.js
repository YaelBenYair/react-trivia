export const URL_QUESTIONS = "https://the-trivia-api.com/api/questions?"
export const URL_CATEGORIES = "https://the-trivia-api.com/api/categories"
export let PARAMS = {
    limit: 5,
}
export function setParams(obj) {
    PARAMS = {
        limit: obj
    }
}