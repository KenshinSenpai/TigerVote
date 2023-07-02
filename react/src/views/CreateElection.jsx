import { Fragment, useEffect, useState } from 'react';
import PageComponent from '../components/PageComponent'
import axios from '../axios';
import { Dialog, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';

export default function CreateElection() {
    
    let [isOpen, setIsOpen] = useState(false);
    let [modalContent, setModalContent] = useState({
        title: '',
        message: ''
    });

    function closeModal() {
        setIsOpen(false);
    }
    
    function openModal() {
        setIsOpen(true);
    }

    const [startDate, setStartDate] = useState('');
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');
    const [endDate, setEndDate] = useState('');

    const [election, setElection] = useState({
        yearLevel: [],
        department: [],
        electionName: ''
    });
      
    useEffect(() => {
    axios.get('/yearLevel')
        .then(response => {
        setElection(prevState => ({ ...prevState, yearLevel: response.data }));
        })
        .catch(error => {
        console.log(error);
        });
    
    axios.get('/department')
        .then(response => {
        setElection(prevState => ({ ...prevState, department: response.data }));
        })
        .catch(error => {
        console.log(error);
        });
    }, []);

    const handleInputChange = (event) => {
        const fieldName = event.target.name;
        const fieldValue = event.target.value;
        setElection(prevState => ({ ...prevState, [fieldName]: fieldValue }));
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target);
        const data = Object.fromEntries(formData.entries());
        
        axios.post('/createElection', data)
            .then(response => {
                setModalContent({
                    title: 'Success!',
                    message: response.data.message,
                });
                openModal();
                history.push('/elections');
            })
            .catch(error => {
                setModalContent({
                    title: 'Aw snap!',
                    message: Object.values(error.response.data.errors)[0][0],
                });
                openModal();
            });
    };

    return (
        <PageComponent title="Create New Election">
            <form action="#" method='POST' onSubmit={ onSubmit }>
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
                                value={ election.electionName }
                                placeholder='Election Name'
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-900 sm:text-sm"
                                onChange={ handleInputChange }
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
                                >
                                    {election.yearLevel.map(yearLevel => (
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
                                    >
                                        {election.department.map(department => (
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
                                    value={ startDate }
                                    onChange={ e =>setStartDate(e.target.value) }
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
                                    value={ startTime }
                                    onChange={ e => setStartTime(e.target.value) }
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
                                        value={ endDate }
                                        onChange={ e =>setEndDate(e.target.value) }
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
                                        value={ endTime }
                                        onChange={ e => setEndTime(e.target.value) }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                                    />
                                </div>
                            </div>
                        </div>
                        {/* Election Start Date and Time */}
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
                            onSubmit={ onSubmit }
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
                        as={ Fragment }
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
    )
}
