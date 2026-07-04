import React from "react";

import { ProgramDetailsHero } from "@/components/ProgramDetails/ProgramDetailsHero";
import { ProgramDetailsLoaderCleanup } from "@/components/NavigationLoader/ProgramDetailsLoaderCleanup";

export default function ProgramDetailsPage() {
  return (
    <main>
      <ProgramDetailsLoaderCleanup />
      <ProgramDetailsHero />
    </main>
  );
}
