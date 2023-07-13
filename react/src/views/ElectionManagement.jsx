import { NavLink, Outlet, useParams } from "react-router-dom"
import PageComponent from "../components/PageComponent"

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function ElectionManagement() {
    const { id } = useParams();

    const navigation = [
        { name: 'Election Information', to: `/elections/${id}/electionInformation` },
        { name: 'Positions', to: `/elections/${id}/position` },
        { name: 'Partylists', to: `/elections/${id}/partylist` },
        { name: 'Candidates', to: `/elections/${id}/candidate` },
        { name: 'Voters', to: `/elections/${id}/voter` },
    ]
    
    return (
        <div>
            <PageComponent title="Manage Election">
                <div className="flex">
                    {navigation.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.to}
                            className={({ isActive }) => classNames(
                                'flex-1',
                                'items-center',
                                'px-5',
                                'py-3',
                                'space-x-5',
                                'border',
                                isActive ? 'border-b-0' : 'border-b bg-green-50',
                            )}
                        >
                            <span
                                className={classNames(
                                    'block',
                                    'text-md',
                                    'font-semibold',
                                    'text-green-900',
                                )}
                            >
                                {item.name}
                            </span>
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </PageComponent>
        </div>
    )
}
