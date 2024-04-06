import React from "react";
import { Button, TextInput } from "flowbite-react";

function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 text-center items-center rounded-tl-3xl rounded-br-3xl">
      <div className="flex-1 justify-center flex flex-col">
        <div className=" flex flex-col gap-10">
          <div className="">
            <h2 className="text-2xl">Would you like to contribute ?</h2>
            <p className="">
              Please type in your email and you will be contacted.
            </p>
          </div>
          <div className="">
            <form className="flex flex-col items-center justify-center gap-3">
              <div className="w-60">
                <TextInput
                  type="email"
                  placeholder="name@company.com"
                  id="email"
                />
              </div>
              <Button type="submit" gradientDuoTone="cyanToBlue" outline>
                Submit
              </Button>
            </form>
          </div>
        </div>
      </div>
      <div className="p-7 flex-1 items-center justify-center">
        <img
          src="https://preview.redd.it/pp5w58l8vqv51.jpg?width=2160&format=pjpg&auto=webp&s=99a47e983760907c01bb943326185edf00fe80c1"
          className="rounded-tl-3xl rounded-br-3xl"
        />
      </div>
    </div>
  );
}

export default CallToAction;
