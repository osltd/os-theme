export interface rentalTag {
    rental: 'copier' | 'printer'
    stock: '0'
    //options
    page: ['A3', 'A4']
    price: '200 per month'
//in detail page
    //ex 配件 ： 色帶，電源線，電腦線 =》 '配件'：'色帶'，'電源線'，'電腦線'
    anyOtherFeature: 'description of feature'


}


interface sellTag {
    sell: 'copier' | 'printer' | 'scanner' | 'fax' | 'toner' | 'parts' | string
}


interface notToner extends sellTag {
    stock: '0'
    page: ['A3', 'A4']
    price: '200 per month'
//in detail page
    //ex 配件 ： 色帶，電源線，電腦線 =》 in OCS category '配件'：'色帶'，'電源線'，'電腦線'
    anyOtherFeature: 'description of feature'
}


export interface TonerVariants {
    company: ['HP' | 'Canon' | 'Brother' | 'Samung' | 'Epson' | 'Xerox' | string]
    //suitable version MP10/155/110
    suitable: Array<string>
    pageCapacity: [string]
    color: [string]

}