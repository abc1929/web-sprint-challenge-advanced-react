import * as yup from "yup";

export default yup.object().shape({
   firstName: yup.string().required("First Name is required"),
   lastName: yup.string().required("Last Name is required"),
   address: yup.string().required("Address is required"),
   city: yup.string().required("City is required"),
   state: yup.string().required("State is required"),
   zip: yup
      .string()
      .required("Zip is required")
      .matches(/^\d{5}$|^\d{5}-\d{4}$/, "Zip format is not correct"),
});
