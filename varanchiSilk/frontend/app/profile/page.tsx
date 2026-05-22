import ProfilePage from "@/pages/ProfilePage";
import React, { Suspense } from "react";

function page() {
  return (
    <Suspense>
      <ProfilePage />
    </Suspense>
  );
}

export default page;
