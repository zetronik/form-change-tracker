export const userMock = {
  name: 'Andrey',
  surname: 'Omelchenko',
  description: '',
  admin: false,
  cities: [
    {
      id: 1,
      name: "New York",
      code: "NY"
    },
    {
      id: 4,
      name: "Istanbul",
      code: "IST"
    }
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
  {id: 1, name: 'New York', code: 'NY'},
  {id: 2, name: 'Rome', code: 'RM'},
  {id: 3, name: 'London', code: 'LDN'},
  {id: 4, name: 'Istanbul', code: 'IST'},
  {id: 5, name: 'Paris', code: 'PRS'}
];
