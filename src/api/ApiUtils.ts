import _ from 'lodash'
import history from 'history'
import {Clickable, RoutePath, Tag, VariantOptions} from "../interfaces/client/Common";
import {Product, Variant} from "../interfaces/server/Product";
import {Section} from "../interfaces/server/Feed";
import {Image} from "@material-ui/icons";

export const refactorParaLength = (content: string, length: number = 45): string =>
    content.length > length ? content.replace(/(<([^>]+)>)/ig,"").slice(0, length).concat('...') : content

export const htmlToPlainText = (context:string):string=> context.replace(/(<([^>]+)>)/ig,"")
export const refactorTextLength = (content: string, length: number = 20): string =>
    content.length > length ? content.slice(0, length).concat('...') : content

export const refactorTitle = (content: string, length: number = 22): string =>
    content.length > length ? content.slice(0, length).concat('...') : content

export const getRoutePath = (url: string): Array<RoutePath> => {
    let result: Array<RoutePath> = []
    let urlArray = url.split('/')
    urlArray.map((n: string, i: number) => {
        switch (true) {
            case n === "":
                if (i === 0) result.push(
                    {
                        label: 'home',
                        link: '/',
                    }
                )
                break

            case n === 'feeds':
                result.push({
                    label: n,
                    link: '/feeds',

                })
                break
            case n === 'products':
                result.push({
                    label: n,
                    link: '/products'
                })
                break
            case n === 'checkout':
                result.push({
                    label: n,
                    link: '/checkout'
                })
                break
            case n === 'shoppingCart'.toLowerCase():
                result.push({
                    label: n,
                    link: '/shoppingCart'
                })
                break
            case !isNaN(parseInt(n)):
                if (url[i - 1] === 'products')
                    result.push({

                            label: 'singleProduct',
                            link: '/products/' + n
                        }
                    )
                if (url[i - 1] === 'feeds')
                    result.push({

                            label: 'currentFeeds',
                            link: '/feeds/' + n
                        }
                    )
        }

    })
    return result
}

export const redirectUrl = (url: string, history: history.History, reload: boolean = false) => (reload) ? window.location.href = url : history.push(url)


export const numberToPagination = (length: number, cb: Function): Array<Clickable> => {
    let result: Array<Clickable> = []
    let itemsPerPage = 9
    if (length === itemsPerPage) {
        return [{
            label: '1 - 9',
            onClick: () => cb('1 - 9')

        }]
    }
    if (length > itemsPerPage) {
        new Array(Math.floor(length / itemsPerPage)).fill(1).map(
            (n, i) => {
                let label = (1 + i * itemsPerPage) + ' - ' + ((i + 1) * itemsPerPage)
                result.push({
                    label: label,
                    onClick: () => cb(label)

                })
            }
        )
    }

    if (length % itemsPerPage !== 0) {
        let label = (length - length % itemsPerPage + 1) + ' - ' + length
        result.push({
            label: label,
            onClick: () => cb(label)
        })
    }
    return result

}


export const arrayToFilter = (array: Array<any>, cb: Function): Array<Clickable> =>
    array.map((n, i) => ({label: n, onClick: () => cb(n)}))

//stack overflow
export const formatMoney = (n: any, c = 2, d = '.', t = ','): string => {
    let s: string = n < 0 ? "-" : ""
    let i: string = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c)))
    let j: number = i.length > 3 ? i.length % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - parseInt(i)).toFixed(c).slice(2) : "");
}


export const getTagsCountsArray = (products: Array<Product> | null, onClick: Function): Array<Clickable> => {
    let tagsArray: Array<string> = []
    if (!products) return []
    products.map(n => (n.tags.length > 0) ? n.tags.map((k: string): void => {
        tagsArray.push(k)
    }) : null)
    let tagsObject = _.countBy(tagsArray)
    let tagsName = Object.keys(tagsObject)
    let tagsCount = Object.values(tagsObject)
    let result: Array<Clickable> = [{
        label: 'all (' + products.length + ') ',
        onClick: () => onClick(null, products.length)
    }]
    tagsName.map(
        (n, i) => result.push({
            label: n + ' (' + tagsCount[i] + ') ',
            value: n,
            onClick: () => onClick(n, tagsCount[i])
        })
    )
    return result

}

//todo('need to rebuild")

export const getVariantOptions = (variants: Array<Variant>): Array<VariantOptions> => {
    let variantOverview:any = []
    variants.map(option => {
        option.description.split(',').forEach((opt) => {
            let splitOpt: Array<string> = opt.split(':')
            variantOverview[splitOpt[0]] = variantOverview[splitOpt[0]] || []
            variantOverview[splitOpt[0]].indexOf(splitOpt[1]) < 0 && variantOverview[splitOpt[0]].push(splitOpt[1])
        })
    })
    return variantOverview
}

export const isImgOnlySections = (sections: Array<Section>) => (
    sections && sections[0].medias[0] && sections[0].medias[0].ext !== 'mp4'
    && (sections[0].medias[0].ext.indexOf('product') === -1
    ))
export const handleImgValid = (img: any): string => img ? img.url ? img.url : img : '/notFound/not-found-image.jpg'
export const stringToTags = (string?:string):Array<Tag> => (string) ? (string.search(',') !== -1) ? _.uniq(_.split(string, ',')).filter(k => k !== '')
    .map((n:any, i) =>
    n = {
        label: n,
        value: n,
    }) : [{label: string, value: string,}] : []

export const formatExpiryDate=(date:string):string=>(date&&date.length===4)?date.slice(0,2).concat('/',date.slice(2,4)):date
export const CounterValidation = (num:number):number=> (num >0) ?num:1
