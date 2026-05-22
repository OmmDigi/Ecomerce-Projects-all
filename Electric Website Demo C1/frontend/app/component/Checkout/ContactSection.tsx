import { useState } from "react";
import FloatingLabelInput from "../HelperComponent/FloatingLabelInput";

export function ContactSection() {
  const [emailOffers, setEmailOffers] = useState(false);

  return (
    <div className="border-b border-b-gray-200 pb-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold font-open text-xl">Contact</h2>
        <a href="/auth/login" className="text-sm text-teal-600 hover:underline">
          Sign in
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
        <FloatingLabelInput required label="Email" type="email" name="email" />
        <FloatingLabelInput required label="Phone Number" name="phone" />
      </div>
    </div>
  );
}
