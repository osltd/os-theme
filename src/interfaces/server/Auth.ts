export enum ACCode {

    planA = "1230",
    planB = '0831',
    planC = '1973',
    planD = '2002',
    planE = '0310',
}

//
// a:每月最低消費$380免費打印彩色200張加黑白1500張,額外每張彩色$0.8,黑色 $0.08.
//
//     b:每月最低消費$450免費打印彩色200張加黑白1500張,額外每張彩色$0.8,黑色 $0.08.
//
//     c:每月最低消費$500免費打印彩色500張加黑白2000張,額外每張彩色$0.8,黑色 $0.08.
//
//     d:每月最低消費$198免費打印1500張,額外$0.08
//
// e:每月最低消費$250免費打印1500張,額外$0.08
export interface UserProfileDetail {
    id: number,
    updated_time: Date,
    status: "Active",
    tag: string,
    first_name: string,
    last_name: string,
    invoiceAddress: string,
    email: string,
    company: string,
    phone: string,
    aCCode: ACCode,
    quotationRecord: string,
    shoppingCart: string,
    deliveryAddress: string,
    order?: Array<{ id: string }>

}

export interface UserProfile {
    "total": 1,
    consumers: [UserProfileDetail]
}