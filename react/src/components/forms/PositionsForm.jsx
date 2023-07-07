/* eslint-disable react/prop-types */
import { PlusIcon, TrashIcon } from '@heroicons/react/24/solid';

function PositionsForm({ title, positions, setPositions, electionName }) {

    const handlePositionChange = (index, field, value) => {
        const updatedPositions = [...positions];
        updatedPositions[index][field] = value;
        setPositions(updatedPositions);
    };

    const handleRemoveField = (index) => {
        const updatedPositions = [...positions];
        updatedPositions.splice(index, 1);
        setPositions(updatedPositions);
    }

    const handleAddPos = (event) => {
        event.preventDefault();
        setPositions([...positions, { positionName: '', positionAbvr: '' }]);
    };

    return (
        <div className="border-b border-gray-900/10 pb-12">
            <div className='flex justify-between items-center text-center px-4 py-6 sm:px-6 lg:px-8'>
                <h2 className="font-semibold leading-7 ml-4 text-gray-900 pb-6">
                    {title} For {electionName}
                </h2>
                <button
                    onClick={handleAddPos}
                    className="rounded-md border-solid border-2 border-green-900 px-2 py-2 text-sm font-semibold inline-flex items-center text-green-900 shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                >
                    <PlusIcon className="w-4 h-4 mr-2" />
                    Add another position

                </button>
            </div>
            <div className="grid grid-cols-3 gap-4 mx-4 content-start sm:grid-cols-1">
                {positions.map((position, index) => (
                    <div key={index} className='flex items-center gap-4'>
                        <div className='flex-auto'>
                            <label
                                htmlFor={`positionName-${index}`}
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Position Name
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name={`positionName-${index}`}
                                    id={`positionName-${index}`}
                                    placeholder="e.g. President"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
                                    value={position.positionName ?? ''}
                                    onChange={(e) =>
                                        handlePositionChange(index, 'positionName', e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className='flex-auto'>
                            <label
                                htmlFor={`positionAbrv-${index}`}
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                Position Abbreviation
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name={`positionAbrv-${index}`}
                                    id={`positionAbrv-${index}`}
                                    placeholder="e.g. Pres"
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
                                    value={position.positionAbvr ?? ''}
                                    onChange={(e) =>
                                        handlePositionChange(index, 'positionAbvr', e.target.value)
                                    }
                                />
                            </div>
                        </div>

                        <div className='flex-none self-end pb-2'>
                            <TrashIcon
                                className='h-6 w-6 py-1 text-center scale-125 text-red-700 rounded-full border border-red-700 hover:text-white hover:bg-red-700 hover:border-white'
                                onClick={() => handleRemoveField(index)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PositionsForm;
