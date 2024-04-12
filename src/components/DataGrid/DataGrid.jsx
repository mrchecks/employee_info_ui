import DataTable from 'react-data-table-component'
import { ChevronDown } from 'react-feather'

export const DataGrid = (props) => {
    return (
        <div>
            <DataTable
                    noHeader
                    pagination={false}
                    paginationServer
                    sortServer
                    className='react-dataTable'
                    sortIcon={<ChevronDown size={10} />}
                    {...props}
                />
        </div>
    )

}