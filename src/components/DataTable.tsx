import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Calendar, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";

interface TableProps<T> {
    dataTable?: T[];
    openModalEdit: (data: T) => void;
    deleteData: (id: number) => void;
    openModalBooking?: (data: T) => void;
    renderRow: (data: T) => React.ReactNode;
}

const DataTable = <T,>({ dataTable, openModalEdit, deleteData, openModalBooking, renderRow }: TableProps<T>) => {

    return (
        <TableBody>
            {dataTable?.map((data) => (
                <TableRow key={(data as any).id}>
                    {renderRow(data)}
                    <TableCell className="text-blue-900">
                        <Popover>
                            <PopoverTrigger asChild>
                                <MoreHorizontal className="h-6 w-6" />
                            </PopoverTrigger>
                            <PopoverContent className="w-32">
                                <div className="p-1 flex flex-col gap-0.5">
                                    <Button onClick={() => openModalEdit(data)} className="w-full bg-oxfordBlue text-white">
                                        <Pencil className="mr-1 h-4 w-4" />
                                        <span className="text-sm">Editar</span>
                                    </Button>
                                    {openModalBooking && (
                                        <Button onClick={() => openModalBooking(data)} className="w-full bg-oxfordBlue text-white">
                                            <Calendar className="h-4 w-4" />
                                            <span className="text-sm">Agendar</span>
                                        </Button>
                                    )}
                                    <Button onClick={() => deleteData((data as any).id)} className="w-full bg-oxfordBlue text-white">
                                        <Trash2 className="mr-1 h-4 w-4" />
                                        <span className="text-sm">Excluir</span>
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    );
};

export default DataTable;
