export class CProductModel {
    // id: number = 0;
    productName: string;
    quantity: number;
    price: number;
}

export interface IProductModel {
    // id: number;
    name: string;
    description: string;
    price: number;
    image_link: string;
    is_published: any;
}

export interface IUserModel {
    email: string;
    password: string;
}

