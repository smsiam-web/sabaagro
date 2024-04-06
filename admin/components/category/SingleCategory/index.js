import { selectCategory } from "@/app/redux/slices/categorySlice";
import { usePathname } from "next/navigation";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Group, Switch, Tooltip, useMantineTheme } from "@mantine/core";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import { CgCheck } from "react-icons/cg";
import { RxCross2 } from "react-icons/rx";
import SearchCategory from "../SearchCategory";
const SingleCAtegory = () => {
  const theme = useMantineTheme();
  const [id, setId] = useState(usePathname()?.split("=")[1]);
  const [singleCat, setSingleCat] = useState();
  const Categorys = useSelector(selectCategory);

  useEffect(() => {
    Categorys?.map((i) => i.category_uid === id && setSingleCat(i));
  }, []);

  const toggleChecked = (id, name) => {
    category.map((item) => {
      if (item.category_uid !== id) return;
      else {
        item.isPublished
          ? UpdatePublishedState(id, name, false)
          : UpdatePublishedState(id, name, true);
      }
    });
  };

  // update published state
  const UpdatePublishedState = async (id, name, values) => {
    const ref = db.collection("category").doc(id);
    return ref
      .set(
        {
          isPublished: values,
        },
        { merge: true }
      )
      .then(() => {
        values
          ? notifications.show({
              title: "Published successfully",
              message: `${name}, ID: ${id}`,
              autoClose: 3000,
            })
          : notifications.show({
              title: "Removed successfully",
              message: `${name}, ID: ${id}`,
              color: "orange",
              autoClose: 3000,
            });
      })
      .catch((error) => {
        notifications.show({
          title: "Somthing went Wrong",
          message: { error },
          color: "red ",
          autoClose: 3000,
        });
        console.log(error);
      });
  };

  console.log(singleCat);

  return (
    <div>
      <h1 className="text-xl md:text-2xl font-bold">Single Category</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
        <div className="bg-slate-50 text-center px-10 py-6 rounded-2xl ">
          <h1 className="text-2xl font-bold border-b-2 border-gray-400 mb-2 col-start-2">
            {singleCat?.category_title
              ? singleCat.category_title
              : "Category Title"}
          </h1>
          <h1 className="text-xl from-slate-600 font-bold">
            {singleCat?.category_uid
              ? `#${singleCat.category_uid}`
              : "Category Uid"}
          </h1>
        </div>
        <div className="bg-slate-50 rounded-xl flex justify-center">
          <Image
            src={singleCat?.category_image}
            alt="Picture of the author"
            width={300}
            height={300}
          />
        </div>
      </div>
      <SearchCategory addtitle="Add Child Category" />

      <h1 className="text-xl text-slate-800 md:text-2xl font-bold">
        Child Category
      </h1>

      <div className="grid gap-4 w-full overflow-hidden">
        {/* <h1 className="text-title pb-4 text-2xl font-medium">Recent Order</h1> */}
        <div className="w-full overflow-x-scroll rounded-md">
          <table className="w-full whitespace-nowrap table-auto">
            <thead className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b border-gray-200  bg-gray-100">
              <tr>
                <td className="px-4 py-3 ">Parent ID</td>
                <td className="px-4 py-3 ">Children ID</td>
                <td className="px-4 py-3 ">PARENT</td>
                <td className="px-4 py-3 ">CHILDREN</td>
                <td className="px-4 py-3 ">Published</td>
                <td className="px-4 py-3 ">ACTIONS</td>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100 ">
              {singleCat &&
                singleCat?.category_child?.map((i, index) => (
                  <tr key={index} className="px-4 py-3">
                    <td className="px-4 py-3 font-bold">
                      #
                      {singleCat?.category_uid
                        ? singleCat.category_uid
                        : "Category Title"}
                    </td>
                    <td className="px-4 py-3">#{++index}</td>
                    <td className="px-4 py-3">{singleCat?.category_title}</td>
                    <td className="px-4 py-3">{i}</td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold">
                        <Group position="center">
                          <Switch
                            className="cursor-pointer"
                            checked={true}
                            onChange={() =>
                              toggleChecked(
                                item.category_uid,
                                item.category_title
                              )
                            }
                            color="teal"
                            size="sm"
                            thumbIcon={
                              true ? (
                                <CgCheck
                                  size="0.8rem"
                                  color={
                                    theme.colors.teal[theme.fn.primaryShade()]
                                  }
                                  stroke={3}
                                />
                              ) : (
                                <RxCross2
                                  size="0.8rem"
                                  color={
                                    theme.colors.red[theme.fn.primaryShade()]
                                  }
                                  stroke={3}
                                />
                              )
                            }
                          />
                        </Group>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-semibold flex justify-start gap-5 text-sub-title items-center">
                        <Tooltip label="Edit" color="blue" withArrow>
                          <span
                            // onClick={() => toggleDrawer(item)}
                            className="cursor-pointer hover:text-blue-400"
                          >
                            <FiEdit size={16} />
                          </span>
                        </Tooltip>

                        <Tooltip label="Delete" color="red" withArrow>
                          <span
                            className="cursor-pointer"
                            // onClick={() => deleteCategory(item)}
                          >
                            <RiDeleteBinLine size={17} />
                          </span>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SingleCAtegory;
