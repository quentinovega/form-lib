import React, { useState } from 'react';
import { Form, types, constraints } from '@maif/react-forms'

// import 'bootstrap/dist/css/bootstrap.min.css'

export const BackOffice = () => {

  const [user, setUser] = useState(undefined)

  const formSchema = {
    game: {
      type: types.string,
      disabled: true,
      // format: 'password',
      label: 'game',
      placeholder: 'url du game',
      defaultValue: 'https://foo.bar',
      constraints: [
        constraints.url()
      ],
    },
    name: {
      type: types.string,
      label: 'your name',
      placeholder: 'Nom de ton perso',
      help: 'nom de ton personnage',
      className: "col-6",
      style: { color: 'red' },
      constraints: [
        constraints.required("le nom est obligatoire"),
        constraints.length(7, "le nom est doit etre long de 7"),
      ],
      // render: (props) => <input type="text" className="is-invalid" value={props.value} onChange={e => props.onChange(e.target.value)} />
    },
    fatherName: {
      type: types.string,
      label: 'name',
      placeholder: 'Nom du pere du perso',
      className: "col-6",
      style: { color: 'red' },

      constraints: [
        constraints.required("le nom du pere est obligatoire"),
      ]
    },
    fatherAge: {
      type: types.number,
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
      type: types.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du personnage l'age du personnage l'age du personnage l'age du personnage v l'age du personnage l'age du personnage l'age du personnage l'age du personnage",
      constraints: [
        constraints.required("l'age est obligatoire"),
        constraints.lessThan(constraints.ref('fatherAge'), 'un fils est plus jeune que son père'),
        constraints.integer("les demi-années ne compte pas vraiment...gamin"),
      ]
    },
    bio: {
      type: types.string,
      format: 'text',
      label: 'biographie',
      placeholder: 'raconte ton histoire',
      help: "bio du personnage",
      defaultValue: "biographie",
      props: {
        rows: 10,
        cols: 70
      }
    },
    human: {
      type: types.bool, //todo: cool si on peu chainer des input ==> input pour le nom de l'espece du perso (option visible peut etre avec une fonction)
      label: 'is human ?',
      help: "le personnage est il humain",
      defaultValue: false,
      // render: props => <div>
      //   <div className="form-check">
      //     <input className="form-check-input" type="radio" name="exampleRadios" id="isHuman" value={'true'} checked={!!props.value ? 'checked' : null}
      //       onChange={() => props.onChange(true)} />
      //     <label className ="form-check-label" htmlFor="isHuman">
      //     Oui
      //     </label>
      //   </div>
      //   <div className="form-check">
      //     <input className="form-check-input" type="radio" name="exampleRadios" id="isNotHuman" value={'false'} checked={!!props.value ? null : 'checked'}
      //       onChange={() => props.onChange(false)}/>
      //     <label className="form-check-label" htmlFor="isNotHuman">
      //     Non
      //     </label>
      //   </div>
      // </div>
    },
    genre: {
      type: types.string,
      format: 'select',
      label: 'genre',
      help: "le genre du perso personnage",
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      options: ["male", "female", "non-binary"],
      constraints: [
        constraints.required("le genre est obligatoire"),
      ]
    },
    species: {
      type: types.string,
      visible: { ref: 'human', test: is => !is },
      label: 'Espèce du perso.',
      help: "l'espece du perso personnage car non humain",
      constraints: [
        constraints.when('human', is => !is, [
          // oneOf: constraints.oneOf(["elf", "orc", "semi-dragon", "wererat"], "l'espece doit etre particuliere")
          constraints.required("l'espece est requise si non-humain"),
        ])
      ]
    },
    weapon: {
      type: types.object,
      format: 'select',
      isMulti: true,
      label: 'armes',
      help: "les armes du perso personnage",
      optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      // transformer: (value) => ({label: value.weight, value: value.label}),
      // options: [
      //   { label: "toothpick", weight: 0, rarity: 'common' },
      //   { label: "sword", weight: 2, rarity: 'common' }, 
      //   { label: "bazooka", weight: 10, rarity: 'epic' },
      //   { label: "excalibur", weight: 100, rarity: 'legendary' }],
      // FIXME: if we provide a schema yup is broken
      // schema: {
      //   label: {
      //     type: types.string,
      //   },
      //   weight: {
      //     type: types.number
      //   },
      //   rarity: {
      //     type: types.string
      //   }
      // },
      constraints: [
        constraints.min(1, 'Pas de combat à mains nues, c\'est dangereux !'),
        constraints.length(2, '2 armes obligatoire'),
        constraints.test("weight", 'pas plus de 100 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 100) //todo: use when to have abilitie to supprot more than 100kg when perso.age > 200 
        //todo: tester when en fonction de l'age
      ]
      // createOption: true,

    },
    weapons: {
      type: types.object,
      format: 'form',
      // array: true,
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
        label: {
          type: types.string,
          label: "label",
          help: "help",
          constraints: [
            constraints.required('label is required')
          ],
          // render: (props) => <input type="text" className="is-invalid" value={props.value} onChange={e => props.onChange(e.target.value)} />
        },
        weight: {
          type: types.number,
          label: "weight",
          constraints: [
            constraints.max('100', 'a weight cannot be heavier than 100')
          ]
        },
        rarity: {
          type: types.string,
          label: "rarity",
          constraints: [
            constraints.oneOf(['common', 'rare', 'epic', 'legendary'], 'one of rarity please..common, rare, epic or legendary')
          ]
        }
      },
      flow: ["label", "weight", "rarity"],
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
      type: types.date,
      label: 'date d\'anniv',
      help: "la date de naissance du personnage",
      constraints: [
        constraints.required('required'),
        constraints.max(new Date(), 'pas de naissance dans le futur'),
      ]
    },
    zipcode: {
      type: types.string,
      label: 'code postal',
      switch: {
        ref: 'country',
        render: [
          {
            default: true,
            condition: ({ ref }) => ref === 'france',
            type: types.number,
          }, {
            default: true,
            condition: ({ ref }) => ref !== 'france',
            type: types.string,
          }
        ]
      },
      constraints: [
        constraints.length(5, 'en france 5 chiffre')
      ]
    },
    city: {
      type: types.string,
      format: 'select',
      label: 'ville',
      help: 'Ville de résidence',
      transformer: (value) => ({ label: value.label, value: value.id }),
      options: [{ label: 'Neo-Tokyo', id: 1 }, { label: 'Asgard', id: 2 }, { label: 'Fondcombe', id: 3 }],
      constraints: [
        constraints.required(`Personne n'habite nulle-part jsuqu'à preuve du contraire`)
      ]
    },
    abilities: {
      type: types.string,
      array: true,
      label: 'abilities du perso',
      help: "abilities help..",
      schema: {
        type: types.string,
        constraints: [
          constraints.required('required'),
          constraints.min(4, 'au moins 4 lettres'),
        ]
      },
      constraints: [
        constraints.length(3, '3 abilities obligatoire'),
        constraints.max(10, "max 10")
        // moreThan: constraints.length(2, '2 abilities min obligatoire')
      ],
      // render: (props) => {
      //   return <div className="d-flex">
      //     <input type="text" className="is-invalid" value={props.value} onChange={e => props.onChange(e.target.value)} />
      //     {props.error && <div style={{ color: 'tomato' }}>{props.error.message}</div>}
      //   </div>
      // }
    },
    spells: {
      type: types.object,
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
      type: types.string,
      format: 'markdown',
      label: 'just code',
      help: 'Juste du code, hop hop hop',
      constraints: [
        constraints.required('le code est requis merci')
      ]
    },
    password: {
      type: types.string,
      format: 'password',
      label: 'password',
      constraints: [
        constraints.required('password is required')
      ]
    },
    confirmPassword: {
      type: types.string,
      format: 'password',
      label: 'confirm password',
      constraints: [
        constraints.required('confirm password is required'),
        constraints.oneOf([constraints.ref('password')], 'confirm and password must be equal')
      ]
    },
    avatar: {
      type: types.file,
      format: 'hidden',
      label: 'avatar',
      constraints: [
        constraints.required('your avatar is not set'),
        constraints.maxSize(2000000, 'no more than 2 Mo please'),
        constraints.supportedFormat(['jpeg', 'jpg', 'png'], 'just jpeg or png file please')
      ]
    },
    armor: {
      type: types.object,
      format: 'form',
      label: 'test',
      conditionalSchema: {
        ref: 'genre',
        switch: [
          {
            default: true,
            condition: ({ref}) => ref === 'male',
            schema: {
              casque: {
                type: types.string,
                label: "casque",
                constraints: [
                  constraints.required('your casque is not set'),
                ]
              },
              armure: {
                type: types.string,
                label: "armure"
              }
            },
            flow: ["casque", "armure"]
          },
          {
            condition: 'female',
            schema: {
              haut: {
                type: types.string,
                label: "haut",
                constraints: [
                  constraints.required('your haut is not set'),
                ]
              },
              bas: {
                type: types.string,
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
                type: types.string,
                label: "casque"
              },
              armure: {
                type: types.string,
                label: "armure"
              },
              haut: {
                type: types.string,
                label: "haut"
              },
              bas: {
                type: types.string,
                label: "bas"
              }
            },
            flow: ["casque", "armure", "haut", "bas"]
          }
        ]
      }
      
    }
  }

  const formFlow = [
    // 'bio',
    // 'game',
    'name',
    // 'age',
    // 'city',
    // {
    //   label: 'pere du personnage',
    //   flow: [
    //     'fatherName',
    //     'fatherAge'
    //   ],
    //   collapsed: true
    // },
    // 'human',
    // 'species',
    'genre',
    // 'weapons',
    // 'birthday',
    // 'abilities',
    // 'spells',
    // 'code',
    // 'avatar',
    // 'password',
    // 'confirmPassword',
    'armor'
  ];

  const thor = {
    game: 'https://foo.dev',
    name: 'Thor',
    age: 211,
    city: 2,
    fatherName: 'Odin',
    fatherAge: '999',
    bio: 'Thor odinson...have a hammer',
    human: true,
    species: undefined,
    genre: 'male',
    weapon: { label: "toothpick", weight: 0, rarity: 'common' },
    // test: [{ label: "toothpick", weight: 0, rarity: 'common' }, { label: "Mjolnir", weight: 100, rarity: 'legendary' }],
    birthday: new Date('August 19, 1975 23:15:30'),
    abilities: ['Brave', 'Fair', 'Worthy'],
    spells: { linghtningBolt: 100 }
  }

  const loki = {
    game: 'https://foo.dev',
    name: 'Loki',
    age: 100,
    city: 2,
    fatherName: 'Odin',
    fatherAge: '999',
    bio: 'Loki...don`t trust him ',
    human: true,
    species: undefined,
    genre: 'male',
    weapon: { label: "toothpick", weight: 0, rarity: 'common' },
    // test: [{ label: "toothpick", weight: 0, rarity: 'common' }, { label: "sword", weight: 2, rarity: 'rare' }],
    birthday: new Date('August 19, 1985 23:15:30'),
    abilities: ['Vile', 'Unfair', 'Unworthy'],
    spells: { fakeSnake: 10, hypnosis: 70, realityChanging: 20 }
  }

  // const Wrapper = ({ entry, label, error, children}) => {
  //   return (
  //     <div className="d-flex flex-row">
  //       <label className="form-label" htmlFor={entry}>{label}</label>
  //       {children}
  //       {error && <div className="invalid-feedback">{error.message}</div>}
  //     </div>
  //   )
  // }

  return (
    <div className="container-xxl my-md-4 bd-layout">
      <h1>BaCk OffIcE</h1>

      <button className="btn btn-info" onClick={() => setUser(loki)}>Loki</button>
      <button className="btn btn-info" onClick={() => setUser(thor)}>Thor</button>

      <div>
        <Form
          schema={formSchema}
          flow={formFlow}
          onChange={item => {
            console.group('*** Submitted ***')
            console.error({ item })
            console.groupend()
          }}
          value={user}
          // autosave={true}
          // inputWrapper={Wrapper}
          // footer={({ reset, valid }) => {
          //   return (
          //     <div className="d-flex justify-content-end">
          //       <button className="btn btn-primary m-3" onClick={reset}>reset</button>
          //       <button className="btn btn-success m-3" onClick={valid}>accept</button>
          //     </div>
          //   )
          // }}
        // httpClient={(url, method) => fetch(url, {
        //   method,
        //   headers: {
        //     Accept: 'application/json',
        //     'Content-Type': 'application/json',
        //     'X-foo': 'bar'
        //   }
        // })}
        />
      </div>
    </div>
  )
}