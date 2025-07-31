import Adminpage from "../pages/Adminpage/Adminpage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetail from "../pages/ProductDetailPage/ProductDetail";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";
import UserProfile from "../pages/UserProfile/UserProfile";
import PaymentPage from "../pages/Paymentpage/PaymentPage";

const routes = [
    {
        path: '/',
        page: HomePage,
        isShowPage: true,
        isPrivate: false
    },
    {
        path: '/order',
        page: OrderPage,
        isShowPage: true,
        isPrivate: false
    },
    {
        path: '/product',
        page: ProductsPage,
        isShowPage: true,
        isPrivate: false
    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowPage: true,
        isPrivate: false
    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowPage: false,
        isPrivate: false
    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowPage: false,
        isPrivate: false
    },
    {
        path: '/product-details/:id',
        page: ProductDetail,
        isShowPage: true,
        isPrivate: false
    },
    {
        path: '/user-profile',
        page: UserProfile,
        isShowPage: true,
        isPrivate: false
    },
    {
        path: '/system/admin',
        page: Adminpage,
        isShowPage: true,
        isPrivate: true
    },
    {
        path: '/payment',
        page: PaymentPage,
        isShowPage: true,
    },
    {
        path: '/*',
        page: NotFoundPage,
        isShowPage: false,
        isPrivate: false
    }
]
export default routes
