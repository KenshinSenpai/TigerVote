/* eslint-disable react/prop-types */
export default function ElectionInformationForm({ title, formData, setFormData, selectionData }) {
    return (
        <div>
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                {/* Title */}
                <div className="col-span-6 sm:col-span-3">
                    <h2 className="text-base align-middle font-semibold leading-7 pb-8 text-gray-900">
                        {title}
                    </h2>
                    <label
                        htmlFor="title"
                        className='block text-sm font-medium text-gray-700'
                    >
                        Election Name
                    </label>
                    <input
                        type="text"
                        name='electionName'
                        id='title'
                        value={formData.electionName ?? ''}
                        placeholder='Election Name'
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-900 sm:text-sm"
                        onChange={(ev) => setFormData({ ...formData, electionName: ev.target.value })}
                    />
                </div>
                {/* Title */}

                {/* Select Boxes */}
                <div className='grid lg:grid-cols-2 gap-4 content-start sm:grid-cols-1'>

                    {/* For Year Level */}
                    <div>
                        <label htmlFor="yearLevel" className='block text-sm font-medium leading-6 text-gray-900'>
                            Year Level
                        </label>
                        <div className='mt-2'>
                            <select
                                name="yearLevel"
                                id="yearLevel"
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6'
                                onChange={(ev) => setFormData({ ...formData, yearLevelID: ev.target.value })}
                                value={formData.yearLevelID ?? ''}
                            >
                                {selectionData.yearLevel && selectionData.yearLevel.map(yearLevel => (
                                    <option key={yearLevel.id} value={yearLevel.id}>
                                        {yearLevel.yearLevel}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    {/* For Year Level */}

                    {/* For Department */}
                    <div>
                        <label htmlFor="department" className='block text-sm font-medium leading-6 text-gray-900'>
                            Department
                        </label>
                        <div className='mt-2'>
                            <select
                                name="department"
                                id="department"
                                className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6'
                                onChange={(ev) => setFormData({ ...formData, departmentID: ev.target.value })}
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
                    {/* For Department */}
                </div>
                {/* Select Boxes */}

                {/* Election Start Date and Time */}
                <div className='grid lg:grid-cols-2 gap-4 content-start sm:grid-cols-1'>
                    <div>
                        <label
                            htmlFor="startDate"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Starting Date
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            id="startDate"
                            value={formData.startDate ?? ''}
                            onChange={(ev) => setFormData({ ...formData, startDate: ev.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="startTime"
                            className="block text-sm font-medium text-gray-700"
                        >
                            Starting Time
                        </label>
                        <input
                            type="time"
                            name="startTime"
                            id="startTime"
                            value={formData.startTime ?? ''}
                            onChange={(ev) => setFormData({ ...formData, startTime: ev.target.value })}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                        />
                    </div>
                </div>
                {/* Election Start Date and Time */}

                {/* Election End Date and Time */}
                <div className="border-b border-gray-900/10 pb-8">
                    <div className='grid lg:grid-cols-2 gap-4 content-start sm:grid-cols-1'>
                        <div>
                            <label
                                htmlFor="endDate"
                                className="block text-sm font-medium text-gray-700"
                            >
                                End Date
                            </label>
                            <input
                                type="date"
                                name="endDate"
                                id="endDate"
                                value={formData.endDate ?? ''}
                                onChange={(ev) => setFormData({ ...formData, endDate: ev.target.value })}
                                placeholder="yyyy-MM-dd"
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="endTime"
                                className="block text-sm font-medium text-gray-700"
                            >
                                End Time
                            </label>
                            <input
                                type="time"
                                name="endTime"
                                id="endTime"
                                value={formData.endTime ?? ''}
                                onChange={(ev) => setFormData({ ...formData, endTime: ev.target.value })}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                            />
                        </div>
                    </div>
                </div>
                {/* Election Start Date and Time */}
            </div>
        </div>
    )
}
