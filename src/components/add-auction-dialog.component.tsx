import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { SubmitBtn } from "./button.component";

type Props = {
  isOpen: boolean;
  close: () => void;
};

export default function AddAuctionDialog({ isOpen, close }: Props) {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={close}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex flex-col justify-between min-h-[200px] w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <h1>Create Auction</h1>
                  <input
                    className="border-2 border-secondary"
                    placeholder="Auction"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <SubmitBtn
                    type="submit"
                    className=" text-white w-[150px] mx-auto"
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
