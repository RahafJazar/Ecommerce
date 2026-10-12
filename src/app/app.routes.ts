import { Routes } from '@angular/router';

export const routes: Routes = [
    // one layout -> no nesting
    {
        path: '',
        title: 'AldoraCart | Home',
        loadComponent: () =>
            import('./features/home/home.component').then(c => c.HomeComponent)
    },
    {
        path: 'categories',
        title: 'AldoraCart | Categories',
        loadComponent: () =>
            import('./features/categories/categories.component').then(c => c.CategoriesComponent)
    },
    {
        path: 'brands',
        title: 'AldoraCart | Brands',
        loadComponent: () =>
            import('./features/brands/brands.component').then(c => c.BrandsComponent)
    },
    {
        path: 'details/:slug/:id',
        title: 'AldoraCart | Details',
        loadComponent: () =>
            import('./features/details/details.component').then(c => c.DetailsComponent)
    },
    {
        path: 'wishlist',
        title: 'AldoraCart | Wishlist',
        loadComponent: () =>
            import('./features/wishlist/wishlist.component').then(c => c.WishlistComponent)
    },
    {
        path: 'checkout',
        title: 'AldoraCart | Checkout',
        loadComponent: () =>
            import('./features/checkout/checkout.component').then(c => c.CheckoutComponent)
    },
    {
        path: 'cart',
        title: 'AldoraCart | Cart',
        loadComponent: () =>
            import('./features/cart/cart.component').then(c => c.CartComponent)
    },
    {
        path: 'login',
        title: 'AldoraCart | Login',
        loadComponent: () =>
            import('./features/login/login.component').then(c => c.LoginComponent)
    },
    {
        path: 'regester',
        title: 'AldoraCart | Register',
        loadComponent: () =>
            import('./features/register/register.component').then(c => c.RegisterComponent)
    },
    {
        path: 'forgotPassword',
        title: 'AldoraCart | Forgot Password',
        loadComponent: () =>
            import('./features/forgt-password/forgt-password.component').then(c => c.ForgtPasswordComponent)
    },
    {
        path: '**',
        title: 'AldoraCart | Page Not Found',
        loadComponent: () =>
            import('./features/notfound/notfound.component').then(c => c.NotfoundComponent)
    },
];