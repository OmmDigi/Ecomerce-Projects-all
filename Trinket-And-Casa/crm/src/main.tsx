import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import { Bounce, ToastContainer } from "react-toastify";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import MainPage from "./pages/MainPage.tsx";
import CheckAuthority from "./middleware/CheckAuthority.tsx";
import CategoryPage from "./pages/CategoryPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import { Provider } from "react-redux";
import { reduxStore } from "./redux/store.ts";
import SingleProduct from "./pages/SingleProduct.tsx";
import SingleDiscountPage from "./pages/SingleDiscountPage.tsx";
import DiscountPage from "./pages/DiscountPage.tsx";
import SubCategoryPage from "./pages/SubCategoryPage.tsx";
import OrderListingPage from "./pages/OrderListingPage.tsx";
import SingleOrderPage from "./pages/SingleOrderPage.tsx";
import ReviewsList from "./pages/ReviewsList.tsx";
// import DemoWebHook from "./pages/DemoWebHook.tsx";
import RecipientPage from "./pages/RecipientPage.tsx";

const router = createBrowserRouter([
  {
    id: "1",
    path: "/",
    element: (
      <CheckAuthority>
        <MainPage />
      </CheckAuthority>
    ),
    children: [
      {
        id: "1-12",
        path: "",
        element: <CategoryPage />,
      },
      {
        id: "1-1",
        path: "categories",
        element: <CategoryPage />,
      },
      {
        id: "1-2",
        path: "sub-categories",
        element: <SubCategoryPage />,
      },
      {
        id: "1-3",
        path: "products",
        element: <ProductsPage />,
      },
      {
        id: "1-4",
        path: "products/:id",
        element: <SingleProduct />,
      },
      {
        id: "1-5",
        path: "discount",
        element: <DiscountPage />,
      },
      {
        id: "1-6",
        path: "discount/:id",
        element: <SingleDiscountPage />,
      },
      {
        id: "1-7",
        path: "orders",
        element: <OrderListingPage />,
      },
      {
        id: "1-8",
        path: "orders/:id",
        element: <SingleOrderPage />,
      },
      {
        id: "1-9",
        path: "reviews",
        element: <ReviewsList />,
      },
      {
        id: "1-10",
        path: "recipient",
        element: <RecipientPage />,
      },
      // {
      //   id: "1-11",
      //   path: "demo-webhook",
      //   element: <DemoWebHook />,
      // },
      // {
      //   id : "1-4",
      //   path : "media-gallery",
      //   element : <MediaGallery asChooser={false} />
      // },
      // {
      //   id : "1-5",
      //   path : "contact-list",
      //   element : <InquiryListPage />
      // }
    ],
  },
  {
    id: "2",
    path: "/login",
    element: <LoginPage />,
  },
]);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      // refetchOnMount: false,
      retry: false,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <QueryClientProvider client={queryClient}>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
);
