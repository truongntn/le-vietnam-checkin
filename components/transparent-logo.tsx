import Image from "next/image"

export function TransparentLogo() {
  return (
    <div className="relative w-[200px] h-[100px]">
      <Image
        src="/images/le-vietnam-logo.png"
        alt="LE VIETNAM - Vietnamese French Cafe"
        fill
        sizes="200px"
        priority
        className="object-contain"
        style={{
          backgroundColor: "transparent",
          objectFit: "contain",
          objectPosition: "center",
        }}
      />
    </div>
  )
}
