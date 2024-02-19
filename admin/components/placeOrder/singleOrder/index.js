import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";
import { selectOrder } from "@/app/redux/slices/orderSlice";
import { useBarcode } from 'next-barcode';
import { jsxToPng } from 'jsx-to-png';
import GenerateStick from "@/admin/utils/GenerateSticker";
import Image from "next/image";


const GeneratePDF = dynamic(() => import("../../../utils/GeneratePDF"), {
  ssr: false,
});
const OrderDetails = ({ onClick, item }) => {
  const ref = useRef();
  const [id, setId] = useState(usePathname()?.split("=")[1]);
  const [orders, setOrders] = useState(useSelector(selectOrder));
  const [singleOrder, setSingleOrder] = useState(item || null);
  const [disabled, setDisabled] = useState(true);



  useEffect(() => {
    !singleOrder && orders &&
    orders?.map((item) => {
      if (item.id !== id) return;
      setSingleOrder(item);
      setDisabled(false);
    });
  }, [id]);

  const { inputRef } = useBarcode({
    value: id,
    options: {
      background: '#FFFFFF',
      displayValue: false,
      width: 3,
      height: 80,
    }
  });


  return (
    <div className="">

      <div
        className={`${disabled && "hidden"} bg-white max-w-5xl relative`}
        ref={ref}
      >
        <img id="bar_code" ref={inputRef} className="hidden" />
        <img
          id="image"
          src="/invoice/invoice.png"
          width="300"
          height="200"
          className="hidden"
        />
        <img src="/invoice/head.png" alt="" />
        <div className="flex flex-col justify-between px-5 sm:px-10 h-auto font-mono">
          <div>
            <div className="flex justify-between items-center sm:py-2 sm:mb-2">
              <div className=" sm:pt-1 flex justify-center items-center">
                <span className="text-sm sm:text-xl md:text-2xl  text-title">
                  Invoice ID:{" "}
                </span>
                <span className="text-primary text-lg sm:text-sl md:text-2xl  font-bold">
                  #
                </span>
                <span
                  id="invoiceNo"
                  className="text-primary font-bold text-sm sm:text-xl md:text-2xl  font-mono"
                >
                  {singleOrder?.id}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <span className="text-sm sm:text-xl md:text-2xl  text-title">
                  Status:{" "}
                </span>
                <span
                  id="status"
                  className="text-primary text-sm sm:text-xl md:text-2xl  font-bold capitalize font-mono"
                >
                  {singleOrder?.status}.
                </span>
              </div>
            </div>
            <div className="sm:mb-4">
              <h1 className="text-title text-base md:text-4xl font-semibold border-b-2">
                Customer Details:
              </h1>

              <div>
                <span className="text-sm sm:text-xl md:text-2xl xl:text-4xl font-medium">
                  Name:{" "}
                </span>
                <span
                  id="name"
                  className="text-sm sm:text-xl md:text-2xl xl:text-4xl font-medium"
                >
                  {singleOrder?.customer_details.customer_name}
                </span>
              </div>
              <div>
                <span className="text-sm sm:text-xl md:text-2xl xl:text-4xl font-medium">
                  Contact:{" "}
                </span>
                <span
                  id="phone"
                  className="font-medium text-sm sm:text-xl md:text-2xl xl:text-4xl font-mono"
                >
                  {singleOrder?.customer_details.phone_number}
                </span>
              </div>
              <div className="">
                <span className="text-sm sm:text-xl md:text-2xl xl:text-4xl font-medium ">
                  Address:{" "}
                </span>
                <span
                  id="address"
                  className="text-sm sm:text-xl md:text-2xl font-medium max-w-xl overflow-hidden"
                >
                  {singleOrder?.customer_details.customer_address}
                </span>
              </div>
            </div>
            <div>
              <h1 className="text-title text-lg sm:text-2xl md:text-4xl font-semibold border-b sm:border-b-2">
                Order Details:
              </h1>
              <div>
                <div className="flex justify-between py-1 border-b sm:border-b-2 text-sm font-medium">
                  <div>
                    <h2 className="text-sm sm:text-xl text-title font-mono font-semibold">
                      Item.
                    </h2>
                  </div>
                  <div className="flex justify-between w-7/12">
                    <span className="text-sm sm:text-xl text-title font-mono font-semibold">
                      Weight.
                    </span>
                    <span className="text-sm sm:text-xl text-title font-mono font-semibold">
                      Price.
                    </span>
                    <span className="text-sm sm:text-xl text-title font-mono font-semibold">
                      Total(BDT)
                    </span>
                  </div>
                </div>
              </div>
              {singleOrder &&
                singleOrder.order.map((item, i) => (
                  <div key={i}>
                    <div className="flex justify-between py-1 md:py-3 border-b sm:border-b-2">
                      <div>
                        <h2
                          className="text-sm sm:text-xl md:text-2xl text-title font-mono"
                          id={`item_0${++i}`}
                        >
                          {item.title}
                        </h2>
                      </div>
                      <div className="flex justify-between w-7/12">
                        <span
                          className="text-sm sm:text-xl md:text-2xl text-title font-mono"
                          id={`item_0${i}_quantity`}
                        >
                          {item.quantity}kg
                        </span>
                        <span
                          className="text-sm sm:text-xl md:text-2xl text-title font-mono"
                          id={`item_0${i}_price`}
                        >
                          {item.price}
                        </span>
                        <span
                          className="text-sm sm:text-xl md:text-2xl text-title font-mono"
                          id={`item_0${i}_total_price`}
                        >
                          {item.total_price}/-
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
          <div className="flex items-center justify-end sm:justify-between w-full">
            <div className="hidden sm:block sm:w-2/5">
              <Image src="/invoice/col.png" alt="adv" width={400} height={400} />
            </div>

            <div className="flex flex-col w-2/3 sm:w-1/2 border-t-2 text-sm mt-8 sm:mt-32">
              <div className="flex w-full px-4 py-1 justify-between">
                <h1 className="text-sm sm:text-lg md:text-2xl font-mono font-medium">
                  Sub-Total:
                </h1>
                <h1
                  id="subTotal"
                  className="text-sm sm:text-xl md:text-2xl text-title font-mono"
                >
                  {singleOrder?.totalPrice}/-
                </h1>
              </div>
              <div className="flex w-full px-4 py-1 justify-between">
                <h1 className="text-sm sm:text-xl md:text-2xl font-mono font-medium">
                  Delivery:{" "}
                </h1>
                <h1
                  id="shipping_type"
                  className="text-sm sm:text-lg md:text-xl text-title font-mono"
                >
                  {singleOrder?.customer_details?.delivery_type ? "HOME" : "POINT"}
                </h1>
                <h1
                  id="shipping_cost"
                  className="text-sm sm:text-xl md:text-2xl text-title font-mono"
                >
                  {singleOrder?.deliveryCrg ? singleOrder?.deliveryCrg : "150"}/-
                </h1>
              </div>
              <div className="flex w-full px-4 py-1 justify-between">
                <h1 className="text-sm sm:text-xl md:text-2xl font-mono font-medium">
                  Discount:{" "}
                </h1>
                <h1
                  id="discount"
                  className="text-sm sm:text-xl md:text-2xl text-title font-mono"
                >
                  -{singleOrder?.discount}/-
                </h1>
              </div>
              <div className="flex w-full px-4 py-1 justify-between mt-2 rounded-sm bg-blue-200 ">
                <h1 className="text-sm sm:text-xl md:text-2xl font-mono font-bold">
                  Total:{" "}
                </h1>
                <h1
                  id="total"
                  className="text-sm sm:text-xl md:text-2xl font-bold text-blue-600 font-mono"
                >
                  {singleOrder?.customer_details?.salePrice}.00/-
                </h1>
              </div>
            </div>
          </div>
        </div>
        <img src="/invoice/foot.png" alt="" />
      </div>
      <GeneratePDF
        html={ref}
        disabled={disabled}
        onClick={() => jsxToPng(null)}
      />
      <GenerateStick html={ref}  />
    </div>
  );
};

export default OrderDetails;
