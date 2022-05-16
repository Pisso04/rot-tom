import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Link from "next/link"

export default function Home() {
  return (
    <div>
      <div className="w-full">
        <h1 className="text-9xl w-full mb-10 text-gray-800 font-bold relative">
          All new best entertaiment !!!
          <Link href={"/movies"}>
              <a className="absolute px-8 text-5xl py-3 top-20 right-20 animate-pulse rounded-full text-white bg-gray-800">View latest </a>
          </Link>
        </h1>
        <img
          src="https://i.ytimg.com/vi/-q0AtzqOhSw/maxresdefault.jpg"
          alt="fgsfgfsgdfgsf"
          className="w-full h-[90vh] rounded-xl object-cover object-center"
        />
      </div>
    </div>
  );
}
