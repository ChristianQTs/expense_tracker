export let idCount = 7

export const expenses_table = [
    //simulating user situation:

    { user_id: 11, id: 1, name: 'meow', category: 'shas', amount: 46 },
    { user_id: 21, id: 2, name: 'woof', category: 'smush', amount: 66 },
    { user_id: 41, id: 3, name: 'ding', category: 'dodo', amount: 53 },
    { user_id: 51, id: 4, name: 'shit', category: 'toilet', amount: 12 },
    { user_id: 41, id: 5, name: 'julia', category: 'prostitution', amount: 120 },
    { user_id: 81, id: 6, name: 'IKEA cabiNET', category: 'personal', amount: 112 }
]
export const updateId = () => {return idCount ++}