enum Elements {
    Fire = 'fire',
    Wind = 'wind',
    Water = 'water',
    Earth = 'earth',
    Light = 'light',
    Dark = 'dark',
    Rainbow = 'rainbow'
}

enum Tags {
    Element = 'element',
    MaxHp = 'maxHp'
}

type Character = {
    id: number;
    element: Elements;
    name: string;
    maxHp: number;
    tags: Tags[];
}

type CharacterKeys = keyof Character

export { Elements, Tags, Character, CharacterKeys}