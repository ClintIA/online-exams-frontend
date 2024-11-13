import React from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover.tsx";
import { Calendar, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button.tsx";
import {Type} from "@/components/ModalHandle/ModalPatientRender.tsx";

interface TableProps<T> {
    dataTable?: any[];
    openModalEdit: (type: Type, data: T) => void;
    deleteData: (id: number) => void;
    openModalBooking?: boolean;
    renderRow: (data: any) => React.ReactNode;
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
                                    {Object.prototype.hasOwnProperty.call(data, 'full_name') && (<Button onClick={() => openModalEdit(Type.editPatinet, data)}
                                             className="w-full bg-oxfordBlue text-white">
                                        <Pencil className="mr-1 h-4 w-4"/>
                                        <span className="text-sm">Editar</span>
                                    </Button>)}
                                    {Object.prototype.hasOwnProperty.call(data, 'exam_name') &&  (<Button onClick={() => openModalEdit(Type.editExam, data)}
                                              className="w-full bg-oxfordBlue text-white">
                                        <Pencil className="mr-1 h-4 w-4"/>
                                        <span className="text-sm">Editar</span>
                                    </Button>)}
                                    {openModalBooking && (
                                        <Button onClick={() => openModalEdit(Type.booking,data)} className="w-full bg-oxfordBlue text-white">
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
