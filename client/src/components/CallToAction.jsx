// Import necessary modules
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "flowbite-react"; // Removed TextInput import

// Define CallToAction component
function CallToAction() {
  // State variables
  const [submit, setSubmit] = useState(false);
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [invalidInput, setInvalidInput] = useState(false);

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setInvalidInput(true);
      return;
    }
    // Add your form submission logic here
    setSubmit(true);
    console.log(email);
    setErrorMessage("");
    setInvalidInput(false);
  };

  // Handle onBlur event for input field
  const handleBlur = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address");
      setInvalidInput(true);
    } else {
      setErrorMessage("");
      setInvalidInput(false);
    }
  };

  // Handle onFocus event for input field
  const handleFocus = () => {
    // Reset border color and clear error message on focus
    setInvalidInput(false);
    setErrorMessage("");
  };

  // Render component JSX
  return (
    <motion.div
      className="flex flex-col md:flex-row p-8 bg-gradient-to-r from-gray-500 to-gray-400 dark:from-gray-800 dark:to-gray-900 rounded-3xl shadow-lg"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex-1 flex flex-col justify-center md:pr-12">
        {submit ? (
          // Thank you message
          <motion.div
            className="text-teal-500 text-3xl font-bold mb-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Thank you, we will reach out to you soon !
          </motion.div>
        ) : (
          // Call to action message and form
          <React.Fragment>
            <motion.div
              className="text-white text-3xl font-bold mb-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Would you like to contribute?
            </motion.div>
            <motion.p
              className="text-white text-lg mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Join our community and help us grow.
            </motion.p>
            <motion.form
              className="flex flex-col md:flex-row"
              onSubmit={handleSubmit}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              {/* Input field for email */}
              <input
                type="email"
                className={`bg-white dark:bg-gray-800 rounded-lg p-4 flex-1 mb-4 md:mb-0 outline-none focus:ring-2 ${
                  invalidInput ? "border-red-500" : "border-teal-500"
                }`}
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setInvalidInput(false);
                }}
                onBlur={handleBlur}
                onFocus={handleFocus}
              />
              {/* Submit button */}
              <Button
                type="submit"
                className="rounded-lg px-6 py-3 shadow-lg md:ml-4"
                gradientDuoTone="purpleToPink"
              >
                Submit
              </Button>
            </motion.form>
          </React.Fragment>
        )}
        {/* Error message */}
        {errorMessage && (
          <motion.div
            className="text-red-500"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            {errorMessage}
          </motion.div>
        )}
      </div>
      {/* Image */}
      <div className="flex-1 flex items-center justify-center mt-8 md:mt-0">
        <motion.img
          src="https://assets.nintendo.com/image/upload/ar_16:9,c_lpad,w_801/b_white/f_auto/q_auto/ncom/en_US/games/switch/f/five-nights-at-freddys-help-wanted-switch/hero"
          className="rounded-3xl shadow-lg w-full max-w-md"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>
    </motion.div>
  );
}

// Export CallToAction component
export default CallToAction;
