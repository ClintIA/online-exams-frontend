export const canaisOptions = [
    {
        name: 'Google',
        id: 'google'
    },
    {
        name: 'Instagram',
        id: 'instagram'
    },
    {
        name: 'Facebook',
        id: 'facebook'
    },
    {
        name: 'Matéria em Blog',
        id: 'blog'
    },
    {
        name: 'Anúncio em Rádio',
        id: 'radio'
    },
    {
        name: 'Anúncio em Televisão',
        id: 'televisao'
    },
    {
        name: 'Anúncio em Ônibus',
        id: 'onibus'
    },
    {
        name: 'Outdoor',
        id: 'outdoor'
    },
    {
        name: 'Indicação',
        id: 'indicacao'
    },
    {
        name: 'Passei na Frente do Local',
        id: 'local'
    },
    {
        name: 'Encontrei no Plano de Saúde',
        id: 'plano'
    }
]
export const genderOptions = [
    { value: 'Masculino', label: 'Masculino' },
    { value: 'Feminino', label: 'Feminino' },
    { value: 'Prefiro não informar', label: 'Prefiro não identificar' },
    { value: 'Outros', label: 'Outros' }
];

export const findCanalOptions = (canal?: string) => {
    if(canal) {
        let patientCanal;
        canaisOptions.find((option) => {
            if(option.id == canal) {
                patientCanal = option.name;
            }
        })
        return patientCanal
    }
}
export const steps = ['CPF', 'Cadastro','Agendamento']
