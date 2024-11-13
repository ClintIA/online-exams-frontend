export const canaisOptions = [
    {
        name: 'Achei no Google',
        id: 'google'
    },
    {
        name: 'Achei pelo Instagram',
        id: 'instagram'
    },
    {
        name: 'Achei pelo Facebook',
        id: 'facebook'
    },
    {
        name: 'Li em uma matéria do Blog',
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