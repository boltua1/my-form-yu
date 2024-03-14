"use client";

import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const font = Poppins ({
  subsets: ["latin"],
  weight: ["600"]
})

export default function Home() {
  const route =  useRouter();

  const onClick = () => {
    route.push("/form/send-form")
  }

  return (
    <main className="flex h-full flex-col items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-white drop-shadow-md",
          font.className
          )}>
        ✉️ Send Email
        </h1>
        <p className="text-white text-lg">
          A simple Send mail form servis
        </p>
        <div>
          <Button
            variant={"secondary"}
            size={"lg"}
            onClick={onClick}
          >
            Click my
          </Button>
        </div>
      </div>
    </main>
  );
}
