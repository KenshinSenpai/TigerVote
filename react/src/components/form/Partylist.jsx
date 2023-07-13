import { Fragment, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";
import axiosClient from "../../axios";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid"
import { Dialog, Transition } from "@headlessui/react";

export default function Position() {

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
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState({
    electionName: '',
  });

  const [partylist, setPartylist] = useState([{ partylistName: '', partylistAbvr: '', electionID: '' }])

  const handlePartylistChange = (index, field, value) => {
    const updatedPartylist = [...partylist];
    updatedPartylist[index][field] = value;
    setPartylist(updatedPartylist);
  };

  const handleAddParty = (event) => {
    event.preventDefault();
    setPartylist([...partylist, { partylistName: '', partylistAbvr: '', electionID: `${id}`}]);
  };

  const handleRemoveField = (index) => {
    const updatedPartylist = [...partylist];
    updatedPartylist.splice(index, 1);
    setPartylist(updatedPartylist);
  }

  useEffect(() => {
    setLoading(true);
    axiosClient.get(`/elections/${id}`)
      .then(response => {
        const { electionName } = response.data[0];
        setElection({ electionName });
        setLoading(false);

        setPartylist(prevPartylist =>
          prevPartylist.map(partylist => ({
            ...partylist,
            electionID: `${id}`
          }))
        );
      });
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();
    const newPartylist = [...partylist, { partylistName: '', partylistAbvr: '', electionID: `${id}` }]
    const filteredPartylist = newPartylist.filter(partylist => partylist.partylistName !== '' && partylist.partylistAbvr !== '');
    
    const convertedPartylist = filteredPartylist.map(partylist => ({
      ...partylist,
      electionID: parseInt(partylist.electionID, 10)
    }));

    setPartylist(convertedPartylist);
    console.log(convertedPartylist);

    axiosClient.post("/elections/partylist", convertedPartylist)
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
  }

  return (
    <div>
      {loading &&
        <div className="flex justify-center mt-36 space-x-2">
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
          <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
        </div>
      }
      {!loading && (
        <form action="#" method='POST' onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Title */}
              <div className="flex justify-between items-center text-center px-4 py-6 sm:px-6 lg:px-8">
                <h2
                  className="font-semibold leading-7 ml-4 pt-3 text-gray-900 pb-6"
                >
                  Partylist for {election.electionName}
                </h2>
                <button
                  onClick={handleAddParty}
                  className="rounded-md border-solid border-2 border-green-900 px-2 py-2 text-sm font-semibold inline-flex items-center text-green-900 shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                >
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Another Partylist
                </button>
              </div>
              {/* Title */}

              {/* Input Boxes */}
              <div className="grid grid-cols-3 gap-4 mx-4 content-start sm:grid-cols-1">
                {partylist.map((partylist, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="flex-auto">
                      <label
                        htmlFor={`partylistName-${index}`}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Partylist Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name={`partylistName-${index}`}
                          id={`partylistName-${index}`}
                          placeholder="e.g. President"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
                          value={partylist.partylistName ?? ''}
                          onChange={(e) =>
                            handlePartylistChange(index, 'partylistName', e.target.value)
                          }
                        />
                      </div>
                    </div>

                    <div className='flex-auto'>
                      <label
                        htmlFor={`partylistAbrv-${index}`}
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Partylist Abbreviation
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name={`partylistAbrv-${index}`}
                          id={`partylistAbrv-${index}`}
                          placeholder="e.g. Pres"
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm sm:leading-6"
                          value={partylist.partylistAbvr ?? ''}
                          onChange={(e) =>
                            handlePartylistChange(index, 'partylistAbvr', e.target.value)
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
