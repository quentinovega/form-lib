import React, { useState, useRef } from 'react';
import { Form, type, constraints, format } from '@maif/react-forms'

import '@maif/react-forms/lib/index.css'

export const Option = (x) => (x === undefined || x === null ? None : Some(x));

export const Some = (x) => ({
  map: (f) => Option(f(x)),
  flatMap: (f) => f(x),
  fold: (_ifEmpty, f) => f(x),
  orElse: () => Option(x),
  getOrElse: () => x,
  getOrNull: () => x,
  isDefined: true,
  exists: (f) => Option(f(x)).isDefined,
});

export const None = {
  map: () => None,
  flatMap: () => None,
  fold: (ifEmpty, _f) => ifEmpty(),
  orElse: (x) => Option(x),
  getOrElse: (ifEmpty) => ifEmpty,
  getOrNull: () => undefined,
  isDefined: false,
  exists: () => false,
};


export const BackOffice = () => {
  const [value, setValue] = useState({})

  const [user, setUser] = useState(undefined)
  const [state, setState] = useState('creation');
  const [error, setError] = useState(undefined)
  const [genres, setGenres] = useState([{ value: "male", label: "masculin" }, { value: "female", label: "feminin" }, { value: "non-binary", label: "non-binaire" }])


  const [schema, setSchema] = useState()

  const formSchema = {
    game: {
      type: type.string,
      // disabled: true,
      // format: 'password',
      label: 'game',
      placeholder: 'url du game',
      defaultValue: 'https://foo.bar',
      constraints: [
        constraints.matches(/^(https?:\/\/|\/)\w+\.[^\s]+$|^\/[^\s]*$/mg, "une url hophop hop")
      ],
    },
    name: {
      type: type.string,
      label: 'your name',
      placeholder: 'Nom de ton perso',
      help: 'nom de ton personnage',
      // className: "col-6",
      // style: { color: 'red' },
      // constraints: [
      //   constraints.required("le nom est requis"),
      //   constraints.test(
      //     'reservedChar',
      //     `Some character ar reserved for name (${['a', 'z'].join(',')})`,
      //     name => (name || '').split('').every((c) => !['a', 'z'].includes(c)))
      // ],
      render: (props) => <input type="text" className="is-invalid" style={{ borderColor: 'forestgreen' }} value={props.value} onChange={e => props.onChange(e.target.value)} />
    },
    fatherName: {
      type: type.string,
      label: 'name',
      placeholder: 'Nom du pere du perso',
      className: "col-6",
      style: { color: 'red' },

      constraints: [
        constraints.required("le nom du pere est obligatoire"),
      ]
    },
    fatherAge: {
      type: type.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du pere du personnage",

      constraints: [
        constraints.required("l'age du pere est obligatoire"),
        constraints.min(18, "il doit etre majeur"),
        constraints.max(1000, "il doit etre en vie"),
        constraints.integer("les demi-années ne compte pas vraiment...gamin"),
        constraints.positive("un age negatif ? il est pas né ton perso ????"),
      ]
    },
    age: {
      type: type.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du personnage l'age du personnage l'age du personnage l'age du personnage v l'age du personnage l'age du personnage l'age du personnage l'age du personnage",
      constraints: [
        constraints.required("l'age est obligatoire"),
        constraints.min(18, 'must be an adult')
        // constraints.lessThan(constraints.ref('fatherAge'), 'un fils est plus jeune que son père'),
        // constraints.integer("les demi-années ne compte pas vraiment...gamin"),
      ]
    },
    bio: {
      type: type.string,
      format: format.markdown,
      label: 'biographie',
      placeholder: 'raconte ton histoire',
      help: "bio du personnage",
      defaultValue: "biographie",
      props: {
        theme: 'tomorrow'
      },
      constraints: [
        constraints.required("la bio est obligatoire"),
      ]
    },
    human: {
      type: type.bool, //todo: cool si on peu chainer des input ==> input pour le nom de l'espece du perso (option visible peut etre avec une fonction)
      label: 'est ce qu\'il est humain ?',
      help: null,
      defaultValue: false,
      // render: props => <div>
      //   <div className="form-check">
      //     <input className="form-check-input" type="radio" name="exampleRadios" id="isHuman" value={'true'} checked={!!props.value ? 'checked' : null}
      //       onChange={() => props.onChange(true)} />
      //     <label className="form-check-label" htmlFor="isHuman">
      //       Oui
      //     </label>
      //   </div>
      //   <div className="form-check">
      //     <input className="form-check-input" type="radio" name="exampleRadios" id="isNotHuman" value={'false'} checked={!!props.value ? null : 'checked'}
      //       onChange={() => props.onChange(false)} />
      //     <label className="form-check-label" htmlFor="isNotHuman">
      //       Non
      //     </label>
      //   </div>
      // </div>
    },
    genre: {
      type: type.string,
      format: format.buttonsSelect,
      // isMulti: true,
      createOption: true,
      label: 'genre',
      help: "le genre du perso personnage",
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      options: genres,
      constraints: [
        constraints.required("le genre est obligatoire"),
      ],
      props: {
        formatCreateLabel: (val) => `voulez-vous vraiment creer la valeur ${val} ??`,
        onCreateOption: newGenre => ({ label: `created option - ${newGenre}`, value: newGenre })
      }
    },
    species: {
      type: type.string,
      visible: { ref: 'human', test: is => !is },
      label: 'Espèce du perso.',
      help: "l'espece du perso personnage car non humain",
      constraints: [
        constraints.when('human', is => !is, [
          constraints.oneOf(["elf", "orc", "semi-dragon", "wererat"], "l'espece doit etre particuliere"),
          constraints.required("l'espece est requise si non-humain"),
        ])
      ]
    },
    // weapons: {
    //   type: type.object,
    //   format: 'select',
    //   isMulti: true,
    //   label: 'armes',
    //   help: "les armes du perso personnage",
    //   // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
    //   defaultValue: [{ label: "toothpick", weight: 0, rarity: 'common' }],
    //   transformer: (value) => ({ label: value.label, value }),
    //   options: [
    //     { label: "toothpick", weight: 0, rarity: 'common' },
    //     { label: "sword", weight: 2, rarity: 'rare' },
    //     { label: "bazooka", weight: 10, rarity: 'epic' },
    //     { label: "excalibur", weight: 100, rarity: 'legendary' },
    //     { label: "Mjolnir", weight: 100, rarity: "legendary" }],
    //   // FIXME: if we provide a schema yup is broken
    //   // schema: {
    //   //   label: {
    //   //     type: types.string,
    //   //   },
    //   //   weight: {
    //   //     type: types.number
    //   //   },
    //   //   rarity: {
    //   //     type: types.string
    //   //   }
    //   // },
    //   constraints: [
    //     constraints.min(1, 'Pas de combat à mains nues, c\'est dangereux !'),
    //     constraints.length(2, '2 armes obligatoire'),
    //     constraints.test("weight", 'pas plus de 100 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 100) //todo: use when to have abilitie to supprot more than 100kg when perso.age > 200 
    //     //todo: tester when en fonction de l'age
    //   ]
    // createOption: true,

    // },
    weaponsForm: {
      type: type.object,
      format: format.form,
      array: true,
      label: 'armes',
      help: "les armes du perso personnage",
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      // transformer: (value) => ({label: value.weight, value: value.label}),
      // options: [
      //   { label: "toothpick", weight: 0, rarity: 'common' },
      //   { label: "sword", weight: 2, rarity: 'common' }, 
      //   { label: "bazooka", weight: 10, rarity: 'epic' },
      //   { label: "excalibur", weight: 100, rarity: 'legendary' }],
      schema: {
        expert_mode: {
          type: 'bool',
          label: null,
          defaultValue: false,
          render: ({ value, onChange }) => {
            return (
              <button
                type="button"
                className="btn btn-sm btn-success me-3 mb-3"
                onClick={() => onChange(!value)
                }>
                {!!value ? 'Show less' : 'Show more'}
              </button >
            );
          }
        },
        label: {
          type: type.string,
          label: "label",
          help: "help",
          constraints: [
            constraints.required('label is required')
          ],
          render: (props) => <input type="text" className="is-invalid" style={{ borderColor: 'orangered' }} value={props.value} onChange={e => props.onChange(e.target.value)} />
        },
        weight: {
          type: type.number,
          label: "weight",
          constraints: [
            constraints.max('100', 'a weight cannot be heavier than 100')
          ]
        },
        rarity: {
          type: type.string,
          label: "rarity",
          constraints: [
            constraints.oneOf(['common', 'rare', 'epic', 'legendary'], 'one of rarity please..common, rare, epic or legendary')
          ]
        }
      },
      collapsable: true,
      fieldOnCollapse: "label",
      constraints: [
        // constraints.min(1, 'Pas de combat à mains nues, c\'est dangereux !'),
        // constraints.length(2, '2 armes obligatoire'),
        // constraints.test("weight", 'pas plus de 100 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 100) //todo: use when to have abilitie to supprot more than 100kg when perso.age > 200 
        //todo: tester when en fonction de l'age
      ],
      // createOption: true,
      // defaultValue: {label: "foo", weight: 0, rarity: 'common'}

    },



    birthday: {
      type: type.date,
      label: 'date d\'anniv',
      help: "la date de naissance du personnage",
      constraints: [
        constraints.required('required'),
        constraints.max(new Date(), 'pas de naissance dans le futur'),
      ]
    },
    zipcode: {
      type: type.string,
      label: 'code postal',
      switch: {
        ref: 'country',
        render: [
          {
            default: true,
            condition: ({ ref }) => ref === 'france',
            type: type.number,
          }, {
            default: true,
            condition: ({ ref }) => ref !== 'france',
            type: type.string,
          }
        ]
      },
      constraints: [
        constraints.length(5, 'en france 5 chiffre')
      ]
    },
    city: {
      type: type.string,
      isMulti: true,
      createOption: true,
      format: 'select',
      label: 'ville',
      help: 'Ville de résidence',
      transformer: (value) => ({ label: value.label, value: value.id }),
      options: [{ label: 'Neo-Tokyo', id: '1' }, { label: 'Asgard', id: '2' }, { label: 'Fondcombe', id: '3' }],
      defaultValue: ['3'],
      constraints: [
        constraints.required(`Personne n'habite nulle-part jusqu'à preuve du contraire`)
      ]
    },
    abilities: {
      type: type.string,
      array: true,
      label: 'abilities du perso',
      help: "abilities help..",
      constraints: [
        constraints.length(3, '3 abilities obligatoire'),
        constraints.max(5, "max 5")
        // moreThan: constraints.length(2, '2 abilities min obligatoire')
      ],
      // render: (props) => {
      //   return <div className="d-flex">
      //     <input type="text" className="is-invalid" style={{borderColor: 'tomato'}} value={props.value} onChange={e => props.onChange([e.target.value])} />
      //     {props.error && <div style={{ color: 'tomato' }}>{props.error.message}</div>}
      //   </div>
      // }
    },
    spells: {
      type: type.object,
      label: 'incantations',
      help: 'Incantation sous form d\'objet {nom, puissance (*/100)} max puissnce total = 100',
      defaultKeyValue: { 'spellName': 50 },
      defaultValue: {
        ice: '',
        fire: '',
        air: '',
        lightning: ''
      },
      constraints: [
        constraints.required('incancantation requises'),
        constraints.test("power", 'incantation requise a minima', value => (Object.values(value) || []).reduce((a, c) => a + Number(c), 0) > 0),
        constraints.test("power", 'pas plus de 100 de pouvoir', value => (Object.values(value) || []).reduce((a, c) => a + Number(c), 0) <= 100)
      ]
    },
    code: {
      type: type.string,
      format: format.code,
      label: 'just code',
      help: 'Juste du code, hop hop hop',
      props: {
        mode: 'json',
        theme: 'monokai',
        width: '100%',
        height: "400px",
        foo: 'bar',
        setRef: ref => console.error({ ref })
      },
      constraints: [
        constraints.required('le code est requis merci')
      ]
    },
    password: {
      type: type.string,
      format: 'password',
      label: 'password',
      constraints: [
        constraints.required('password is required')
      ]
    },
    confirmPassword: {
      type: type.string,
      format: 'password',
      label: 'confirm password',
      constraints: [
        constraints.required('confirm password is required'),
        constraints.oneOf([constraints.ref('password')], 'confirm and password must be equal')
      ]
    },
    avatar: {
      type: type.file,
      format: 'hidden',
      label: 'avatar',
      constraints: [
        constraints.required('your avatar is not set'),
        constraints.maxSize(2000000, 'no more than 2 Mo please'),
        constraints.supportedFormat(['jpeg', 'jpg', 'png'], 'just jpeg or png file please')
      ]
    },
    armor: {
      type: type.object,
      format: 'form',
      label: 'test',
      conditionalSchema: {
        ref: 'genre',
        switch: [
          {
            default: true,
            condition: ({ ref }) => ref === 'male',
            schema: {
              casque: {
                type: type.string,
                label: "casque",
                constraints: [
                  constraints.required('your casque is not set'),
                ]
              },
              armure: {
                type: type.string,
                label: "armure"
              }
            },
            flow: ["casque", "armure"]
          },
          {
            condition: 'female',
            schema: {
              haut: {
                type: type.string,
                label: "haut",
                constraints: [
                  constraints.required('your haut is not set'),
                ]
              },
              bas: {
                type: type.string,
                label: "bas",
                constraints: [
                  constraints.length(6, 'your bas must ben 6 length'),
                ]
              }
            },
            flow: ["haut", "bas"]
          },
          {
            condition: 'non-binary',
            schema: {
              casque: {
                type: type.string,
                label: "casque"
              },
              armure: {
                type: type.string,
                label: "armure"
              },
              haut: {
                type: type.string,
                label: "haut"
              },
              bas: {
                type: type.string,
                label: "bas"
              }
            },
            flow: ["casque", "armure", "haut", "bas"]
          }
        ]
      }

    },
    // 'city': {
    //   type: type.string,
    //   // isMulti: true,
    //   // createOption: true,
    //   format: 'select',
    //   label: 'city - string select',
    //   help: 'Ville de résidence',
    //   transformer: (value) => ({ label: value.label, value: value.id }),
    //   options: [{ label: 'Neo-Tokyo', id: '1' }, { label: 'Asgard', id: '2' }, { label: 'Fondcombe', id: '3' }],
    //   defaultValue: '3',
    //   constraints: [
    //     constraints.required(`Personne n'habite nulle-part jusqu'à preuve du contraire`)
    //   ]
    // },
    'cityCreation': {
      type: type.string,
      // isMulti: true,
      createOption: true,
      format: 'select',
      label: 'city - string select with creation permitted',
      help: 'Ville de résidence',
      transformer: (value) => ({ label: value.label, value: value.id }),
      options: [{ label: 'Neo-Tokyo', id: '1' }, { label: 'Asgard', id: '2' }, { label: 'Fondcombe', id: '3' }],
      defaultValue: '3',
      constraints: [
        constraints.required(`Personne n'habite nulle-part jusqu'à preuve du contraire`)
      ]
    },
    'cityCreationHandled': {
      type: type.string,
      // isMulti: true,
      createOption: true,
      format: 'select',
      label: 'city - string select with creation permitted handled',
      help: 'Ville de résidence',
      transformer: (value) => ({ label: value.label, value: value.id }),
      options: [{ label: 'Neo-Tokyo', id: '1' }, { label: 'Asgard', id: '2' }, { label: 'Fondcombe', id: '3' }],
      onCreateOption: label => ({ label: `created city - ${label}`, id: '' + Math.random() }),
      defaultValue: '3',
      constraints: [
        constraints.required(`Personne n'habite nulle-part jusqu'à preuve du contraire`)
      ]
    },
    'cities': {
      type: type.string,
      isMulti: true,
      // createOption: true,
      format: 'select',
      label: 'cities - string multi select',
      help: 'Ville de résidence',
      transformer: (value) => ({ label: value.label, value: value.id }),
      options: [{ label: 'Neo-Tokyo', id: '1' }, { label: 'Asgard', id: '2' }, { label: 'Fondcombe', id: '3' }],
      defaultValue: ['3'],
      constraints: [
        constraints.required(`Personne n'habite nulle-part jusqu'à preuve du contraire`)
      ]
    },
    'citiesCreation': {
      type: type.string,
      isMulti: true,
      createOption: true,
      format: 'select',
      label: 'cities - string multi select with creation',
      help: 'Ville de résidence',
      transformer: (value) => ({ label: value.label, value: value.id }),
      options: [{ label: 'Neo-Tokyo', id: '1' }, { label: 'Asgard', id: '2' }, { label: 'Fondcombe', id: '3' }],
      defaultValue: ['3'],
      constraints: [
        constraints.required(`Personne n'habite nulle-part jusqu'à preuve du contraire`)
      ]
    },
    'citiesCreationHandled': {
      type: type.string,
      isMulti: true,
      createOption: true,
      format: 'select',
      label: 'cities - string multi select with creation handled',
      help: 'Ville de résidence',
      transformer: (value) => ({ label: value.label, value: value.id }),
      options: [{ label: 'Neo-Tokyo', id: '1' }, { label: 'Asgard', id: '2' }, { label: 'Fondcombe', id: '3' }],
      onCreateOption: label => ({ label: `created city - ${label}`, id: '' + Math.random() }),
      defaultValue: ['3'],
      constraints: [
        constraints.required(`Personne n'habite nulle-part jusqu'à preuve du contraire`)
      ]
    },
    'weapon': {
      type: type.object,
      format: 'select',
      array: true,
      label: 'weapon - obj select',
      optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      // defaultValue: [{ label: "toothpick", weight: 0, rarity: 'common' }],
      transformer: (value) => ({ label: value.label, value }),
      // options: [
      //   { label: "toothpick", weight: 0, rarity: 'common' },
      //   { label: "sword", weight: 2, rarity: 'rare' },
      //   { label: "bazooka", weight: 10, rarity: 'epic' },
      //   { label: "excalibur", weight: 100, rarity: 'legendary' },
      //   { label: "Mjolnir", weight: 100, rarity: "legendary" }],

    },
    'weaponFrom': {
      type: type.object,
      format: 'select',
      // isMulti: true,
      label: 'weapon - with fromUrl- obj select',
      optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      // defaultValue: { label: "toothpick", weight: 0, rarity: 'common' },
      transformer: (value) => ({ label: value.label, value }),
    },
    'weaponCreation': {
      type: type.object,
      format: 'select',
      // isMulti: true,
      createOption: true,
      label: 'weapon - obj select with creation',
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      defaultValue: { label: "toothpick", weight: 0, rarity: 'common' },
      transformer: (value) => ({ label: value.label, value }),
      options: [
        { label: "toothpick", weight: 0, rarity: 'common' },
        { label: "sword", weight: 2, rarity: 'rare' },
        { label: "bazooka", weight: 10, rarity: 'epic' },
        { label: "excalibur", weight: 100, rarity: 'legendary' },
        { label: "Mjolnir", weight: 100, rarity: "legendary" }],

    },
    'weaponCreationHandled': {
      type: type.object,
      format: 'select',
      // isMulti: true,
      createOption: true,
      label: 'weapon - obj select with creation handled',
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      defaultValue: { label: "toothpick", weight: 0, rarity: 'common' },
      transformer: (value) => ({ label: value.label, value }),
      onCreateOption: (label) => ({ label, weight: 5, rarity: 'common' }),
      options: [
        { label: "toothpick", weight: 0, rarity: 'common' },
        { label: "sword", weight: 2, rarity: 'rare' },
        { label: "bazooka", weight: 10, rarity: 'epic' },
        { label: "excalibur", weight: 100, rarity: 'legendary' },
        { label: "Mjolnir", weight: 100, rarity: "legendary" }],

    },
    'weapons': {
      type: type.object,
      format: 'select',
      isMulti: true,
      // createOption: true,
      label: 'weapons - obj multi select',
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      defaultValue: [{ label: "toothpick", weight: 0, rarity: 'common' }],
      transformer: (value) => ({ label: value.label, value }),
      // onCreateOption: (label) => ({ label, weight: 5, rarity: 'common' }),
      options: [
        { label: "toothpick", weight: 0, rarity: 'common' },
        { label: "sword", weight: 2, rarity: 'rare' },
        { label: "bazooka", weight: 10, rarity: 'epic' },
        { label: "excalibur", weight: 100, rarity: 'legendary' },
        { label: "Mjolnir", weight: 100, rarity: "legendary" }],

    },
    'weaponsCreation': {
      type: type.object,
      format: 'select',
      isMulti: true,
      createOption: true,
      label: 'weapon - obj multi select with creation',
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      defaultValue: [{ label: "toothpick", weight: 0, rarity: 'common' }],
      transformer: (value) => ({ label: value.label, value }),
      // onCreateOption: (label) => ({ label, weight: 5, rarity: 'common' }),
      options: [
        { label: "toothpick", weight: 0, rarity: 'common' },
        { label: "sword", weight: 2, rarity: 'rare' },
        { label: "bazooka", weight: 10, rarity: 'epic' },
        { label: "excalibur", weight: 100, rarity: 'legendary' },
        { label: "Mjolnir", weight: 100, rarity: "legendary" }],

    },
    'weaponsCreationHandled': {
      type: type.object,
      format: 'select',
      label: 'weapon - obj multi select with creation handled',
      defaultValue: [{ label: "toothpick", weight: 0, rarity: 'common' }],
      constraints: [
        constraints.min(1, 'Pas de combat à mains nues, c\'est dangereux !'),
        constraints.length(2, '2 armes obligatoire'),
        constraints.when('age', age => age < 100, [
          constraints.test("weight", 'pas plus de 100 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 100)
        ], [
          constraints.test("weight", 'pas plus de 1000 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 1000)
        ])
        //todo: use when to have abilitie to supprot more than 100kg when perso.age > 200
        //todo: tester when en fonction de l'age
      ],
      props: {
        isMulti: true,
        createOption: true,
        transformer: (value) => ({ label: value.label, value }),
        onCreateOption: (label) => ({ label, weight: 5, rarity: 'common' }),
        // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
        options: [
          { label: "toothpick", weight: 0, rarity: 'common' },
          { label: "sword", weight: 2, rarity: 'rare' },
          { label: "bazooka", weight: 10, rarity: 'epic' },
          { label: "excalibur", weight: 100, rarity: 'legendary' },
          { label: "mega-excalibur", weight: 1000, rarity: 'legendary' },
          { label: "Mjolnir", weight: 100, rarity: "legendary" }],

      }
    },
    citiesArray: {
      type: type.string,
      array: true,
      // createOption: true,
      format: 'select',
      label: 'cities - array',
      help: 'Ville de résidence',
      transformer: (value) => ({ label: value.label, value: value.id }),
      options: [{ label: 'Neo-Tokyo', id: '1' }, { label: 'Asgard', id: '2' }, { label: 'Fondcombe', id: '3' }],
      defaultValue: ['3', '1'],
      addableDefaultValue: '2',
      constraints: [
        constraints.required(`Personne n'habite nulle-part jusqu'à preuve du contraire`)
      ]
    },
    'weaponsArray': {
      type: type.object,
      format: 'select',
      array: true,
      // isMulti: true,
      // createOption: true,
      label: 'weapons - array - obj select',
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      defaultValue: [{ label: "toothpick", weight: 0, rarity: 'common' }],
      transformer: (value) => ({ label: value.label, value }),
      addableDefaultValue: { label: "toothpick", weight: 0, rarity: 'common' },
      options: [
        { label: "toothpick", weight: 0, rarity: 'common' },
        { label: "sword", weight: 2, rarity: 'rare' },
        { label: "bazooka", weight: 10, rarity: 'epic' },
        { label: "excalibur", weight: 100, rarity: 'legendary' },
        { label: "Mjolnir", weight: 100, rarity: "legendary" }],

    },
    stringArray: {
      type: type.string,
      // disabled: true,
      // format: 'password',
      array: true,
      label: 'string array',
      // placeholder: 'nom des game',
      defaultValue: ['one', 'two', 'three'],
      addableDefaultValue: 'number please',
      // constraints: [
      //   constraints.url()
      // ],
    },
    metadata: {
      type: type.object,
      label: 'metadata',
      array: true,
      // human: {
      //   type: type.bool, //todo: cool si on peu chainer des input ==> input pour le nom de l'espece du perso (option visible peut etre avec une fonction)
      //   label: 'is human ?',
      //   help: "le personnage est il humain",
      //   defaultValue: false,
      //   render: props => <div>
      //     <div className="form-check">
      //       <input className="form-check-input" type="radio" name="testexampleRadios" id="isHuman" value={'true'} checked={!!props.value ? 'checked' : null}
      //         onChange={() => props.onChange(true)} />
      //       <label className="form-check-label" htmlFor="isHuman">
      //         Oui
      //       </label>
      //     </div>
      //     <div className="form-check">
      //       <input className="form-check-input" type="radio" name="testexampleRadios" id="isNotHuman" value={'false'} checked={!!props.value ? null : 'checked'}
      //         onChange={() => props.onChange(false)} />
      //       <label className="form-check-label" htmlFor="isNotHuman">
      //         Non
      //       </label>
      //     </div>
      //   </div>
      // }
    }
  }

  const formFlow = [
    // {
    //   label: 'Your personnage',
    //   flow: [
    // 'bio',
    // 'game',
    // 'name',
    // 'metadata',
    //     'age',
    //     'city',],
    //   collapsed: true
    // },
    // {
    //   label: 'father of your personnage',
    //   flow: [
    //     'fatherName',
    //     'fatherAge'
    //   ],
    //   collapsed: true
    // },
    // {
    //   label: 'human',
    //   flow: [
    // 'human',
    // 'genre',
    // 'species',
    // 'test',
    //   ],
    //   collapsed: false,
    // },
    'weapon',
    // 'weapons',
    // // 'birthday',
    // 'abilities',
    // 'spells',
    // 'code',
    // 'avatar',
    // 'password',
    // 'confirmPassword',
    // 'armor',
    // 'weaponFrom',
    // 'city',
    // 'cityCreation',
    // 'cityCreationHandled',
    // 'cities',
    // 'citiesCreation',
    // 'citiesCreationHandled',
    // {
    //   label: 'test',
    //   flow: [
    //     'weapon',
    //   ]
    // },
    // 'weaponCreation',
    // 'weaponCreationHandled',
    // 'weapons',
    // 'weaponsCreation',
    // 'age',
    // 'weaponsCreationHandled',
    // 'citiesArray',
    // 'weaponsArray',
    // 'stringArray'
  ];

  const thor = {
    game: 'https://foo.dev',
    name: 'Thor',
    age: 211,
    city: ['2'],
    fatherName: 'Odin',
    fatherAge: '999',
    bio: 'Thor odinson...have a hammer',
    human: true,
    species: undefined,
    genre: 'male',
    weapon: { label: "toothpick", weight: 0, rarity: 'common' },
    weapons: [{ label: "toothpick", weight: 0, rarity: 'common' }, { label: "Mjolnir", weight: 100, rarity: 'legendary' }],
    birthday: new Date('August 19, 1975 23:15:30'),
    abilities: [],
    spells: { linghtningBolt: 100 },
    test: null
  }

  const loki = {
    game: 'https://foo.dev',
    name: 'Loki',
    age: 100,
    city: ['1'],
    fatherName: 'Odin',
    fatherAge: '999',
    bio: 'Loki...don`t trust him ',
    human: true,
    species: undefined,
    genre: 'male',
    weapon: { label: "toothpick", weight: 0, rarity: 'common' },
    weapons: [{ label: "toothpick", weight: 0, rarity: 'common' }, { label: "sword", weight: 2, rarity: 'rare' }],
    birthday: new Date('August 19, 1985 23:15:30'),
    abilities: ['Vile', 'Unfair', 'Unworthy'],
    spells: { fakeSnake: 10, hypnosis: 70, realityChanging: 20 },
    test: undefined
  }



  const energy = { "1": 'diesel', "2": 'essence', "3": 'autres' }


  const dtcschema = {
    name: {
      type: type.string,
      label: "Nom du personnage",
      disabled:true,
      constraints: [
        constraints.required("Le nom est requis")
      ]

    },
    birthday: {
      type: type.date,
      label: "Date de naissance",
      constraints: [
        constraints.required("valeur requise"),
        constraints.max(new Date(), "pas de naissance dans le future")
      ]
    },
    poids: {
      type: type.number,
      label: "Poids",
      constraints: [
        constraints.required("valeure requise"),
        constraints.positive("impossible !!")
      ]
    },
    biographie: {
      type: type.string,
      format: format.text,
      label: 'Biographie',
    },
    isHuman: {
      type: type.bool,
      label: 'Humain ?',
      constraints: [
        constraints.required("valeur requise")
      ]
    },
    genre: {
      type: type.string,
      format: format.select,
      options: genres,
      constraints: [
        constraints.required("valeur requise")
      ]
    },
    species: {
      type: type.string,
      visible: { ref: 'isHuman', test: is => !is },
      label: 'Espèce',
      constraints: [
        constraints.when('isHuman', is => !is, [
          constraints.oneOf(["elf", "orc", "semi-dragon"], "l'espece doit etre particuliere (elf, orc ou semi-dragon)"),
          constraints.required("l'espece est requise si non-humain"),
        ])
      ]
    },
    alignment: {
      type: type.object,
      format: format.form,
      schema: {
        lawVsChaos: {
          type: type.string,
          format: format.buttonsSelect,
          options: ["law", "neutral", "chaos"]
        },
        goodVsEvil: {
          type: type.string,
          format: format.buttonsSelect,
          options: ["good", "neutral", "evil"]
        }
      },
      constraints: [
        constraints.required("valeure requise")
      ]
    },
    weapons: {
      type: type.string,
      format: format.select,
      isMulti: true,
      optionsFrom: "http://localhost:3042/",
      defaultValue: [{ label: "toothpick - 0 kg", weight: 0, rarity: 'common' }],
      transformer: (value) => ({ label: `${value.label} - ${value.weight} kg`, value }),
      constraints: [
        constraints.min(1, 'Pas de combat à mains nues, c\'est dangereux !'),
        constraints.test("weight", 'pas plus de 100 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 100)
      ]
    },
  }

  const rafschema = {
    name: {
      type: type.string,
      label: "Nom (etienne)",
      defaultValue: "",
      className:"etienne",
      constraints: [
        // constraints.required("ce champs est requis"),
        constraints.matches(/^e.*$/, "c'est pas etienne !!!")
      ]
    },
  }


  const [testSchema, setTestSchema] = useState(dtcschema);
  const changeSchema = () => {
    if (testSchema.name.label === "Nom (etienne)") {
      setTestSchema(dtcschema)
    } else {
      setTestSchema(rafschema)
    }
  }



  const rf = useRef()
  const planTest = { "_id": "cy7d7gft18uyymtgrjfyyf9styvuzre7", "type": "FreeWithQuotas", "currency": { "code": "EUR" }, "customName": "Refined Fresh Ball plan", "customDescription": "Free plan with limited number of calls per day and per month", "maxPerSecond": 10, "maxPerDay": 1000, "maxPerMonth": 1000, "billingDuration": { "value": 1, "unit": "month" }, "visibility": "Public", "subscriptionProcess": "Automatic", "integrationProcess": "ApiKey", "rotation": false, "otoroshiTarget": { "otoroshiSettings": null, "authorizedEntities": { "groups": [], "services": [] }, "apikeyCustomization": { "clientIdOnly": false, "constrainedServicesOnly": false, "tags": [], "metadata": {}, "customMetadata": [], "restrictions": { "enabled": false, "allowLast": true, "allowed": [], "forbidden": [], "notFound": [] } } } }

  return (
    <div style={{
      padding: "0 25px"
    }} >
      <h1>BaCk OffIcE</h1>

      {/* <button className="btn btn-info" onClick={() => setUser(loki)}>Loki</button>
      <button className="btn btn-info" onClick={() => setUser(thor)}>Thor</button> */}




      <div>
        {/* <pre>{error}</pre> */}
        {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
        <button onClick={changeSchema}>change schema</button>
        <Form
          schema={testSchema}
          // flow={formFlow}
          onSubmit={data => console.debug(data)}
          onError={(errors, e) => console.error(errors, e)}
          nostyle={false}
          style={{
            input: {
              color: "seaGreen",
              border: "1px solid tomato",
            }
          }}
        value={{
          name: "Thor"
        }}
        // options={{
        //   watch: true
        // }}
        />
      </div>
    </div >
  )
}
