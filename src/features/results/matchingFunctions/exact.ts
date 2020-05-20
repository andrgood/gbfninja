function exact<T> (a: T) {
    return function(b: T) {
        return a === b
    }
}

export { exact }