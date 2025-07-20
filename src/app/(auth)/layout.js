
import Image from "next/image";
import React from "react";

import { BarChart3, Quote} from "lucide-react";


export default function Layout({ children }) {
  
  return (
    <main className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-neutral-50 via-indigo-50 to-indigo-200">
      <section className="hidden md:flex md:w-1/2 flex-col mx-auto justify-center items-center p-6 space-y-10">
        <div className="flex items-center space-x-3 self-start absolute top-10 left-14">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-2xl font-bold text-gray-800">JobPilot</span>
        </div>

        <div className="max-w-xs -bottom-18 relative w-full mx-auto">
          <div className="relative">
            <Image
              src="/images/bg-login.png"
              alt="Adam Sandler"
              width={200}
              height={250}
              className="w-full h-auto object-cover rounded-2xl"
            />
            <div className="absolute top-1 -left-24 bg-white rounded-sm p-4 shadow-xl">
              <div className="flex flex-col space-y-2">
              <BarChart3 className="w-12 h-12 text-indigo-500" />
              <div>
                <div className="text-2xl font-bold text-gray-900">100k+</div>
                <div className="text-sm text-gray-500">People got hired</div>
              </div>
              </div>
            </div>
          </div>
          {/* testimonials */}
          <div className="absolute bottom-6 -right-34 bg-white p-4 shadow-xl max-w-xs">
            <div className="flex items-center space-x-3 mb-4">
              <div className="flex-1">
                <div className="font-semibold text-gray-800 text-sm">
                  Adam Sandler
                </div>
                <div className="text-xs text-gray-500">
                  Lead Engineer at Canva
                </div>
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden flex flex-shrink-0 ">
                <Image
                  src="/images/quote-login.png"
                  alt="Adam Sandler"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="relative flex">
              <Quote className="text-indigo-600 h-14 w-14" />
              <p className="text-sm text-gray-700 leading-relaxed pl-4 pt-2 items-center">
                Great platform for the job seeker that want to improve their CV
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="flex w-full md:w-1/2 justify center items-center min-h-screen p-8">
        <div className="w-full max-w-md bg-transparent">
          <div className="p-6">{children}</div>
        </div>
      </section>
    </main>
  );
}
