import { TableIcon } from 'lucide-react'
import React from "react";

interface EmptyTableStateProps {
    message?: string
    icon?: React.ReactNode
}
const NoDataTable: React.FC<EmptyTableStateProps>  = ({
                                    message = "Não possui informações cadastradas",
                                    icon = <TableIcon className="w-10 h-10 text-muted-foreground" />,
                                }: EmptyTableStateProps) => {
    return (
        <div className="w-3/4 mx-auto flex flex-col items-center justify-center h-64 p-10 text-center bg-muted rounded-md">
            {icon}
            <p className="mt-2 text-sm text-muted-foreground">{message}</p>
        </div>
    )
}

export default NoDataTable;