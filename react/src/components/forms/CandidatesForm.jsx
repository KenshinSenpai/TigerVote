/* eslint-disable react/prop-types */
import { UserCircleIcon } from "@heroicons/react/24/solid"

function CandidatesForm({ title, electionName, partylist, positions, selectionData, formData }) {
    return (
        <div className="border-b border-gray-900/10 pb-12">
            <div className="flex justify-between items-center px-4 py-6 sm:px-6 lg:px-8">
                <h2 className="text-base font-semibold ml-4 text-gray-900">
                    {title} for {electionName}
                </h2>
            </div>
            <div className="grid grid-cols-3 gap-3 mx-4 content-start sm:grid-cols-1 ">
                {positions.map((position, index) => (
                    <div key={index} className="border-b border-green-900/40 py-12">
                        <div className="flex-1 px-2">
                            <label className="col-span-1 text-sm font-medium leading-6 text-gray-900">
                                For the position of {position.positionName}
                            </label>

                            <div className="col-span-2 grid-flow-row mt-1.5">
                                <input
                                    type="text"
                                    list="users"
                                    id="candidate"
                                    className="w-full rounded-lg border-green-900 pe-10 text-gray-700 focus:border-green-700 sm:text-sm [&::--webkit-calendar-picker-indicator]:opacity-0"
                                    placeholder="Name of the Candidate"

                                />
                            </div>
                        </div>

                        <div className="flex">
                            <div className="flex-1 mt-4 px-2">
                                <label htmlFor="partylist" className="block text-sm font-medium leading-6 text-gray-900">
                                    Partylist
                                </label>
                                <select
                                    name="partylist"
                                    id="partylist"
                                    className="flex-auto w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
                                >
                                    {partylist.map((partylist, index) => (
                                        <option
                                            key={index}
                                            value={partylist.partylistName ?? ''}
                                        >
                                            {partylist.partylistName}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 mt-4 px-2">
                                <label htmlFor="yearLevel" className='block text-sm font-medium leading-6 text-gray-900'>
                                    Year Level
                                </label>
                                <select
                                    name="yearLevel"
                                    id="yearLevel"
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6'
                                    // onChange={(ev) => setFormData({ ...formData, yearLevelID: ev.target.value })}
                                    value={formData.yearLevelID ?? ''}
                                >
                                    {selectionData.yearLevel && selectionData.yearLevel.map(yearLevel => (
                                        <option key={yearLevel.id} value={yearLevel.id}>
                                            {yearLevel.yearLevel}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1 mt-4 px-2">
                                <label htmlFor="department" className='block text-sm font-medium leading-6 text-gray-900'>
                                    Department
                                </label>
                                <select
                                    name="department"
                                    id="department"
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6'
                                    // onChange={(ev) => setFormData({ ...formData, departmentID: ev.target.value })}
                                    value={formData.departmentID ?? ''}
                                >
                                    {selectionData.department && selectionData.department.map(department => (
                                        <option key={department.id} value={department.id}>
                                            {department.departmentName}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="flex-1 mt-4 px-2">
                            <label htmlFor="bio" className="block text-sm font-medium leading-6 text-gray-900">Photo</label>
                            <div className="flex items-center space-x-2 py-1.5">
                                <img src="https://source.unsplash.com/30x30/?random" alt="" className="w-24 h-24 rounded bg-gray-700" />
                                <button type="button" className="px-4 py-2 border rounded-md dark:border-gray-100">Change</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CandidatesForm
