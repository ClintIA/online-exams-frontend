import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { XCircle } from "lucide-react"

interface LoginErrorProps {
    message: string
}

export default function LoginError({ message }: LoginErrorProps = { message: "An error occurred during login. Please try again." }) {
    if (!message) return null

    return (
        <Alert variant="destructive">
            <XCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{message}</AlertDescription>
        </Alert>
    )
}