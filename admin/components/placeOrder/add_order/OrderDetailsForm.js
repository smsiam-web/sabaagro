import React, { useEffect, useState } from "react";
import { Tabs } from "@mantine/core";
import {
  AppTextArea,
  FormDropdown,
  FormInput,
  FormRadio,
} from "../../shared/Form";
import { db } from "@/app/utils/firebase";
import { COURIER } from "@/admin/configs";

const OrderDetailsForm = () => {
  const [fruitsPlant, setFruitsPlant] = useState(null);
  const [mosla, setMosla] = useState(null);

  console.log(fruitsPlant);

  // Get products from firebase database
  useEffect(() => {
    const unSub = db
      .collection("products")
      .orderBy("timestamp", "desc")
      .onSnapshot((snap) => {
        const fruits = [];
        const mosla = [];

        snap.docs.map((doc) => {
          doc.data().product_details.parent_category === "ফলের চারা" &&
            fruits.push({
              ...doc.data().product_details,
            });
          doc.data().product_details.parent_category === "মসলা চারা" &&
            mosla.push({
              ...doc.data().product_details,
            });
        });
        setFruitsPlant(fruits);
        setMosla(mosla);
      });

    return () => {
      unSub();
    };
  }, []);

  return (
    <div className="max-h-full">
      <div>
        <span>Delivery Type:</span>
        <FormRadio
          type="text"
          name="delivery_type"
          forTrue="Home"
          forFalse="Point"
        />
      </div>
      <div>
        <span>Phone Number (Must be Eng. Digit)</span>
        <FormInput
          type="text"
          max={11}
          name="phone_number"
          placeholder="+880"
        />
      </div>
      <div>
        <span>Name</span>
        <FormInput name="customer_name" placeholder="Name" />
      </div>
      <div>
        <span>Address</span>
        <span className="text-sub-title text-sm block">
          (maximum 300 characters)
        </span>
        <AppTextArea
          name="customer_address"
          placeholder="Ex: H#12, R#04, Sec# 4, Mirpur Dhaka."
        />
      </div>
      <div>
        <Tabs color="violet" defaultValue="fruitsPlant" variant="pills">
          <Tabs.List>
            <Tabs.Tab value="fruitsPlant">ফলের চারা</Tabs.Tab>
            <Tabs.Tab value="mosla">মসলা চারা</Tabs.Tab>
            <Tabs.Tab value="others">অন্যান্য</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="fruitsPlant" pt="xs">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {fruitsPlant?.map((i) => (
                <div
                  key={i.sku}
                  className="p-2 bg-blue-500 rounded-md col-span-1"
                >
                  <span className="pb-10 text-lg text-white">
                    #{i.product_name}
                  </span>
                  <div className="flex items-center pt-1 sm:pt-2">
                    <div className="w-2/3">
                      <FormInput
                        type="number"
                        name={i.product_name}
                        placeholder=""
                      />
                    </div>
                    <span className="text-lg text-white font-bold">.pc</span>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Panel>

          <Tabs.Panel value="mosla" pt="xs">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {mosla?.map((i) => (
                <div
                  key={i.sku}
                  className="p-2 bg-blue-500 rounded-md col-span-1"
                >
                  <span className="pb-10 text-lg text-white">
                    #{i.product_name}
                  </span>
                  <div className="flex items-center pt-1 sm:pt-2">
                    <div className="w-2/3">
                      <FormInput
                        type="number"
                        name={i.product_name}
                        placeholder=""
                      />
                    </div>
                    <span className="text-lg text-white font-bold">.pc</span>
                  </div>
                </div>
              ))}
            </div>
          </Tabs.Panel>
        </Tabs>
      </div>

      <div className="mt-3">
        <span>Amount</span>
        <FormInput type="number" name="salePrice" placeholder="Amount" />
      </div>
      <div className="mt-3">
        <span>Delivery Charge</span>
        <FormInput
          type="number"
          name="deliveryCharge"
          placeholder="Delivery Charge"
        />
      </div>
      <div className="mt-3">
        <span>Paid Amount</span>
        <FormInput type="number" name="paidAmount" placeholder="Paid Amount" />
      </div>
      <div>
        <span>Courier Service</span>
        <FormDropdown
          name="courier"
          placeholder="Select Courier Service"
          items={COURIER}
        />
      </div>
      <div>
        <span>Note</span>
        <span className="text-sub-title text-sm block">
          (maximum 500 characters)
        </span>
        <AppTextArea name="note" placeholder="Note..." />
      </div>
    </div>
  );
};

export default OrderDetailsForm;
