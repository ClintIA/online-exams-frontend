export interface CanalOptions { 
    platform: string
    id: string
    amount: number
}

export const canaisOptions: CanalOptions[] = [
    {
        platform: 'Google',
        id: 'google',
        amount: 0
    },
    {
        platform: 'Instagram',
        id: 'instagram',
        amount: 0
    },
    {
        platform: 'Facebook',
        id: 'facebook',
        amount: 0
    },
    {
        platform: 'Matéria em Blog',
        id: 'blog',
        amount: 0
    },
    {
        platform: 'Anúncio em Rádio',
        id: 'radio',
        amount: 0
    },
    {
        platform: 'Anúncio em Televisão',
        id: 'televisao',
        amount: 0
    },
    {
        platform: 'Anúncio em Ônibus',
        id: 'onibus',
        amount: 0
    },
    {
        platform: 'Outdoor',
        id: 'outdoor',
        amount: 0
    },
    {
        platform: 'Indicação',
        id: 'indicacao',
        amount: 0
    },
    {
        platform: 'Passei na Frente do Local',
        id: 'local',
        amount: 0
    },
    {
        platform: 'Encontrei no Plano de Saúde',
        id: 'plano',
        amount: 0
    }
]
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

export const findCanalOptions = (canal?: string) => {
    if(canal) {
        let patientCanal;
        canaisOptions.find((option) => {
            if(option.id == canal) {
                patientCanal = option.platform;
            }
        })
        return patientCanal
    }
}
export const steps = ['CPF', 'Cadastro','Agendamento']
