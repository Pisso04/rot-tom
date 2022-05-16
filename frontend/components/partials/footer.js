import Link from 'next/link'

export default function Footer() {
  return (
    <div className = "flex justify-between px-20 py-4 bg-[#032541] text-white items-center" >
        <Link href="/">
            <a className = "text-xl text-blue-500">StreamBox</a>
        </Link>
        <span className="text-gray-400">StreamBox @ Copyright 2022 - All right reserved </span>
    </div>
  )
}