// write your custom hook here to control your checkout form

import { useState } from "react";
import * as yup from "yup";
import formSchema from "../schema/formschema";

export default function useForm(initialValue) {
   const [showSuccessMessage, setShowSuccessMessage] = useState(false);
   const [values, setValues] = useState(initialValue);
   const [errors, setErrors] = useState(initialValue);

   const handleChanges = (e) => {
      let { name, value } = e.target;

      // this is needed to persist synthetic event

      // console.log(e);
      // console.log(e.target.name);
      yup.reach(formSchema, name)
         .validate(value)
         .then((valid) => {
            setErrors({
               ...errors,
               [name]: "",
            });
         })
         .catch((err) => {
            // console.log(e);
            setErrors({
               ...errors,
               [name]: err.errors[0],
            });
         });
      setShowSuccessMessage(false);
      setValues({ ...values, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      let toggle = false;
      const newerr = { ...errors };
      for (let i of Object.keys(values)) {
         if (values[i].length === 0) {
            newerr[i] = "This field is empty";
            toggle = true;
            // console.log(newerr);
         }
      }
      if (toggle) {
         setErrors(newerr);
         return;
      }

      if (
         Object.keys(errors)
            .map((i) => errors[i])
            .filter((i) => i.length > 0).length > 0
      ) {
         return;
      }

      setShowSuccessMessage(true);
   };

   return [values, handleSubmit, handleChanges, showSuccessMessage, errors];
}
