import React, { useState } from 'react';
import { Form } from '../utils/form'
import * as constraints from '../utils/constraints';
import { Types } from '../utils/types';

import 'bootstrap/dist/css/bootstrap.min.css'

export const BackOffice = (props) => {

  const [user, setUser] = useState(undefined)

  const formSchema = {
    game: {
      type: Types.string,
      disabled: true,
      // format: 'password',
      label: 'game',
      placeholder: 'url du game',
      defaultValue: 'https://foo.bar',
      constraints: {
        url: constraints.url()
      },
    },
    name: {
      type: Types.string,
      label: 'name',
      placeholder: 'Nom de ton perso',
      help: 'nom de ton personnage',
      className: "col-6",
      style: { color: 'red' },

      constraints: {
        required: { message: "le nom est obligatoire" },
      },
      render: (props) => <input type="text" className="is-invalid" value={props.value} onChange={e => props.onChange(e.target.value)}/>
    },
    fatherName: {
      type: Types.string,
      label: 'name',
      placeholder: 'Nom du pere du perso',
      className: "col-6",
      style: { color: 'red' },

      constraints: {
        required: { message: "le nom du pere est obligatoire" },
      }
    },
    fatherAge: {
      type: Types.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du pere du personnage",

      constraints: {
        required: constraints.required("l'age du pere est obligatoire"),
        min: { value: 18, message: "il doit etre majeur" },
        max: constraints.max(1000, "il doit etre en vie"),
        integer: constraints.integer("les demi-années ne compte pas vraiment...gamin"),
        // positive: positive("un age negatif ? il est pas né ton perso ????"),
      }
    },
    age: {
      type: Types.number,
      label: 'age',
      placeholder: 'son age',
      help: "l'age du personnage",

      constraints: {
        required: constraints.required("l'age est obligatoire"),
        lessThan: constraints.lessThan('fatherAge', 'un fils est plus jeune que son père'),
        integer: constraints.integer("les demi-années ne compte pas vraiment...gamin"),
      }
    },
    bio: {
      type: Types.string,
      format: 'text',
      label: 'biographie',
      placeholder: 'raconte ton histoire',
      help: "bio du personnage",
      props: {
        rows: 10,
        cols: 70
      }
    },
    human: {
      type: Types.bool, //todo: cool si on peu chainer des input ==> input pour le nom de l'espece du perso (option visible peut etre avec une fonction)
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
      type: Types.string,
      format: 'select',
      label: 'genre',
      help: "le genre du perso personnage",
      // optionsFrom: "https://formslibtestoptions.opunmaif.fr",
      options: ["male", "female", "non-binary"],
      constraints: {
        required: constraints.required("le genre est obligatoire"),
      }

    },

    species: {
      type: Types.string,
      visible: { ref: 'human', test: is => !is },
      label: 'Espèce du perso.',
      help: "l'espece du perso personnage car non humain",
      constraints: {
        when: constraints.when('human', is => !is, {
          required: constraints.required("l'espece est requise si non-humain"),
          // oneOf: constraints.oneOf(["elf", "orc", "semi-dragon", "wererat"], "l'espece doit etre particuliere")
        })
      }

    },
    weapons: {
      type: Types.object,
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
      schema: {
        label: {
          type: Types.string,
        },
        weight: {
          type: Types.number
        },
        rarity: {
          type: Types.string
        }
      },
      constraints: {
        // min: constraints.min(1, 'Pas de combat à mains nues, c\'est dangereux !'),
        length: constraints.length(2, '2 armes obligatoire'),
        test: constraints.test("weight", 'pas plus de 100 kg', value => value.reduce((a, c) => a + c.weight, 0) <= 100) //todo: use when to have abilitie to supprot more than 100kg when perso.age > 200 
        //todo: tester when en fonction de l'age
      },

      // createOption: true,

    },
    birthday: {
      type: Types.date,
      label: 'date d\'anniv',
      help: "la date de naissance du personnage",
      constraints: {
        required: constraints.required('required'),
        max: constraints.max(new Date(), 'pas de naissance dans le futur'),
      }
    },
    city: {
      type: Types.string,
      format: 'select',
      label: 'ville',
      help: 'Ville de résidence',
      transformer: (value) => ({label: value.label, value: value.id}),
      options: [{label: 'Neo-Tokyo', id: 1}, {label: 'Asgard', id: 2}, {label: 'Fondcombe', id: 3}],
      constraints: {
        required: constraints.required(`Personne n'habite nulle-part jsuqu'à preuve du contraire`)
      }
    },
    abilities: {
      type: Types.string,
      format: 'array',
      label: 'abilities du perso',
      help: "abilities help..",
      schema: {
        type: Types.string,
        constraints: {
          required: constraints.required('required'),
          min: constraints.min(4, 'au moins 4 lettres'),
        }
      },
      constraints: {
        length: constraints.length(3, '3 abilities obligatoire'),
        max: constraints.max(10, "max 10")
        // moreThan: constraints.length(2, '2 abilities min obligatoire')
      },
      render: (props) => {
      return  <div className="d-flex">
        <input type="text" className="is-invalid" value={props.value} onChange={e => props.onChange(e.target.value)} />
        {props.error && <div style={{color: 'tomato'}}>{props.error.message}</div>}
        </div>}
    },
    spells: {
      type: Types.object,
      label: 'incantations',
      help: 'Incantation sous form d\'objet {nom, puissance (*/100)} max opuissnce total = 100',
      defaultKeyValue: {'spellName': 50},
      defaultValue: {
        ice: '',
        fire: '',
        air: '',
        lightning: ''
      },
      constraints: {
        required: constraints.required('incancantation requises'),
        test: constraints.test("power", 'incantation requise a minima', value => (Object.values(value) || []).reduce((a, c) => a + Number(c), 0) > 0),
        // test: constraints.test("power", 'pas plus de 100 de pouvoir', value => (Object.values(value) || []).reduce((a, c) => a + Number(c), 0) <= 100)
      }
    }
  }

  const formFlow = [
    'bio',
    'game',
    'name',
    'age',
    'city',
    {
      label: 'pere du personnage',
      flow: [
        'fatherName',
        'fatherAge'
      ],
      collapsed: true
    },
    'human',
    'species',
    'genre',
    'weapons',
    'birthday',
    'abilities',
    'spells'
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
    weapons: [{ label: "toothpick", weight: 0, rarity: 'common' }, { label: "Mjolnir", weight: 100, rarity: 'legendary' }],
    birthday: new Date('August 19, 1975 23:15:30'),
    abilities: ['Brave', 'Fair', 'Worthy'],
    spells: {linghtningBolt: 100}
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
    weapons: [{ label: "toothpick", weight: 0, rarity: 'common' }, { label: "sword", weight: 2, rarity: 'rare' }],
    birthday: new Date('August 19, 1985 23:15:30'),
    abilities: ['Vile', 'Unfair', 'Unworthy'],
    spells: { fakeSnake: 10, hypnosis: 70, realityChanging: 20}
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
          onChange={item => console.log({ item })}
          value={user}
          // inputWrapper={Wrapper}
          footer={(reset, valid) => {
            return (
              <div className="d-flex justify-content-end">
                <button className="btn btn-primary m-3" onClick={reset}>reset</button>
                <button className="btn btn-success m-3" onClick={valid}>accept</button>
              </div>
            )
          }}
        />
      </div>
    </div>
  )
}