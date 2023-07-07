import PageComponent from "./PageComponent";
import { ChevronDoubleLeftIcon, ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import ElectionInformationForm from "./forms/ElectionInformationForm";
import { useEffect, useState } from "react";
import VoterForm from "./forms/VoterForm";
import axiosClient from "../axios";
import PositionsForm from "./forms/PositionsForm";
import PartylistForm from "./forms/PartylistForm";
import CandidatesForm from "./forms/CandidatesForm";


export default function StepForm() {
    const FormTitles = ["Election Information", "Add Positions", "Add Partylists", "Add Candidates", "Add Voters"];
    
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(true);
    const [nButton, setNButton] = useState("Next")

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
    
    const [positions, setPositions] = useState([{ positionName: '', positionAbvr: '' }]);
    const [partylist, setPartylist] = useState([{ partylistName: '', partylistAbrv: ''}]);
    const [candidates, setCandidates] = useState([{ candidateName: '', partylistID: '', yearLevelID: '', departmentID: '', positionName: '', }]);

    const pageDisplay = () => {
        switch (page) {
            case 0:
                return <ElectionInformationForm title={FormTitles[page]} formData={election} selectionData={selection} setFormData={setElection} />
            case 1:
                return <PositionsForm title={FormTitles[page]} electionName={election.electionName} positions={positions} setPositions={setPositions}/>
            case 2:
                return <PartylistForm title={FormTitles[page]} electionName={election.electionName} partylist={partylist} setPartylist={setPartylist} />
            case 3:
                return <CandidatesForm title={FormTitles[page]} electionName={election.electionName} partylist={partylist} positions={positions} selectionData={selection} formData={election} />
            case 4:
                return <VoterForm title={FormTitles[page]} candidates={candidates} setCandidates={setCandidates} />
            default:
                break;
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const yearLevelResponse = await axiosClient.get('/yearLevel');
                const departmentResponse = await axiosClient.get('/department');

                setSelection(prevState => ({
                    ...prevState,
                    yearLevel: yearLevelResponse.data,
                    department: departmentResponse.data
                }));
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleNextPage = (event) => {
        event.preventDefault();
        if (page == 4) {
            setNButton("Submit");
            console.log(election);
        } else {
            setPage((cPage) => cPage + 1);
        }
    };

    const handlePrevPage = (event) => {
        event.preventDefault();
        setPage((cPage) => cPage - 1);
    };

    return (
        <>
            <PageComponent title="Create New Election">
                {loading && 
                    <div className="flex justify-center space-x-2">
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
                        <div className="w-4 h-4 rounded-full animate-pulse dark:bg-green-900"></div>
                    </div>
                }
                {!loading && (
                    <form action="#" method='POST'>
                        <div className="shadow-md bg-slate-50 sm:overflow-hidden sm:rounded-md">
                            <div className="h-24 grid grid-cols-1 gap-4 content-center">
                                <ul className="steps">
                                    <li className={`step text-sm ${page >= 0 ? 'step-primary' : ''}`}>{FormTitles[0]}</li>
                                    <li className={`step text-sm ${page >= 1 ? 'step-primary' : ''}`}>{FormTitles[1]}</li>
                                    <li className={`step text-sm ${page >= 2 ? 'step-primary' : ''}`}>{FormTitles[2]}</li>
                                    <li className={`step text-sm ${page >= 3 ? 'step-primary' : ''}`}>{FormTitles[3]}</li>
                                    <li className={`step text-sm ${page >= 4 ? 'step-primary' : ''}`}>{FormTitles[4]}</li>
                                </ul>
                            </div>

                            {/* Forms */}
                            <div>
                                {pageDisplay()}
                            </div>
                            {/* Forms */}

                            <div className="mt-6 mb-6 flex items-center justify-end mr-6 gap-x-6">
                                <button
                                    disabled={page == 0}
                                    onClick={handlePrevPage}
                                    className="rounded-md px-4 py-2 text-sm font-semibold inline-flex items-center text-green-900 shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                                >
                                    <ChevronDoubleLeftIcon className="w-4 h-4 mr-2" />
                                    Back

                                </button>
                                <button
                                    onClick={handleNextPage}
                                    className="rounded-md px-4 py-2 text-sm font-semibold inline-flex items-center text-green-900 shadow-sm hover:bg-green-900 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                                >
                                    {nButton}
                                    <ChevronDoubleRightIcon className="w-4 h-4 ml-2" />
                                </button>
                            </div>

                        </div>
                    </form>
                )}
            </PageComponent>
        </>
    )
}
