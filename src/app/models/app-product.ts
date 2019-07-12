
export class Product{
    key : string;
    title: string;
    price: number;
    category: string;
    imageUrl: string;

    constructor(key: string, val: any){
        this.key = key;
        this.instantiate(val);
    }
    
    private instantiate(val: any){
        this.title = val.title;
        this.price = val.price;
        this.category = val.category;
        this.imageUrl = val.imageUrl;
    }

}