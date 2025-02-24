import FullLayout from "./layout/FullLayout.js";
import UserList from "./pages/users/UserList.js";
import CustomerList from "./pages/customers/CustomerList.js";
import ZoomList from "./pages/zoomupload/ZoomList.js";
import IntentList from "./pages/intentupload/IntentList.js";
import HotLeadList from "./pages/hotleadupload/HotLeadList.js";
import AccountsList from "./pages/accountsupload/AccountsList.js";
import MalList from "./pages/malupload/MalList.js";
import ProductList from "./pages/productupload/ProductList.js";
import TpidList from "./pages/tpidupload/TpidList.js";
import Configurations from "./pages/configurations/Configurations.js";
import Profile from "./pages/profile/Profile.js";
import ChangePassword from "./pages/changepassword/ChangePassword.js";
import CreateUser from "./pages/users/CreateUser.js";
import EditUser from "./pages/users/EditUser.js";
import CreateCustomer from "./pages/customers/CreateCustomer.js";
import EditCustomer from "./pages/customers/EditCustomer.js";
import UploadFile from "./pages/UploadFile.js";
import Homepage from "./pages/homepage/Homepage.js";
const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Homepage />},
      { path: "/users", element: <UserList /> },
      { path: "/customers", element: <CustomerList /> },
      { path: "/zoomupload", element: <ZoomList /> },
      { path: "/intentupload", element: <IntentList /> },
      { path: "/hotleadupload", element: <HotLeadList /> },
      { path: "/accountsupload", element: <AccountsList /> },
      { path: "/malupload", element: <MalList /> },
      { path: "/productupload", element: <ProductList /> },
      { path: "/tpidupload", element: <TpidList /> },
      { path: "/configurations", element: <Configurations /> },
      { path: "/profile", element: <Profile /> },
      { path: "/changepassword", element: <ChangePassword /> },
      { path: "/createuser", element: <CreateUser /> },
      { path: "/edituser/:id", element: <EditUser /> },
      { path: "/createcustomer", element: <CreateCustomer /> },
      { path: "/editcustomer/:id", element: <EditCustomer /> },
      { path: "/uploadfile", element: <UploadFile /> },
    ],
  },
];
export default ThemeRoutes;
