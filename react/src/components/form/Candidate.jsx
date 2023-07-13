/* eslint-disable react/prop-types */

import { Fragment, useEffect, useState } from "react"
import axiosClient from "../../axios";
import { Link, useParams } from "react-router-dom";
import { CheckIcon, ChevronUpDownIcon, PhotoIcon, PlusIcon } from "@heroicons/react/24/solid";
import { Combobox, Dialog, Transition } from "@headlessui/react";

export default function Candidate() {

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

  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [voters, setVoter] = useState([]);
  const [election, setElection] = useState([]);
  const [candidate, setCandidate] = useState({
    positionID: 0,
    electionID: 0,
    partylistID: 0,
    userID: 0,
    image: null,
    image_url: null,
  });

  const [selectedPerson, setSelectedPerson] = useState("");
  const [query, setQuery] = useState("")

  const [selection, setSelection] = useState({
    partylist: [],
    position: [],
  });

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axiosClient.get(`/positonPartylist/${id}`);

        setSelection(prevState => ({
          ...prevState,
          partylist: response.data.partylist,
          position: response.data.position,
        }));
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setLoading(true);
    axiosClient
      .get(`/showElectionData/${id}`)
      .then((response) => {
        const data = response.data;
        setVoter(data.voters);
        setElection(data.election);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
  }, [id]);

  const filteredPeople =
    query === ''
      ? voters
      : voters.filter((person) =>
        person.name
          .toLowerCase()
          .replace(/\s+/g, '')
          .includes(query.toLowerCase().replace(/\s+/g, ''))
      )

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    const reader = new FileReader();
    reader.onload = () => {
      setCandidate((prevState) => ({
        ...prevState,
        image: file,
        image_url: reader.result,
      }));

      event.target.value = "";
    };
    reader.readAsDataURL(file);
  };


  const handleSelectChange = (event, field) => {
    const selectedValue = event.target.value;
    setCandidate(prevState => ({
      ...prevState,
      [field]: selectedValue,
    }));
  };

  const onSubmit = (ev) => {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    formData.set('userID', candidate.userID); // Set the userID from the selected user in the combobox
    formData.delete('yearLevelID'); // Remove the yearLevelID from the form data
    formData.delete('departmentID'); // Remove the departmentID from the form data
    if (candidate.image) {
      formData.append('fileUpload', candidate.image);
    }


    console.log('Form Data:', formData);
    axiosClient.post(`/candidateStore/${id}`, formData)
      .then(response => {
        setModalContent({
          title: 'Success!',
          message: response.data.message,
        });
        openModal();
      })
      .catch(error => {
        setModalContent({
          title: 'Aw snap!',
          message: Object.values(error.response.data.errors)[0][0],
        });
        openModal();
        console.log(error);
      });
  };

  return (

    <div>
      {loading ? (
        <div className="flex justify-center mt-36 space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
        </div>
      ) : (
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Title */}
              <div className="flex justify-between items-center text-center px-4 py-6 sm:px-6 lg:px-8">
                <h2
                  className="font-semibold leading-7 ml-4 pt-3 text-gray-900 pb-6"
                >
                  Candidate for {election[0]?.electionName}
                </h2>
                <button
                  // onClick={handleAddPos}
                  className="rounded-md border-solid border-2 border-green-900 px-2 py-2 text-sm font-semibold inline-flex items-center text-green-900 shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Another Candidate
                </button>
              </div>
              {/* Title */}

              {/* Combobox for Candidate */}
              <Combobox
                value={selectedPerson}
                onChange={(selectedPerson) => {
                  setSelectedPerson(selectedPerson);
                  setCandidate((prevState) => ({
                    ...prevState,
                    userID: selectedPerson.userID,
                  }));
                }}
              >
                <div className="relative mt-1">
                  <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                      displayValue={(person) => person.name}
                      onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </Combobox.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                    afterLeave={() => setQuery("")}
                  >
                    <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {filteredPeople.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                          Nothing found.
                        </div>
                      ) : (
                        filteredPeople.map((person, index) => (
                          <Combobox.Option
                            key={`${person.id}-${index}`}
                            className={({ active }) =>
                              `relative cursor-default select-none spy-2 pl-10 pr-4 ${active ? 'bg-green-900 text-white' : 'text-gray-900'
                              }`
                            }
                            value={person}
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                    }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span
                                    className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-greenn-900'
                                      }`}
                                  >
                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Combobox.Option>
                        ))
                      )}
                    </Combobox.Options>
                  </Transition>
                </div>
              </Combobox>
              {/* Combobox for Candidate */}

              {/* Select Boxes */}
              <div className='grid lg:grid-cols-2 gap-4 content-start sm:grid-cols-1'>

                {/* Partylist */}
                <div>
                  <label
                    htmlFor="partylist"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Partylist
                  </label>
                  <select
                    name="partylistID"
                    id="partylist"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                    value={candidate.partylistID}
                    onChange={(event) => handleSelectChange(event, 'partylistID')}
                  >
                    {selection.partylist.map && selection.partylist.map((party) => (
                      <option
                        key={party.id}
                        value={party.id}
                      >
                        {party.partylistName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Partylist */}

                {/* Position */}
                <div>
                  <label
                    htmlFor="position"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Position
                  </label>
                  <select
                    name="positionID"
                    id="position"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-900 focus:ring-green-700 sm:text-sm"
                    value={candidate.positionID}
                    onChange={(event) => handleSelectChange(event, 'positionID')}
                  >
                    {selection.position.map && selection.position.map((position) => (
                      <option
                        key={position.id}
                        value={position.id}
                      >
                        {position.positionName}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Position */}

              </div>
              {/* Partylist */}

              {/* Details */}
              <div className='grid lg:grid-cols-2 gap-4 content-start sm:grid-cols-1'>
                {/* For Year Level */}
                <div>
                  <label htmlFor="yearLevel" className='block text-sm font-medium leading-6 text-gray-900'>
                    Year Level: {selectedPerson?.yearLevel}
                  </label>
                  <input
                    type="hidden"
                    id="yearLevelID"
                    name="yearLevelID"
                    value={selectedPerson?.yearLevelID || ''}
                  />
                </div>
                {/* For Year Level */}

                {/* For Department */}
                <div>
                  <label htmlFor="department" className='block text-sm font-medium leading-6 text-gray-900'>
                    Department: {selectedPerson?.department}
                  </label>
                  <input
                    type="hidden"
                    name="departmentID"
                    id="departmentID"
                    value={selectedPerson?.departmentID || ''}
                  />
                </div>
                {/* For Department */}
              </div>
              {/* Details */}

              {/* Candidate Photo */}
              <div className="grid lg:grid-cols-1 gap-4 content-start sm:grid-cols-1">
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  {candidate.image_url && (
                    <img
                      src={candidate.image_url}
                      alt=""
                      className="w-32 h-32 object-cover"
                    />
                  )}
                  {!candidate.image_url && (
                    <span className="flex justify-center  items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="w-8 h-8" />
                    </span>
                  )}
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={handleFileChange}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/* Candidate Photo */}

            </div>

            {/* Submit */}
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
            {/* Submit */}

          </div>
        </form>
      )}
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
    </div>
  )
}