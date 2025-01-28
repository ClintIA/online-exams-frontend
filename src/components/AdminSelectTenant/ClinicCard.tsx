
import { Card } from "@/components/ui/card"
import {Building2} from "lucide-react";

interface ClinicCardProps {
    clinic: Clinic
}
export interface Clinic {
    id: number
    name: string
    domain: string
    whatsAppNumber: string
    budgetTotal: string
}
export default function ClinicCard({ clinic }: ClinicCardProps) {
    return (
        <Card className="p-4 hover:border-[#05d2ff] cursor-pointer transition-colors">
            <div className="flex items-start gap-4">
                <div className="p-2">
                    <Building2 className="w-8 h-8 text-[#05d2ff]" />
                </div>
                <div>
                    <h4 className="font-semibold text-lg">{clinic.name}</h4>
                    <p className="text-sm text-gray-600">
                        {clinic.domain}
                    <br />
                       Contato: {clinic.whatsAppNumber}
                    </p>
                </div>
            </div>
        </Card>
    )
}