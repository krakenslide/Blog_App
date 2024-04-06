import React, { useState } from "react";
import { Button, TextInput } from "flowbite-react";

function CallToAction() {
  const [submit, setSubmit] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    // Add your form submission logic here
    setSubmit(true);
    console.log(submit);
  };

  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 text-center items-center rounded-tl-3xl rounded-br-3xl w-70 h-70">
      <div className="flex-1 justify-center flex flex-col">
        <div className=" flex flex-col gap-10">
          <div className="">
            <h2 className="text-2xl">Would you like to contribute ?</h2>
          </div>
          {submit ? (
            <div className="">
              <form
                className="flex flex-col items-center justify-center gap-3"
                onSubmit={handleSubmit}
              >
                <div className="w-60">
                  <TextInput
                    type="email"
                    placeholder="name@company.com"
                    id="email"
                  />
                </div>
                <Button
                  type="submit"
                  gradientDuoTone="cyanToBlue"
                  outline
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit
                </Button>
              </form>
            </div>
          ) : (
            <div className="">
              <form
                className="flex flex-col items-center justify-center gap-3"
                onSubmit={handleSubmit}
              >
                <div className="w-60">
                  <TextInput
                    type="email"
                    placeholder="name@company.com"
                    id="email"
                  />
                </div>
                <Button
                  type="submit"
                  gradientDuoTone="cyanToBlue"
                  outline
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Submit
                </Button>
              </form>
            </div>
          )}
        </div>
      </div>
      <div className="p-7 flex-1 items-center justify-center">
        <img
          src="https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_801/b_white/f_auto/q_auto/ncom/en_US/games/switch/f/five-nights-at-freddys-help-wanted-switch/hero"
          className="rounded-tl-3xl rounded-br-3xl"
          width="1080"
          height="1080"
        />
      </div>
    </div>
  );
}

export default CallToAction;
