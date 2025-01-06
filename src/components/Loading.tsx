import {Loader2} from "lucide-react"
import React from "react";

const Loading: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="text-center">
                <Loader2 className="h-16 w-16 animate-spin text-oxfordBlue mx-auto" />
                <p className="mt-4 text-lg font-semibold text-gray-700">Carregando...</p>
            </div>
        </div>
    )
}

export default Loading;