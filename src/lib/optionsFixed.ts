export interface CanalOptions { 
    platform: string
    id: string
    amount: number
}

export const genderOptions = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
    { value: 'Prefiro não informar', label: 'Prefiro não identificar' },
    { value: 'Outros', label: 'Outros' }
];
export const examOptions = [
    { value: 'exame', label: 'Exame' },
    { value: 'consulta', label: 'Consulta' },
];
export const roleOptions = [
    { value: 'admin', label: 'Admin', disable: false},
    { value: 'marketing', label: 'Marketing', disable: false },
    { value: 'default', label: 'Atendente', disable: false },
    { value: 'doctor', label: 'Médico', disable: true },
    { value: 'patient', label: 'Paciente', disable: true }
];
export const findRoleOptions = (canal?: string) => {
    if(canal) {
        let role;
        roleOptions.find((option) => {
            if(option.value == canal) {
                role = option.label;
            }
        })
        return role
    }
}

export const steps = ['CPF', 'Cadastro','Agendamento']
