export const refactorTextLength = content => (typeof content === 'string') ? content.length > 20 ? content.slice(0, 15).concat('...') : content : ''
export const refactorParaLength = content => (typeof content === 'string') ? content.length > 45 ? content.slice(0, 45).concat('...') : content : ''


export const formatMoney = (n, c = 2, d = '.', t = ',') => {
    let s = n < 0 ? "-" : ""
    let i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
    let j = i.length > 3 ? i.length % 3 : 0;

    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
}
export const arrayToPagination = (array, cb) => {
    let result = []
    console.log(array)
    array.map((n, i) => {
            let number = i + 1
            if (number % 3 === 0 && number !== 1) {
                let label = (number - 2) + ' - ' + number
                result.push({
                    label: label,
                    onClick: () => cb(label)

                })
            }
            if (number === array.length) {
                let label = (number - 2 + number % 3) + '-' + number
                result.push({
                    label: label,
                    onClick: () => cb(label)

                })
            }
        }
    )
    console.log(result)
    return result
}
