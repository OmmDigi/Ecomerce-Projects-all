import { Truck, Package, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import FloatingLabelInput from "../HelperComponent/FloatingLabelInput";

export function DeliverySection() {
  const [deliveryMethod, setDeliveryMethod] = useState<"ship" | "pickup">(
    "ship"
  );
  const [saveInfo, setSaveInfo] = useState(false);

  return (
    <div className="border-b border-b-gray-200 pb-6">
      <h2 className="mb-4 font-semibold font-open text-xl">Delivery</h2>

      {/* Address Form */}
      <div className="space-y-4">
        <div className="relative">
          <FloatingLabelInput required label="Country *" name="country" value="India"/>

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <FloatingLabelInput required label="First name (optional) *" name="first-name"/>
          <FloatingLabelInput required label="Last name *" name="last-name"/>
        </div>

        <FloatingLabelInput required label="Address *" name="address"/>

        {/* <FloatingLabelInput
          required
          label="Apartment, suite, etc. (optional) *"
        /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <FloatingLabelInput required label="City *" name="city"/>
          <FloatingLabelInput required label="State *" name="state"/>
          <FloatingLabelInput required label="Postcode *" name="pincode"/>
        </div>
      </div>
    </div>
  );
}
