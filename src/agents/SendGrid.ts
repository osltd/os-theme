import axios from "axios/index";

interface sendGrid {
    email: string
    name: string
    phone: number,
    company: string,
}

export interface RepairRequest extends sendGrid {

    modelType: string
    modelNumber: string
    yearOfPurchase: number
    repairDetail: string


}


export interface RentalRequest extends sendGrid {

    productName: string,
    invoiceAddress: string,
    deliveryAddress: string,
}

const SendGrid = {
    sendRepairRequest: (repairRequest: RepairRequest) => axios.post(`http://localhost:8080/send/RepairRequest`, {
            email: 'auto@repairRequest.web',
            name: 'robot',

            clientEmail: repairRequest.email,
            clientName: repairRequest.name,
            modelType: repairRequest.modelType,
            modelNumber: repairRequest.modelNumber,
            yearOfPurchase: repairRequest.yearOfPurchase,
            repairDetail: repairRequest.repairDetail
        },
    ),
    sendRentalRequest: (rentalRequest: RentalRequest) => axios.post(`http://localhost:8080/send/rentalRequest`, {
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
};
export default SendGrid