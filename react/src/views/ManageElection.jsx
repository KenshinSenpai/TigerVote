import PageComponent from "../components/PageComponent";
import { Link, useParams } from "react-router-dom";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import axiosClient from "../axios";

export default function ManageElection() {
    const { id } = useParams();

    let [isOpen, setIsOpen] = useState(false);
    let [modalContent, setModalContent] = useState({
        title: '',
        message: '',
        error: null,
    });

    function closeModal() {
        setIsOpen(false);
    }

    function openModal() {
        setIsOpen(true);
    }

    const [election, setElection] = useState({
        yearLevelID: 0,
        departmentID: 0,
        electionName: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: ''
    });

    const [selection, setSelection] = useState({
        yearLevel: [],
        department: [],
    });

    useEffect(() => {
        axiosClient.get(`/elections/${id}`)
            .then(response => {
                const { electionName, departmentID, yearLevelID, electionStart, electionEnd } = response.data[0];
                const startDate = electionStart ? electionStart.split(' ')[0] : '';
                const startTime = electionStart ? electionStart.split(' ')[1] : '';
                const endDate = electionEnd ? electionEnd.split(' ')[0] : '';
                const endTime = electionEnd ? electionEnd.split(' ')[1] : '';

                setElection({
                    electionName,
                    departmentID,
                    yearLevelID,
                    startDate,
                    startTime,
                    endDate,
                    endTime,
                });
            })
            .catch(error => {
                console.log(error);
            });
    }, [id]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const yearLevelResponse = await axiosClient.get('/yearLevel');
                const departmentResponse = await axiosClient.get('/department');

                setSelection(prevState => ({
                    ...prevState,
                    yearLevel: yearLevelResponse.data,
                    department: departmentResponse.data
                }));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setElection((prevState) => ({ ...prevState, [fieldName]: fieldValue }));
    };

    const handleSelectChange = (event, field) => {
        const selectedValue = event.target.value;
        setElection(prevState => ({
          ...prevState,
          [field]: selectedValue,
        }));
      };

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData.entries());

        axiosClient.put(`/createElection/${id}`, data)
            .then(response => {
                setModalContent({
                    title: 'Success!',
                    message: response.data.message,
                    errors: null,
                });
                openModal();
                history.push('/elections');
            })
            .catch(error => {
                setModalContent({
                    title: 'Aw snap!',
                    message: Object.values(error.response.data.errors)[0][0],
                    errors: error.response.data.errors
                });
                openModal();
            });
    };

    return (
        <div>
            <PageComponent title="Create New Election">
                <form action="#" method='POST' onSubmit={onSubmit}>
                   
                    <div className="shadow sm:overflow-hidden sm:rounded-md">
                        <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
                            {/* Title */}
                            <div className="col-span-6 sm:col-span-3">
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
                                    value={election.electionName ?? ''}
                                    placeholder='Election Name'
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-900 sm:text-sm"
                                    onChange={handleInputChange}
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
                                            name="yearLevelID"
                                            id="yearLevel"
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6'
                                            onChange={(event) => handleSelectChange(event, 'yearLevelID')}
                                            value={election.yearLevelID}
                                        >
                                            {selection.yearLevel && selection.yearLevel.map(yearLevel => (
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
                                            name="departmentID"
                                            id="department"
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6'
                                            onChange={(event) => handleSelectChange(event, 'departmentID')}
                                            value={election.departmentID}
                                        >
                                            {selection.department && selection.department.map(department => (
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
                                        value={election.startDate ?? ''}
                                        onChange={(ev) => setElection({ ...election, startDate: ev.target.value })}
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
                                        value={election.startTime ?? ''}
                                        onChange={(ev) => setElection({ ...election, startTime: ev.target.value })}
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
                                            value={election.endDate ?? ''}
                                            onChange={(ev) => setElection({ ...election, endDate: ev.target.value })}
                                            placeholder="yyyy-MM-dd"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="startTime"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            End Time
                                        </label>
                                        <input
                                            type="time"
                                            name="endTime"
                                            id="endTime"
                                            value={election.endTime ?? ''}
                                            onChange={(ev) => setElection({ ...election, endTime: ev.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                            {/* Election Start Date and Time */}

                            {/* Add Voter to Election */}
                            <div className="border-b border-gray-900/10 pb-8">
                                <div className="grid lg:grid-cols-2 gap-4 content-start sm:grid-cols-1">
                                    <div>
                                        <label
                                            htmlFor="endDate"
                                            className="block text-sm font-medium text-gray-700"
                                        >
                                            Add Batch Voters
                                        </label>
                                    </div>
                                </div>
                            </div>
                            {/* Add Voter to Election */}
                        </div>

                        <div className="mt-6 mb-6 flex items-center justify-end mr-6 gap-x-6">
                            <Link
                                type="button"
                                className="text-sm font-semibold leading-6 text-gray-900 hover:text-red-700 hover:border-2 hover:border-red-700"
                                to="/elections"
                            >
                                Cancel
                            </Link>
                            <button
                                type="submit"
                                onSubmit={onSubmit}
                                className="rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                            >
                                Save
                            </button>
                        </div>

                    </div>
                </form>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog as="div" className="relative z-10" onClose={closeModal}>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-black bg-opacity-25" />
                        </Transition.Child>

                        <div className="fixed inset-0 overflow-y-auto">
                            <div className="flex min-h-full items-center justify-center p-4 text-center">
                                <Transition.Child
                                    as={Fragment}
                                    enter="ease-out duration-300"
                                    enterFrom="opacity-0 scale-95"
                                    enterTo="opacity-100 scale-100"
                                    leave="ease-in duration-200"
                                    leaveFrom="opacity-100 scale-100"
                                    leaveTo="opacity-0 scale-95"
                                >
                                    <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg font-medium leading-6 text-gray-900"
                                        >
                                            {modalContent.title}
                                        </Dialog.Title>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {modalContent.message}
                                            </p>
                                            {modalContent.errors && (
                                                <ul className="mt-2 list-disc list-inside text-sm text-red-500">
                                                    {Object.values(modalContent.errors).map((error, index) => (
                                                        <li key={index}>{error[0]}</li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>

                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={closeModal}
                                            >
                                                Got it, thanks!
                                            </button>
                                        </div>
                                    </Dialog.Panel>
                                </Transition.Child>
                            </div>
                        </div>
                    </Dialog>
                </Transition>
            </PageComponent>
        </div>
    )
}
