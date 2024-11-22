import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {UserCheck} from "lucide-react";
import React from "react";

interface CardProps {
    name: string
    content?: number
}
const Cards: React.FC<CardProps> = ({name, content}: CardProps) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-xl text-oxfordBlue font-medium">{name}</CardTitle>
                <UserCheck className="ml-4 h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl text-blue-900 font-bold">{content}</div>
            </CardContent>
        </Card>
    )
}

export default Cards;