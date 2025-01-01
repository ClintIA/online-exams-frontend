import React, { useState, ChangeEvent } from 'react'
import { Input } from "@/components/ui/input"

interface MoneyInputProps {
    initialValue: number
    onChange?: (value: number) => void
}
function formatCurrency(value: number): string {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(value)
}
const MoneyInput: React.FC<MoneyInputProps> = ({ initialValue, onChange }: MoneyInputProps) => {
    const [value, setValue] = useState(formatCurrency(initialValue))

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '')
        const numericValue = parseInt(rawValue, 10) / 100
        const formattedValue = formatCurrency(numericValue)

        setValue(formattedValue)
        onChange?.(numericValue)
    }

    return (
            <Input
                type="text"
                id="totalBudget"
                className="mr-2"
                placeholder={initialValue?.toString()}
                value={value}
                onChange={handleChange}
            />
    )
}



export default MoneyInput;

