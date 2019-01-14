import _ from 'lodash'
import {number} from "prop-types";


export const refactorParaLength = (content:string, length :number = 45):string =>
 content.length > length ? content.slice(0, length).concat('...') : content

interface routePath {
    label: string,
    link: string,
}
export const getRoutePath = (url :string):Array<routePath> => {
    let result :Array<routePath> = []
    let urlArray = url.split('/')
    console.log('------------------------------')
    console.log(urlArray)
    urlArray.map((n :string, i:number) => {
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
    console.log(result)
    return result


}

export const redirectUrl = (url :string, history :any, reload:boolean = true):void => (reload) ? window.location.href = url : history.push(url)

