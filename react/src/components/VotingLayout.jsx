/* eslint-disable no-unused-vars */
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { ArrowRightOnRectangleIcon, Bars3Icon, UserIcon, XMarkIcon } from '@heroicons/react/24/solid'
import { Navigate } from 'react-router-dom'
import { useStateContext } from '../contexts/ContextProvider'
import logo from '../assets/TigerVoteWhite.png'
import axiosClient from "../axios"
import VotingForm from '../views/VotingForm'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function VotingLayout() {
    const { currentUser, userToken, setCurrentUser, setUserToken, currentRole } = useStateContext();

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

    const userID = currentUser.id;
    const [loading, setLoading] = useState(false);
    const [voter, setVoter] = useState([{
        id: 0,
        name: "",
        department: "",
        yearLevel: "",
        electionName: "",
    }]);

    const [election, setElection] = useState([{
        name: "",
        image: "",
        partylistAbvr: "",
        positionName: "",
        electionName: "",
        positionID: 0,
    }]);

    useEffect(() => {
        axiosClient.get(`/showVoter/${userID}`)
            .then(response => {
                const voterData = response.data;
                setVoter(voterData);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const voterId = voter[0].id;

    useEffect(() => {
        if (voter.length > 0) {
            setLoading(true);
            const electionID = voter[0].id;
            axiosClient.get(`/showElection/${electionID}`)
                .then(response => {
                    const electionData = response.data;
                    setElection(electionData);
                    console.log('election', electionData);
                    setLoading(false);
                })
                .catch(error => {
                    console.log(error);
                    setLoading(false);
                });
        }
    }, [voter]);

    const positionIds = [...new Set(election.map((item) => item.positionID))];

    const getPositionName = (positionId) => {
        const position = election.find((item) => item.positionID === positionId);
        return position ? position.positionName : "";
    };

    const [selectedCandidateId, setSelectedCandidateId] = useState(null);
    const [selectedCandidates, setSelectedCandidates] = useState({});

    const handleVoteButtonClick = (candidateId, positionId) => {
        if (selectedCandidates[positionId] === candidateId) {
            setSelectedCandidates((prevSelectedCandidates) => {
                const updatedCandidates = { ...prevSelectedCandidates };
                delete updatedCandidates[positionId];
                return updatedCandidates;
            });
        } else {
            setSelectedCandidates((prevSelectedCandidates) => ({
                ...prevSelectedCandidates,
                [positionId]: candidateId,
            }));
        }
    };

    const handleSubmitVote = () => {
        // Retrieve the selected candidates
        const selectedCandidateIds = Object.values(selectedCandidates);
        console.log("Selected Candidates:", selectedCandidateIds);

        // Create an array of vote objects
        const voteData = selectedCandidateIds.map((candidateId) => ({
            voterID: voterId,
            candidateID: candidateId,
        }));

        axiosClient.post('/castVote', voteData)
            .then((response) => {
                setModalContent({
                    title: 'Success!',
                    message: response.data.message,
                  });
                  openModal();
            })
            .catch((error) => {
                setModalContent({
                    title: 'Aw snap!',
                    message: Object.values(error.response.data.errors)[0][0],
                  });
                  openModal();
                  console.log(error);
            });
    };


    if (!userToken) {
        return <Navigate to='login' />
    }

    if (currentRole !== 3) {
        return <Navigate to="/dashboard" />;
    }

    const logout = () => {
        axiosClient.post('/logout', { redirect: '/' }).then((res) => {
            setCurrentUser({});
            setUserToken(null);
            window.location.href = '/';
        });
    };


    return (
        <>
            <div>
                <Disclosure as="nav" className="bg-green-800">
                    {({ open }) => (
                        <>
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="flex h-16 items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="flex-shrink-0">
                                            <img
                                                className="h-8"
                                                src={logo}
                                                alt="Your Company"
                                            />
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-10 flex items-baseline space-x-4">
                                                <div
                                                    className="text-base font-medium leading-none text-white"
                                                >
                                                    Hello, {currentUser.name}</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="hidden md:block">
                                        <div className="ml-4 flex items-center md:ml-6">
                                            {/* Profile dropdown */}
                                            <Menu as="div" className="relative ml-3">
                                                <div>
                                                    <Menu.Button className="flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                        <span className="sr-only">Open user menu</span>
                                                        <UserIcon className='w-8 h-8 bg-white p-2 rounded-full text-green-800' />
                                                    </Menu.Button>
                                                </div>
                                                <Transition
                                                    as={Fragment}
                                                    enter="transition ease-out duration-100"
                                                    enterFrom="transform opacity-0 scale-95"
                                                    enterTo="transform opacity-100 scale-100"
                                                    leave="transition ease-in duration-75"
                                                    leaveFrom="transform opacity-100 scale-100"
                                                    leaveTo="transform opacity-0 scale-95"
                                                >
                                                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                        <Menu.Item>
                                                            <a
                                                                href="#"
                                                                onClick={logout}
                                                                className={'block px-4 py-2 text-sm text-gray-700'}
                                                            >
                                                                Sign out
                                                            </a>
                                                        </Menu.Item>
                                                    </Menu.Items>
                                                </Transition>
                                            </Menu>
                                        </div>
                                    </div>
                                    <div className="-mr-2 flex md:hidden">
                                        {/* Mobile menu button */}
                                        <Disclosure.Button className="inline-flex items-center justify-center rounded-md bg-slate-50 p-2 text-green-800 hover:bg-slate-50 hover:text-green-800 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-800">
                                            <span className="sr-only">Open main menu</span>
                                            {open ? (
                                                <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                                            ) : (
                                                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                                            )}
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </div>

                            <Disclosure.Panel className="md:hidden">
                                <div className="border-t border-gray-700 pb-3 pt-4">
                                    <div className="flex items-center px-5">
                                        <div className="flex-shrink-0">
                                            <UserIcon />
                                        </div>
                                        <div className="ml-3">
                                            <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                                            <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                                        </div>
                                    </div>
                                    <div className="mt-3 space-y-1 px-2">
                                        <Disclosure.Button
                                            as="a"
                                            href="#"
                                            onClick={logout}
                                            className="flex items-center rounded-md px-3 py-2 text-base font-medium text-white hover:border-red-800 hover:white"
                                        >
                                            Sign out <ArrowRightOnRectangleIcon className='text-white h-6 pl-2' />
                                        </Disclosure.Button>
                                    </div>
                                </div>
                            </Disclosure.Panel>
                        </>
                    )}
                </Disclosure>

                <header className="text-center">
                    <h2 className="text-xl font-bold text-gray-900 sm:text-3xl mt-8">
                        {voter[0].electionName}
                    </h2>
                </header>
                {loading ? (
                    <div className="flex justify-center mt-36 space-x-2">
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
                    </div>
                ) : (
                    <div className="shadow-lg sm:overflow-hidden sm:rounded-md">
                        <div className='space-y-6 bg-white px-4 py-5 sm:p-6'>
                            {positionIds.map((positionId, index) => (
                                <div key={index}>
                                    <div className="flex justify-between items-center text-center px-4 py-6 sm:px-6 lg:px-8">
                                        <h2 className="font-semibold leading-7 ml-4 pt-3 text-gray-900 pb-6">{getPositionName(positionId)}</h2>
                                    </div>

                                    <div className="flex justify-evenly border-b-2 pb-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                                        {election
                                            .filter((item) => item.positionID === positionId)
                                            .map((item, index) => (
                                                <div key={index}>
                                                    <div className="max-w-xs rounded-md shadow-md bg-green-900 border-4 border-green-900 text-gray-100">
                                                        <img
                                                            src={`http://localhost:8000/storage/${item.image}`}
                                                            alt=""
                                                            className="object-cover object-center w-full rounded-t-md h-72 bg-gray-500"
                                                        />
                                                        <div className="flex flex-col justify-between p-6 space-y-8">
                                                            <div className="space-y-2">
                                                                <h2 className="text-3xl font-semibold tracking">{item.name}</h2>
                                                                <p className="text-gray-100">{item.positionName}</p>
                                                                <p className="text-gray-50">{item.partylistAbvr}</p>
                                                            </div>
                                                            <button
                                                                type="button"
                                                                className={`flex items-center justify-center w-full p-3 font-semibold rounded-md ${selectedCandidates[positionId] === item.id ? "bg-green-900 border-2 border-white text-white" : "bg-white text-green-900"
                                                                    }`}
                                                                disabled={selectedCandidates[positionId] !== undefined && selectedCandidates[positionId] !== item.id}
                                                                onClick={() => handleVoteButtonClick(item.id, positionId)}
                                                            >
                                                                {selectedCandidates[positionId] === item.id ? "Voted" : "Vote"}
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-center mt-8 mx-2">
                            <button
                                type="button"
                                className="px-4 py-2 font-semibold rounded-md bg-green-900 text-white"
                                disabled={Object.keys(selectedCandidates).length === 0}
                                onClick={handleSubmitVote}
                            >
                                Submit Vote
                            </button>
                        </div>
                    </div>

                )}
            </div>

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
        </>
    )
}
