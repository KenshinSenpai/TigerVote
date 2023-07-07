/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import cartwheel from "../../assets/emoji.svg"

function Beshy() {
    const [inputText, setInputText] = useState('');

    const handleInputChange = (event) => {
        const { value } = event.target;
        setInputText(value.replace(/ /g, '🤸'));
    };
    return (
        <div className="mx-48 mt-48 py-auto flex flex-col items-center rounded-xl shadow-lg bg-green-50 p-4 text-white dark:bg-white dark:text-slate-400 md:p-12">
            <div className="inline-flex items-center">
                <div className="mr-2 h-10 w-10 fill-current text-green-900 dark:text-green-900">
                    <img src={cartwheel} alt="" />
                </div>
                <h2 className="text-green-900 dark:text-green-900 text-5xl font-semibold">Beshy-inator</h2>
                <div className="ml-2 h-10 w-10 fill-current text-green-900 dark:text-green-900">
                    <img src={cartwheel} alt="" />
                </div>
            </div>
            <p className="mt-6 mb-6 max-w-2xl text-center text-green-900 dark:text-green-900">Para 'di ka na malungkot maglagay ng 🤸 sa bawat salita mo beshy!</p>
            <div className="my-2 w-96">
                <label
                    htmlFor="beshyInput"
                    className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-yellow-500"
                >
                    <input
                        type="text"
                        id="beshyInput"
                        placeholder="Type ka na beshy!"
                        value={inputText}
                        onChange={handleInputChange}
                        className="peer h-16 w-full border-none text-green-900 bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-lg"
                    />
                    <span
                        className="absolute start-0 top-2 -translate-y-1/2 text-xs text-green-900 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                    >
                        Go Beshy!
                    </span>
                </label>
            </div>
            <button className="rounded-2xl bg-white px-4 py-3 font-bold text-green-900">Go Beshy!</button>
        </div>
    )
}

export default Beshy
