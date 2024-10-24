import React from 'react'
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";


const BookingConfirmation: React.FC = () => {
    return (
        <div className="mt-10">

            <Card className="w-full max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle>Agendamento concluído</CardTitle>
                    <CardDescription>
                        Preencha os detalhes do paciente abaixo. Clique em salvar quando terminar.
                    </CardDescription>
                </CardHeader>
                <CardContent>

                </CardContent>
                <CardFooter>
                    <Button>
                        Fazer outro agendamento
                    </Button>
                </CardFooter>

            </Card>

        </div>
    )
}

export default BookingConfirmation;