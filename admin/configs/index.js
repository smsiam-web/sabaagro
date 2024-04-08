import {
  FiUsers,
  FiUser,
  FiCompass,
  FiGift,
  FiSettings,
  FiLayers,
  FiShoppingCart,
} from "react-icons/fi";
import { RxDashboard } from "react-icons/rx";
import { RiShoppingBag3Line } from "react-icons/ri";
import { AiOutlineBars, AiOutlineAppstoreAdd } from "react-icons/ai";
import { ImCreditCard } from "react-icons/im";
import { TbFileReport } from "react-icons/tb";

export const menus = [
  {
    pathname: "/admin",
    Icon: RxDashboard,
    title: "Dashboard",
    secure: false,
  },
  {
    pathname: "/admin/products",
    Icon: RiShoppingBag3Line,
    title: "Products",
    secure: true,
  },
  {
    pathname: "/admin/place-order",
    Icon: AiOutlineAppstoreAdd,
    title: "Place Order",
    secure: true,
  },
  {
    pathname: "/admin/delivery-report",
    Icon: TbFileReport,
    title: "Delivery Report",
    secure: true,
  },
  {
    pathname: "/admin/support-tickets",
    Icon: RiShoppingBag3Line,
    title: "Support Tickets",
    secure: true,
  },
  {
    pathname: "/admin/category",
    Icon: AiOutlineBars,
    title: "Category",
    secure: true,
  },
  {
    pathname: "/admin/customers",
    Icon: FiUsers,
    title: "Customers",
    secure: true,
  },
  {
    pathname: "/admin/orders",
    Icon: FiCompass,
    title: "Orders",
    secure: true,
  },
  {
    pathname: "/admin/coupons",
    Icon: FiGift,
    title: "Coupons",
    secure: true,
  },
  {
    pathname: "/admin/our-staff",
    Icon: FiUser,
    title: "Our Staff",
    secure: true,
  },
  {
    pathname: "/admin/setting",
    Icon: FiSettings,
    title: "Setting",
    secure: true,
  },
];

//Dashboard Total Card
export const priceOverview = [
  {
    title: "today order",
    Icon: FiLayers,
    price: 100,
    bg: "blue",
  },
  {
    title: "this month",
    Icon: FiShoppingCart,
    price: 1000,
    bg: "sky",
  },
  {
    title: "total order",
    Icon: ImCreditCard,
    price: 43000,
    bg: "green",
  },
];

//Products Category

export const PCATEGORY = [
  {
    name: "রাজশাহীর আম",
    id: "রাজশাহীর আম",
    path: "/rajshahiraam",
  },
  {
    name: "খেজুরের গুড়",
    id: "খেজুরের গুড়",
    path: "/khejurergru",
  },
  {
    name: "লিচু",
    id: "লিচু",
    path: "/lichu",
  },
  {
    name: "আখের গুড়",
    id: "আখের গুড়",
    path: "/akher-gur",
  },
  {
    name: "মধু",
    id: "মধু",
    path: "/modhu",
  },
  {
    name: "সরিষার তেল",
    id: "সরিষার তেল",
    path: "/sorishar-tel",
  },
  {
    name: "পেয়ারা",
    id: "পেয়ারা",
    path: "/peyara",
  },
  {
    name: "রংপুরের আম",
    id: "রংপুরের আম",
    path: "/rongpureraam",
  },
];

export const TCATEGORY = [
  {
    name: "আম",
    id: "আম",
  },
  {
    name: "খেজুরের গুড়",
    id: "খেজুরের গুড়",
  },
  {
    name: "লিচু",
    id: "লিচু",
  },
  {
    name: "আখের গুড়",
    id: "আখের গুড়",
  },
];

export const ROLE = [
  {
    name: "Search By Status",
    id: "Search By Status",
  },
  {
    name: "CEO",
    id: "CEO",
  },
  {
    name: "Admin",
    id: "Admin",
  },
  {
    name: "HR",
    id: "HR",
  },
  {
    name: "Sales Manager",
    id: "Sales Manager",
  },
  {
    name: "Sales Executive",
    id: "Sales Executive",
  },
  {
    name: "Parcel Executive",
    id: "Parcel Executive",
  },
  {
    name: "Entry Oficer",
    id: "Entry Oficer",
  },
  {
    name: "Accounted",
    id: "Accounted",
  },
];

export const STATUS = [
  { id: "Pending", name: "Pending" },
  { id: "Processing", name: "Processing" },
  { id: "Shipped", name: "Shipped" },
  { id: "Delivered", name: "Delivered" },
  { id: "Cancelled", name: "Cancelled" },
];
