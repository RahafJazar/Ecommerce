export const PASSWORD_RULES = [
    {
        key: 'minLength',
        label: '8 أحرف على الأقل',
        test: (value: string) => value.length >= 8
    },
    {
        key: 'uppercase',
        label: 'حرف كبير (A–Z)',
        test: (value: string) => /[A-Z]/.test(value)
    },
    {
        key: 'lowercase',
        label: 'حرف صغير (a–z)',
        test: (value: string) => /[a-z]/.test(value)
    },
    {
        key: 'number',
        label: 'رقم واحد على الأقل',
        test: (value: string) => /[0-9]/.test(value)
    },
    {
        key: 'special',
        label: 'رمز خاص من @ # $ % ^ & * !',
        test: (value: string) => /[@#$%^&*!]/.test(value)
    }
] as const;