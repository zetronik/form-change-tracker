export const userMock = {
  name: 'Andrey',
  surname: 'Omelchenko',
  description: '',
  admin: false,
  cities: [
    {id: 1, name: 'New York', code: 'ny'},
    {id: 4, name: 'Istanbul', code: 'ist'},
  ],
  access: [
    {
      name: 'Page 1',
      access: false
    },
    {
      name: 'Page 2',
      access: true
    },
    {
      name: 'Page 3',
      access: false
    }
  ]
}

export const citiesMock = [
  {id: 1, name: 'New York', code: 'ny'},
  {id: 2, name: 'Rome', code: 'rm'},
  {id: 3, name: 'London', code: 'ldm'},
  {id: 4, name: 'Istanbul', code: 'ist'},
  {id: 5, name: 'Paris', code: 'prs'}
];
