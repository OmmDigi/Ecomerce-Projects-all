import Image from "next/image";

export default function StorySection() {
  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl mb-6 font-bold tracking-wide">Our story and how we grow up</h2>
            <p className="text-gray-600 mb-6">
              The Rare electronic product contains all items necessities and shoes. The
              Rare electronic product contains all items necessities and shoes. Since the
              COVID 19 Pandemic, we have single-handedly handled the mission and vision of
              our organization.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="mb-3 font-semibold">Our History</h3>
                <p className="text-gray-600 text-sm">
                  Our rare electronic product contains all items necessities and shoes, since the
                  COVID-19 pandemic, we have single-handedly handled the mission of
                  our establishment to see our products global trading a worldwide.
                </p>
              </div>

              <div>
                <h3 className="mb-3 font-semibold">Our Value</h3>
                <p className="text-gray-600 text-sm">
                  The Rare electronic product contains all items necessities and shoes.
                  The Rare electronic product contains all items necessities and shoes, since the
                  COVID-19 epidemic, we have single-handedly handled the mission and vision
                  of our establishment to see our products global trading a worldwide.
                </p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <Image
              src="https://images.unsplash.com/photo-1758691736979-ff263c04b3d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBvZmZpY2V8ZW58MXx8fHwxNzY1MzY2MjU4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Team"
              className="w-full h-96 object-cover rounded-lg"
              height = {1280}
              width = {1280}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
