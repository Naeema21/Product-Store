import React, {  useEffect, useState } from "react";

import { Link, Outlet } from "react-router-dom";
// import Logo from "../img/logo.svg";
import { BsBag, BsPersonCircle, BsShopWindow } from "react-icons/bs";


const Header: React.FC = () => {
    // header state
    const [isActive, setIsActive] = useState<boolean>(false);

    // event listener
    useEffect(() => {
        const handleScroll = () => {
            window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <>
            <header
                className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
                    } fixed w-full z-10 lg:px-8 transition-all`}
            >
                <div className="container mx-auto flex items-center justify-between h-full">
                    <Link to={"/"}>
                        <div>
                            <BsShopWindow className="text-[30px] font-bold" />
                        </div>
                    </Link>

                    {/* cart */}
                    <div className="flex gap-5 justify-center align-center">

                        <Link to={'/cart'}
                            className="cursor-pointer flex relative"
                        >
                            <BsBag className="text-2xl" />
                            <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center">
                                2
                            </div>
                        </Link>
                        <Link to={"/login"}>
                            <BsPersonCircle className="text-2xl" />
                        </Link>
                    </div>
                </div>
            </header>
            <Outlet />
        </>
    );
};

export default Header;
