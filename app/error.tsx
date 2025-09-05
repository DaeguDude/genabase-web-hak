"use client";

import Image from "next/image";
import Link from "next/link";
import NotFoundRobot from "@/public/not-found.png";

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-full w-full bg-white py-8 text-[#484848]">
      <div className="px-8 not-last:w-auto md:w-[1080px] lg:w-[1080px] mx-auto">
        <Link href="/">
          <div className="font-bold text-[40px] leading-[100%] cursor-pointer">
            GENABASE
          </div>
        </Link>

        <div className="mt-12 md:grid md:grid-cols-[40%_40%] md:gap-8">
          <div>
            <div className="font-bold text-[140px] leading-[100%]">Oops!</div>
            <div className="font-medium text-3xl mt-6">
              Something went wrong!
            </div>

            <div className="mt-8 flex flex-col gap-4">
              <div className="font-bold text-gray-500">name: {error.name}</div>
              <div className="font-bold text-gray-500">
                message: {error.message}
              </div>

              <Link href="/" className="flex mt-4">
                <div className="font-medium text-[16px] leading-[133%] py-3 px-6 rounded-[100px] bg-[#f14800] text-white cursor-pointer">
                  Go Home
                </div>
              </Link>
            </div>
          </div>

          <div className="mt-10 md:mt-0">
            <Image src={NotFoundRobot} alt="not-found robot image" />
          </div>
          {/* IMAGE */}
        </div>
      </div>
    </div>
  );
}
