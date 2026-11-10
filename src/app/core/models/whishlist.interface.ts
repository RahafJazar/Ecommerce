export interface GetWishlistResponse {
    status: string;
    count: number;
    data: WishlistProduct[];
}

export interface WishlistProduct {
    _id: string;
    id: string;
    title: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    sold: number;
    images: string[];
    imageCover: string;
    ratingsAverage: number;
    ratingsQuantity: number;
    createdAt: string;
    updatedAt: string;
    __v: number;
    priceAfterDiscount: number;
    category: WishlistCategory;
    brand: WishlistBrand;
    subcategory: WishlistSubcategory[];
}

export interface WishlistCategory {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface WishlistBrand {
    _id: string;
    name: string;
    slug: string;
    image: string;
}

export interface WishlistSubcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
}
////////////////////////////////////////////
export interface WishlistActionResponse {
    status: string;
    message: string;
    data: string[];
}