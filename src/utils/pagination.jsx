export default function Pagination({clientPerPage, allClient, pagination, currentPage}) {
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allClient/clientPerPage); i++) {
        pageNumbers.push(i)
    }
    return(
        <nav className=' rounded-md shadow-sm" aria-label="Pagination"  '>
            <ul className=" flex justify-center -space-x-px py-3  ">
                { pageNumbers?.map(number => (
                        <li className="px-3 py-2  leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white" key={number} onClick={()=> pagination(number)}>
                            {number}
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
};