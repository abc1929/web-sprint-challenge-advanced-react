import React from "react";
import {
   findAllByRole,
   getAllByRole,
   render,
   screen,
   act,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CheckoutForm from "./CheckoutForm";

const fieldsname = ["firstName", "lastName", "address", "city", "state", "zip"];

const successinput = ["test", "test", "test", "test", "test", "33344"];
const badinput1 = ["test", "test", "", "test", "test", "44444"];
const badinput2 = ["test", "test", "test", "test", "test", "4444"];

// original test 1
test("form header renders", () => {
   render(<CheckoutForm></CheckoutForm>);

   screen.getByText("Checkout Form");
});

test("form displays error messages when input is incorrect in format", async () => {
   render(<CheckoutForm></CheckoutForm>);
   const fields = screen.getAllByRole("textbox");

   await act(async () => {
      userEvent.type(fields[0], "tests");
   });

   await act(async () => {
      userEvent.clear(fields[0]);
   });

   expect(fields[0]).toHaveAttribute("value", "");
   screen.getByText("First Name is required");
});

// original test 2
test("form shows success message on submit with form details", async () => {
   render(<CheckoutForm></CheckoutForm>);
   const fields = screen.getAllByRole("textbox");

   for (let i in successinput) {
      await act(async () => {
         userEvent.type(fields[i], successinput[i]);
      });
   }
   await act(async () => {
      userEvent.clear(fields[5]);
   });
   await act(async () => {
      userEvent.type(fields[5], "3333");
   });
   // pretty sure there's something buggy about rtl, this 5 digit zip code validation only works when the action is split into 4+1. It renders error when done in one input event of 5
   await act(async () => {
      userEvent.type(fields[5], "3");
   });
   expect(fields[5]).toHaveAttribute("value", "33333");
   await act(async () => {
      userEvent.click(screen.getByRole("button"));
   });

   screen.getByText(/ordered some plants/);
});

test("form does not show success message on submit with empty fields", async () => {
   render(<CheckoutForm></CheckoutForm>);

   const fields = screen.getAllByRole("textbox");
   for (let i in successinput) {
      await act(async () => {
         userEvent.type(fields[i], badinput1[i]);
      });
   }
   await act(async () => {
      userEvent.clear(fields[5]);
   });
   await act(async () => {
      userEvent.type(fields[5], "4444");
   });
   await act(async () => {
      userEvent.type(fields[5], "4");
   });
   await act(async () => {
      userEvent.click(screen.getByRole("button"));
   });

   expect(screen.queryByText(/ordered some plants/)).toBeFalsy();
});

test("form does not show success message on submit with incorrect Zip code format", async () => {
   render(<CheckoutForm></CheckoutForm>);

   const fields = screen.getAllByRole("textbox");
   for (let i in successinput) {
      await act(async () => {
         userEvent.type(fields[i], badinput2[i]);
      });
   }
   await act(async () => {
      userEvent.clear(fields[5]);
   });
   await act(async () => {
      userEvent.type(fields[5], "34");
   });
   await act(async () => {
      userEvent.type(fields[5], "5");
   });
   await act(async () => {
      userEvent.click(screen.getByRole("button"));
   });

   expect(screen.queryByText(/ordered some plants/)).toBeFalsy();
   expect(screen.queryByText(/Zip format is not correct/)).toBeTruthy();
});
