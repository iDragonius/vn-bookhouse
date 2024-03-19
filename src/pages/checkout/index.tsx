import React, { ChangeEvent, FC, useState } from "react";
import Head from "next/head";
import BasketView from "@/components/ui/views/basket-view";
import { useBasket } from "@/hooks/use-basket";
import { useMutation } from "@apollo/client";
import CREATE_ORDER from "@/lib/mutations/order.mutation";

export interface CheckoutPageProps {}

export type CheckoutDtoProps = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
  note: string;
};
const CheckoutPage: FC<CheckoutPageProps> = () => {
  const [data, setData] = useState<CheckoutDtoProps>({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: "",
    note: "",
  });
  function changeData(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }
  const { basketData } = useBasket();
  return (
    <>
      <Head>
        <title>CheckoutPage</title>
      </Head>
      <main className={" box"}>
        <h1 className={"text-32 text-[#2B2B2B] font-semibold mt-8 mb-5 "}>
          Sifarişi rəsmləşdirmək
        </h1>
        <div className={"flex justify-between gap-10"}>
          <div
            className={
              "bg-white border border-[#C7C7C7] rounded-[12px] w-full  p-10 flex flex-col gap-5"
            }
          >
            <div className={"flex gap-8 "}>
              <div className={"flex flex-col  w-full"}>
                <label htmlFor="firstName" className={"text-18  mb-1"}>
                  Ad
                </label>
                <input
                  type="text"
                  placeholder={"Murad"}
                  value={data.firstName}
                  name={"firstName"}
                  onChange={changeData}
                  className={
                    "px-5 py-4 border border-[#C7C7C7] bg-[#F9F9F9] rounded-[12px] placeholder:text-[#DCDCDC] outline-none text-18 w-full"
                  }
                />
              </div>
              <div className={"flex flex-col  w-full"}>
                <label htmlFor="firstName" className={"text-18  mb-1"}>
                  Soyad
                </label>
                <input
                  type="text"
                  placeholder={"Məmmədov"}
                  value={data.lastName}
                  name={"lastName"}
                  onChange={changeData}
                  className={
                    "px-5 py-4 border border-[#C7C7C7] bg-[#F9F9F9] rounded-[12px] placeholder:text-[#DCDCDC] outline-none text-18 w-full"
                  }
                />
              </div>
            </div>
            <div className={"flex flex-col  w-full"}>
              <label htmlFor="firstName" className={"text-18  mb-1"}>
                Elektron ünvan
              </label>
              <input
                type="email"
                placeholder={"example@example.com"}
                value={data.email}
                name={"email"}
                onChange={changeData}
                className={
                  "px-5 py-4 border border-[#C7C7C7] bg-[#F9F9F9] rounded-[12px] placeholder:text-[#DCDCDC] outline-none text-18 w-full"
                }
              />
            </div>{" "}
            <div className={"flex flex-col  w-full"}>
              <label htmlFor={"phoneNumber"} className={"text-18  mb-1"}>
                Əlaqə nömrəsi (sifarişin detallarını dəqiqləşdirmək üçün)
              </label>
              <input
                type="email"
                placeholder={"0509005040"}
                value={data.phoneNumber}
                name={"phoneNumber"}
                onChange={changeData}
                className={
                  "px-5 py-4 border border-[#C7C7C7] bg-[#F9F9F9] rounded-[12px] placeholder:text-[#DCDCDC] outline-none text-18 w-full"
                }
              />
            </div>{" "}
            <div className={"flex flex-col  w-full"}>
              <label htmlFor={"address"} className={"text-18  mb-1"}>
                Ünvan
              </label>
              <textarea
                placeholder={"Ünvanı qeyd edin"}
                value={data.address}
                name={"address"}
                onChange={changeData}
                className={
                  "px-5 py-4 border border-[#C7C7C7] bg-[#F9F9F9] rounded-[12px] placeholder:text-[#DCDCDC] outline-none text-18 w-full"
                }
              />
            </div>
            <div className={"flex flex-col  w-full "}>
              <label htmlFor="note" className={"text-18  mb-1"}>
                Sifarişə aid qeydlər
              </label>
              <textarea
                placeholder={"Sifarişi çatdırmazdan əvvəl mənlə əlaqə saxlayın"}
                value={data.note}
                name={"note"}
                onChange={changeData}
                className={
                  "px-5 py-4 border border-[#C7C7C7] bg-[#F9F9F9] rounded-[12px] placeholder:text-[#DCDCDC] outline-none text-18 w-full"
                }
              />
            </div>
          </div>
          <BasketView data={basketData} checkoutData={data} />
        </div>
      </main>
    </>
  );
};

export default CheckoutPage;
