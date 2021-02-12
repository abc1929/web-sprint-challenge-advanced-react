import React, { useState } from "react";
import useForm from "../hooks/useForm";

// This form should be handled by a "useForm" custom hook
// Build out the logic needed for a form custom hook (see the useForm.js file)
// and replace the necessary stateful logic from CheckoutForm with the hook
const initialValue = {
   firstName: "",
   lastName: "",
   address: "",
   city: "",
   state: "",
   zip: "",
};

const CheckoutForm = (props) => {
   const [
      values,
      handleSubmit,
      handleChanges,
      showSuccessMessage,
      errors,
   ] = useForm(initialValue);

   return (
      <>
         <form onSubmit={handleSubmit}>
            <h2>Checkout Form</h2>
            <label>
               First Name:
               <input
                  name="firstName"
                  value={values.firstName}
                  onChange={handleChanges}
               />
               {errors.firstName.length > 0 && (
                  <p className="errormessage"> {errors.firstName} </p>
               )}
            </label>
            <label>
               Last Name:
               <input
                  name="lastName"
                  value={values.lastName}
                  onChange={handleChanges}
               />
               {errors.lastName.length > 0 && (
                  <p className="errormessage"> {errors.lastName} </p>
               )}
            </label>
            <label>
               Address:
               <input
                  name="address"
                  value={values.address}
                  onChange={handleChanges}
               />
               {errors.address.length > 0 && (
                  <p className="errormessage"> {errors.address} </p>
               )}
            </label>
            <label>
               City:
               <input
                  name="city"
                  value={values.city}
                  onChange={handleChanges}
               />
               {errors.city.length > 0 && (
                  <p className="errormessage"> {errors.city} </p>
               )}
            </label>
            <label>
               State:
               <input
                  name="state"
                  value={values.state}
                  onChange={handleChanges}
               />
               {errors.state.length > 0 && (
                  <p className="errormessage"> {errors.state} </p>
               )}
            </label>
            <label>
               Zip:
               <input name="zip" value={values.zip} onChange={handleChanges} />
               {errors.zip.length > 0 && (
                  <p className="errormessage"> {errors.zip} </p>
               )}
            </label>
            <button>Checkout</button>
         </form>

         {showSuccessMessage && (
            <div className="success-message" data-testid="successMessage">
               <p>
                  You have ordered some plants! Woo-hoo!{" "}
                  <span role="img">🎉</span>
               </p>
               <p>Your new green friends will be shipped to:</p>
               <br />
               <br />
               <p>
                  {values.firstName} {values.lastName}
               </p>
               <p>{values.address}</p>
               <p>
                  {values.city}, {values.state} {values.zip}
               </p>
            </div>
         )}
      </>
   );
};

export default CheckoutForm;
