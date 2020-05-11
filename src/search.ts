function mustSearch(terms) {
    console.log(terms)
}

function maySearch(terms) {
    console.log(terms)
}

function search(term: {name: string; value: any}, data: any[]): any[] {
    return data.filter(element => element[term.name] === term.value)
}

export { search, mustSearch, maySearch }