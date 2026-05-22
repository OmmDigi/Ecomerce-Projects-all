import {
  Truck,
  Package,
  Search,
  ChevronDown,
  Flag,
  User,
  MapPin,
  MapPinned,
  MapPinHouse,
  Pin,
} from "lucide-react";
import { useState } from "react";
import Input from "../Input";

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
          <Input
            icon={<Flag size={15} strokeWidth={1} className="text-gray-500" />}
            required
            placeholder="Country *"
            name="country"
            value="India"
          />

          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          <Input
            icon={<User size={15} strokeWidth={1} className="text-gray-500" />}
            required
            placeholder="First name (optional) *"
            name="first-name"
          />
          <Input
            icon={<User size={15} strokeWidth={1} className="text-gray-500" />}
            required
            placeholder="Last name *"
            name="last-name"
          />
        </div>

        <Input
          icon={<MapPin size={15} strokeWidth={1} className="text-gray-500" />}
          required
          placeholder="Address *"
          name="address"
        />

        {/* <FloatingLabelInput
          required
          label="Apartment, suite, etc. (optional) *"
        /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            icon={
              <MapPinned size={15} strokeWidth={1} className="text-gray-500" />
            }
            required
            placeholder="City *"
            name="city"
          />
          <Input
            icon={
              <MapPinHouse
                size={15}
                strokeWidth={1}
                className="text-gray-500"
              />
            }
            required
            placeholder="State *"
            name="state"
          />
          <Input
            icon={<Pin size={15} strokeWidth={1} className="text-gray-500" />}
            required
            placeholder="Postcode *"
            name="pincode"
          />
        </div>
      </div>
    </div>
  );
}
