import { usePathname, useRouter } from "next/navigation";


type ResetPathnameButtonProps = {
  buttonText: string;
};

export default function ResetPathnameButton({ buttonText }: ResetPathnameButtonProps) {

    const pathname = usePathname();
    const router = useRouter();
  return(
      <button
          onClick={() => router.push(pathname)}
          className="text-sm text-[#666666] hover:text-[#E8E8E8]  self-end mb-1 cursor-pointer"
        >
          {buttonText}
        </button>)
}