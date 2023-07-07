/* eslint-disable react/prop-types */
export default function VoterForm({ title }) {
    return (
        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
            <div className="col-span-6 sm:col-span-3">
                <h2 className="text-base font-semibold leading-7 text-gray-900 pb-6">
                    { title }
                </h2>
                <p className="text-sm leading-6 text-gray-600">Upload a <strong className="text-gray-900">CSV File</strong> containing the following information: Name, Email, Department, and Year Level</p>
                <div className="mt-2 flex justify-start gap-x-6">
                    <input
                        type="file"
                        // onChange={handleFileChange}
                        className="file-input file-input-bordered w-full max-w-xs" />
                    <button
                        // onClick={handleUpload}
                        className="rounded-md border-2 border-slate-900 px-4 text-sm font-semibold text-slate-900 shadow-sm hover:bg-slate-900 hover:text-white hover:border-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                    >
                        Upload
                    </button>
                </div>
            </div>
        </div>
    )
}
