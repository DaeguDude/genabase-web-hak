import Image from "next/image";
import Link from "next/link";
import NotFoundRobot from "@/public/not-found.png";

export default function NotFound() {
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
              We {"can't"} seem to find the page {"you're"} looking for.
            </div>
            <div className="mt-8 font-bold text-gray-500">Error Code: 404</div>
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
