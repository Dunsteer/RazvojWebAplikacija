export interface Article {
    id: number;
    name: string;
    price: number;
    image: string;
    count:number;
}

export function createArticle(
    id: number = 0, name: string = "default", price: number = 0.0, image: string = "",count :number = 0
): Article {
    return {
        id,
        name,
        price,
        image,
        count
    };
}
