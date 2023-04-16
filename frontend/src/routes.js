// Bootstrap Paradox Dashboard React layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Billing from "layouts/billing";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Register from "layouts/authentication/register";
import Budget from "layouts/budget";
import Expense from "layouts/expense";
import OCR from "layouts/ocr/OCR";
import Stocks from "layouts/stocks";
import Plan from "layouts/plan";

// Bootstrap Paradox Dashboard React icons
import { IoRocketSharp } from "react-icons/io5";
import { IoIosDocument } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { IoBuild } from "react-icons/io5";
import { BsCreditCardFill } from "react-icons/bs";
import { IoStatsChart } from "react-icons/io5";
import { IoHome } from "react-icons/io5";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <IoHome size="15px" color="inherit" />,
    component: Dashboard,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    route: "/tables",
    icon: <IoStatsChart size="15px" color="inherit" />,
    component: Tables,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Billing",
    key: "billing",
    route: "/billing",
    icon: <BsCreditCardFill size="15px" color="inherit" />,
    component: Billing,
    noCollapse: true,
  },
  { type: "title", title: "Account Pages", key: "account-pages" },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <BsFillPersonFill size="15px" color="inherit" />,
    component: Profile,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Budget Split",
    key: "budget-split",
    route: "/budget",
    icon: <IoIosDocument size="15px" color="inherit" />,
    component: Budget,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Add Expense",
    key: "expense",
    route: "/expense",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: Expense,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Register",
    key: "sign-up",
    route: "/authentication/sign-up",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignUp,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-up",
    route: "/authentication/sign-in",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: SignIn,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Ocr",
    key: "ocr",
    route: "/ocr",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: OCR,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Financial Plan",
    key: "plan",
    route: "/plan",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: Plan,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Stocks",
    key: "stocks",
    route: "/stocks",
    icon: <IoRocketSharp size="15px" color="inherit" />,
    component: Stocks,
    noCollapse: true,
  }
];

export default routes;
