import axios from "axios/index";

const sendGridBaseUrl = 'https://so2die-dev1228330.appspot.com'
//http://localhost:8080
//https://so2die-dev1228330.appspot.com
interface sendGrid {
    email: string
    name: string
    phone: number,
    company: string,

    invoiceAddress: string,

    deliveryAddress: string,
}

export interface RepairRequest extends sendGrid {

    modelType: string
    modelNumber: string
    yearOfPurchase: number
    repairDetail: string


}

export interface ProductDelivery extends sendGrid {

    cart: Array<SendGridCartItem>

}

export interface SendGridCartItem {
    model: string,
    brand?: string,
    price: number,
    qty: number
}

export interface RentalRequest extends sendGrid {

    productName: string,
}

const SendGrid = {
    sendRepairRequest: (repairRequest: RepairRequest) => axios.post(`${sendGridBaseUrl}/send/RepairRequest`, {
            email: 'auto@repairRequest.web',
            name: 'robot',
            clientEmail: repairRequest.email,
            clientName: repairRequest.name,
            modelType: repairRequest.modelType,
            modelNumber: repairRequest.modelNumber,
            yearOfPurchase: repairRequest.yearOfPurchase,
            repairDetail: repairRequest.repairDetail,
            clientPhone: repairRequest.phone,
            clientCompany: repairRequest.company,
            clientInvoiceAddress: repairRequest.invoiceAddress,
            clientDeliveryAddress: repairRequest.deliveryAddress,


        },
    ),
    sendRentalRequest: (rentalRequest: RentalRequest) => axios.post(`${sendGridBaseUrl}/send/rentalRequest`, {
            clientEmail: rentalRequest.email,
            email: 'auto@rentalRequest.web',
            name: 'robot',
            clientName: rentalRequest.name,
            clientPhone: rentalRequest.phone,
            clientProduct: rentalRequest.productName,
            clientCompany: rentalRequest.company,
            clientInvoiceAddress: rentalRequest.invoiceAddress,
            clientDeliveryAddress: rentalRequest.deliveryAddress,


        },
    ),
    sendProductDelivery: (productDelivery: ProductDelivery) => axios.post(`${sendGridBaseUrl}/send/productDelivery`, {
            clientEmail: productDelivery.email,
            email: 'auto@paymentRequest.web',
            name: 'robot',
            clientName: productDelivery.name,
            clientPhone: productDelivery.phone,
            cart: productDelivery.cart,
            clientCompany: productDelivery.company,
            clientInvoiceAddress: productDelivery.invoiceAddress,
            clientDeliveryAddress: productDelivery.deliveryAddress,
        },
    ),
};
export default SendGrid