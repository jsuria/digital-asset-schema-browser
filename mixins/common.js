
module.exports = {
    wordifyString(str) {
        const regex_space = /\s/gi
        return (str.replace(regex_space,'')).toLowerCase()
    },

    underscorifyString(str) {
        const regex_space = /\s/gi
        return (str.replace(regex_space,'_')).toLowerCase()
    },

    dedupeArray(arr) {
        const tmpSet = [...new Set(arr)]
        return Array.from(tmpSet)
    },

    contentIdHas(needle, haystack) {
        return haystack.includes(needle)
    }
}
