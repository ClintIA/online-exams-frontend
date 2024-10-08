import React from 'react';
import logoClintia from '../assets/logoClintia.png';

const LoginAdmin: React.FC = () => {
    return (
        <div className="gradient-form bg-oxfordBlue">
            <div className="container h-screen w-max m-auto">
                <div
                    className="flex h-full items-center justify-center text-neutral-800 dark:text-neutral-200">
                    <div className="w-full">
                        <div
                            className="block rounded-lg bg-oxfordBlue shadow-lg shadow-amber-100 dark:bg-neutral-800">
                            <div className="flex justify-center">

                                <div className="text-center">
                                    <h3
                                    className="mb-12 mt-1 pb-1 text-sm tracking-widest text-white font-semibold">
                                    Acesso Admin
                                </h3>
                                    <div className="md:mx-6 md:p-12">
                                        {/* Logo */}
                                        <div className="text-center">
                                            {/* Logo */}
                                            <div className="p-6">
                                                <img src={logoClintia} alt="Logo"
                                                     className="w-30 mb-4 shadow shadow-amber-50"/>
                                            </div>
                                            <h4 className="mb-12 mt-1 pb-1 text-xl tracking-widest text-white font-semibold">
                                                Bem vindo a ClintIA.
                                            </h4>
                                        </div>

                                        <form>
                                            {/* Username Input */}
                                            <div className="relative mb-4">
                                                <input
                                                    type="text"
                                                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 tracking-widest motion-reduce:transition-none focus:text-white dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="adminEmail"
                                                    placeholder="Email"/>
                                                <label
                                                    htmlFor="adminEmail"
                                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-200 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.9] peer-focus:text-gray-300 peer-data-[twe-input-state-active]:-translate-y-[1.0rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
                                                >Email
                                                </label>

                                            </div>
                                            <div className="relative mb-4">
                                                <input
                                                    type="password"
                                                    className="peer block min-h-[auto] w-full rounded border-2 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-gray-300 data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:text-white dark:text-white dark:placeholder:text-gray-300 dark:autofill:shadow-autofill dark:peer-focus:text-gray-300 [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                                                    id="password"
                                                    placeholder="Senha"/>
                                                <label
                                                    htmlFor="password"
                                                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-gray-200 transition-all duration-200 ease-out peer-focus:-translate-y-[1.5rem] peer-focus:scale-[0.9] peer-focus:text-gray-300 peer-data-[twe-input-state-active]:-translate-y-[1.0rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-gray-300 dark:peer-focus:text-gray-300"
                                                >Senha
                                                </label>
                                            </div>

                                            {/* Submit Button */}
                                            <div className="mb-12 pb-1 pt-1 text-center">
                                                <button
                                                    className="mb-3 inline-block w-full bg-gray-800 hover:bg-amber-100 hover:text-black rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                                    type="submit"
                                                >
                                                    Acessar
                                                </button>
                                            </div>

                                        </form>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginAdmin;
